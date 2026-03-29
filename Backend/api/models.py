from django.db import models
from django.contrib.auth.models import User
import uuid


class Property(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    property_type = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    # ✅ NEW: booking reference
    reference = models.CharField(
        max_length=12,
        unique=True,
        blank=True
    )

    def save(self, *args, **kwargs):
        # Auto-generate reference if not set
        if not self.reference:
            self.reference = str(uuid.uuid4()).replace("-", "")[:10].upper()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference} - {self.user.username}"