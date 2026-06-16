"use client";

import { useState, useRef, useEffect } from "react";

/**
 * AnimatedSelect
 * A custom dropdown with smooth expand/collapse transition,
 * styled to match the BookingForm input fields.
 *
 * @param {{
 *   icon?: string,        // path to icon svg, must start with "/"
 *   value: string,
 *   onChange: (value: string) => void,
 *   options: Array<{ label: string, value: string }>,
 *   placeholder?: string,
 * }} props
 */
export default function AnimatedSelect({
  icon,
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border w-full text-left"
      >
        {icon && (
          <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square shrink-0">
            <img src={icon} alt="" />
          </span>
        )}
        <span
          className={`text-text-primery leading-normal w-full max-lg:text-sm truncate ${
            !selected ? "text-gray-400" : ""
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
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

      {/* Options panel */}
      <div
        className={`absolute left-0 right-0 top-full mt-1.5 z-30 origin-top transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <ul className="max-h-60 overflow-y-auto rounded-lg border border-border bg-white shadow-lg py-1.5">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 max-lg:text-sm leading-normal transition-colors duration-150 hover:bg-amber-50 ${
                  option.value === value
                    ? "text-amber-600 font-medium"
                    : "text-text-primery"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
