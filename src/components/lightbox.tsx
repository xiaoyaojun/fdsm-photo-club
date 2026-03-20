"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const lightboxSrc = target.closest("[data-lightbox]")?.getAttribute("data-lightbox");
      if (lightboxSrc) {
        setSrc(lightboxSrc);
        document.body.style.overflow = "hidden";
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("click", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  const close = () => {
    setSrc(null);
    document.body.style.overflow = "";
  };

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center cursor-zoom-out animate-in fade-in duration-300"
      onClick={close}
    >
      <button
        onClick={close}
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt=""
        className="max-w-[90vw] max-h-[90vh] object-contain rounded"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
