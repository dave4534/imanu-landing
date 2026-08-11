import Image from "next/image";
import type { SiteContent } from "@/content";
import { bp, containerClass } from "@/config/figma-layout";
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
      <div
        className={`relative w-full ${bp.stack}:aspect-[1440/863] ${bp.stack}:max-h-[70vh] ${bp.md}:aspect-[1440/863] ${bp.md}:max-h-[80vh] ${bp.xl}:h-[863px] ${bp.xl}:max-h-none`}
      >
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
          <div className={`${containerClass} relative h-full`}>
            <div
              className={`pointer-events-auto absolute right-4 bottom-6 w-max max-w-[calc(100%-32px)] text-right text-white sm:bottom-8 ${bp.md}:right-[5%] ${bp.md}:bottom-[10%] ${bp.xl}:right-[122px] ${bp.xl}:bottom-[212px] ${bp.xl}:min-w-[471px]`}
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
                className="text-[40px] font-normal leading-none sm:text-[48px] md:text-[64px] xl:text-[100px]"
                dir={dir}
              />
              <EditableText
                path="hero.subtitle"
                value={content.hero.subtitle}
                as="p"
                className={`mt-0 text-[20px] font-normal leading-tight sm:text-[24px] md:text-[32px] xl:whitespace-nowrap xl:text-[50px]`}
                dir={dir}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
