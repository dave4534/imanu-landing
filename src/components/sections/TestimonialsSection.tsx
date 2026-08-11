import Image from "next/image";
import type { SiteContent } from "@/content";
import { bp, containerClass } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { getDirection } from "@/lib/i18n";
import { EditableText } from "@/components/admin/EditableText";

interface TestimonialsSectionProps {
  content: SiteContent;
  locale: Locale;
}

export function TestimonialsSection({
  content,
  locale,
}: TestimonialsSectionProps) {
  const dir = getDirection(locale);

  return (
    <section className="bg-section-testimonials py-12 md:py-16 xl:py-20">
      <div
        className={`${containerClass} flex flex-col items-center gap-10 px-6 ${bp.md}:px-10`}
      >
        <Image
          src="/icons/wine-glass.svg"
          alt=""
          width={202}
          height={217}
          className="h-auto w-[140px] md:w-[202px]"
        />
        <div
          dir={dir}
          className="w-full max-w-[891px] space-y-8 text-center text-text-heading md:space-y-10 xl:space-y-[42px]"
        >
          {content.testimonials.items.map((quote, index) => (
            <EditableText
              key={`testimonial-${index}`}
              path={`testimonials.items.${index}`}
              value={quote}
              as="blockquote"
              className="text-lg leading-normal text-text-heading md:text-xl xl:text-[26px]"
              dir={dir}
              multiline
            />
          ))}
        </div>
      </div>
    </section>
  );
}
