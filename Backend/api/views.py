import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from .models import Booking, Property


# -----------------------------
# REGISTER USER
# -----------------------------
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)

    username = data.get("username")
    email = data.get("email")

    if not username or not email:
        return JsonResponse({"error": "Missing fields"}, status=400)

    if User.objects.filter(email=email).exists():
        return JsonResponse({"error": "Email already exists"}, status=400)

    user = User.objects.create(username=username, email=email)

    return JsonResponse({
        "message": "User registered",
        "user_id": user.id
    })


# -----------------------------
# LOGIN USER (EMAIL ONLY)
# -----------------------------
@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid login"}, status=401)

    return JsonResponse({
        "message": "Login successful",
        "user_id": user.id
    })


# -----------------------------
# BOOK PROPERTY
# -----------------------------
@csrf_exempt
def book(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)

    user_id = data.get("user_id")

    if not user_id:
        return JsonResponse({"error": "Login required"}, status=401)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=404)

    property_obj = Property.objects.get(id=data["property"])

    booking = Booking.objects.create(
        user=user,
        property=property_obj,
        guest_name=data.get("guest_name"),
        guest_email=data.get("guest_email"),
        check_in=data.get("check_in"),
        check_out=data.get("check_out")
    )

    return JsonResponse({
        "message": "Booking successful",
        "booking_reference": booking.id
    })


# -----------------------------
# USER BOOKINGS
# -----------------------------
def user_bookings(request):
    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse([], safe=False)

    bookings = Booking.objects.filter(user_id=user_id)

    return JsonResponse(list(bookings.values()), safe=False)