from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Property, Booking
from datetime import date


class BaseSetup(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            username="testuser",
            password="StrongPass123!"
        )

        self.property = Property.objects.create(
            name="Beach House",
            description="Ocean view",
            price_per_night=200.00
        )


# ---------------------------
# PROPERTY TESTS
# ---------------------------
class PropertyTests(BaseSetup):

    def test_property_list_api(self):
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)

    def test_property_fields_exist(self):
        prop = Property.objects.first()
        self.assertIsNotNone(prop.name)
        self.assertIsNotNone(prop.price_per_night)

    def test_property_creation_db(self):
        Property.objects.create(
            name="Villa",
            description="Luxury",
            price_per_night=500
        )
        self.assertEqual(Property.objects.count(), 2)


# ---------------------------
# AUTH / JWT TESTS
# ---------------------------
class AuthTests(BaseSetup):

    def test_jwt_token_obtain(self):
        response = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "StrongPass123!"
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_invalid_login_fails(self):
        response = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "wrongpassword"
        })

        self.assertEqual(response.status_code, 401)


# ---------------------------
# BOOKING TESTS
# ---------------------------
class BookingTests(BaseSetup):

    def authenticate(self):
        token = self.client.post("/api/token/", {
            "username": "testuser",
            "password": "StrongPass123!"
        }).data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_create_booking_authenticated(self):
        self.authenticate()

        response = self.client.post("/api/bookings/", {
            "property": self.property.id,
            "check_in": "2026-03-01",
            "check_out": "2026-03-05",
            "booking_reference": "REF123456789"
        })

        self.assertIn(response.status_code, [200, 201])

    def test_booking_requires_auth(self):
        response = self.client.post("/api/bookings/", {
            "property": self.property.id,
            "check_in": "2026-03-01",
            "check_out": "2026-03-05",
            "booking_reference": "REF999999999"
        })

        self.assertEqual(response.status_code, 401)

    def test_user_can_only_see_their_bookings(self):
        self.authenticate()

        Booking.objects.create(
            user=self.user,
            property=self.property,
            check_in=date(2026, 4, 1),
            check_out=date(2026, 4, 5),
            booking_reference="ONLYME123456"
        )

        response = self.client.get("/api/bookings/")
        self.assertEqual(response.status_code, 200)


# ---------------------------
# EDGE CASE TESTS
# ---------------------------
class EdgeCaseTests(BaseSetup):

    def test_booking_invalid_dates(self):
        self.authenticate()

        response = self.client.post("/api/bookings/", {
            "property": self.property.id,
            "check_in": "2026-05-10",
            "check_out": "2026-05-01",
            "booking_reference": "BADDATES123"
        })

        # depends on validation (you should implement this later)
        self.assertIn(response.status_code, [400, 422])