from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail

from rest_framework.decorators import api_view
from rest_framework.response import Response

# =========================
# REGISTER
# =========================
@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )

    return Response({"message": "User created successfully"})


# =========================
# LOGIN
# =========================
@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Login successful"})
    else:
        return Response({"error": "Invalid credentials"}, status=401)


# =========================
# FORGOT PASSWORD
# =========================
@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)

        token = default_token_generator.make_token(user)
        uid = user.pk

        reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"

        send_mail(
            "Password Reset",
            f"Click this link to reset your password:\n{reset_link}",
            "noreply@example.com",
            [email],
        )

        return Response({"message": "Reset email sent (check terminal)"})

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


# =========================
# RESET PASSWORD
# =========================
@api_view(["POST"])
def reset_password(request, uid, token):
    password = request.data.get("password")

    try:
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successful"})
        else:
            return Response({"error": "Invalid or expired token"}, status=400)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)