from django.contrib import admin
from .models import Property, Booking


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "price_per_night")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("booking_reference", "property", "guest_name", "check_in", "check_out")