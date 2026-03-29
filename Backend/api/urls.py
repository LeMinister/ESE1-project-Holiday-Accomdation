from django.urls import path
from .views import (
    PropertyListView,
    register_user,
    book_property,
    forgot_password,
    reset_password,
)

urlpatterns = [
    # 📦 Properties
    path("properties/", PropertyListView.as_view()),

    # 🧾 Authentication
    path("register/", register_user),

    # 🏨 Booking
    path("book/", book_property),

    # 🔑 Password reset
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
]