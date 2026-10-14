from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def health_view(_request):
    return JsonResponse({"status": "ok", "service": "Zarvan Artisanal Spice API"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_view, name="api-health"),
    path("api/", include("spices.urls")),
]
