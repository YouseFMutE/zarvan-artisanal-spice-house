from rest_framework import serializers
from .models import Spice, StoryChapter, TerroirOrigin, CustomBlendOrder


class SpiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spice
        fields = "__all__"


class StoryChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryChapter
        fields = "__all__"


class TerroirOriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = TerroirOrigin
        fields = "__all__"


class CustomBlendOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomBlendOrder
        fields = "__all__"
        read_only_fields = ["id", "created_at"]
