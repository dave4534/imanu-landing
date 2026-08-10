import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { MobileNav } from "@/components/layout/MobileNav";

interface HeaderProps {
  locale: Locale;
  content: SiteContent;
}

const navLinkClass =
  "whitespace-nowrap transition-opacity hover:opacity-70 shrink-0";

export function Header({ locale, content }: HeaderProps) {
  const gap = figma.header.navGap;

  return (
    <header className="sticky top-0 z-50 bg-section-hero backdrop-blur-sm md:bg-section-hero/95">
      <div
        className={`${containerClass} layout-ltr px-6 py-1 lg:px-10`}
        style={{ minHeight: figma.header.logo.height + 20 }}
      >
        {/* Mobile: hamburger + centered logo */}
        <div
          className="relative z-50 grid grid-cols-[2.5rem_1fr_2.5rem] items-center bg-section-hero md:hidden"
          style={{ minHeight: figma.header.logo.height + 20 }}
        >
          <MobileNav locale={locale} content={content} />
          <Link
            href={`/${locale}`}
            aria-label={siteConfig.siteName}
            className="flex justify-center"
          >
            <Image
              src="/icons/Logo.svg"
              alt="Imanu"
              width={figma.header.logo.width}
              height={figma.header.logo.height}
              priority
              className="h-auto w-[95px]"
            />
          </Link>
          <div aria-hidden="true" />
        </div>

        {/* Desktop: 60px from logo, 60px between items */}
        <div
          className="hidden w-full items-center justify-center md:flex"
          style={{
            minHeight: figma.header.logo.height + 20,
            gap,
          }}
        >
          <nav
            className="flex items-center"
            style={{ fontSize: figma.header.fontSize, gap }}
          >
            <a href="#contact" className={navLinkClass}>
              {content.nav.contact}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              {content.nav.instagram}
            </a>
          </nav>

          <Link href={`/${locale}`} aria-label={siteConfig.siteName}>
            <Image
              src="/icons/Logo.svg"
              alt="Imanu"
              width={figma.header.logo.width}
              height={figma.header.logo.height}
              priority
              className="h-auto w-[95px] shrink-0"
            />
          </Link>

          <nav
            className="flex items-center"
            style={{ fontSize: figma.header.fontSize, gap }}
          >
            <a href="#services" className={navLinkClass}>
              {content.nav.services}
            </a>
            <a href="#about" className={navLinkClass}>
              {content.nav.about}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
