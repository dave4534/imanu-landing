import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { getDirection, localeTextProps } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";

interface AboutSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

export function AboutSection({ content, locale, images }: AboutSectionProps) {
  const textProps = localeTextProps(locale);
  const dir = getDirection(locale);

  const aboutImage = (
    <EditableImage imageKey="about" className="relative h-full w-full">
      <Image
        src={images.about}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 90vw, 672px"
      />
    </EditableImage>
  );

  return (
    <section id="about" className="bg-section-about">
      <div className="flex flex-col gap-8 px-6 py-16 lg:hidden">
        <div className="relative mx-auto aspect-[672/738] w-full max-w-[672px]">
          {aboutImage}
        </div>
        <div {...textProps}>
          <EditableText
            path="about.title"
            value={content.about.title}
            as="h2"
            className="text-text-heading leading-tight"
            style={{ fontSize: figma.about.titleSize * 0.5 }}
            dir={textProps.dir}
          />
          <div
            className="mt-6 space-y-4 text-text-on-pink"
            style={{ fontSize: figma.about.bodySize }}
          >
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

      <div
        className={`${containerClass} layout-ltr relative hidden lg:block`}
        style={{ height: figma.about.height }}
      >
        <div
          className="absolute"
          style={{
            left: figma.about.image.insetStart,
            top: figma.about.image.insetTop,
            width: figma.about.image.width,
            height: figma.about.image.height,
          }}
        >
          {aboutImage}
        </div>

        <EditableText
          path="about.title"
          value={content.about.title}
          as="h2"
          className="absolute text-start text-text-heading leading-tight"
          dir={dir}
          style={{
            left: figma.about.textBlock.insetStart,
            top: figma.about.titleInsetTop,
            width: figma.about.textBlock.width,
            fontSize: figma.about.titleSize,
          }}
        />

        <div
          className="absolute space-y-4 text-start text-text-on-pink"
          dir={dir}
          style={{
            left: figma.about.textBlock.insetStart,
            top: figma.about.bodyInsetTop,
            width: figma.about.textBlock.width,
            fontSize: figma.about.bodySize,
          }}
        >
          {content.about.body.map((paragraph, index) => (
            <EditableText
              key={`about-body-desktop-${index}`}
              path={`about.body.${index}`}
              value={paragraph}
              as="p"
              className="text-text-on-pink"
              dir={dir}
              multiline
            />
          ))}
        </div>
      </div>
    </section>
  );
}
