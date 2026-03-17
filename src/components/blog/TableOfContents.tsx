"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-blog-muted mb-4 font-(family-name:--font-blog-mono)">
        On this page
      </p>
      <ul className="space-y-2 border-l border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block pl-4 text-sm leading-relaxed transition-colors duration-200 ${
                activeId === h.id
                  ? "text-blog-accent border-l-2 border-blog-accent -ml-px"
                  : "text-blog-muted hover:text-white"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
