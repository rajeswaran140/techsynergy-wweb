/**
 * Inline right-arrow icon used across CTAs, "Learn more" links, "Visit X.ca"
 * buttons, footer links. Single source so the visual stays consistent and
 * future icon set swaps are a one-line change.
 */
export default function ArrowRightIcon({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}
