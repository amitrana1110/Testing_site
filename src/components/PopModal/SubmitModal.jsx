"use client";
import React from "react";
import TicketDetailsView from "./TicketDetailsView";
import ThankYouView from "./ThankYouView";

export default function SubmitModal({
  showPopup,
  submittedData,
  isSubmittedOnWhatsApp,
  closePopup,
  handleWhatsAppRedirect,
  setIsSubmittedOnWhatsApp,
}) {
  if (!showPopup || !submittedData) return null;

  const handleCloseOrDismiss = () => {
    if (!isSubmittedOnWhatsApp) {
      // Transition to Thank You screen instead of closing
      setIsSubmittedOnWhatsApp(true);
    } else {
      // Close the popup fully
      closePopup();
    }
  };

  // Conditional styling depending on which popup screen is active
  const backdropClasses = !isSubmittedOnWhatsApp
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden"
    : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden p-4";

  const containerClasses = !isSubmittedOnWhatsApp
    ? "relative w-full max-w-[800px] h-full sm:h-[90vh] sm:max-h-[750px] overflow-hidden bg-white rounded-none sm:rounded-3xl border border-gray-100 shadow-2xl p-5 sm:p-8 flex flex-col justify-center items-center text-center z-10 animate-in fade-in zoom-in-95 duration-200"
    : "relative w-full max-w-[480px] h-80 lg:h-100 overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center z-10 animate-in fade-in zoom-in-95 duration-200";

  return (
    <div className={backdropClasses}>
      {/* Modal Backdrop click */}
      <div className="absolute inset-0" onClick={handleCloseOrDismiss} />
      
      <div className={containerClasses}>
        {/* Close Button */}
        <button
          type="button"
          onClick={handleCloseOrDismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150 text-gray-500 z-20"
          aria-label="Close popup"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content Wrapper */}
        <div className="w-full max-w-[460px] flex flex-col justify-center items-center flex-1 my-auto overflow-hidden">
          {!isSubmittedOnWhatsApp ? (
            <TicketDetailsView
              submittedData={submittedData}
              handleWhatsAppRedirect={handleWhatsAppRedirect}
              closePopup={handleCloseOrDismiss}
            />
          ) : (
            <ThankYouView closePopup={handleCloseOrDismiss} />
          )}
        </div>
      </div>
    </div>
  );
}