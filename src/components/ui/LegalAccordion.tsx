"use client";

import { useId, useState } from "react";
import { glassCard } from "@/lib/ui-tokens";

interface LegalSection {
  title: string;
  content: React.ReactNode;
}

/**
 * Accordion built to the WAI-ARIA Authoring Practices accordion pattern:
 *
 *   <h2><button aria-expanded aria-controls=panelId>title</button></h2>
 *   <div role="region" aria-labelledby=triggerId hidden={!open}>...</div>
 *
 * The heading wraps the button (not the other way round) so screen-reader
 * users can navigate by heading and still toggle expansion. `inert` is set
 * on collapsed panels so their content is removed from the tab order and
 * the accessibility tree without breaking the grid-rows expand animation.
 */
export default function LegalAccordion({
  sections,
}: {
  sections: LegalSection[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  return (
    <div className="space-y-3">
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${idPrefix}-trigger-${i}`;
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div
            key={i}
            className={`${glassCard} overflow-hidden hover:border-primary/30 dark:hover:border-primary/30`}
          >
            <h2 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer text-base sm:text-lg font-semibold text-slate-900 dark:text-white"
              >
                <span>{section.title}</span>
                <svg
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </h2>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
