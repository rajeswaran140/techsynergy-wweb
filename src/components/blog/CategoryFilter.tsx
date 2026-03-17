"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "All";

  const handleClick = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === "All") {
        params.delete("category");
      } else {
        params.set("category", cat);
      }
      router.push(`/blog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {["All", ...categories].map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            aria-label={`Filter posts by ${cat === "All" ? "all categories" : cat}`}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-blog-accent text-blog-base"
                : "bg-blog-surface text-blog-muted hover:bg-blog-surface-hover hover:text-white"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
