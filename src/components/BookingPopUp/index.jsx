"use client";

import { useState, useEffect } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import Link from "next/link";

const FEATURES = [
  "Instant Ticket Booking",
  "Affordable Base Pricing",
  "Professional Local Drivers",
  "Clean & Sanitized Vehicles",
  "Available 24/7 Security",
  "No Hidden Fees",
];

export default function BookingPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("booking_popup_dismissed");
      if (!isDismissed) {
        const timer = setTimeout(() => setVisible(true), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  function close() {
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("booking_popup_dismissed", "true");
    }
  }

  if (!visible) return null;

  return (
    /* Backdrop */
    <MaxWidthContainer>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={close}
      >
        {/* Modal card */}
        <div
          className="relative w-full max-w-145 bg-white rounded-2xl border border-border p-5 lg:p-7 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 lg:top-4 lg:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150"
            aria-label="Close"
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

          {/* Badge */}
          <p className="max-lg:text-xs font-semibold leading-normal uppercase text-amber-500 mb-2">
            Limited Discount Rates
          </p>

          {/* Title row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl shrink-0">🚕</span>
            <h2 className="text-lg lg:h2 font-bold text-text-primary leading-norml">
              Looking for the Best Taxi Service in Kotdwar?
            </h2>
          </div>

          {/* Description */}
          <p className="text-text-secondary max-lg:text-sm leading-normal mb-4">
            Book your ride with{" "}
            <strong className="text-gray-900">Rana Taxi Services</strong> —
            Uttarakhand&apos;s premier premium cab provider trusted by{" "}
            <strong className="text-gray-900">60+ Happy Customers</strong> with
            an outstanding aggregate rating of{" "}
            <strong className="text-gray-900">4.9★</strong>.
          </p>

          {/* Divider */}
          <hr className="border-border mb-4" />

          {/* Features — 2-col on desktop, 1-col on mobile */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-text-secondary max-lg:text-sm leading-normal"
              >
                <span>
                  <img src="/icons/green_tick.svg" alt="" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="border-border mb-5" />

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center sm:flex-row gap-3">
            <Link
              href="tel:+919528615204"
              className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
            >
              <span className="w-6 h-6 aspect-square">
                <img src="/icons/fluent_call-32-call.svg" alt="phone icon" />
              </span>
              <span className="text-white leading-normal font-semibold">
                Call Now
              </span>
            </Link>

            <Link
              href="https://wa.me/919528615204?text=Hi%2C%20I%20want%20to%20book%20a%20cab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
            >
              <span className="w-6 h-6 aspect-square">
                <img src="/icons/whatsapp_icon.svg" alt="whatsapp icon" />
              </span>
              <span className="text-white leading-normal font-semibold">
                Whats&apos;App Booking
              </span>
            </Link>
          </div>

          {/* Dismiss link */}
          <p className="text-center mt-4">
            <button
              type="button"
              onClick={close}
              className="text-xs lg:text-sm text-text-light leading-normal underline underline-offset-2 hover:text-text-primary transition-colors duration-200"
            >
              No thanks, I will browse further
            </button>
          </p>
        </div>
      </div>
    </MaxWidthContainer>
  );
}
