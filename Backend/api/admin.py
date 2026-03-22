from django.contrib import admin
from .models import Property, Booking


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'property_type', 'price_per_night')
    search_fields = ('name', 'location', 'property_type')
    list_filter = ('property_type',)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_reference', 'property', 'guest_name', 'check_in', 'check_out', 'created_at')
    search_fields = ('booking_reference', 'guest_name', 'guest_email')
    list_filter = ('check_in', 'check_out', 'created_at')