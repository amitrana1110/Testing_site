// src/components/AutoCarousel.jsx
// Pure Server Component — CSS-only auto-rotating carousel
// No useState, no useEffect, no external carousel library

import Image from "next/image";

/**
 * CSS-only infinite carousel using staggered animation-delay.
 *
 * Technique:
 *   - All slides are absolutely positioned and start at opacity: 0
 *   - Each slide runs the same @keyframes animation over totalDuration
 *   - Slides are staggered by -intervalSeconds delay each
 *   - The keyframe makes a slide visible for its own interval slot then hides it
 *
 * @param {{ images: Array<{src: string, alt: string}>, badge?: string, intervalSeconds?: number }} props
 */
export default function AutoCarousel({ images = [], badge, intervalSeconds = 4 }) {
  if (!images.length) return null;
  const count = images.length;
  const totalDuration = count * intervalSeconds; // 16s for 4 slides @ 4s each

  // Percentages for the keyframe:
  //   Slide becomes visible at 0%, stays visible until (1/count - fadeBuffer)%,
  //   then fades out.
  const slotPct = 100 / count; // 25% per slide
  const fadePct = 5; // % of total duration used for fade in/out

  // Use a small epsilon gap so the "active" (wide/colored) keyframe of one dot
  // ends strictly before the next dot's "active" keyframe begins. Without this,
  // floating point rounding can make two dots appear active at once.
  const gapPct = 0.5;
  const visibleEnd = slotPct - fadePct; // stay fully visible until this %
  const dotActiveEnd = Math.max(0, slotPct - gapPct); // dot stays wide until just before next slot

  const slideAnimName = `charDhamSlide_${count}`;
  const dotAnimName = `charDhamDot_${count}`;

  const keyframes = `
    @keyframes ${slideAnimName} {
      0%            { opacity: 0; transform: scale(1.04); }
      ${fadePct}%   { opacity: 1; transform: scale(1); }
      ${visibleEnd.toFixed(4)}% { opacity: 1; transform: scale(1); }
      ${slotPct.toFixed(4)}%   { opacity: 0; transform: scale(1.02); }
      100%          { opacity: 0; transform: scale(1.02); }
    }

    @keyframes ${dotAnimName} {
      0%            { background-color: #F5A623; width: 20px; border-radius: 4px; }
      ${dotActiveEnd.toFixed(4)}% { background-color: #F5A623; width: 20px; border-radius: 4px; }
      ${slotPct.toFixed(4)}%   { background-color: rgba(255,255,255,0.5); width: 7px; border-radius: 9999px; }
      100%          { background-color: rgba(255,255,255,0.5); width: 7px; border-radius: 9999px; }
    }
  `;

  return (
    <div className="relative w-full h-full overflow-hidden min-h-[300px] md:min-h-[480px]">
      {/* Inject keyframes — <style> tags are valid in RSC */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Badge */}
      {badge && (
        <span
          className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md"
          style={{ background: "#F5A623", color: "#1A1A1A" }}
        >
          {badge}
        </span>
      )}

      {/* Slides */}
      {images.map((img, i) => {
        // Negative delay staggers each slide: slide 0 starts at 0, slide 1 at -4s, etc.
        // Using negative delay means the animation starts mid-cycle so slides are
        // already in the correct offset position on page load — no initial flicker.
        const delaySeconds = -(i * intervalSeconds);

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animationName: slideAnimName,
              animationDuration: `${totalDuration}s`,
              animationDelay: `${delaySeconds}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationFillMode: "both",
              opacity: 0,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        );
      })}

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {images.map((_, i) => {
          const delaySeconds = -(i * intervalSeconds);
          return (
            <span
              key={i}
              className="h-[7px]"
              style={{
                animationName: dotAnimName,
                animationDuration: `${totalDuration}s`,
                animationDelay: `${delaySeconds}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                backgroundColor: i === 0 ? "#F5A623" : "rgba(255,255,255,0.5)",
                width: i === 0 ? "20px" : "7px",
                borderRadius: i === 0 ? "4px" : "9999px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}