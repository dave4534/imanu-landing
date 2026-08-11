import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { LogoLink } from "@/components/layout/LogoLink";
import { MobileNav } from "@/components/layout/MobileNav";
import { EditableNavLink } from "@/components/admin/EditableNavLink";

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
        className={`${containerClass} layout-ltr px-6 lg:px-10 lg:py-1`}
        style={{ minHeight: figma.header.logo.height + 20 }}
      >
        {/* Mobile: hamburger + centered logo */}
        <div className="relative z-50 grid h-[67px] grid-cols-[40px_1fr_40px] items-center bg-section-hero md:hidden">
          <div className="flex h-full items-center justify-center">
            <MobileNav locale={locale} content={content} />
          </div>
          <LogoLink
            href={localePath(locale)}
            ariaLabel={siteConfig.siteName}
            className="flex h-full items-center justify-center"
          >
            <Image
              src="/icons/Logo.svg"
              alt="Imanu"
              width={figma.header.logo.width}
              height={figma.header.logo.height}
              priority
              className="h-[47px] w-[95px] object-contain"
            />
          </LogoLink>
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
            <EditableNavLink
              href="#contact"
              path="nav.contact"
              value={content.nav.contact}
              locale={locale}
              className={navLinkClass}
            />
            <EditableNavLink
              href={siteConfig.instagramUrl}
              path="nav.instagram"
              value={content.nav.instagram}
              locale={locale}
              className={navLinkClass}
              external
            />
          </nav>

          <LogoLink href={localePath(locale)} ariaLabel={siteConfig.siteName}>
            <Image
              src="/icons/Logo.svg"
              alt="Imanu"
              width={figma.header.logo.width}
              height={figma.header.logo.height}
              priority
              className="h-auto w-[95px] shrink-0"
            />
          </LogoLink>

          <nav
            className="flex items-center"
            style={{ fontSize: figma.header.fontSize, gap }}
          >
            <EditableNavLink
              href="#services"
              path="nav.services"
              value={content.nav.services}
              locale={locale}
              className={navLinkClass}
            />
            <EditableNavLink
              href="#about"
              path="nav.about"
              value={content.nav.about}
              locale={locale}
              className={navLinkClass}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
