export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const ALLOWED_MEDIA_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_VIDEO_TYPES,
] as const;

export const MAX_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_UPLOAD_BYTES = 100 * 1024 * 1024;

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"] as const;

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"] as const;

export function isVideoUrl(url: string): boolean {
  const path = url.split("?")[0]?.toLowerCase() ?? "";
  return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext));
}

export function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const name = file.name.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function isVideoFile(file: File): boolean {
  if (file.type.startsWith("video/")) return true;
  const name = file.name.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function isAllowedMediaFile(file: File): boolean {
  return isImageFile(file) || isVideoFile(file);
}

export function maxUploadBytesForFile(file: File): number {
  return isVideoFile(file) ? MAX_VIDEO_UPLOAD_BYTES : MAX_IMAGE_UPLOAD_BYTES;
}

export function mediaUploadError(file: File): string | null {
  if (!isAllowedMediaFile(file)) {
    return "File must be an image (JPG, PNG, WebP, GIF) or video (MP4, WebM, MOV).";
  }

  const maxBytes = maxUploadBytesForFile(file);
  if (file.size > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024));
    return `File must be smaller than ${maxMb}MB.`;
  }

  return null;
}

export function mediaFilenameExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;

  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  if (file.type === "video/mp4") return "mp4";
  if (file.type === "video/webm") return "webm";
  if (file.type === "video/quicktime") return "mov";

  return isVideoFile(file) ? "mp4" : "jpg";
}
