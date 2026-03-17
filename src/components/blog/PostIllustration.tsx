"use client";

import Image from "next/image";
import { getPostBySlug } from "@/lib/blog-data";
import { useState } from "react";

interface PostIllustrationProps {
  slug: string;
  className?: string;
  priority?: boolean; // Allow parent to control loading priority
}

export default function PostIllustration({
  slug,
  className = "",
  priority = false
}: PostIllustrationProps) {
  const post = getPostBySlug(slug);
  const [imageError, setImageError] = useState(false);

  // Fallback gradient placeholder when image is missing
  const GradientPlaceholder = () => (
    <div
      className={`w-full aspect-2/1 bg-linear-to-br from-blog-accent/5 via-slate-100 to-slate-50 ${className}`}
      role="img"
      aria-label="Blog post placeholder image"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blog-accent/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blog-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-blog-muted font-medium">
            {post ? post.title : "Blog Image"}
          </p>
          <p className="text-xs text-blog-muted/60 mt-1">
            Image placeholder
          </p>
        </div>
      </div>
    </div>
  );

  if (!post || imageError) {
    return <GradientPlaceholder />;
  }

  return (
    <div className={`relative w-full aspect-2/1 overflow-hidden ${className}`}>
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjFmNWY5Ii8+Cjwvc3ZnPgo="
        onError={() => setImageError(true)}
      />
    </div>
  );
}
