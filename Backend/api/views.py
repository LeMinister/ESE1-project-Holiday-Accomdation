from django.contrib.auth.models import User
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Property, Booking


# -------------------------
# PUBLIC: REGISTER
# -------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    data = request.data

    username = data.get("username")
    password = data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    User.objects.create_user(username=username, password=password)

    return Response({"message": "User created"})


# -------------------------
# PUBLIC: PROPERTIES
# -------------------------
def properties(request):
    props = Property.objects.all().values()
    return JsonResponse(list(props), safe=False)


# -------------------------
# PROTECTED: BOOKING
# -------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def book(request):
    user = request.user
    data = request.data

    property_obj = Property.objects.get(id=data["property"])

    booking = Booking.objects.create(
        user=user,
        property=property_obj,
        check_in=data["check_in"],
        check_out=data["check_out"]
    )

    return Response({
        "message": "Booking successful",
        "booking_reference": booking.booking_reference
    })


# -------------------------
# PROTECTED: USER BOOKINGS
# -------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_bookings(request):
    bookings = Booking.objects.filter(user=request.user)

    return Response([
        {
            "id": b.id,
            "property": b.property.name,
            "check_in": b.check_in,
            "check_out": b.check_out,
            "reference": b.booking_reference
        }
        for b in bookings
    ])