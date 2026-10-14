from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class ZarvanSpicesAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_experience_bootstrap_auto_seeds_and_returns_data(self):
        response = self.client.get(reverse("experience-bootstrap"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["brand"]["name_en"], "ZARVAN")
        self.assertGreaterEqual(len(data["spices"]), 6)
        self.assertEqual(len(data["story_chapters"]), 4)
        self.assertEqual(len(data["terroir_origins"]), 5)

    def test_spice_list_and_category_filter(self):
        response = self.client.get(reverse("spice-list"), {"category": "floral"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["slug"], "qaenat-sargol-saffron")

    def test_create_custom_alchemy_blend(self):
        payload = {
            "blend_name": "اکسیر شب‌های کویر",
            "creator_name": "آرش کیمیاگر",
            "grind_type": "stone_ground",
            "dominant_color": "#D97706",
            "components": [
                {"spice_slug": "qaenat-sargol-saffron", "name_fa": "زعفران سرگل قاینات", "percentage": 40},
                {"spice_slug": "malabar-emerald-cardamom", "name_fa": "هل زمردین مالابار", "percentage": 60},
            ],
            "sensory_profile": {
                "warmth": 88,
                "pungency": 48,
                "aroma_intensity": 98,
                "earthiness": 53,
                "floral_sweetness": 91,
                "smokiness": 20,
            },
            "notes": "مخصوص دم‌نوش و برنج زعفرانی",
        }
        response = self.client.post(reverse("alchemy-blends"), payload, format="json")
        self.assertEqual(response.status_code, 201)
        body = response.json()
        self.assertIn("batch_code", body)
        self.assertEqual(body["blend"]["blend_name"], "اکسیر شب‌های کویر")
