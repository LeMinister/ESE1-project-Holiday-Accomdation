from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, BookingViewSet, register_user, login_user

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', login_user),
]