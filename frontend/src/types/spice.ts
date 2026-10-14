export type SpiceCategory =
  | "floral"
  | "fiery"
  | "earthy"
  | "citrus"
  | "aromatic"
  | "blend";

export interface Spice {
  id: number;
  slug: string;
  code: string;
  name_fa: string;
  name_en: string;
  scientific_name: string;
  tagline: string;
  description: string;
  ritual_note: string;
  origin_region: string;
  origin_coordinates: string;
  altitude_meters: number;
  harvest_season: string;
  category: SpiceCategory;
  primary_color: string;
  secondary_color: string;
  particle_color: string;
  warmth: number;
  pungency: number;
  aroma_intensity: number;
  earthiness: number;
  floral_sweetness: number;
  smokiness: number;
  aroma_notes: string[];
  pairings: string[];
  weight_grams: number;
  price_toman: number;
  limited_batch: number;
  featured: boolean;
  order: number;
}

export interface StoryChapter {
  id?: number;
  chapter_number: number;
  roman_numeral: string;
  title_fa: string;
  title_en: string;
  subtitle: string;
  narrative: string;
  sensory_quote: string;
  location_badge: string;
  ambient_color: string;
  accent_color: string;
  metric_label: string;
  metric_value: string;
}

export interface TerroirOrigin {
  id?: number;
  code: string;
  name_fa: string;
  name_en: string;
  coordinates: string;
  climate: string;
  soil_type: string;
  signature_spice: string;
  description: string;
  color: string;
  map_x: number;
  map_y: number;
}

export interface CustomBlendComponent {
  spice_slug: string;
  name_fa: string;
  percentage: number;
  color?: string;
}

export interface SensoryProfile {
  warmth: number;
  pungency: number;
  aroma_intensity: number;
  earthiness: number;
  floral_sweetness: number;
  smokiness: number;
}

export interface CustomBlendOrder {
  id?: number;
  blend_name: string;
  creator_name: string;
  customer_contact?: string;
  grind_type: "whole" | "coarse" | "stone_ground" | "silk_powder";
  components: CustomBlendComponent[];
  dominant_color: string;
  sensory_profile: SensoryProfile;
  notes?: string;
  created_at?: string;
}

export interface ExperienceBootstrapPayload {
  brand: {
    name_fa: string;
    name_en: string;
    Philosophy: string;
    edition: string;
  };
  spices: Spice[];
  story_chapters: StoryChapter[];
  terroir_origins: TerroirOrigin[];
  recent_blends: CustomBlendOrder[];
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  color: string;
  price_toman: number;
  weight_grams: number;
  quantity: number;
  isCustomBlend?: boolean;
}
