import {
  CustomBlendOrder,
  ExperienceBootstrapPayload,
  Spice,
  StoryChapter,
  TerroirOrigin,
} from "@/types/spice";

export const FALLBACK_SPICES: Spice[] = [
  {
    id: 1,
    slug: "qaenat-sargol-saffron",
    code: "ZRV-01",
    name_fa: "زعفران سرگل قاینات",
    name_en: "Qaenat Imperial Sargol Saffron",
    scientific_name: "Crocus sativus L.",
    tagline: "رشته‌های سرخ خورشید، چیده‌شده در گرگ‌ومیش آبان قبل از بیداری آفتاب",
    description:
      "کلاله‌های خالص و تمام‌سرخ زعفران از ارتفاعات ۱۴۴۰ متری قاینات؛ جایی که اختلاف دمای شب و روز کویر، بالاترین غلظت کروسین (رنگ‌دهی) و سافرانال (عطر نافذ) را در دل گلبرگ‌های بنفش متبلور می‌کند.",
    ritual_note:
      "سه رشته را در هاون عقیق بساوید و با دو قطره گلاب ناب کاشان و یک تکه یخ بلورین دم کنید تا طلای مایع آزاد شود.",
    origin_region: "قاینات، خراسان جنوبی",
    origin_coordinates: "33.7267° N, 59.1844° E",
    altitude_meters: 1440,
    harvest_season: "سپیده‌دم آبان — برداشت دستی",
    category: "floral",
    primary_color: "#E59819",
    secondary_color: "#991B1B",
    particle_color: "#FBBF24",
    warmth: 92,
    pungency: 28,
    aroma_intensity: 99,
    earthiness: 64,
    floral_sweetness: 94,
    smokiness: 18,
    aroma_notes: ["عسل کوهی", "یونجه آفتاب‌خورده", "چرم زعفرانی", "شبنم گلبرگ"],
    pairings: [
      "پلو زعفرانی مجلسی",
      "مرغ و بوقلمون بریانی",
      "شربت گلاب و هل",
      "دسرهای خامه‌ای و بستنی سنتی",
    ],
    weight_grams: 10,
    price_toman: 980000,
    limited_batch: 85,
    featured: true,
    order: 1,
  },
  {
    id: 2,
    slug: "horand-crimson-sumac",
    code: "ZRV-02",
    name_fa: "سماق یاقوتی هوراند",
    name_en: "Horand Wild Crimson Sumac",
    scientific_name: "Rhus coriaria",
    tagline: "یاقوت ترش و وحشی جنگل‌های ارسباران، کوبیده‌شده در آسیاب سنگی سرد",
    description:
      "خوشه‌های مخملی سماق کوهی که بر صخره‌های آفتاب‌گیر هوراند در قره‌داغ می‌رویند. بدون ذره‌ای نمک افزوده یا رنگ مصنوعی، با ترشی میوه‌ای عمیق و تانن ابریشمی که کام را بیدار می‌کند.",
    ritual_note:
      "در لحظه آخرِ سرو روی کباب داغ، ماهی کبابی یا سالاد انار و گردو بپاشید تا بخار غذا اسانس‌های مرکباتی آن را در فضا پخش کند.",
    origin_region: "هوراند، ارسباران (آذربایجان)",
    origin_coordinates: "38.8631° N, 47.3636° E",
    altitude_meters: 1680,
    harvest_season: "شهریور — خشک‌شده در باد کوهستان",
    category: "citrus",
    primary_color: "#9E2A2B",
    secondary_color: "#540B0E",
    particle_color: "#E11D48",
    warmth: 42,
    pungency: 58,
    aroma_intensity: 86,
    earthiness: 74,
    floral_sweetness: 48,
    smokiness: 35,
    aroma_notes: ["آلبالوی وحشی خشک", "پوست انار", "چوب بلوط", "ترشی مرکبات"],
    pairings: [
      "کباب برگ و کوبیده",
      "ماهی قزل‌آلای زغالی",
      "سالاد فتوش و انار",
      "مرغ ترش شمال",
    ],
    weight_grams: 65,
    price_toman: 420000,
    limited_batch: 140,
    featured: true,
    order: 2,
  },
  {
    id: 3,
    slug: "malabar-emerald-cardamom",
    code: "ZRV-03",
    name_fa: "هل زمردین باران‌های مالابار",
    name_en: "Malabar Monsoon Emerald Cardamom",
    scientific_name: "Elettaria cardamomum",
    tagline: "غلاف‌های درشت هشت‌میلی‌متری سرشار از روغن‌های فرّار اکالیپتوسی و بهارنارنج",
    description:
      "برگزیده‌ترین غلاف‌های سبز تیره از جنگل‌های مه‌آلود گهات غربی که بلافاصله پس از برداشت در اتاق‌های چوبی با دمای کنترل‌شده خشک شده‌اند تا رنگ زمردین و دانه‌های سیاه چسبنده و معطر درونشان دست‌نخورده بماند.",
    ritual_note:
      "هر غلاف را تنها ۵ ثانیه پیش از دم‌کردن با پشت کارد کمی بفشارید تا شکافته شود؛ هرگز از پیش آسیاب نکنید.",
    origin_region: "کوهستان کارداموم، مالابار",
    origin_coordinates: "9.8540° N, 77.1570° E",
    altitude_meters: 1150,
    harvest_season: "مهر و آبان — پس از باران‌های موسمی",
    category: "aromatic",
    primary_color: "#4A7C59",
    secondary_color: "#1E3A2F",
    particle_color: "#34D399",
    warmth: 84,
    pungency: 62,
    aroma_intensity: 98,
    earthiness: 45,
    floral_sweetness: 89,
    smokiness: 22,
    aroma_notes: ["برگ لیمو", "کافور لطیف", "شهد شکوفه سفید", "صمغ کاج"],
    pairings: [
      "چای اصیل ایرانی و قهوه عربی",
      "باقلوا و شیرینی‌های سنتی",
      "خورش فسنجان و قیمه نثار",
      "شیربرنج زعفرانی",
    ],
    weight_grams: 45,
    price_toman: 640000,
    limited_batch: 110,
    featured: true,
    order: 3,
  },
  {
    id: 4,
    slug: "shahdad-black-caraway",
    code: "ZRV-04",
    name_fa: "زیره سیاه کوهپایه شهداد",
    name_en: "Shahdad Wild Mountain Black Caraway",
    scientific_name: "Bunium persicum",
    tagline: "عطر صمغ و خاک باران‌خورده کوهستان‌های کرمان در دانه‌های باریک خودرو",
    description:
      "زیره سیاه وحشی که بدون دخالت دست انسان بر دامنه‌های صخره‌ای مشرف به کویر لوت می‌روید. ریشه‌های عمیق آن در خاک معدنی، عطری دودی، کاجی و بی‌نهایت پیچیده ایجاد می‌کند که هیچ زیره پرورشی یارای برابری با آن را ندارد.",
    ritual_note:
      "دانه‌ها را ۱۰ ثانیه در تابه چدنی خشک تفت دهید تا صدای ترق‌تروق ظریفشان بلند شود، سپس میان دو کف دست بسایید.",
    origin_region: "ارتفاعات شهداد و بافت، کرمان",
    origin_coordinates: "30.4189° N, 57.7069° E",
    altitude_meters: 2250,
    harvest_season: "خرداد — چالش صخره‌نوردان بومی",
    category: "earthy",
    primary_color: "#A16207",
    secondary_color: "#422006",
    particle_color: "#F59E0B",
    warmth: 90,
    pungency: 74,
    aroma_intensity: 94,
    earthiness: 96,
    floral_sweetness: 34,
    smokiness: 78,
    aroma_notes: ["صمغ سرو کوهی", "خاک باران‌خورده", "رازیانه برشته", "پوست گردو"],
    pairings: [
      "زیره‌پلو کرمانی",
      "نان‌های خمیرترش دست‌ساز",
      "خوراک گوشت و بره",
      "ماست چکیده و خیار",
    ],
    weight_grams: 55,
    price_toman: 560000,
    limited_batch: 95,
    featured: true,
    order: 4,
  },
  {
    id: 5,
    slug: "tellicherry-smoked-pepper",
    code: "ZRV-05",
    name_fa: "فلفل سیاه دودی تلیچری",
    name_en: "Tellicherry Late-Harvest Smoked Pepper",
    scientific_name: "Piper nigrum (TGSEB)",
    tagline: "درشت‌ترین دانه‌های فلفل رسیده بر ساقه، دوداندود شده با چوب درخت انبه",
    description:
      "تنها ۱۰ درصد از محصول فلفل تلیچری اجازه می‌یابند تا آستانه سرخ‌شدن روی تاک باقی بمانند. نتیجه، دانه‌هایی غول‌پیکر با نت‌های مرکباتی، توت سیاه و حرارتی عمیق و لایه‌لایه است که با دود سرد چوب معطر تکمیل شده است.",
    ritual_note:
      "با آسیاب دندانه درشت (Coarse Crack) مستقیماً روی استیک، پاستا یا تخم‌مرغ نیمرو بپاشید تا بافت ترد دانه‌ها زیر دندان حس شود.",
    origin_region: "تلیچری، ساحل مالابار",
    origin_coordinates: "11.7480° N, 75.4929° E",
    altitude_meters: 920,
    harvest_season: "بهمن — برداشت دیرهنگام (Late Harvest)",
    category: "fiery",
    primary_color: "#D97706",
    secondary_color: "#27272A",
    particle_color: "#FB923C",
    warmth: 96,
    pungency: 95,
    aroma_intensity: 91,
    earthiness: 82,
    floral_sweetness: 40,
    smokiness: 88,
    aroma_notes: ["دود چوب شیرین", "پوست ترنج", "توت سیاه وحشی", "حرارت پیپرین"],
    pairings: [
      "استیک ریب‌آی و فیله گوساله",
      "سس‌های خامه و قارچ ترافل",
      "خورش قورمه‌سبزی",
      "پنیرهای کهنه",
    ],
    weight_grams: 60,
    price_toman: 490000,
    limited_batch: 130,
    featured: true,
    order: 5,
  },
  {
    id: 6,
    slug: "persian-silk-advieh-no7",
    code: "ZRV-06",
    name_fa: "اکسیر هفت‌اقلیم (ادویه سلطنتی زَروان)",
    name_en: "Zarvan Royal Advieh No. 07",
    scientific_name: "Artisanal Botanical Assemblage",
    tagline: "هم‌نوازی غنچه گل محمدی کاشان، دارچین سیلان، هل سبز، جوز هندی و زعفران",
    description:
      "بازآفرینی نسخه خطی مطبخ صفوی با دقت آزمایشگاهی؛ یازده ادویه و گلبرگ معطر که به نسبت طلایی با یکدیگر در هاون سنگی سرد کوبیده شده‌اند تا عطری شاعرانه، گرم و مخملی به غذاهای اصیل ایرانی ببخشند.",
    ritual_note:
      "نصف قاشق چای‌خوری را لابه‌لای لایه‌های برنج دم‌کشیده یا در دقایق پایانی پخت خورش اضافه کنید تا عطر گلبرگ‌ها نسوزد.",
    origin_region: "ترکیب دست‌ساز کارگاه زَروان (کاشان، قاینات، سیلان)",
    origin_coordinates: "33.9850° N, 51.4100° E",
    altitude_meters: 1500,
    harvest_season: "تولید هفتگی در بچ‌های ۴۰ شیشه‌ای",
    category: "blend",
    primary_color: "#C86D51",
    secondary_color: "#7C2D12",
    particle_color: "#F472B6",
    warmth: 88,
    pungency: 52,
    aroma_intensity: 97,
    earthiness: 70,
    floral_sweetness: 91,
    smokiness: 44,
    aroma_notes: [
      "غنچه گل محمدی",
      "پوست دارچین سیلان",
      "جوز هندی تازه",
      "زعفران و پسته کوهی",
    ],
    pairings: [
      "مرصع‌پلو و شیرین‌پلو",
      "قیمه نثار قزوین",
      "کوفته تبریزی",
      "حلیم و خوراک گردن",
    ],
    weight_grams: 55,
    price_toman: 590000,
    limited_batch: 40,
    featured: true,
    order: 6,
  },
];

