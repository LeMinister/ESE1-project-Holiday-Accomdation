from django.contrib import admin
from .models import Property, Booking


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price_per_night")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "booking_reference",
        "user",
        "property",
        "check_in",
        "check_out",
        "created_at",
    )

    list_filter = ("check_in", "check_out", "created_at")