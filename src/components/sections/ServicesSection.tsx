import Image from "next/image";
import type { ServiceItem, SiteContent } from "@/content";
import {
  containerClass,
  serviceImageMaxHeightClass,
  servicesGridCols,
} from "@/config/figma-layout";
import type { ImageKey } from "@/lib/admin/types";
import type { Locale } from "@/lib/i18n";
import { localeTextProps } from "@/lib/i18n";
import { EditableImage } from "@/components/admin/EditableImage";
import { EditableText } from "@/components/admin/EditableText";

interface ServicesSectionProps {
  content: SiteContent;
  locale: Locale;
  images: Record<ImageKey, string>;
}

function serviceImageKey(index: number): ImageKey {
  return `services.${index}` as ImageKey;
}

function ServiceCard({
  item,
  locale,
  index,
}: {
  item: ServiceItem;
  locale: Locale;
  index: number;
}) {
  const cardBg =
    item.cardVariant === "yellow"
      ? "bg-accent-card-yellow"
      : "bg-accent-card-pink";

  const textProps = localeTextProps(locale);
  const basePath = `services.items.${index}`;

  return (
    <div
      dir={textProps.dir}
      className={`${cardBg} ${textProps.className} flex min-h-[280px] flex-col justify-center px-8 py-12 md:min-h-[360px] md:px-12 md:py-16 xl:min-h-[420px] xl:px-[137px]`}
    >
      <EditableText
        path={`${basePath}.title`}
        value={item.title}
        as="h3"
        className="font-semibold text-text-heading text-3xl md:text-4xl xl:text-[50px]"
        dir={textProps.dir}
      />
      <div className="mt-6 max-w-[326px] space-y-4 text-lg text-text-heading md:mt-8 md:text-xl xl:mt-[50px] xl:text-[30px]">
        {item.bullets?.map((bullet, bulletIndex) => (
          <EditableText
            key={`${item.id}-bullet-${bulletIndex}`}
            path={`${basePath}.bullets.${bulletIndex}`}
            value={bullet}
            as="p"
            className="text-text-heading"
            dir={textProps.dir}
            multiline
          />
        ))}
        {item.description && (
          <EditableText
            path={`${basePath}.description`}
            value={item.description}
            as="p"
            className="text-text-heading"
            dir={textProps.dir}
            multiline
          />
        )}
      </div>
    </div>
  );
}

export function ServicesSection({
  content,
  locale,
  images,
}: ServicesSectionProps) {
  return (
    <section id="services" className="bg-section-services">
      <div
        className={`${containerClass} layout-ltr flex flex-col gap-12 px-6 py-12 md:gap-16 md:px-10 md:py-16`}
      >
        {content.services.items.map((item, index) => (
          <article
            key={item.id}
            className={`grid grid-cols-1 ${servicesGridCols} md:items-center md:gap-0`}
          >
            <div className="flex w-full items-center justify-center">
              <div
                className={`relative aspect-[704/768] w-full min-h-[240px] ${serviceImageMaxHeightClass}`}
              >
                <EditableImage
                  imageKey={serviceImageKey(index)}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[serviceImageKey(index)]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 367px"
                  />
                </EditableImage>
              </div>
            </div>
            <div className="relative z-10 md:-ml-6 xl:-ml-10">
              <ServiceCard item={item} locale={locale} index={index} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
