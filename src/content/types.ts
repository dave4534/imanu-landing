export type ServiceCardVariant = "yellow" | "pink";

export interface ServiceItem {
  id: string;
  title: string;
  description?: string;
  bullets?: string[];
  cardVariant: ServiceCardVariant;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    services: string;
    instagram: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  intro: {
    title: string;
    subtitle: string;
    instagramCta: string;
    whatsappCta: string;
  };
  about: {
    title: string;
    body: string[];
  };
  services: {
    items: ServiceItem[];
  };
  testimonials: {
    items: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    body: string;
    instagramCta: string;
    whatsappCta: string;
  };
  language: {
    switchTo: string;
  };
}
