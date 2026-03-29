import json
import uuid

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail

from .models import Property, Booking


def generate_reference():
    return str(uuid.uuid4())[:10].upper()


@csrf_exempt
def register(request):
    data = json.loads(request.body)

    user = User.objects.create_user(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )

    return JsonResponse({"message": "registered", "user_id": user.id})


@csrf_exempt
def login(request):
    data = json.loads(request.body)

    user = authenticate(
        username=data["username"],
        password=data["password"]
    )

    if user:
        return JsonResponse({"user_id": user.id})

    return JsonResponse({"error": "invalid"}, status=400)


def properties(request):
    data = list(Property.objects.values())
    return JsonResponse(data, safe=False)


@csrf_exempt
def book(request):
    data = json.loads(request.body)

    user = User.objects.get(id=data["user_id"])
    property_obj = Property.objects.get(id=data["property_id"])

    ref = generate_reference()

    booking = Booking.objects.create(
        user=user,
        property=property_obj,
        check_in=data["check_in"],
        check_out=data["check_out"],
        booking_reference=ref
    )

    send_mail(
        "Booking Confirmation - StayHub",
        f"""
        Your booking is confirmed!

        Property: {property_obj.name}
        Reference: {ref}
        Check-in: {booking.check_in}
        Check-out: {booking.check_out}
        """,
        "noreply@stayhub.com",
        [user.email],
        fail_silently=True
    )

    return JsonResponse({"reference": ref})


def user_bookings(request, user_id):
    bookings = Booking.objects.filter(user_id=user_id)

    data = list(bookings.values(
        "booking_reference",
        "check_in",
        "check_out",
        "property__name",
        "property__price_per_night"
    ))

    return JsonResponse(data, safe=False)