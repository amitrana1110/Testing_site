"use client";
import React from "react";

export default function TicketDetailsView({
  submittedData,
  handleWhatsAppRedirect,
  closePopup,
}) {
  return (
    <>
      {/* Checkmark icon */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-emerald-100">
        <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Headings */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-tight mb-1">
        Estimating Ticket Created!
      </h3>
      <p className="text-[10px] sm:text-xs font-bold text-amber-500 tracking-wider uppercase mb-4 sm:mb-5">
        RANA TAXI SERVICES KOTDWAR
      </p>

      {/* Details Box */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left text-xs sm:text-sm text-slate-700 space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1.5">
          <span className="font-semibold text-slate-500 shrink-0">Customer:</span>
          <span className="font-bold text-slate-900 text-right break-all">{submittedData.name}</span>
        </div>
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1.5">
          <span className="font-semibold text-slate-500 shrink-0">Phone:</span>
          <span className="font-bold text-slate-900 text-right">{submittedData.phone}</span>
        </div>
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1.5">
          <span className="font-semibold text-slate-500 shrink-0">From &rarr; To:</span>
          <span className="font-bold text-slate-900 text-right break-words">{submittedData.pickup} &rarr; {submittedData.destination}</span>
        </div>
        <div className="flex justify-between gap-3 items-start border-b border-slate-100 pb-1.5">
          <span className="font-semibold text-slate-500 shrink-0">Date &amp; Time:</span>
          <span className="font-bold text-slate-900 text-right">{submittedData.travelDate}</span>
        </div>
        <div className="flex justify-between gap-3 items-start">
          <span className="font-semibold text-slate-500 shrink-0">Vehicle Pref:</span>
          <span className="font-bold text-slate-900 text-right break-words">{submittedData.vehicle || "Not selected"}</span>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
        To secure the absolute maximum discount and receive your fast price breakdown instantly, click the button below to forward your detailed query directly to our driver dispatcher Desk over WhatsApp.
      </p>

      {/* WhatsApp Action Button */}
      <button
        type="button"
        onClick={handleWhatsAppRedirect}
        className="w-full bg-[#00a86b] hover:bg-[#008f5a] text-white font-bold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl flex items-center justify-center gap-2 sm:gap-2.5 shadow-md transition-all duration-200 text-sm sm:text-base"
      >
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.851-4.411 9.855-9.845.002-2.632-1.019-5.107-2.875-6.967C16.38 1.932 13.91 .912 11.285.912c-5.442 0-9.857 4.417-9.86 9.851-.001 1.625.421 3.21 1.22 4.627L1.625 21.82l6.5-1.666zM17.476 14.39c-.329-.165-1.947-.961-2.245-1.07-.3-.108-.518-.163-.735.163-.216.325-.838 1.07-.102 1.81.165.166.329.183.658.018.33-.165 1.39-.512 2.647-1.633.978-.872 1.637-1.95 1.83-2.28.192-.327.02-.504-.145-.669-.148-.148-.329-.382-.493-.574-.165-.192-.22-.329-.33-.55-.11-.217-.054-.407-.027-.57.027-.165.217-.837.297-1.03.078-.188.156-.163.216-.166l.183-.003c.165 0 .435.061.662.31.228.249.869.849.869 2.071 0 1.222-.89 2.403-.99 2.537-.099.134-1.753 2.677-4.247 3.754-.593.256-1.055.409-1.416.524-.596.189-1.138.162-1.566.098-.479-.072-1.48-.606-1.69-1.192-.211-.586-.211-1.09-.148-1.192.062-.103.228-.165.558-.33z"/>
        </svg>
        Send Request to WhatsApp
      </button>

      {/* Call Hotline section */}
      <div className="my-4 sm:my-5">
        <div className="flex items-center justify-center my-3">
          <div className="border-t border-slate-200 flex-grow mr-3"></div>
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-wider">OR CALL HOTLINE</span>
          <div className="border-t border-slate-200 flex-grow ml-3"></div>
        </div>
        <a
          href="tel:+919528615204"
          className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-2.5 px-3 sm:py-3 sm:px-6 rounded-xl flex items-center justify-center gap-2 sm:gap-2.5 shadow-sm transition-all duration-200 text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
          </svg>
          Direct Call: +91 95286 15204
        </a>
      </div>

      {/* Dismiss Link */}
      <button
        type="button"
        onClick={closePopup}
        className="text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors duration-150"
      >
        Dismiss &amp; Go back to website
      </button>
    </>
  );
}
