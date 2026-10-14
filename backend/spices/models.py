from django.db import models


class Spice(models.Model):
    CATEGORY_CHOICES = [
        ("floral", "گلی و زعفرانی (Floral & Solar)"),
        ("fiery", "آتشین و تند (Fiery & Pungent)"),
        ("earthy", "خاکی و ریشه‌ای (Earthy & Root)"),
        ("citrus", "ترش و کوهستانی (Acidic & Wild)"),
        ("aromatic", "معطر و شرقی (Aromatic & Resin)"),
        ("blend", "ترکیب دست‌ساز (Artisanal Blend)"),
    ]

    slug = models.SlugField(unique=True)
    code = models.CharField(max_length=24, unique=True)
    name_fa = models.CharField(max_length=120)
    name_en = models.CharField(max_length=120)
    scientific_name = models.CharField(max_length=140)
    tagline = models.CharField(max_length=220)
    description = models.TextField()
    ritual_note = models.TextField()
    origin_region = models.CharField(max_length=120)
    origin_coordinates = models.CharField(max_length=80)
    altitude_meters = models.IntegerField(default=1200)
    harvest_season = models.CharField(max_length=120)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default="aromatic")

    primary_color = models.CharField(max_length=16, default="#E59819")
    secondary_color = models.CharField(max_length=16, default="#9E2A2B")
    particle_color = models.CharField(max_length=16, default="#FBBF24")

    # Sensory Radar Scores (0 - 100)
    warmth = models.PositiveSmallIntegerField(default=80)
    pungency = models.PositiveSmallIntegerField(default=50)
    aroma_intensity = models.PositiveSmallIntegerField(default=95)
    earthiness = models.PositiveSmallIntegerField(default=65)
    floral_sweetness = models.PositiveSmallIntegerField(default=70)
    smokiness = models.PositiveSmallIntegerField(default=30)

    aroma_notes = models.JSONField(default=list)
    pairings = models.JSONField(default=list)

    weight_grams = models.PositiveIntegerField(default=50)
    price_toman = models.PositiveIntegerField(default=480000)
    limited_batch = models.PositiveIntegerField(default=150)
    featured = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return f"{self.code} - {self.name_fa}"


class StoryChapter(models.Model):
    chapter_number = models.PositiveSmallIntegerField(unique=True)
    roman_numeral = models.CharField(max_length=12)
    title_fa = models.CharField(max_length=140)
    title_en = models.CharField(max_length=140)
    subtitle = models.CharField(max_length=220)
    narrative = models.TextField()
    sensory_quote = models.CharField(max_length=240)
    location_badge = models.CharField(max_length=120)
    ambient_color = models.CharField(max_length=16, default="#E59819")
    accent_color = models.CharField(max_length=16, default="#FDE68A")
    metric_label = models.CharField(max_length=80)
    metric_value = models.CharField(max_length=80)

    class Meta:
        ordering = ["chapter_number"]

    def __str__(self) -> str:
        return f"Chapter {self.roman_numeral}: {self.title_fa}"


class TerroirOrigin(models.Model):
    code = models.CharField(max_length=24, unique=True)
    name_fa = models.CharField(max_length=120)
    name_en = models.CharField(max_length=120)
    coordinates = models.CharField(max_length=80)
    climate = models.CharField(max_length=120)
    soil_type = models.CharField(max_length=120)
    signature_spice = models.CharField(max_length=120)
    description = models.TextField()
    color = models.CharField(max_length=16, default="#E59819")
    map_x = models.FloatField(default=50.0)
    map_y = models.FloatField(default=50.0)

    class Meta:
        ordering = ["code"]

    def __str__(self) -> str:
        return f"{self.code} - {self.name_fa}"


class CustomBlendOrder(models.Model):
    GRIND_CHOICES = [
        ("whole", "دانه کامل (Whole Botanicals)"),
        ("coarse", "کوبش هاون سنگی (Coarse Mortar Crush)"),
        ("stone_ground", "آسیاب سنگی سرد (Cold Stone-Ground)"),
        ("silk_powder", "پودر ابریشمی میکرونیزه (Silk Micronized)"),
    ]

    blend_name = models.CharField(max_length=120)
    creator_name = models.CharField(max_length=120, blank=True, default="کیمیاگر مهمان")
    customer_contact = models.CharField(max_length=140, blank=True, default="")
    grind_type = models.CharField(max_length=32, choices=GRIND_CHOICES, default="stone_ground")
    components = models.JSONField(default=list)
    dominant_color = models.CharField(max_length=16, default="#D97706")
    sensory_profile = models.JSONField(default=dict)
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.blend_name} by {self.creator_name}"
