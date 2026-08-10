import Image from "next/image";
import type { ServiceItem, SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
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
  minHeight,
  index,
}: {
  item: ServiceItem;
  locale: Locale;
  minHeight: number;
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
      className={`${cardBg} ${textProps.className} flex flex-col justify-center px-8 lg:px-[137px]`}
      style={{ minHeight, paddingTop: 63, paddingBottom: 63 }}
    >
      <EditableText
        path={`${basePath}.title`}
        value={item.title}
        as="h3"
        className="font-semibold text-text-heading"
        style={{ fontSize: figma.services.titleSize, lineHeight: 1.2 }}
        dir={textProps.dir}
      />
      <div
        className="mt-6 space-y-4 text-text-heading lg:mt-[50px]"
        style={{
          fontSize: figma.services.bodySize,
          maxWidth: figma.services.bodyWidth,
        }}
      >
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
      <div className="flex flex-col gap-12 px-6 py-16 lg:hidden">
        {content.services.items.map((item, index) => (
          <article key={item.id} className="flex flex-col">
            <EditableImage
              imageKey={serviceImageKey(index)}
              className="relative w-full"
              style={{ height: figma.services.imageHeights[index] * 0.5 }}
            >
              <Image
                src={images[serviceImageKey(index)]}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </EditableImage>
            <ServiceCard
              item={item}
              locale={locale}
              minHeight={figma.services.cardHeights[index] * 0.6}
              index={index}
            />
          </article>
        ))}
      </div>

      <div
        className={`${containerClass} layout-ltr relative hidden lg:block`}
        style={{ height: figma.services.sectionHeight }}
      >
        {content.services.items.map((item, index) => {
          const imageTop = [114, 1090, 2039, 3039][index];
          const cardTop = figma.services.cardOffsets[index];
          const imageHeight = figma.services.imageHeights[index];
          const cardHeight = figma.services.cardHeights[index];

          return (
            <article key={item.id}>
              <EditableImage
                imageKey={serviceImageKey(index)}
                className="absolute"
                style={{
                  left: figma.services.image.insetStart,
                  top: imageTop,
                  width: figma.services.image.width,
                  height: imageHeight,
                }}
              >
                <Image
                  src={images[serviceImageKey(index)]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="704px"
                />
              </EditableImage>
              <div
                className="absolute"
                style={{
                  left: figma.services.card.insetStart,
                  top: cardTop,
                  width: figma.services.card.width,
                }}
              >
                <ServiceCard
                  item={item}
                  locale={locale}
                  minHeight={cardHeight}
                  index={index}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
