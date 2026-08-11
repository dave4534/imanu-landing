import Image from "next/image";
import { isVideoUrl } from "@/lib/media";

interface SectionMediaProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

export function SectionMedia({
  src,
  alt = "",
  className = "",
  sizes,
  priority,
  fill = false,
}: SectionMediaProps) {
  if (isVideoUrl(src)) {
    const videoClass = fill
      ? `absolute inset-0 h-full w-full object-cover ${className}`.trim()
      : className;

    return (
      <video
        src={src}
        className={videoClass}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      width={704}
      height={768}
    />
  );
}
