import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { getDirection, localeCtaStackClass, localeTextProps } from "@/lib/i18n";
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
  const textProps = localeTextProps(locale);
  const dir = getDirection(locale);

  const contactImage = (
    <EditableImage imageKey="contact" className="relative h-full w-full">
      <Image
        src={images.contact}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 90vw, 538px"
      />
    </EditableImage>
  );

  const contactCopy = (
    <>
      <EditableText
        path="contact.title"
        value={content.contact.title}
        as="h2"
        className="font-semibold text-text-heading"
        style={{ fontSize: figma.contact.titleSize }}
        dir={dir}
      />
      <EditableText
        path="contact.subtitle"
        value={content.contact.subtitle}
        as="p"
        className="mt-4 text-text-heading"
        style={{ fontSize: figma.contact.subtitleSize }}
        dir={dir}
        multiline
      />
      <EditableText
        path="contact.body"
        value={content.contact.body}
        as="p"
        className="mt-6 text-text-heading"
        style={{ fontSize: figma.contact.bodySize }}
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
    </>
  );

  return (
    <section id="contact" className="bg-section-contact">
      <div className="flex flex-col gap-8 px-6 py-16 lg:hidden">
        <div className="relative mx-auto aspect-square w-full max-w-[538px]">
          {contactImage}
        </div>
        <div {...textProps}>
          <EditableText
            path="contact.title"
            value={content.contact.title}
            as="h2"
            className="font-semibold text-text-heading"
            style={{ fontSize: figma.contact.titleSize * 0.8 }}
            dir={textProps.dir}
          />
          <EditableText
            path="contact.subtitle"
            value={content.contact.subtitle}
            as="p"
            className="mt-4 text-text-heading"
            style={{ fontSize: figma.contact.subtitleSize * 0.85 }}
            dir={textProps.dir}
            multiline
          />
          <EditableText
            path="contact.body"
            value={content.contact.body}
            as="p"
            className="mt-6 text-text-heading"
            style={{ fontSize: figma.contact.bodySize * 0.85 }}
            dir={textProps.dir}
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
          {contactImage}
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
          {contactCopy}
        </div>
      </div>
    </section>
  );
}
