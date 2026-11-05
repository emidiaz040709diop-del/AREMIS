export type OlfactoryFamily =
  | 'Oriental Gourmand'
  | 'Amaderado Especiado'
  | 'Aromático Fougère'
  | 'Cítrico Verde'
  | 'Floral Sensual';

export type BrandName = 'Jean Paul Gaultier' | 'Hugo Boss';

export type Concentration =
  | 'Eau de Toilette'
  | 'Eau de Toilette Intense'
  | 'Eau de Parfum'
  | 'Eau de Parfum Intense'
  | 'Parfum'
  | 'Parfum Intense'
  | 'Le Parfum';

export interface OlfactoryPyramid {
  top: string[];    // Salida (0 - 15 min)
  heart: string[];  // Corazón (15 min - 4h)
  base: string[];   // Fondo (4h - 12h+)
}

export interface FragrancePerformance {
  longevityHours: number;
  sillage: 'Íntima' | 'Moderada' | 'Alta' | 'Modo Bestia / Envolvente';
  versatilityScore: number; // 1-10
}

export interface Fragrance {
  id: string;
  brand: BrandName;
  name: string;
  subtitle: string;
  concentration: Concentration;
  year: number;
  gender: 'Masculino' | 'Femenino' | 'Unisex';
  olfactoryFamily: OlfactoryFamily;
  price: number;
  originalPrice?: number;
  sizes: { ml: number; price: number }[];
  rating: number;
  reviewsCount: number;
  bottleConcept: string;
  season: ('Primavera' | 'Verano' | 'Otoño' | 'Invierno')[];
  timeOfDay: 'Día' | 'Noche' | 'Versátil';
  occasion: ('Trabajo / Oficina' | 'Noche / Citas' | 'Diario / Casual' | 'Gala / Eventos')[];
  dominantNotes: string[];
  pyramid: OlfactoryPyramid;
  performance: FragrancePerformance;
  description: string;
  image: string;
  accentColor: string; // Tailwind color class or hex
}

export interface Article {
  id: string;
  title: string;
  category: 'Guía Técnica' | 'Historia de Diseño' | 'Maestría en Notas' | 'Consejos de Experto';
  readingTime: string;
  author: string;
  date: string;
  summary: string;
  content: string[];
  badgeColor: string;
}

export interface CartItem {
  fragrance: Fragrance;
  selectedSize: number;
  price: number;
  quantity: number;
}
