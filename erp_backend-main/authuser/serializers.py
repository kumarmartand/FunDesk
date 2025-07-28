from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            "message": "Login successful.",
            "user": {
                "email": self.user.email,
                "first_name": self.user.first_name,
                "last_name": self.user.last_name,
            }
        })
        return data

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            "message": "Token refreshed successfully.",
        })
        return data

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    