"use client";
import { useEffect } from "react";
import BookingForm from ".";

export default function BookingFormModal({ isOpen, onClose }) {
  useEffect(() => {
    // Don't lock body scroll — let the overlay handle scrolling
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Outer overlay — THIS scrolls, not the inner modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          
          {/* Modal card — NO max-h, NO overflow */}
          <div
            className="relative w-full max-w-[800px] bg-white rounded-2xl border border-border shadow-2xl flex flex-col my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-900 leading-normal">
                  Book Your Ride
                </h2>
                <p className="text-text-secondary max-lg:text-sm leading-normal">
                  Fill in the details to get an instant quote
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150 shrink-0 ml-4"
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form body — NO overflow-y-auto here */}
            <div className="p-5 lg:p-6">
              <BookingForm />
            </div>

            {/* Dismiss */}
            <div className="px-5 pb-5 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs lg:text-sm text-text-secondary leading-normal underline underline-offset-2 hover:text-text-primary transition-colors duration-200"
              >
                No thanks, I will browse further
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}