"use client";
import React from "react";

export default function ThankYouView({ closePopup }) {
  return (
    <>
      {/* Checkmark icon for Thank You */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Thank you content */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-2">
        Thank You for Booking! 🎉
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm lg:text-base mb-5 sm:mb-6">
        We have received your details and we will get back to you soon.
      </p>

      {/* Close Button */}
      <button
        type="button"
        onClick={closePopup}
        className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-md"
      >
        Close
      </button>
    </>
  );
}
