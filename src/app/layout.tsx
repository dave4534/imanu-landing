import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { LocaleHtmlAttributes } from "@/components/LocaleHtmlAttributes";
import { ThemeStyles } from "@/components/ThemeStyles";
import { defaultLocale } from "@/lib/i18n";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin", "hebrew"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "עימנו — חוויות יין",
  description: "סדנאות יין, הדרכות וטעימות מותאמות אישית.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={defaultLocale}
      suppressHydrationWarning
      className={`${googleSans.variable} h-full antialiased`}
    >
      <head>
        <ThemeStyles />
      </head>
      <body className="min-h-full font-sans">
        <LocaleHtmlAttributes />
        {children}
      </body>
    </html>
  );
}
