from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Spice, StoryChapter, TerroirOrigin, CustomBlendOrder
from .serializers import (
    SpiceSerializer,
    StoryChapterSerializer,
    TerroirOriginSerializer,
    CustomBlendOrderSerializer,
)
from .seed_data import ensure_seeded


class ExperienceBootstrapAPIView(APIView):
    """
    Returns the complete sensory experience payload for Zarvan Frontend:
    spices, storytelling chapters, terroir origins, and recent alchemy blends.
    """

    def get(self, request):
        ensure_seeded()
        spices = Spice.objects.all()
        chapters = StoryChapter.objects.all()
        origins = TerroirOrigin.objects.all()
        recent_blends = CustomBlendOrder.objects.all()[:6]

        return Response(
            {
                "brand": {
                    "name_fa": "زَروان",
                    "name_en": "ZARVAN",
                    "Philosophy": "کیمیاگری عطر، خاک و زمان",
                    "edition": "HARVEST ARCHIVE // 1405 — 2026",
                },
                "spices": SpiceSerializer(spices, many=True).data,
                "story_chapters": StoryChapterSerializer(chapters, many=True).data,
                "terroir_origins": TerroirOriginSerializer(origins, many=True).data,
                "recent_blends": CustomBlendOrderSerializer(recent_blends, many=True).data,
            }
        )


class SpiceListAPIView(generics.ListAPIView):
    serializer_class = SpiceSerializer

    def get_queryset(self):
        ensure_seeded()
        queryset = Spice.objects.all()
        category = self.request.query_params.get("category")
        if category and category != "all":
            queryset = queryset.filter(category=category)
        return queryset


class SpiceDetailAPIView(generics.RetrieveAPIView):
    serializer_class = SpiceSerializer
    lookup_field = "slug"

    def get_queryset(self):
        ensure_seeded()
        return Spice.objects.all()


class CustomBlendOrderListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomBlendOrder.objects.all()
    serializer_class = CustomBlendOrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            {
                "message": "ترکیب اختصاصی شما در آرشیو کیمیاگری زَروان ثبت شد.",
                "batch_code": f"ZRV-LAB-{1000 + instance.id}",
                "blend": CustomBlendOrderSerializer(instance).data,
            },
            status=status.HTTP_201_CREATED,
        )