export const FALLBACK_CHAPTERS: StoryChapter[] = [
  {
    chapter_number: 1,
    roman_numeral: "I",
    title_fa: "معماری خاک و اقلیم",
    title_en: "THE ARCHITECTURE OF TERROIR",
    subtitle: "هر دانه ادویه، حافظه فشرده‌ای از آفتاب، ارتفاع و بادهای کوهستان است",
    narrative:
      "ما ادویه را از بازارهای عمده نمی‌خریم؛ ما به دنبال تک‌باغ‌ها و صخره‌های دورأفتاده می‌رویم. از دشت‌های سردسیر قاینات در ارتفاع ۱۴۴۰ متری تا جنگل‌های سنگی هوراند، هر اقلیم امضای شیمیایی منحصربه‌فردی از اسانس‌های فرّار را در دل گیاه ثبت می‌کند.",
    sensory_quote: "«خاک فقیر و آفتاب بی‌رحم، معطرترین ادویه‌های جهان را می‌زاید.»",
    location_badge: "33.7267° N — فلات ایران تا ساحل مالابار",
    ambient_color: "#E59819",
    accent_color: "#FDE68A",
    metric_label: "ارتفاع مزارع منتخب",
    metric_value: "+۱,۴۰۰ تا ۲,۲۵۰ متر",
  },
  {
    chapter_number: 2,
    roman_numeral: "II",
    title_fa: "آیین چیدن در گرگ‌ومیش",
    title_en: "THE DAWN HARVEST RITUAL",
    subtitle: "برداشت دستی پیش از آنکه تابش خورشید مولکول‌های عطر را تبخیر کند",
    narrative:
      "در ساعت ۴:۴۰ بامداد، زمانی که شبنم صبحگاهی هنوز روی گلبرگ‌های بنفش زعفران و غلاف‌های سبز هل نشسته است، برداشت آغاز می‌شود. تنها ۳ ساعت طلایی فرصت هست تا غنچه‌ها پیش از باز شدن کامل و فرارِ سافرانال چیده شوند.",
    sensory_quote:
      "«عطر واقعی در فاصله میان تاریکی شب و اولین پرتو خورشید شکار می‌شود.»",
    location_badge: "04:40 AM — پنجره طلایی برداشت",
    ambient_color: "#9E2A2B",
    accent_color: "#FDA4AF",
    metric_label: "حفظ اسانس‌های فرّار",
    metric_value: "۹۸.۴٪ خلوص آزمایشگاهی",
  },
  {
    chapter_number: 3,
    roman_numeral: "III",
    title_fa: "آسیاب سنگی سرد و آهسته",
    title_en: "COLD STONE ALCHEMY",
    subtitle: "دورِ کندِ سنگ‌های گرانیت برای جلوگیری از سوختن روغن‌های معطر",
    narrative:
      "آسیاب‌های صنعتی با چرخش هزاران دور در دقیقه، دمای ادویه را تا ۸۰ درجه بالا برده و روح معطر آن را می‌سوزانند. در کارگاه زَروان، سنگ‌های سیاه در دمای زیر ۲۴ درجه سانتی‌گراد با ریتمی آرام می‌چرخند تا بافت مخملی و تمام روغن‌های طبیعی گیاه حفظ شود.",
    sensory_quote:
      "«شتاب، دشمن عطر است؛ سنگ سرد، رازهای دانه را بدون زخم‌زدن باز می‌کند.»",
    location_badge: "22°C MAX — کارگاه آسیاب سرد زَروان",
    ambient_color: "#4A7C59",
    accent_color: "#A7F3D0",
    metric_label: "حداکثر دمای سایش",
    metric_value: "۲۲ درجه سانتی‌گراد",
  },
  {
    chapter_number: 4,
    roman_numeral: "IV",
    title_fa: "شیشه‌های بنفش ضدِفوتون",
    title_en: "BIOPHOTONIC PRESERVATION",
    subtitle:
      "بسته‌بندی در شیشه‌های تیره محافظ نور با مهروموم موم طبیعی و شماره بچ دست‌نویس",
    narrative:
      "نور مرئی و اکسیژن در عرض چند هفته ادویه معمولی را به گردی بی‌جان تبدیل می‌کنند. هر شیشه زَروان تنها ۴۸ ساعت پیش از ارسال پر شده، با گاز نیتروژن خالص از اکسیژن تهی گشته و با کد رهگیری مزرعه و تاریخ دقیق کوبش مهروموم می‌شود.",
    sensory_quote:
      "«وقتی درِ شیشه را باز می‌کنید، همان هوایی را نفس می‌کشید که روز برداشت در مزرعه جریان داشت.»",
    location_badge: "BATCH #042 — مهروموم موم و نیتروژن",
    ambient_color: "#C86D51",
    accent_color: "#FED7AA",
    metric_label: "فاصله آسیاب تا ارسال",
    metric_value: "کمتر از ۴۸ ساعت",
  },
];

