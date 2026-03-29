from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Property, Booking

import json
import uuid
from datetime import datetime


# ==============================
# 📦 GET ALL PROPERTIES
# ==============================
class PropertyListView(APIView):
    def get(self, request):
        properties = Property.objects.all()

        data = []
        for p in properties:
            data.append({
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "image": p.image,
                "property_type": p.property_type,
                "price_per_night": str(p.price_per_night),
            })

        return Response(data)


# ==============================
# 🧾 REGISTER USER
# ==============================
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if email exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already registered"}, status=400)

        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({"message": "User created successfully"})

    return JsonResponse({"error": "Invalid request"}, status=400)


# ==============================
# 🏨 BOOK PROPERTY
# ==============================
@csrf_exempt
def book_property(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            property_id = data.get("property_id")
            start_date = data.get("start_date")
            end_date = data.get("end_date")
            user_id = data.get("user_id")  # simple for now

            property_obj = Property.objects.get(id=property_id)
            user = User.objects.get(id=user_id)

            # Calculate nights
            start = datetime.strptime(start_date, "%Y-%m-%d")
            end = datetime.strptime(end_date, "%Y-%m-%d")
            nights = (end - start).days

            if nights <= 0:
                return JsonResponse({"error": "Invalid dates"}, status=400)

            total_price = nights * float(property_obj.price_per_night)

            # Create booking
            booking = Booking.objects.create(
                user=user,
                property=property_obj,
                start_date=start_date,
                end_date=end_date,
                total_price=total_price,
                reference=str(uuid.uuid4()).replace("-", "")[:10].upper()
            )

            # Send email
            send_mail(
                subject="Booking Confirmation",
                message=f"""
Booking Confirmed!

Reference: {booking.reference}
Property: {property_obj.name}
Dates: {start_date} to {end_date}
Total Price: £{total_price}
                """,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=True,
            )

            return JsonResponse({
                "message": "Booking successful",
                "reference": booking.reference
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


# ==============================
# 🔑 FORGOT PASSWORD
# ==============================
@csrf_exempt
def forgot_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")

        try:
            user = User.objects.get(email=email)

            uid = urlsafe_base64_encode(str(user.pk).encode())
            token = default_token_generator.make_token(user)

            reset_link = f"http://localhost:3000/reset-password/{uid}/{token}"

            send_mail(
                subject="Password Reset",
                message=f"Click the link to reset your password:\n{reset_link}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=True,
            )

            return JsonResponse({"message": "Reset email sent"})

        except User.DoesNotExist:
            return JsonResponse({
                "error": "Email not registered. Please sign up."
            }, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


# ==============================
# 🔁 RESET PASSWORD
# ==============================
@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        data = json.loads(request.body)

        uid = data.get("uid")
        token = data.get("token")
        new_password = data.get("password")

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)

            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return JsonResponse({"message": "Password reset successful"})
            else:
                return JsonResponse({"error": "Invalid token"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)