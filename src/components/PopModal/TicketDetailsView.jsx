"use client";
import Link from "next/link";
import React from "react";

export default function TicketDetailsView({
  submittedData,
  handleWhatsAppRedirect,
  closePopup,
  type = "booking",
}) {
  const callNumber = "+91 95286 15204";
  const callText = "Direct Call: +91 95286 15204";
  const whatsappText = "Send Request to WhatsApp";
  const whatsappLink = "#";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Checkmark icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-2 border border-emerald-100 shrink-0">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Headings */}
      <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 leading-tight mb-0.5 text-center">
        {type === "contact"
          ? "Enquiry Ticket Created!"
          : "Estimating Ticket Created!"}
      </h3>
      <p className="text-[9px] sm:text-[10px] font-bold text-amber-500 tracking-wider uppercase mb-3 text-center">
        RANA TAXI SERVICES KOTDWAR
      </p>

      {/* Details Box */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 sm:p-3 text-left text-[11px] sm:text-xs text-slate-700 space-y-1.5 mb-2.5 w-full">
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
          <span className="font-semibold text-slate-500 shrink-0">
            Customer:
          </span>
          <span className="font-bold text-slate-900 text-right break-all">
            {submittedData.name}
          </span>
        </div>
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
          <span className="font-semibold text-slate-500 shrink-0">Phone:</span>
          <span className="font-bold text-slate-900 text-right">
            {submittedData.phone}
          </span>
        </div>

        {type === "yatra" ? (
          <>
            <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
              <span className="font-semibold text-slate-500 shrink-0">
                Pickup City:
              </span>
              <span className="font-bold text-slate-900 text-right break-words">
                {submittedData.pickup}
              </span>
            </div>
            <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
              <span className="font-semibold text-slate-500 shrink-0">
                Duration:
              </span>
              <span className="font-bold text-slate-900 text-right">
                {submittedData.days} Days
              </span>
            </div>
            <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
              <span className="font-semibold text-slate-500 shrink-0">
                No. of People:
              </span>
              <span className="font-bold text-slate-900 text-right">
                {submittedData.people} pax
              </span>
            </div>
          </>
        ) : type === "contact" ? (
          <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
            <span className="font-semibold text-slate-500 shrink-0">
              Message:
            </span>
            <span className="font-bold text-slate-900 text-right break-words">
              {submittedData.message || "No message provided"}
            </span>
          </div>
        ) : (
          <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
            <span className="font-semibold text-slate-500 shrink-0">
              From &rarr; To:
            </span>
            <span className="font-bold text-slate-900 text-right break-words">
              {submittedData.pickup} &rarr; {submittedData.destination}
            </span>
          </div>
        )}

        {type !== "contact" && (
          <>
            <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1">
              <span className="font-semibold text-slate-500 shrink-0">
                Date &amp; Time:
              </span>
              <span className="font-bold text-slate-900 text-right">
                {submittedData.travelDate}
              </span>
            </div>
            <div className="flex justify-between gap-3 items-start">
              <span className="font-semibold text-slate-500 shrink-0">
                Vehicle Pref:
              </span>
              <span className="font-bold text-slate-900 text-right break-words">
                {submittedData.vehicle || "Not selected"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Instructions */}
      <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed mb-3 text-center w-full">
        To secure the absolute maximum discount and receive your fast price
        breakdown instantly, click below to forward your query directly to our
        dispatcher over WhatsApp.
      </p>

      {/* WhatsApp Action Button */}
      <Link
        href={`tel:${callNumber.replace(/\s+/g, "")}`}
        className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
      >
        <span className="w-6 h-6 aspect-square">
          <img
            src="/icons/fluent_call-32-call.svg"
            alt="phone icon"
            width={24}
            height={24}
          />
        </span>
        <span className="text-white leading-normal font-semibold">
          {callText}
        </span>
      </Link>

      {/* Divider */}
      <div className="flex items-center justify-center w-full my-2.5">
        <div className="border-t border-slate-200 flex-grow mr-3"></div>
        <span className="text-[9px] font-bold text-slate-400 leading-normal whitespace-nowrap">
          OR CALL HOTLINE
        </span>
        <div className="border-t border-slate-200 flex-grow ml-3"></div>
      </div>

      {/* Call Button */}
      <Link
        href={whatsappLink}
        onClick={(e) => {
          e.preventDefault();
          handleWhatsAppRedirect();
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
      >
        <span className="w-6 h-6 aspect-square">
          <img
            src="/icons/whatsapp_icon.svg"
            alt="whatsapp icon"
            width={24}
            height={24}
          />
        </span>
        <span className="text-white leading-normal font-semibold">
          {whatsappText}
        </span>
      </Link>

      {/* Dismiss Link */}
      <button
        type="button"
        onClick={closePopup}
        className="mt-3 text-[10px] sm:text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors duration-150 shrink-0"
      >
        Dismiss &amp; Go back to website
      </button>
    </div>
  );
}
