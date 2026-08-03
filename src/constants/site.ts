/* ============================================================
   Site-wide constants — branding, navigation, contact
   ============================================================ */

export const SITE = {
  name: 'Westbridge',
  suffix: 'Demolition',
  tagline: 'Demolición comercial en el sur de Florida',
  established: 2003,
  yearsOfExperience: 22,
  description:
    'Contratista de demolición comercial con más de 20 años de experiencia en el sur de Florida.',
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Por qué Westbridge', to: '/por-que-westbridge' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Seguridad y Certificaciones', to: '/seguridad' },
  { label: 'Contacto', to: '/contacto' },
] as const;

export const CONTACT = {
  phone: '(305) 555-0148',
  phoneHref: 'tel:+13055550148',
  email: 'estimates@westbridge-demo.com',
  address: '2450 NW 72nd Ave, Miami, FL 33122',
  serviceArea: 'Miami · Fort Lauderdale · West Palm Beach',
  hours: 'Lun – Vie · 7:00 AM – 5:00 PM',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Miami%2C%20FL&t=&z=11&ie=UTF8&iwloc=&output=embed',
} as const;

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com',
    icon: 'youtube',
  },
] as const;

export const FORM_MAX_LENGTH = {
  name: 120,
  email: 120,
  phone: 30,
  message: 2000,
} as const;
