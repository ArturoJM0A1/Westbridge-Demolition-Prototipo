/* ============================================================
   Domain types — mirror the shape of the future REST API
   ============================================================ */

export interface MediaAsset {
  /** Alt text for accessibility */
  alt: string;
  /** Localized source. Replace with remote URL when the API lands. */
  src: string;
  width?: number;
  height?: number;
}

export interface Statistic {
  id: string;
  /** Numeric value used when rendering the counter */
  value: number;
  /** Formatting suffix: '+', '%', 'M', 'K', '' */
  suffix: string;
  label: string;
  detail?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: MediaAsset;
  icon: string;
  benefits: string[];
  scope: string[];
  results: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  location: string;
  client: string;
  year: string;
  duration: string;
  image: MediaAsset;
  gallery: MediaAsset[];
  summary: string;
  description: string;
  scope: string[];
  results: string[];
  size: string;
  budget: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  icon: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SafetyStatistic {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  serviceArea: string;
  hours: string;
  mapEmbedUrl: string;
}
