from django.urls import path
from .views import forgot_password

urlpatterns = [
    path("forgot-password/", forgot_password),
]