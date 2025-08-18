from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token



class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def generate_unique_username(self, base_username):
        """
        Generates a unique username by appending a number to the base username
        if a user with that username already exists.
        """
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        return username

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        base_username = email.split('@')[0]
        
        # Ensure username uniqueness
        username = self.generate_unique_username(base_username)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        Token.objects.get_or_create(user=user)  # Create token
        return user
        

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        username = User.objects.filter(email=email).values_list('username', flat=True).first()

        if not username:
            raise serializers.ValidationError({"error": "No user found with this email."})

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError({"error": "Email or password is incorrect."})

        return user
    
    
class UserSerializer(serializers.ModelSerializer):
    mobile_number = serializers.CharField(source='profile.mobile_number')
    role = serializers.CharField(source='profile.role')
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'mobile_number', 'role']
        
        
class DeactivateUserSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)

    def validate_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Incorrect password.")
        return value
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate_new_password(self, value):
        # You can add more password validation here if needed
        if len(value) < 6:
            raise serializers.ValidationError("New password must be at least 6 characters.")
        return value