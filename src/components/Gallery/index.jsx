"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ============================================================
import defaultGalleryData from "@/data/galleryData.json";

const defaultPhotos = defaultGalleryData.photos;
const defaultFilters = defaultGalleryData.filters;

// ─────────────────────────────────────────────────────────────
function PhotoCard({ photo, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const aspect =
    photo.width && photo.height ? `${photo.width}/${photo.height}` : "1/1";

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-zoom-in group mb-3 bg-gray-50"
      style={{ breakInside: "avoid" }}
      onClick={() => onOpen(photo)}
    >
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {/* Skeleton while image loads, or error state */}
        {(!loaded || error) && (
          <div
            className="absolute inset-0 rounded-xl animate-pulse z-10 flex items-center justify-center"
            style={{ background: photo.color ? photo.color + "22" : "#f3f4f6" }}
          >
            {error && (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
        )}

        {!error && (
          <Image
            src={photo.thumb}
            alt={`Photo by ${photo.author}`}
            width={photo.width || 600}
            height={photo.height || 600}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`w-full h-auto rounded-xl transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
          />
        )}
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Author + location on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20">
        <p className="text-white text-xs font-semibold drop-shadow">
          {photo.author}
        </p>
        {photo.location && (
          <p className="text-white/70 text-xs">{photo.location}</p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Close"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Previous"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Full image */}
      <img
        src={photo.src}
        alt={`Photo by ${photo.author}`}
        className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition"
        aria-label="Next"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function ImageGallery({
  photos = defaultPhotos,
  filters = defaultFilters,
}) {
  // "All" selected by default → shows every image
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxPhoto, setLightbox] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Filter logic — "All" skips tag check
  const filtered = photos.filter((p) => {
    const matchFilter =
      activeFilter === "All" ||
      p.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase());

    const matchSearch =
      search === "" ||
      p.author.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.includes(search.toLowerCase()));

    return matchFilter && matchSearch;
  });

  function openLightbox(photo) {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    setLightboxIdx(idx);
    setLightbox(photo);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function goPrev() {
    const newIdx = (lightboxIdx - 1 + filtered.length) % filtered.length;
    setLightboxIdx(newIdx);
    setLightbox(filtered[newIdx]);
  }

  function goNext() {
    const newIdx = (lightboxIdx + 1) % filtered.length;
    setLightboxIdx(newIdx);
    setLightbox(filtered[newIdx]);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex-shrink-0 text-left">
            Travel Gallery
          </span>

          {/* Search */}
          <div className="w-full md:w-auto flex-1 flex items-center gap-2.5 bg-gray-100 rounded-full px-4 py-2 sm:py-2.5 max-w-xl">
            <svg
              className="text-gray-400 shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search photos by location, author or tag…"
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter pills — "All" is active by default */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === f
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* ── Gallery grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-base text-center">
              No photos found for "<strong>{search || activeFilter}</strong>"
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="text-sm text-gray-900 underline underline-offset-2"
            >
              Show all photos
            </button>
          </div>
        ) : (
          /* ANTIGRAVITY CHANGE: Using CSS Columns for native, fully responsive masonry layouts so no images are hidden/lost on mobile. Showing 2 columns on mobile and 3 on desktop. */
          <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance] space-y-3">
            {filtered.map((p) => (
              <PhotoCard key={p.id} photo={p} onOpen={openLightbox} />
            ))}
          </div>
        )}
      </main>

      {/* ── Lightbox ── */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
