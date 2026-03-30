from django.urls import path
from . import views

urlpatterns = [
    path("properties/", views.properties),
    path("book/", views.book),
    path("my-bookings/", views.user_bookings),
]