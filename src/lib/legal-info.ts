/**
 * Shared constants for /privacy and /terms.
 *
 * Bump LEGAL_LAST_UPDATED whenever you make a material change to either
 * policy. Both pages and the structured-data layer (if added later) read
 * from one place so dates can never drift between Privacy and Terms.
 */

export const LEGAL_LAST_UPDATED = "2026-05-17";

/** Human-readable form for the "Last updated:" line. */
export const LEGAL_LAST_UPDATED_DISPLAY = new Date(
  LEGAL_LAST_UPDATED
).toLocaleDateString("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const COMPANY = {
  name: "TechSynergy Corp",
  shortName: "TechSynergy",
  city: "Markham",
  province: "Ontario",
  country: "Canada",
  jurisdiction: "Ontario, Canada",
} as const;
