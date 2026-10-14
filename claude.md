# CLAUDE.md — حافظه دائمی و راهنمای هوشمند پروژه زَروان (ZARVAN Living Memory)

> **⚠️ اصل بنیادین و اجباری بروز بودن همیشگی (STRICT ALWAYS-UP-TO-DATE MANDATE):**
> این فایل (`claude.md`) و فایل همزاد آن (`agents.md`) به عنوان **حافظه دائمی پروژه زَروان (ZARVAN Artisanal Spice House)** عمل می‌کنند.
> - **قانون طلایی:** هر زمان که تغییری در کدهای بک‌اند (Django)، فرانت‌اند (Next.js)، مدل‌های دیتابیس، انیمیشن‌ها، استایل‌ها یا ساختار پوشه‌ها اعمال می‌کنید، **باید بلافاصله و پیش از انجام `git commit`، هر دو فایل `claude.md` و `agents.md` را متناسب با تغییرات جدید بروزرسانی کنید.**
> - هرگز اجازه ندهید مستندات این دو فایل از وضعیت واقعی کدبیس عقب بمانند.

---

## ۱. خلاصه اجرایی پروژه (Executive Summary)
پروژه **زَروان (ZARVAN)** یک وب‌سایت فول‌استک تعاملی و چندحسی (Multi-Sensory Experience) برای برند لوکس و دست‌ساز ادویه است که با ترکیب سبک‌های:
- **Awwwards-Style High Craft**
- **Experimental Web (HTML5 Particle Physics & Procedural Web Audio)**
- **Immersive Design (Dynamic Ambient Color & Terroir Telemetry)**
- **Motion-Driven Design (3D Tilt Specimen Cards, Magnetic Cursor, Scroll Progress)**
- **Interactive Storytelling (4-Act Scroll-Driven Botanical Narrative)**

توسط **Django 6.1 (REST Framework)** در بک‌اند و **Next.js 15 (App Router + TypeScript + Tailwind CSS + Framer Motion)** در فرانت‌اند پیاده‌سازی شده است.

---

## ۲. نقشه ماژول‌ها و کامپوننت‌های کلیدی

### الف) بک‌اند (`backend/`)
- **`zarvan_api/settings.py`**: پیکربندی `rest_framework`، `corsheaders` و اپلیکیشن `spices`.
- **`spices/models.py`**:
  - `Spice`: نگهداری اطلاعات کامل ادویه شامل نام فارسی/انگلیسی/علمی، مختصات و ارتفاع رویشگاه، پالت رنگی سه‌گانه (`primary_color`, `secondary_color`, `particle_color`) و ۶ شاخص رادار حسی (`warmth`, `pungency`, `aroma_intensity`, `earthiness`, `floral_sweetness`, `smokiness`).
  - `StoryChapter`: فصل‌های چهارگانه روایت «از خاک تا عطر».
  - `TerroirOrigin`: داده‌های توپوگرافی، خاک، اقلیم و مختصات نقشه خاستگاه‌ها.
  - `CustomBlendOrder`: ذخیره ترکیبات دست‌ساز کاربران در آزمایشگاه کیمیاگری.
- **`spices/seed_data.py`**: شامل دیتای کامل اولیه و تابع `ensure_seeded()` که تضمین می‌کند دیتابیس همیشه پر و آماده پاسخگویی است.

### ب) فرانت‌اند (`frontend/src/`)
- **`components/ZarvanExperienceClient.tsx`**: مدیریت وضعیت سراسری ادویه فعال (`activeSpice`)، همگام‌سازی رنگ‌های محیطی، اتصال زنده به API جنگو و مدیریت سبد خرید.
- **`components/SpiceParticleCanvas.tsx`**: شبیه‌سازی ذرات زعفران، بلورهای سماق و گرده‌های معطر در بوم HTML5 با واکنش به حرکت موس و موج انفجاری (`burstTrigger`).
- **`components/HeroPortal.tsx`**: ویترین تعاملی اول صفحه با اسطرلاب هندسی چرخان، کارت‌های تله‌متری و داک انتخاب سریع ادویه.
- **`components/ScrollStorytelling.tsx`**: روایت اسکرول‌محور چهار مرحله‌ای با تصویرسازی برداری پویا برای هر فصل.
- **`components/SpiceAtlasSection.tsx`**: اطلس ادویه‌ها با فیلتر دسته‌بندی، کارت‌های سه‌بعدی و **رادار شش‌ضلعی مقایسه پروفایل بویایی دو ادویه**.
- **`components/AlchemyLabSection.tsx`**: آزمایشگاه ترکیب ادویه با اسلایدرهای درصدی، شیشه لایه‌لایه زنده (Live Stratified Vessel SVG)، حکاکی نام روی شیشه و ثبت مستقیم در بک‌اند جنگو (`POST /api/alchemy-blends/`).
- **`components/TerroirMapSection.tsx`**: نقشه تعاملی خاستگاه‌ها با خطوط پروازی و پرونده اقلیمی هر منطقه.
- **`components/AmbientSoundVisualizer.tsx`**: تولیدکننده صدای محیطی کارگاه ادویه با استفاده از Web Audio API بدون نیاز به فایل صوتی خارجی.

---

## ۳. استانداردهای کیفیت و دسترس‌پذیری (UX & Accessibility Guardrails)
1. **پشتیبانی کامل از `prefers-reduced-motion`**: تمامی انیمیشن‌های چرخشی، مارکی‌ها و حرکت ذرات در صورت فعال بودن گزینه کاهش حرکت سیستم‌عامل متوقف یا ساده می‌شوند.
2. **رعایت کنتراست نوری**: متن‌های اصلی (`#F6EFE6`) روی پس‌زمینه ذغالی (`#090807`) کنتراست بالای ۱۵:۱ دارند.
3. **Resilient API Fallback**: فرانت‌اند ابتدا به `http://127.0.0.1:8005/api/experience/` متصل می‌شود و در صورت خاموش بودن سرور جنگو، بدون هیچ خطایی با دیتای کامل داخلی (`fallbackData.ts`) کار می‌کند.

---

## ۴. چک‌لیست اجباری پیش از هر Commit
1. اجرای تست‌های بک‌اند:
   `backend/.venv/bin/python backend/manage.py test spices`
2. اجرای بیلد فرانت‌اند:
   `npm --prefix frontend run build`
3. **بروزرسانی هر دو فایل `claude.md` و `agents.md`** در صورت تغییر در کدها یا فیچرها.

---

## ۵. لاگ آخرین وضعیت پروژه (Status Log)
- **آخرین بروزرسانی:** ۱۴ اکتبر ۲۰۲۶ (بروزرسانی پورت `8005`، افزودن `icon.svg` و پاس شدن کامل تست‌های E2E مرورگر).
- **وضعیت بک‌اند:** سالم و در حال اجرا روی `http://127.0.0.1:8005` — ۳ تست واحد پاس شده (`OK`).
- **وضعیت فرانت‌اند:** سالم و در حال اجرا روی `http://localhost:3000` — تست‌های مرورگر واقعی (Playwright Chrome) با ۰ خطای کنسول پاس شده‌اند.
