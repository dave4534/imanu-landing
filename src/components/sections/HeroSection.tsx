import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { getDirection } from "@/lib/i18n";

interface HeroSectionProps {
  content: SiteContent;
  locale: Locale;
}

export function HeroSection({ content, locale }: HeroSectionProps) {
  const dir = getDirection(locale);
  const { width } = figma.hero.textBlock;

  return (
    <section className="relative w-full bg-section-hero">
      <div
        className="relative w-full max-lg:aspect-[1440/863] max-lg:max-h-[70vh]"
        style={{ height: figma.hero.height }}
      >
        <Image
          src="/images/PXL_20251129_113001863.MP.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Text aligned within Figma canvas width, over full-bleed image */}
        <div className={`${containerClass} pointer-events-none absolute inset-0`}>
          <div
            className="pointer-events-auto absolute right-4 bottom-8 text-right text-white lg:right-[122px] lg:bottom-[212px]"
            dir={dir}
            style={{
              width,
              maxWidth: "calc(100% - 32px)",
            }}
          >
            <h1 className="text-[40px] font-normal leading-none md:text-[48px] lg:text-[100px]">
              {content.hero.title}
            </h1>
            <p className="mt-0 text-[20px] font-normal leading-tight md:text-[24px] lg:text-[50px]">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
