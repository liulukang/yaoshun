"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight, X} from "lucide-react";

type PreviewImage = {
  alt: string;
  src: string;
};

type PreviewRequest = PreviewImage & {images?: PreviewImage[]};
type PreviewOpenEvent = CustomEvent<PreviewRequest>;
type PreviewGallery = {images: PreviewImage[]; index: number};

const previewOpenEventName = "image-preview:open";
const publicMediaOrigin = "https://www.yaoshuntoys.com";

function getRuntimePreviewSource(src: string) {
  if (
    process.env.NODE_ENV !== "development" ||
    !["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
  ) {
    return src;
  }

  try {
    const url = new URL(src, window.location.href);
    if (url.origin !== publicMediaOrigin || !url.pathname.startsWith("/media/")) {
      return src;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return src;
  }
}

function getOptimizedImageSource(src: string) {
  try {
    const url = new URL(src, window.location.href);

    if (url.pathname !== "/_next/image") {
      return src;
    }

    return url.searchParams.get("url") || src;
  } catch {
    return src;
  }
}

function getPreviewGallery(element: Element): PreviewImage[] | undefined {
  const serialized = element.closest<HTMLElement>("[data-image-preview-gallery]")
    ?.dataset.imagePreviewGallery;

  if (!serialized) return undefined;

  try {
    const images: unknown = JSON.parse(serialized);
    if (!Array.isArray(images)) return undefined;
    return images.filter((image): image is PreviewImage =>
      image !== null && typeof image === "object" &&
      typeof image.src === "string" && Boolean(image.src) &&
      typeof image.alt === "string",
    );
  } catch {
    return undefined;
  }
}

function openImagePreview(detail: PreviewRequest) {
  window.dispatchEvent(new CustomEvent(previewOpenEventName, {detail}));
}

export function ImageLightbox() {
  const [preview, setPreview] = useState<PreviewGallery | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = preview !== null;

  const changeImage = useCallback((direction: number) => {
    setPreview((current) => {
      if (!current || current.images.length < 2) return current;
      return {
        ...current,
        index: (current.index + direction + current.images.length) % current.images.length,
      };
    });
  }, []);

  useEffect(() => {
    function handlePreviewOpen(event: Event) {
      const previewEvent = event as PreviewOpenEvent;

      if (!previewEvent.detail?.src) {
        return;
      }

      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const selectedImage = {
        alt: previewEvent.detail.alt || "",
        src: getRuntimePreviewSource(previewEvent.detail.src),
      };
      const images = (previewEvent.detail.images || [selectedImage]).map((image) => ({
        ...image,
        src: getRuntimePreviewSource(image.src),
      }));
      const index = images.findIndex((image) => image.src === selectedImage.src);
      setPreview(index < 0 ? {images: [selectedImage], index: 0} : {images, index});
    }

    function handleDocumentClick(event: MouseEvent) {
      if (event.button !== 0 || event.defaultPrevented) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest("[data-image-lightbox-root]")) {
        return;
      }

      const trigger = target.closest<HTMLElement>("[data-image-preview-trigger]");

      if (trigger) {
        const src = trigger.dataset.imagePreviewSrc;

        if (!src) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        openImagePreview({
          alt: trigger.dataset.imagePreviewAlt || "",
          src: getRuntimePreviewSource(src),
          images: getPreviewGallery(trigger),
        });
        return;
      }

      const image = target.closest("img");
      const previewSource = image?.dataset.imagePreviewSrc;

      if (!image || !previewSource) {
        return;
      }

      const src = getRuntimePreviewSource(getOptimizedImageSource(previewSource));

      if (!src) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      openImagePreview({
        alt: image.alt || "",
        src,
        images: getPreviewGallery(image),
      });
    }

    window.addEventListener(previewOpenEventName, handlePreviewOpen);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener(previewOpenEventName, handlePreviewOpen);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setPreview(null);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        changeImage(event.key === "ArrowLeft" ? -1 : 1);
      } else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, changeImage]);

  if (!preview) {
    return null;
  }

  const currentImage = preview.images[preview.index];
  const hasMultipleImages = preview.images.length > 1;

  return (
    <div
      ref={dialogRef}
      aria-label="图片预览"
      aria-modal="true"
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/82 py-20 backdrop-blur-sm ${hasMultipleImages ? "px-14 sm:px-20" : "px-4 sm:px-8"}`}
      data-image-lightbox-root
      role="dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setPreview(null);
        }
      }}
    >
      <button
        ref={closeButtonRef}
        aria-label="关闭图片预览"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-black/48 text-white shadow-[0_18px_42px_-22px_rgba(0,0,0,0.6)] backdrop-blur transition duration-200 hover:bg-white hover:text-[#132968] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
        type="button"
        onClick={() => setPreview(null)}
      >
        <X aria-hidden="true" size={22} strokeWidth={2.2} />
      </button>
      {hasMultipleImages ? (
        <>
          <button
            aria-label="上一张图片"
            className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-black/48 text-white transition hover:bg-white hover:text-[#132968] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            type="button"
            onClick={() => changeImage(-1)}
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            aria-label="下一张图片"
            className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/16 bg-black/48 text-white transition hover:bg-white hover:text-[#132968] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            type="button"
            onClick={() => changeImage(1)}
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
          <p
            aria-atomic="true"
            aria-live="polite"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/48 px-4 py-2 text-sm text-white"
          >
            {preview.index + 1} / {preview.images.length}
          </p>
        </>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={currentImage.alt}
        className="max-h-[calc(100dvh-10rem)] max-w-full rounded-md object-contain shadow-[0_26px_80px_-28px_rgba(0,0,0,0.78)]"
        decoding="async"
        src={currentImage.src}
      />
    </div>
  );
}
