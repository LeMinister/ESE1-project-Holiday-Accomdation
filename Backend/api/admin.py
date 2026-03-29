from django.contrib import admin
from .models import Property, Booking


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price_per_night", "property_type")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "reference",
        "user",
        "property",
        "start_date",
        "end_date",
        "total_price",
    )

    search_fields = ("reference", "user__username")