from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import RegisterSerializer


# ✅ REGISTER
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"})
    
    return Response(serializer.errors, status=400)


# ✅ LOGIN
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({"message": "Login successful"})
    
    return Response({"error": "Invalid credentials"}, status=400)


# ✅ FORGOT PASSWORD (simple version for now)
@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)
        return Response({"message": "Password reset link will be sent (later with SendGrid)"})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)