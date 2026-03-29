from django.urls import path
from .views import (
    property_list,
    create_booking,
    forgot_password,
    reset_password,
)

urlpatterns = [
    # PROPERTIES
    path("properties/", property_list),

    # BOOKINGS
    path("book/", create_booking),

    # AUTH
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
]