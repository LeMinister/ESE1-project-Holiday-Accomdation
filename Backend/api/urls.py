from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_user),
    path("register/", views.register_user),
    path("properties/", views.properties),
    path("book/", views.book_property),
    path("bookings/", views.user_bookings),
]