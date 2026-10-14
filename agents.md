# AGENTS.md — حافظه دائمی پروژه زَروان (ZARVAN Permanent Project Memory)

> **⚠️ قانون بنیادین و تغییرناپذیر (MANDATORY ALWAYS-UP-TO-DATE DIRECTIVE):**
> این فایل (`agents.md`) به همراه فایل همتای خود (`claude.md`) **حافظه دائمی و مرجع حقیقت (Single Source of Truth)** پروژه **زَروان (ZARVAN Artisanal Spice House)** هستند.
> ۱. **الزام بروزرسانی در هر تغییر:** هر ایجنت هوش مصنوعی یا توسعه‌دهنده‌ای که هرگونه تغییر در معماری، مدل‌های جنگو، اندپوینت‌های API، کامپوننت‌های Next.js، انیمیشن‌ها، توکن‌های رنگی یا ساختار فایل‌ها ایجاد می‌کند، **موظف است پیش از اتمام کار و کامیت کردن، هر دو فایل `agents.md` و `claude.md` را فوراً بروزرسانی کند.**
> ۲. **عدم پذیرش کد بدون مستندسازی:** هیچ فیچر، باگ‌فیکس یا تغییری بدون ثبت در بخش «ساختار پروژه» و «تاریخچه تغییرات (Living Changelog)» این دو فایل کامل محسوب نمی‌شود.
> ۳. **همگام‌سازی دوقلو:** محتوای `agents.md` و `claude.md` باید همواره همگام، دقیق و منعکس‌کننده آخرین وضعیت واقعی کدبیس باشند.

---

## ۱. معرفی برند و فلسفه طراحی (Brand & Aesthetic Manifesto)
- **نام برند:** زَروان (`ZARVAN — خانه کیمیاگری ادویه و عطرهای خاکی`)
- **سبک‌های طراحی ترکیبی:**
  1. **Awwwards-Style Editorial Luxury:** گریدبندی دقیق با خطوط مویی (`border-white/10`)، تایپوگرافی دراماتیک فارسی (`Vazirmatn`) در کنار تایپوگرافی کلاسیک لاتین (`Cormorant Garamond`) و کدهای آزمایشگاهی (`JetBrains Mono`).
  2. **Experimental Web & Physics Canvas:** شبیه‌ساز فیزیکی ذرات معلق ادویه (`SpiceParticleCanvas.tsx`) با واکنش به گرداب حرکت موس (Mouse Vortex) و موج انفجاری سایش در هاون (`burstTrigger`).
  3. **Immersive Sensory Design:** تغییر پویا و زنده نور محیطی (Ambient Radial Glow)، رنگ اسطرلاب، نوار پیشرفت اسکرول و فرکانس صوتی Web Audio API بر اساس ادویه انتخاب‌شده توسط کاربر.
  4. **Motion-Driven Design:** نشانگر موس مغناطیسی دوحلقه‌ای (`MagneticCursor.tsx`)، کارت‌های سه‌بعدی حساس به زاویه موس (3D Perspective Tilt)، و ترنزیشن‌های نرم Framer Motion.
  5. **Interactive Storytelling:** روایت چهارپرده‌ای اسکرول‌محور («از معماری خاک تا شیشه‌های ضدِفوتون») با بوم گرافیکی مولد که همگام با اسکرول کاربر تغییر شکل می‌دهد.

---

## ۲. معماری فنی (Full-Stack Architecture)

```text
.
├── agents.md                  # حافظه دائمی پروژه برای تمامی ایجنت‌ها (همیشه بروز نگه داشته شود)
├── claude.md                  # حافظه دائمی پروژه ویژه Claude و دستیارهای کدنویسی (همیشه بروز نگه داشته شود)
├── backend/                   # بک‌اند Django 6.1 + Django REST Framework + CORS
│   ├── manage.py
│   ├── requirements.txt
│   ├── zarvan_api/            # تنظیمات اصلی پروژه جنگو و روتینگ سطح بالا
│   │   ├── settings.py
│   │   └── urls.py
│   └── spices/                # اپلیکیشن اصلی ادویه‌ها، روایت‌ها و آزمایشگاه کیمیاگری
│       ├── models.py          # مدل‌های Spice, StoryChapter, TerroirOrigin, CustomBlendOrder
│       ├── seed_data.py       # دیتای غنی اولیه و تابع خودکار ensure_seeded()
│       ├── serializers.py     # سریالایزرهای DRF
│       ├── views.py           # ویوهای API
│       ├── urls.py            # مسیرهای API
│       └── tests.py           # تست‌های واحد و یکپارچگی API
└── frontend/                  # فرانت‌اند Next.js 15 (App Router) + TypeScript + Tailwind CSS
    ├── package.json
    ├── tailwind.config.ts
    └── src/
        ├── types/spice.ts     # تایپ‌ها و اینترفیس‌های مشترک TypeScript
        ├── lib/fallbackData.ts# کلاینت ارتباط با API جنگو + دیتای پشتیبان بدون وقفه
        ├── app/
        │   ├── globals.css    # توکن‌های رنگی، بافت نویز آنالوگ، انیمیشن‌ها و Reduced Motion
        │   ├── layout.tsx     # فونت‌های Vazirmatn, Cormorant Garamond, JetBrains Mono و جهت RTL
        │   └── page.tsx       # Server Component بارگذاری‌کننده تجربه زَروان
        └── components/
            ├── ZarvanExperienceClient.tsx # ارکستریتور اصلی وضعیت، تم پویا، سبد خرید و ناوبری
            ├── MagneticCursor.tsx         # نشانگر موس مغناطیسی تعاملی
            ├── SpiceParticleCanvas.tsx    # موتور ذرات HTML5 Canvas با فیزیک گردابی و انفجاری
            ├── AmbientSoundVisualizer.tsx # سنتزکننده صدای محیطی کارگاه با Web Audio API
            ├── HeroPortal.tsx             # بخش Hero با اسطرلاب سه‌بعدی ادویه و تله‌متری زنده
            ├── KineticMarquee.tsx         # نوار متحرک تایپوگرافی دوزبانه
            ├── ScrollStorytelling.tsx     # روایت تعاملی ۴ فصلی با صحنه گرافیکی چسبان (Sticky Stage)
            ├── SpiceAtlasSection.tsx      # اطلس ادویه‌ها با فیلتر، کارت‌های 3D و نمودار راداری ۶ محوره
            ├── AlchemyLabSection.tsx      # آزمایشگاه ترکیب ادویه زنده متصل به POST /api/alchemy-blends/
            ├── TerroirMapSection.tsx      # نقشه توپوگرافی تعاملی خاستگاه‌های جغرافیایی
            └── SlideOverCart.tsx          # دراور کشویی سبد خرید شیشه‌های بنفش ضدِفوتون
```

