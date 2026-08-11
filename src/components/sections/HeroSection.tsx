import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, belowFigmaDesktop, figmaDesktop } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { getDirection } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";

interface HeroSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

export function HeroSection({ content, locale, images }: HeroSectionProps) {
  const dir = getDirection(locale);

  return (
    <section className="relative w-full bg-section-hero">
      {/* Single height wrapper so text stays anchored to the visible image on mobile */}
      <div className={`relative w-full ${belowFigmaDesktop}:aspect-[1440/863] ${belowFigmaDesktop}:max-h-[70vh] ${figmaDesktop}:h-[863px]`}>
        <EditableImage imageKey="hero" className="absolute inset-0">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </EditableImage>

        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            className={`${containerClass} relative h-full`}
          >
            <div
              className={`pointer-events-auto absolute right-4 bottom-6 w-max max-w-[calc(100%-32px)] text-right text-white sm:bottom-8 ${figmaDesktop}:right-[122px] ${figmaDesktop}:bottom-[212px] ${figmaDesktop}:min-w-[471px]`}
              dir={dir}
              style={{
                textShadow:
                  "0 1px 2px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.22)",
              }}
            >
              <EditableText
                path="hero.title"
                value={content.hero.title}
                as="h1"
                className={`text-[40px] font-normal leading-none md:text-[48px] ${figmaDesktop}:text-[100px]`}
                dir={dir}
              />
              <EditableText
                path="hero.subtitle"
                value={content.hero.subtitle}
                as="p"
                className={`mt-0 text-[20px] font-normal leading-tight md:text-[24px] ${belowFigmaDesktop}:whitespace-normal ${figmaDesktop}:whitespace-nowrap ${figmaDesktop}:text-[50px]`}
                dir={dir}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
