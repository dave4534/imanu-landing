import type { SiteContent } from "@/content";
import { aboutGridCols, containerClass } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { localeTextProps } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";
import { SectionMedia } from "@/components/ui/SectionMedia";

interface AboutSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

export function AboutSection({ content, locale, images }: AboutSectionProps) {
  const textProps = localeTextProps(locale);

  return (
    <section id="about" className="bg-section-about">
      <div
        className={`${containerClass} layout-ltr grid grid-cols-1 ${aboutGridCols} md:items-center gap-8 px-6 py-12 md:gap-10 md:px-10 md:py-16 xl:py-24`}
      >
        <div className="relative aspect-[672/738] w-full min-h-[280px] md:min-h-[360px]">
          <EditableImage imageKey="about" className="absolute inset-0">
            <SectionMedia
              src={images.about}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </EditableImage>
        </div>

        <div {...textProps} className={`${textProps.className} md:py-4`}>
          <EditableText
            path="about.title"
            value={content.about.title}
            as="h2"
            className="text-text-heading leading-tight text-4xl md:text-5xl xl:text-[80px]"
            dir={textProps.dir}
          />
          <div className="mt-6 space-y-4 text-base text-text-on-pink md:text-lg xl:text-[26px]">
            {content.about.body.map((paragraph, index) => (
              <EditableText
                key={`about-body-${index}`}
                path={`about.body.${index}`}
                value={paragraph}
                as="p"
                className="text-text-on-pink"
                dir={textProps.dir}
                multiline
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
