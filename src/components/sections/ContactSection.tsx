import Image from "next/image";
import type { SiteContent } from "@/content";
import { bp, containerClass } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { getDirection, localeCtaStackClass } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";
import { SocialButton } from "@/components/ui/SocialButton";

interface ContactSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

export function ContactSection({
  content,
  locale,
  images,
}: ContactSectionProps) {
  const dir = getDirection(locale);

  const contactImage = (
    <EditableImage
      imageKey="contact"
      className={`relative mx-auto w-full max-w-[538px] ${bp.stack}:aspect-square ${bp.md}:mx-0 ${bp.md}:max-w-none ${bp.md}:aspect-[538/540] ${bp.md}:h-full ${bp.md}:min-h-[320px]`}
    >
      <Image
        src={images.contact}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 45vw"
      />
    </EditableImage>
  );

  return (
    <section id="contact" className="bg-section-contact">
      <div
        className={`${containerClass} layout-ltr grid grid-cols-1 ${bp.md}:grid-cols-2 ${bp.md}:items-center gap-8 px-6 py-12 ${bp.md}:gap-12 ${bp.md}:px-10 ${bp.md}:py-16 ${bp.xl}:py-24`}
      >
        <div className="relative">{contactImage}</div>

        <div className="text-start" dir={dir}>
          <EditableText
            path="contact.title"
            value={content.contact.title}
            as="h2"
            className="font-semibold text-text-heading text-3xl md:text-4xl xl:text-[50px]"
            dir={dir}
          />
          <EditableText
            path="contact.subtitle"
            value={content.contact.subtitle}
            as="p"
            className="mt-4 text-text-heading text-lg md:text-xl xl:text-[32px]"
            dir={dir}
            multiline
          />
          <EditableText
            path="contact.body"
            value={content.contact.body}
            as="p"
            className="mt-6 text-text-heading text-lg md:text-xl xl:text-[32px]"
            dir={dir}
            multiline
          />
          <div
            className={`mt-8 flex flex-col gap-4 ${localeCtaStackClass(locale)}`}
          >
            <SocialButton
              variant="instagram"
              label={content.contact.instagramCta}
              editPath="contact.instagramCta"
              locale={locale}
            />
            <SocialButton
              variant="whatsapp"
              label={content.contact.whatsappCta}
              editPath="contact.whatsappCta"
              locale={locale}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
