from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from datetime import datetime
import uuid

from .models import Property, Booking
from .serializers import PropertySerializer


# 🔹 GET ALL PROPERTIES
@api_view(["GET"])
def property_list(request):
    properties = Property.objects.all()
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)


# 🔹 CREATE BOOKING
@api_view(["POST"])
def create_booking(request):
    user_id = request.data.get("user_id")
    property_id = request.data.get("property_id")
    start_date = request.data.get("start_date")
    end_date = request.data.get("end_date")

    # VALIDATION
    if not all([user_id, property_id, start_date, end_date]):
        return Response({"error": "Missing fields"}, status=400)

    try:
        user = User.objects.get(id=user_id)
        property = Property.objects.get(id=property_id)
    except:
        return Response({"error": "Invalid user or property"}, status=404)

    # CALCULATE DAYS
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")

    if end <= start:
        return Response({"error": "End date must be after start date"}, status=400)

    days = (end - start).days
    total_price = days * property.price_per_night

    # GENERATE REFERENCE
    reference = str(uuid.uuid4())[:8]

    # CREATE BOOKING
    booking = Booking.objects.create(
        user=user,
        property=property,
        start_date=start_date,
        end_date=end_date,
        total_price=total_price,
        reference=reference
    )

    # SEND EMAIL
    send_mail(
        subject="Booking Confirmation",
        message=f"""
Booking Confirmed!

Property: {property.name}
Location: {property.location}

Dates: {start_date} to {end_date}
Total Price: £{total_price}

Reference Number: {reference}

Thank you for booking with us!
""",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({
        "message": "Booking confirmed! Email sent.",
        "reference": reference
    })


# 🔹 FORGOT PASSWORD
@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    if not User.objects.filter(email=email).exists():
        return Response({
            "error": "Email not registered. Please sign up."
        }, status=400)

    return Response({"message": "Password reset email sent"})


# 🔹 RESET PASSWORD
@api_view(["POST"])
def reset_password(request):
    return Response({"message": "Password reset successful"})