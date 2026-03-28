from django.urls import path
from .views import forgot_password, reset_password

urlpatterns = [
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
]