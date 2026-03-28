from django.urls import path
from .views import PropertyListView, forgot_password, reset_password

urlpatterns = [
    path("properties/", PropertyListView.as_view()),
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
]