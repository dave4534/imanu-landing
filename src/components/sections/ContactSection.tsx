import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { getDirection, localeCtaStackClass, localeTextProps } from "@/lib/i18n";
import { SocialButton } from "@/components/ui/SocialButton";

interface ContactSectionProps {
  content: SiteContent;
  locale: Locale;
}

export function ContactSection({ content, locale }: ContactSectionProps) {
  const textProps = localeTextProps(locale);
  const dir = getDirection(locale);

  return (
    <section id="contact" className="bg-section-contact">
      {/* Mobile / tablet */}
      <div className="flex flex-col gap-8 px-6 py-16 lg:hidden">
        <div className="relative mx-auto aspect-square w-full max-w-[538px]">
          <Image
            src="/images/PXL_20250709_190438676.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="90vw"
          />
        </div>
        <div {...textProps}>
          <h2
            className="font-semibold text-text-heading"
            style={{ fontSize: figma.contact.titleSize * 0.8 }}
          >
            {content.contact.title}
          </h2>
          <p
            className="mt-4 text-text-heading"
            style={{ fontSize: figma.contact.subtitleSize * 0.85 }}
          >
            {content.contact.subtitle}
          </p>
          <p
            className="mt-6 text-text-heading"
            style={{ fontSize: figma.contact.bodySize * 0.85 }}
          >
            {content.contact.body}
          </p>
          <div
            className={`mt-8 flex flex-col gap-4 ${localeCtaStackClass(locale)}`}
          >
            <SocialButton
              variant="instagram"
              label={content.contact.instagramCta}
            />
            <SocialButton
              variant="whatsapp"
              label={content.contact.whatsappCta}
            />
          </div>
        </div>
      </div>

      {/* Desktop — Figma proportions */}
      <div
        className={`${containerClass} layout-ltr relative hidden lg:block`}
        style={{ height: figma.contact.height }}
      >
        <div
          className="absolute"
          style={{
            left: figma.contact.image.insetStart,
            top: figma.contact.image.insetTop,
            width: figma.contact.image.width,
            height: figma.contact.image.height,
          }}
        >
          <Image
            src="/images/PXL_20250709_190438676.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="538px"
          />
        </div>

        <div
          className="absolute text-start"
          dir={dir}
          style={{
            left: 709,
            top: 242,
            width: figma.contact.textWidth,
          }}
        >
          <h2
            className="font-semibold text-text-heading"
            style={{ fontSize: figma.contact.titleSize }}
          >
            {content.contact.title}
          </h2>
          <p
            className="mt-4 text-text-heading"
            style={{ fontSize: figma.contact.subtitleSize }}
          >
            {content.contact.subtitle}
          </p>
          <p
            className="mt-6 text-text-heading"
            style={{ fontSize: figma.contact.bodySize }}
          >
            {content.contact.body}
          </p>
          <div
            className={`mt-8 flex flex-col gap-4 ${localeCtaStackClass(locale)}`}
          >
            <SocialButton
              variant="instagram"
              label={content.contact.instagramCta}
            />
            <SocialButton
              variant="whatsapp"
              label={content.contact.whatsappCta}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
