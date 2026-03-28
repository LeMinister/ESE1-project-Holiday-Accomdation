from django.urls import path
from .views import register, login, forgot_password

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("forgot-password/", forgot_password),
]