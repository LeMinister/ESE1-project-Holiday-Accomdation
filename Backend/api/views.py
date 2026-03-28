from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response


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

    # Generate token
    token = default_token_generator.make_token(user)
    uid = user.pk

    # Frontend reset link
    reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"

    # Send email
    send_mail(
        subject="Password Reset Request",
        message=f"Click the link to reset your password:\n\n{reset_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "Password reset email sent successfully"})