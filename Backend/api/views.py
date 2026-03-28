import re

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from .models import Property
from .serializers import PropertySerializer


# =========================
# PROPERTIES (HOME PAGE)
# =========================
class PropertyListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer


# =========================
# FORGOT PASSWORD
# =========================
@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Email not registered. Please sign up."},
            status=404
        )

    token = default_token_generator.make_token(user)
    uid = user.pk

    reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"

    send_mail(
        subject="Password Reset Request",
        message=f"Click the link below to reset your password:\n\n{reset_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "Password reset email sent"})


# =========================
# RESET PASSWORD
# =========================
@api_view(["POST"])
def reset_password(request):
    uid = request.data.get("uid")
    token = request.data.get("token")
    password = request.data.get("password")

    if not all([uid, token, password]):
        return Response({"error": "Missing fields"}, status=400)

    try:
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        return Response({"error": "Invalid user"}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=400)

    # PASSWORD RULES
    if len(password) < 8:
        return Response({"error": "Password must be at least 8 characters"}, status=400)

    if not re.search(r"[A-Z]", password):
        return Response({"error": "Must contain at least one uppercase letter"}, status=400)

    if not re.search(r"[0-9]", password):
        return Response({"error": "Must contain at least one number"}, status=400)

    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return Response({"error": "Must contain at least one special character"}, status=400)

    # HASHED AUTOMATICALLY
    user.set_password(password)
    user.save()

    return Response({"message": "Password reset successful"})