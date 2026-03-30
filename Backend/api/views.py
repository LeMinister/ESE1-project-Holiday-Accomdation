import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

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
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    if not username or not email or not password or not confirm_password:
        return JsonResponse({"error": "All fields required"}, status=400)

    if password != confirm_password:
        return JsonResponse({"error": "Passwords do not match"}, status=400)

    try:
        validate_password(password)
    except ValidationError as e:
        return JsonResponse({"error": list(e.messages)}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return JsonResponse({
        "message": "User registered successfully",
        "user_id": user.id
    })


# -----------------------------
# LOGIN USER
# -----------------------------
@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=405)

    data = json.loads(request.body)

    username = data.get("username")
    password = data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    return JsonResponse({
        "message": "Login successful",
        "user_id": user.id
    })


# -----------------------------
# GET PROPERTIES
# -----------------------------
def properties(request):
    props = Property.objects.all().values()
    return JsonResponse(list(props), safe=False)


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

    try:
        property_obj = Property.objects.get(id=data["property"])
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)

    booking = Booking.objects.create(
        user=user,
        property=property_obj,
        guest_name=data.get("guest_name"),
        guest_email=data.get("guest_email"),
        check_in=data.get("check_in"),
        check_out=data.get("check_out"),
        booking_reference=str(user.id) + str(property_obj.id)
    )

    return JsonResponse({
        "message": "Booking successful",
        "booking_reference": booking.booking_reference
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