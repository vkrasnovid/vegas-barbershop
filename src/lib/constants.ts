/**
 * Site-wide constants for base path and URLs.
 * Use `import.meta.env.BASE_URL` for the configured base path in Astro frontmatter/scripts.
 * This file provides static fallback values for cases where import.meta.env isn't available.
 */

export const BASE = '/vegas-barbershop';

export const SITE_URL = 'https://vkrasnovid.github.io/vegas-barbershop';

/** Prepend base path to an internal link (e.g., '#services' → '/vegas-barbershop/#services') */
export function withBase(path: string): string {
  return `${BASE}${path}`;
}