---

## ۳. سیستم طراحی و توکن‌های بصری (Design System Tokens)

| توکن | کد رنگ | کاربرد در رابط کاربری |
|------|--------|------------------------|
| `obsidian` | `#090807` | پس‌زمینه اصلی عمیق برای درخشش رنگ ادویه‌ها |
| `charcoal` | `#13110F` | سطوح کارت‌ها، پنل‌های شیشه‌ای و دراورها |
| `parchment` | `#F6EFE6` | متن‌های اصلی و تیترها با کنتراست بالا (WCAG AAA) |
| `sand` | `#C8BCA9` | متن‌های فرعی، توضیحات و برچسب‌های تله‌متری |
| `saffron` | `#E59819` | زعفران سرگل قاینات (`ZRV-01`) و رنگ تاکیدی طلایی |
| `sumac` | `#9E2A2B` | سماق یاقوتی هوراند (`ZRV-02`) |
| `cardamom` | `#4A7C59` | هل زمردین مالابار (`ZRV-03`) |
| `cinnamon` | `#C86D51` | اکسیر هفت‌اقلیم (`ZRV-06`) |

---

## ۴. مستندات API بک‌اند جنگو (`backend/`)

- `GET /api/health/` — بررسی وضعیت سلامت سرویس بک‌اند.
- `GET /api/experience/` — دریافت یکجای اطلاعات برند، لیست کامل ادویه‌ها (`spices`)، فصل‌های داستانی (`story_chapters`)، خاستگاه‌های جغرافیایی (`terroir_origins`) و آخرین ترکیبات ساخته‌شده (`recent_blends`). (در صورت خالی بودن دیتابیس، به صورت خودکار `ensure_seeded()` را اجرا می‌کند).
- `GET /api/spices/?category=<category>` — دریافت لیست ادویه‌ها با قابلیت فیلتر بر اساس دسته‌بندی (`floral`, `citrus`, `aromatic`, `earthy`, `fiery`, `blend`).
- `GET /api/spices/<slug>/` — دریافت جزئیات کامل یک ادویه.
- `GET / POST /api/alchemy-blends/` — ثبت فرمول ترکیب اختصاصی کاربر از بخش «آزمایشگاه کیمیاگری» و دریافت کد رهگیری (`batch_code` مانند `ZRV-LAB-1001`).

---

## ۵. دستورات اجرا، تست و بیلد (Verification & Run Commands)

### اجرای بک‌اند (Django):
```bash
backend/.venv/bin/python backend/manage.py migrate
backend/.venv/bin/python backend/manage.py test spices
backend/.venv/bin/python backend/manage.py runserver 8000
```

### اجرای فرانت‌اند (Next.js):
```bash
cd frontend
npm run dev     # اجرا روی پورت 3000
npm run build   # بررسی صحت تایپ‌های TypeScript و بیلد پروداکشن
```

---

## ۶. تاریخچه تغییرات زنده (Living Changelog)
- **2026-10-14 (Initial Full-Stack Release):**
  - طراحی و پیاده‌سازی کامل بک‌اند جنگو (`zarvan_api` و اپلیکیشن `spices`) به همراه ۴ مدل اصلی، دیتای اولیه ۶ ادویه شاخص، ۴ فصل داستانی و ۵ خاستگاه جغرافیایی + تست‌های واحد.
  - طراحی و پیاده‌سازی فرانت‌اند Next.js به سبک Awwwards / Experimental / Motion-Driven / Interactive Storytelling شامل بوم فیزیکی ذرات ادویه، نشانگر موس مغناطیسی، سینت‌سایزر صوتی Web Audio، اسطرلاب سه‌بعدی Hero، روایت اسکرول‌محور، اطلس حسی با رادار ۶ محوره، آزمایشگاه ترکیب ادویه و نقشه توپوگرافی خاستگاه‌ها.
  - ایجاد فایل‌های حافظه دائمی `agents.md` و `claude.md` با درج قانون اجباری بروزرسانی مستمر.
