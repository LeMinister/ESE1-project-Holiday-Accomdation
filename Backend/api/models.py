from django.db import models
import uuid

class Property(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name


class Booking(models.Model):
    booking_reference = models.CharField(max_length=20, unique=True, editable=False)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
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