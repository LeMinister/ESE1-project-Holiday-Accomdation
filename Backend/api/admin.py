from django.contrib import admin
from .models import Property, Booking


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "property_type")
    search_fields = ("name", "property_type")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "user",
        "property",
        "start_date",
        "end_date",
        "total_price",
    )

    list_filter = ("start_date", "end_date")
    search_fields = ("reference", "user__username", "property__name")