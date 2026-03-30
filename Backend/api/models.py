from django.db import models
from django.contrib.auth.models import User
import uuid


class Property(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

    check_in = models.DateField()
    check_out = models.DateField()

    booking_reference = models.CharField(max_length=12, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_reference:
            self.booking_reference = str(uuid.uuid4()).replace("-", "")[:12].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.booking_reference