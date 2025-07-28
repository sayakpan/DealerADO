from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework import status

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(email=response.data['email'])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data
        })

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class UserDataView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
    
    
class ForgotPasswordView(APIView):
    permission_classes = []  # No auth required

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "If the email exists, a reset link has been sent."}, status=status.HTTP_200_OK)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # Replace this with your frontend reset page URL
        reset_url = f"https://yourfrontend.com/reset-password?uid={uid}&token={token}"

        send_mail(
            subject="Password Reset Request",
            message=f"Click this link to reset your password:\n{reset_url}",
            from_email="no-reply@electrodegames.site",
            recipient_list=[email],
        )

        return Response({"message": "If the email exists, a reset link has been sent."}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    permission_classes = []  # No auth required

    def post(self, request):
        uidb64 = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("password")

        if not uidb64 or not token or not new_password:
            return Response({"error": "All fields (uid, token, password) are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid UID."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)