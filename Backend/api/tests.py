from django.test import TestCase
from django.contrib.auth.models import User
from .models import Property, Booking


class BookingTest(TestCase):
    def test_booking_creation(self):
        user = User.objects.create_user("test", password="123")
        prop = Property.objects.create(name="Test", description="x", price_per_night=100)

        booking = Booking.objects.create(
            user=user,
            property=prop,
            check_in="2026-01-01",
            check_out="2026-01-02",
            booking_reference="ABC123"
        )

        self.assertEqual(booking.booking_reference, "ABC123")