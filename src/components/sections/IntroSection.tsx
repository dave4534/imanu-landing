import Image from "next/image";
import type { SiteContent } from "@/content";
import { bp, containerClass, introGridCols } from "@/config/figma-layout";
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
        className="text-text-heading leading-tight text-3xl md:text-4xl xl:text-[60px]"
        dir={textProps.dir}
      />
      <EditableText
        path="intro.subtitle"
        value={content.intro.subtitle}
        as="p"
        className="mt-3 text-text-heading text-lg md:text-xl xl:text-[32px]"
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
  return (
    <section className="bg-section-intro">
      <div
        className={`${containerClass} layout-ltr grid grid-cols-1 ${introGridCols} ${bp.md}:min-h-[480px] ${bp.xl}:min-h-[863px]`}
      >
        <div
          className={`flex items-center bg-section-intro px-6 py-12 ${bp.md}:py-16 ${bp.md}:pl-[min(14.4vw,208px)] ${bp.xl}:pl-[208px]`}
        >
          <div className="w-full max-w-[522px]">
            <IntroContent content={content} locale={locale} />
          </div>
        </div>
        <div className="relative min-h-[240px] w-full aspect-[658/863] md:min-h-[360px]">
          <EditableImage imageKey="intro" className="absolute inset-0">
            <Image
              src={images.intro}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </EditableImage>
        </div>
      </div>
    </section>
  );
}
