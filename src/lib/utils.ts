import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds an URL for files served from Vite `public/`, respecting `base` (subfolder hosting).
 * Accepts either "/foo/bar.png" or "foo/bar.png".
 */
export function publicUrl(path: string) {
  let base = import.meta.env.BASE_URL || "/";
  // Be tolerant with misconfigured base (e.g. "mavenestudio" instead of "/mavenestudio/").
  if (!base.startsWith("/")) base = `/${base}`;
  if (!base.endsWith("/")) base = `${base}/`;
  const normalizedBase = base;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
}
