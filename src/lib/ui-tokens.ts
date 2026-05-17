/**
 * Shared visual tokens for the TechSynergy marketing surface.
 *
 * Keeping these as className strings instead of @apply rules so they remain
 * fully discoverable by Tailwind's source scanner and trivially overridable
 * with one-off classes at the call site.
 */

/** Frosted card. Pair with a non-flat section background or the blur has nothing to act on. */
export const glassCard =
  "relative rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 " +
  "border border-white/60 dark:border-white/10 " +
  "shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] " +
  "transition-[transform,box-shadow,border-color] duration-300";

/** Hover lift + glow. Apply alongside `glassCard` when the card is interactive. */
export const glassCardHover =
  "hover:-translate-y-0.5 hover:border-primary/40 dark:hover:border-primary/40 " +
  "hover:shadow-[0_16px_48px_rgba(17,96,247,0.18)]";

/** Pill chip used for highlights / capability tags inside glass cards. */
export const glassChip =
  "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full " +
  "bg-white/60 dark:bg-white/[0.06] border border-white/60 dark:border-white/10 " +
  "text-slate-700 dark:text-slate-200 backdrop-blur-sm";

/** Gradient icon orb. Pass the service's `color` field as `gradient` (e.g. "from-primary to-blue-400"). */
export function glassIconOrb(gradient: string): string {
  return (
    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 " +
    "bg-linear-to-br " +
    gradient +
    " shadow-lg shadow-black/10 dark:shadow-black/30 ring-1 ring-white/40 dark:ring-white/10"
  );
}
