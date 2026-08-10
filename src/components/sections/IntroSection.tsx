import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { localeCtaStackClass, localeTextProps } from "@/lib/i18n";
import { SocialButton } from "@/components/ui/SocialButton";

interface IntroSectionProps {
  content: SiteContent;
  locale: Locale;
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
      <h2
        className="text-text-heading leading-tight"
        style={{ fontSize: figma.intro.titleSize, lineHeight: 1.2 }}
      >
        {content.intro.title}
      </h2>
      <p
        className="text-text-heading"
        style={{ fontSize: figma.intro.subtitleSize, lineHeight: 1.2 }}
      >
        {content.intro.subtitle}
      </p>
      <div className={`mt-8 flex flex-col gap-4 ${localeCtaStackClass(locale)}`}>
        <SocialButton variant="instagram" label={content.intro.instagramCta} />
        <SocialButton variant="whatsapp" label={content.intro.whatsappCta} />
      </div>
    </div>
  );
}

export function IntroSection({ content, locale }: IntroSectionProps) {
  return (
    <section className="bg-section-intro">
      {/* Mobile / tablet — image then text */}
      <div className="flex flex-col lg:hidden">
        <div className="relative aspect-[658/863] w-full max-h-[50vh]">
          <Image
            src="/images/PXL_20251129_112701842.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="px-6 py-12">
          <IntroContent content={content} locale={locale} />
        </div>
      </div>

      {/* Desktop — Figma: beige left, image right */}
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
        <div className="relative">
          <Image
            src="/images/PXL_20251129_112701842.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="658px"
          />
        </div>
      </div>
    </section>
  );
}
