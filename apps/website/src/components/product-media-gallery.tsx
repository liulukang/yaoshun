"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

type ProductMediaGalleryProps = {
  title: string;
  images: string[];
  videos: string[];
};

export function ProductMediaGallery({ title, images, videos }: ProductMediaGalleryProps) {
  const normalizedImages = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);
  const normalizedVideos = useMemo(() => Array.from(new Set(videos.filter(Boolean))), [videos]);
  const [activeIndex, setActiveIndex] = useState(0);

  const mediaItems = useMemo(
    () => [
      ...normalizedVideos.map((src) => ({ kind: "video" as const, src })),
      ...normalizedImages.map((src) => ({ kind: "image" as const, src })),
    ],
    [normalizedImages, normalizedVideos]
  );

  if (mediaItems.length === 0) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, mediaItems.length - 1);
  const activeItem = mediaItems[safeIndex];

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="overflow-hidden rounded-xl shadow-2xl">
        <div className="relative aspect-[4/3] bg-surface-container-low">
          {activeItem.kind === "image" ? (
            <Image
              alt={title}
              className="object-cover"
              fill
              priority={safeIndex === 0}
              sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 52vw, 100vw"
              src={activeItem.src}
            />
          ) : (
            <video
              className="h-full w-full bg-black object-contain"
              controls
              playsInline
              preload="metadata"
            >
              <source src={activeItem.src} />
            </video>
          )}
        </div>
      </div>

      {mediaItems.length > 1 ? (
        <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
          {mediaItems.map((item, index) => {
            const isActive = safeIndex === index;
            return (
              <button
                aria-label={`${item.kind === "video" ? "Video" : "Image"} ${index + 1}`}
                key={item.src}
                className={`relative h-20 w-20 flex-none overflow-hidden rounded-lg border transition-all sm:h-24 sm:w-24 ${
                  isActive
                    ? "border-secondary ring-2 ring-secondary/30"
                    : "border-outline-variant/30 hover:border-secondary/60"
                }`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {item.kind === "image" ? (
                  <Image
                    alt={`${title} ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="96px"
                    src={item.src}
                  />
                ) : (
                  <>
                    <video
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={item.src} />
                    </video>
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[10px] font-black text-primary">
                        ▶
                      </span>
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
