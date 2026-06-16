"use client";

import { useState } from "react";

export default function AccordionItem({ day, title, description, isLast }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${!isLast ? "border-b border-border" : ""}`}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.25 text-left transition-colors duration-150 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-inset rounded-lg"
      >
        <div className="flex gap-3">
          {/* Day label pill */}
          <span className="border border-border bg-[#F9F9F9] text-text-secondary text-[10px] lg:text-sm font-semibold px-2.5 lg:px-4 py-0.75 rounded-[5px] leading-normal uppercase shrink-0">
            {day}
          </span>

          {/* Title */}
          <span className="text-sm lg:text-base font-medium text-black leading-normal">
            {title}
          </span>
        </div>

        {/* CHANGE: chevron now uses local `open` state instead of `isOpen` prop */}
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 26 26"
          className={`lg:w-6.5 lg:h-6.5 w-4 h-4 shrink-0 text-text-secondary transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Collapsible body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxHeight: open ? "200px" : "0px" }}
        aria-hidden={!open}
      >
        <p className="text-xs text-gray-500 leading-relaxed px-4 pb-3 pt-0.5 pl-[calc(1rem+2.5rem+0.75rem)]">
          {description}
        </p>
      </div>
    </div>
  );
}
