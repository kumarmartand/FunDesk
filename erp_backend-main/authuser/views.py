from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    LogoutSerializer,
)

@extend_schema(
    tags=["Auth"],
    description="Obtain JWT access and refresh tokens by providing valid user credentials.",
    responses={200: OpenApiResponse(description="JWT token pair returned")},
)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@extend_schema(
    tags=["Auth"],
    description="Refresh your JWT access token using a valid refresh token.",
    responses={200: OpenApiResponse(description="New access token returned")},
)
class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class LogoutView(APIView):
    @extend_schema(
        tags=["Auth"],
        request=LogoutSerializer,
        responses={
            200: OpenApiResponse(description="Token blacklisted successfully"),
            400: OpenApiResponse(description="Invalid refresh token or request body"),
        },
        description="Logs out a user by blacklisting the provided refresh token.",
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid():
            try:
                token = RefreshToken(serializer.validated_data['refresh'])
                token.blacklist()
                return Response(
                    {"message": "Logout successful. Refresh token blacklisted."},
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                return Response(
                    {"detail": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
