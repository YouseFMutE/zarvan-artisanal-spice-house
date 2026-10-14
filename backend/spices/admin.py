from django.contrib import admin
from .models import Spice, StoryChapter, TerroirOrigin, CustomBlendOrder


@admin.register(Spice)
class SpiceAdmin(admin.ModelAdmin):
    list_display = ("code", "name_fa", "name_en", "category", "origin_region", "price_toman", "featured")
    list_filter = ("category", "featured")
    search_fields = ("name_fa", "name_en", "code", "origin_region")
    prepopulated_fields = {"slug": ("name_en",)}


@admin.register(StoryChapter)
class StoryChapterAdmin(admin.ModelAdmin):
    list_display = ("chapter_number", "roman_numeral", "title_fa", "title_en", "location_badge")


@admin.register(TerroirOrigin)
class TerroirOriginAdmin(admin.ModelAdmin):
    list_display = ("code", "name_fa", "signature_spice", "coordinates")


@admin.register(CustomBlendOrder)
class CustomBlendOrderAdmin(admin.ModelAdmin):
    list_display = ("blend_name", "creator_name", "grind_type", "dominant_color", "created_at")
    readonly_fields = ("created_at",)