export const FALLBACK_ORIGINS: TerroirOrigin[] = [
  {
    code: "TR-01",
    name_fa: "فلات قاینات (خراسان جنوبی)",
    name_en: "Qaenat High Plateau",
    coordinates: "33.7267° N, 59.1844° E",
    climate: "نیمه‌صحرایی مرتفع با شب‌های یخبندان پاییزی",
    soil_type: "لوم شنی غنی از آهک و کانی‌های رسی",
    signature_spice: "زعفران سرگل امپریال",
    description:
      "اختلاف دمای ۲۲ درجه‌ای میان شب و روز در آبان‌ماه، گیاه زعفران را وادار به تولید متراکم‌ترین کروسین و پیکروکروسین در جهان می‌کند.",
    color: "#E59819",
    map_x: 68.0,
    map_y: 42.0,
  },
  {
    code: "TR-02",
    name_fa: "جنگل‌های صخره‌ای هوراند (ارسباران)",
    name_en: "Horand Arasbaran Cliffs",
    coordinates: "38.8631° N, 47.3636° E",
    climate: "کوهستانی مرطوب با بادهای خنک قفقاز",
    soil_type: "سنگلاخی آذرین و غنی از آهن",
    signature_spice: "سماق یاقوتی وحشی",
    description:
      "درختچه‌های سماق خودرو بر شیب‌های تند سنگی رشد می‌کنند که نور خورشید و مه صبحگاهی جنگل، اسید مالیک طبیعی و رنگ سرخ یاقوتی بی‌نظیری به آن می‌بخشد.",
    color: "#9E2A2B",
    map_x: 32.0,
    map_y: 22.0,
  },
  {
    code: "TR-03",
    name_fa: "کوهپایه‌های شهداد و لوت (کرمان)",
    name_en: "Shahdad & Lut Foothills",
    coordinates: "30.4189° N, 57.7069° E",
    climate: "مرز کوهستان برفی و گرم‌ترین کویر زمین",
    soil_type: "آبرفتی معدنی با شوری بسیار ملایم",
    signature_spice: "زیره سیاه کوهی خودرو",
    description:
      "جایی که بادهای گرم کویر لوت به دیواره‌های سرد کوه پلوار برخورد می‌کنند، زیره سیاه وحشی با عطری نافذ و صمغی از دل شکاف سنگ‌ها سر برمی‌آورد.",
    color: "#A16207",
    map_x: 62.0,
    map_y: 64.0,
  },
  {
    code: "TR-04",
    name_fa: "باغ‌های قمصر و نیاسر (کاشان)",
    name_en: "Qamsar Terraced Rose Valleys",
    coordinates: "33.7617° N, 51.4408° E",
    climate: "دره‌های کوهستانی معتدل با بهارهای شبنم‌خیز",
    soil_type: "خاک سبک کوهپایه‌ای با زهکشی طبیعی",
    signature_spice: "غنچه گل محمدی و اکسیر هفت‌اقلیم",
    description:
      "تراس‌های پلکانی گل محمدی در ارتفاعات کرکس که پایه گلی و اشرافی ترکیبات دست‌ساز زَروان را تشکیل می‌دهند.",
    color: "#C86D51",
    map_x: 46.0,
    map_y: 46.0,
  },
  {
    code: "TR-05",
    name_fa: "ارتفاعات مه‌آلود مالابار (گهات غربی)",
    name_en: "Malabar Monsoon Highlands",
    coordinates: "9.8540° N, 77.1570° E",
    climate: "استوایی مرتفع با باران‌های موسمی سنگین",
    soil_type: "لاتریت جنگلی سرشار از هوموس",
    signature_spice: "هل زمردین و فلفل سیاه تلیچری",
    description:
      "موطن تاریخی ادویه‌های شرقی که از طریق جاده ابریشم و بندر سیراف به مطبخ‌های ایرانی راه یافتند؛ با بالاترین درصد روغن‌های ارگانیک.",
    color: "#4A7C59",
    map_x: 82.0,
    map_y: 82.0,
  },
];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8005/api";

