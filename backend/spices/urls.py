from django.urls import path
from .views import (
    ExperienceBootstrapAPIView,
    SpiceListAPIView,
    SpiceDetailAPIView,
    CustomBlendOrderListCreateAPIView,
)

urlpatterns = [
    path("experience/", ExperienceBootstrapAPIView.as_view(), name="experience-bootstrap"),
    path("spices/", SpiceListAPIView.as_view(), name="spice-list"),
    path("spices/<slug:slug>/", SpiceDetailAPIView.as_view(), name="spice-detail"),
    path("alchemy-blends/", CustomBlendOrderListCreateAPIView.as_view(), name="alchemy-blends"),
]
