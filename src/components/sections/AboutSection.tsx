import Image from "next/image";
import type { SiteContent } from "@/content";
import { bp, containerClass } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { localeTextProps } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";

interface AboutSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

export function AboutSection({ content, locale, images }: AboutSectionProps) {
  const textProps = localeTextProps(locale);

  const aboutImage = (
    <EditableImage
      imageKey="about"
      className={`relative mx-auto w-full max-w-[672px] ${bp.stack}:aspect-[672/738] ${bp.md}:mx-0 ${bp.md}:max-w-none ${bp.md}:aspect-[672/738] ${bp.md}:h-full ${bp.md}:min-h-[320px]`}
    >
      <Image
        src={images.about}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </EditableImage>
  );

  return (
    <section id="about" className="bg-section-about">
      <div
        className={`${containerClass} layout-ltr grid grid-cols-1 ${bp.md}:grid-cols-2 ${bp.md}:items-center gap-8 px-6 py-12 ${bp.md}:gap-10 ${bp.md}:px-10 ${bp.md}:py-16 ${bp.xl}:py-24`}
      >
        <div className="relative">{aboutImage}</div>

        <div {...textProps} className={`${textProps.className} ${bp.md}:py-4`}>
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
