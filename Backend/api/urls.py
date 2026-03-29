from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register),
    path("login/", views.login),
    path("book/", views.book),
    path("bookings/", views.user_bookings),
]