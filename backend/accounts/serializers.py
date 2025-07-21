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

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        username = email.split('@')[0]

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