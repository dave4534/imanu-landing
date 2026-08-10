import Image from "next/image";
import type { ServiceItem, SiteContent } from "@/content";
import { containerClass, figma } from "@/config/figma-layout";
import type { Locale } from "@/lib/i18n";
import { localeTextProps } from "@/lib/i18n";

interface ServicesSectionProps {
  content: SiteContent;
  locale: Locale;
}

const serviceImages = [
  "/images/PXL_20250709_190438676.jpg",
  "/images/PXL_20251129_112701842.jpg",
  "/images/about.png",
  "/images/PXL_20251129_113001863.MP.jpg",
] as const;

const cardTopOffsets = [90, 116, 144, 144] as const;

function ServiceCard({
  item,
  locale,
  minHeight,
}: {
  item: ServiceItem;
  locale: Locale;
  minHeight: number;
}) {
  const cardBg =
    item.cardVariant === "yellow"
      ? "bg-accent-card-yellow"
      : "bg-accent-card-pink";

  const textProps = localeTextProps(locale);

  return (
    <div
      dir={textProps.dir}
      className={`${cardBg} ${textProps.className} flex flex-col justify-center px-8 lg:px-[137px]`}
      style={{ minHeight, paddingTop: 63, paddingBottom: 63 }}
    >
      <h3
        className="font-semibold text-text-heading"
        style={{ fontSize: figma.services.titleSize, lineHeight: 1.2 }}
      >
        {item.title}
      </h3>
      <div
        className="mt-6 space-y-4 text-text-heading lg:mt-[50px]"
        style={{
          fontSize: figma.services.bodySize,
          maxWidth: figma.services.bodyWidth,
        }}
      >
        {item.bullets?.map((bullet) => (
          <p key={bullet.slice(0, 24)}>{bullet}</p>
        ))}
        {item.description && <p>{item.description}</p>}
      </div>
    </div>
  );
}

export function ServicesSection({ content, locale }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-section-services">
      {/* Mobile / tablet — stacked */}
      <div className="flex flex-col gap-12 px-6 py-16 lg:hidden">
        {content.services.items.map((item, index) => (
          <article key={item.id} className="flex flex-col">
            <div
              className="relative w-full"
              style={{ height: figma.services.imageHeights[index] * 0.5 }}
            >
              <Image
                src={serviceImages[index % serviceImages.length]}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <ServiceCard
              item={item}
              locale={locale}
              minHeight={figma.services.cardHeights[index] * 0.6}
            />
          </article>
        ))}
      </div>

      {/* Desktop — image left, card right (Figma) */}
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
              <div
                className="absolute"
                style={{
                  left: figma.services.image.insetStart,
                  top: imageTop,
                  width: figma.services.image.width,
                  height: imageHeight,
                }}
              >
                <Image
                  src={serviceImages[index % serviceImages.length]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="704px"
                />
              </div>
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
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
