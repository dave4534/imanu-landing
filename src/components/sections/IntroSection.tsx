import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { localeCtaStackClass, localeTextProps } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";
import { SocialButton } from "@/components/ui/SocialButton";

interface IntroSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

function IntroContent({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const textProps = localeTextProps(locale);
  return (
    <div {...textProps}>
      <EditableText
        path="intro.title"
        value={content.intro.title}
        as="h2"
        className="text-text-heading leading-tight"
        style={{ fontSize: figma.intro.titleSize, lineHeight: 1.2 }}
        dir={textProps.dir}
      />
      <EditableText
        path="intro.subtitle"
        value={content.intro.subtitle}
        as="p"
        className="text-text-heading"
        style={{ fontSize: figma.intro.subtitleSize, lineHeight: 1.2 }}
        dir={textProps.dir}
        multiline
      />
      <div className={`mt-8 flex flex-col gap-4 ${localeCtaStackClass(locale)}`}>
        <SocialButton
          variant="instagram"
          label={content.intro.instagramCta}
          editPath="intro.instagramCta"
          locale={locale}
        />
        <SocialButton
          variant="whatsapp"
          label={content.intro.whatsappCta}
          editPath="intro.whatsappCta"
          locale={locale}
        />
      </div>
    </div>
  );
}

export function IntroSection({ content, locale, images }: IntroSectionProps) {
  const introImage = (
    <EditableImage imageKey="intro" className="relative h-full w-full">
      <Image
        src={images.intro}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 658px"
      />
    </EditableImage>
  );

  return (
    <section className="bg-section-intro">
      <div className="flex flex-col lg:hidden">
        <div className="relative aspect-[658/863] w-full max-h-[50vh]">
          {introImage}
        </div>
        <div className="px-6 py-12">
          <IntroContent content={content} locale={locale} />
        </div>
      </div>

      <div
        className={`${containerClass} layout-ltr relative hidden lg:grid`}
        style={{
          gridTemplateColumns: `${figma.intro.beigeWidth}px ${figma.intro.imageWidth}px`,
          height: figma.intro.height,
        }}
      >
        <div className="relative flex items-center bg-section-intro">
          <div
            className="w-full"
            style={{
              paddingInlineStart: figma.intro.textBlock.insetStart,
              maxWidth:
                figma.intro.textBlock.insetStart +
                figma.intro.textBlock.width,
            }}
          >
            <IntroContent content={content} locale={locale} />
          </div>
        </div>
        <div className="relative">{introImage}</div>
      </div>
    </section>
  );
}
