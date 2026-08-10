import { notFound } from "next/navigation";
import { LocaleDocument } from "@/components/LocaleDocument";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getContent(locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;

  return (
    <>
      <LocaleDocument locale={locale} />
      {children}
    </>
  );
}
