from django.db import models
from django.contrib.auth.models import User
import uuid


class Property(models.Model):
    PROPERTY_TYPES = [
        ('hotel', 'Hotel'),
        ('villa', 'Villa'),
        ('studio', 'Studio'),
    ]

    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    booking_reference = models.CharField(max_length=20, unique=True, editable=False)

    property = models.ForeignKey(Property, on_delete=models.CASCADE)

    # Optional user account (for registered users)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    # Guest details (for non-registered users)
    guest_name = models.CharField(max_length=200)
    guest_email = models.EmailField()

    check_in = models.DateField()
    check_out = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_reference:
            self.booking_reference = "HB-" + str(uuid.uuid4())[:8]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.booking_reference