export async function fetchExperienceBootstrap(): Promise<{
  data: ExperienceBootstrapPayload;
  isLiveApi: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE}/experience/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API status not OK");
    const data = (await res.json()) as ExperienceBootstrapPayload;
    return { data, isLiveApi: true };
  } catch {
    return {
      isLiveApi: false,
      data: {
        brand: {
          name_fa: "زَروان",
          name_en: "ZARVAN",
          Philosophy: "کیمیاگری عطر، خاک و زمان",
          edition: "HARVEST ARCHIVE // 1405 — 2026",
        },
        spices: FALLBACK_SPICES,
        story_chapters: FALLBACK_CHAPTERS,
        terroir_origins: FALLBACK_ORIGINS,
        recent_blends: [],
      },
    };
  }
}

export async function submitCustomAlchemyBlend(
  order: CustomBlendOrder
): Promise<{
  batch_code: string;
  message: string;
  savedOnServer: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE}/alchemy-blends/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error("Failed to post blend");
    const data = await res.json();
    return {
      batch_code: data.batch_code || `ZRV-LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      message: data.message || "ترکیب اختصاصی شما در سرور جنگو ثبت شد.",
      savedOnServer: true,
    };
  } catch {
    return {
      batch_code: `ZRV-LAB-${Math.floor(1000 + Math.random() * 9000)}`,
      message:
        "فرمول ترکیب اختصاصی شما در حافظه آزمایشگاه زَروان مهروموم شد.",
      savedOnServer: false,
    };
  }
}

export function formatPersianPrice(toman: number): string {
  return new Intl.NumberFormat("fa-IR").format(toman);
}

export function toPersianDigits(val: number | string): string {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(val).replace(/\d/g, (d) => persian[Number(d)]);
}
