from django.db import models
from django.contrib.auth.models import User


class Property(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

    check_in = models.DateField()
    check_out = models.DateField()

    booking_reference = models.CharField(max_length=12, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)