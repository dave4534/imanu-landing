"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import { figma } from "@/config/figma-layout";
import { getDirection, type Locale } from "@/lib/i18n";
import { useAdmin } from "@/components/admin/AdminProvider";
import { EditableText } from "@/components/admin/EditableText";

type SocialButtonVariant = "instagram" | "whatsapp";

interface SocialButtonProps {
  variant: SocialButtonVariant;
  label: string;
  editPath: string;
  locale: Locale;
  className?: string;
}

export function SocialButton({
  variant,
  label,
  editPath,
  locale,
  className = "",
}: SocialButtonProps) {
  const { isAdmin } = useAdmin();
  const href =
    variant === "whatsapp" ? siteConfig.whatsappUrl : siteConfig.instagramUrl;
  const iconSrc =
    variant === "whatsapp" ? "/icons/WhatsApp.svg" : "/icons/Instagram.svg";
  const external = variant === "instagram";
  const { button } = figma.intro;
  const dir = getDirection(locale);
  const icon = (
    <Image
      src={iconSrc}
      alt=""
      width={button.iconSize}
      height={button.iconSize}
      className="shrink-0"
    />
  );

  const sharedClassName = `inline-flex items-center justify-center rounded bg-accent-button text-text-on-yellow transition-opacity hover:opacity-90 ${className}`;
  const sharedStyle = {
    height: button.height,
    paddingInline: button.paddingX,
    gap: button.gap,
    fontSize: button.fontSize,
  };

  const labelNode = (
    <EditableText path={editPath} value={label} as="span" dir={dir} />
  );

  const content =
    dir === "rtl" ? (
      <>
        {icon}
        {labelNode}
      </>
    ) : (
      <>
        {labelNode}
        {icon}
      </>
    );

  if (isAdmin) {
    return (
      <div className={sharedClassName} dir={dir} style={sharedStyle}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      dir={dir}
      className={sharedClassName}
      style={sharedStyle}
    >
      {content}
    </a>
  );
}
