from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Property, Booking
from .serializers import PropertySerializer, BookingSerializer


# -------------------------
# Property ViewSet
# -------------------------
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer


# -------------------------
# Booking ViewSet
# -------------------------
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    # Enable search by booking_reference
    filter_backends = [filters.SearchFilter]
    search_fields = ['booking_reference']


# -------------------------
# Register User
# -------------------------
@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )


# -------------------------
# Login User
# -------------------------
@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response(
            {"message": "Login successful"},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )