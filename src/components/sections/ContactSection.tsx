import Image from "next/image";
import type { SiteContent } from "@/content";
import { contactGridCols, containerClass } from "@/config/figma-layout";
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

  return (
    <section id="contact" className="bg-section-contact">
      <div
        className={`${containerClass} layout-ltr grid grid-cols-1 ${contactGridCols} md:items-center gap-8 px-6 py-12 md:gap-12 md:px-10 md:py-16 xl:py-24`}
      >
        <div className="relative mx-auto aspect-[538/540] w-full max-w-[538px] min-h-[280px] md:mx-0 md:max-w-none md:min-h-[360px]">
          <EditableImage imageKey="contact" className="absolute inset-0">
            <Image
              src={images.contact}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </EditableImage>
        </div>

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
