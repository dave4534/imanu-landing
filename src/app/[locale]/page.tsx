import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getContent, getPageImages } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const [content, images] = await Promise.all([
    getContent(locale),
    getPageImages(),
  ]);

  return (
    <AdminShell locale={locale}>
      <Header locale={locale} content={content} />
      <main>
        <HeroSection content={content} locale={locale} images={images} />
        <IntroSection content={content} locale={locale} images={images} />
        <AboutSection content={content} locale={locale} images={images} />
        <ServicesSection content={content} locale={locale} images={images} />
        <TestimonialsSection content={content} locale={locale} />
        <ContactSection content={content} locale={locale} images={images} />
      </main>
    </AdminShell>
  );
}
