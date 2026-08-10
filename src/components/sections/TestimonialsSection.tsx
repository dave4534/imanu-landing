import Image from "next/image";
import type { SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { getDirection, localeTextProps } from "@/lib/i18n";
import { EditableText } from "@/components/admin/EditableText";

interface TestimonialsSectionProps {
  content: SiteContent;
  locale: Locale;
}

export function TestimonialsSection({
  content,
  locale,
}: TestimonialsSectionProps) {
  const textProps = localeTextProps(locale);
  const dir = getDirection(locale);

  return (
    <section className="bg-section-testimonials py-12 lg:py-0">
      <div className="flex flex-col items-center gap-10 px-6 py-16 lg:hidden">
        <Image
          src="/icons/wine-glass.svg"
          alt=""
          width={figma.testimonials.illustration.width}
          height={figma.testimonials.illustration.height}
          className="h-auto w-[160px]"
        />
        <div
          {...textProps}
          className={`space-y-8 text-text-heading ${textProps.className}`}
          style={{ fontSize: figma.testimonials.text.fontSize * 0.85 }}
        >
          {content.testimonials.items.map((quote, index) => (
            <EditableText
              key={`testimonial-mobile-${index}`}
              path={`testimonials.items.${index}`}
              value={quote}
              as="blockquote"
              className="leading-normal text-text-heading"
              dir={textProps.dir}
              multiline
            />
          ))}
        </div>
      </div>

      <div
        className={`${containerClass} hidden lg:flex lg:flex-col lg:items-center lg:px-10`}
        style={{
          minHeight: figma.testimonials.height,
          paddingTop: 38,
          paddingBottom: 48,
        }}
      >
        <Image
          src="/icons/wine-glass.svg"
          alt=""
          width={figma.testimonials.illustration.width}
          height={figma.testimonials.illustration.height}
          className="h-auto shrink-0"
          style={{
            width: figma.testimonials.illustration.width,
            height: figma.testimonials.illustration.height,
          }}
        />

        <div
          className="w-full max-w-[891px] text-start text-text-heading"
          dir={dir}
          style={{
            marginTop:
              figma.testimonials.text.insetTop -
              38 -
              figma.testimonials.illustration.height,
            fontSize: figma.testimonials.text.fontSize,
          }}
        >
          <div className="space-y-[42px]">
            {content.testimonials.items.map((quote, index) => (
              <EditableText
                key={`testimonial-desktop-${index}`}
                path={`testimonials.items.${index}`}
                value={quote}
                as="blockquote"
                className="leading-normal text-text-heading"
                dir={dir}
                multiline
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
