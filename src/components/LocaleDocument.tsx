import { getDirection, type Locale } from "@/lib/i18n";

/** Sets html lang/dir before paint to match the active locale route */
export function LocaleDocument({ locale }: { locale: Locale }) {
  const dir = getDirection(locale);
  return (
    <script
      // Runs synchronously when parsed — sets dir before content renders
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang='${locale}';document.documentElement.dir='${dir}';`,
      }}
    />
  );
}
