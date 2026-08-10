import Image from "next/image";
import { siteConfig } from "@/config/site";
import { figma } from "@/config/figma-layout";

type SocialButtonVariant = "instagram" | "whatsapp";

interface SocialButtonProps {
  variant: SocialButtonVariant;
  label: string;
  className?: string;
}

export function SocialButton({
  variant,
  label,
  className = "",
}: SocialButtonProps) {
  const href =
    variant === "whatsapp" ? siteConfig.whatsappUrl : siteConfig.instagramUrl;
  const iconSrc =
    variant === "whatsapp" ? "/icons/WhatsApp.svg" : "/icons/Instagram.svg";
  const external = variant === "instagram";
  const { button } = figma.intro;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded bg-accent-button text-text-on-yellow transition-opacity hover:opacity-90 ${className}`}
      style={{
        height: button.height,
        paddingInline: button.paddingX,
        gap: button.gap,
        fontSize: button.fontSize,
      }}
    >
      <span>{label}</span>
      <Image
        src={iconSrc}
        alt=""
        width={button.iconSize}
        height={button.iconSize}
        className="shrink-0"
      />
    </a>
  );
}
