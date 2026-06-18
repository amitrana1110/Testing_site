"use client";

import { useState } from "react";
import {
  pickupOptions,
  destinationOptions,
  passengerOptions,
  vehicleOptions,
} from "@/data/bookingData.json";
import AnimatedSelect from "./AnimatedSelect";
import SubmitModal from "@/components/PopModal/SubmitModal";

// ============================================================
// 📱 YOUR WHATSAPP NUMBER — change this to your number
// Format: country code + number, NO spaces, NO dashes, NO +
// Example: India +91 98765 43210 → 919876543210
// ============================================================
const WHATSAPP_NUMBER = "917409199129";

export default function BookingForm({ initialData = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: (initialData.pickup || "").toLowerCase(),
    destination: initialData.destination || "",
    travelDate: "",
    passengers: "1",
    vehicle: "",
    tripType: "one-way",
    honeypot: "", // ANTIGRAVITY CHANGE: Honeypot field to trap automated spambots
  });

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  // ANTIGRAVITY CHANGE: Added states for showing custom ticket popup and tracking WhatsApp redirect state
  const [submittedData, setSubmittedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmittedOnWhatsApp, setIsSubmittedOnWhatsApp] = useState(false);

  // ANTIGRAVITY CHANGE: Checks if all required fields are filled out to enable/disable the Book Now button
  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.pickup.trim() !== "" &&
    formData.destination.trim() !== "" &&
    formData.travelDate.trim() !== "";

  // ANTIGRAVITY CHANGE: Helper to close the popup and reset all message/status states
  function closePopup() {
    setShowPopup(false);
    setSubmittedData(null);
    setIsSubmittedOnWhatsApp(false);
    setMessage(""); // Clear message written above the submit button
    setStatus("idle"); // Reset status back to idle
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ANTIGRAVITY CHANGE: Clear message and reset status when changing trip types
  function handleTripType(type) {
    setFormData((prev) => ({ ...prev, tripType: type }));
    setMessage("");
    setStatus("idle");
  }

  // ANTIGRAVITY CHANGE: Helper function to trigger WhatsApp redirect with filled-out details
  function handleWhatsAppRedirect() {
    if (!submittedData) return;

    const whatsappText = `
🚕 *New Booking Request*

👤 *Name:* ${submittedData.name}
📞 *Phone:* ${submittedData.phone}
🔄 *Trip Type:* ${submittedData.tripType === "round-trip" ? "Round Trip" : "One Way"}
📍 *Pickup:* ${submittedData.pickup}
🏁 *Destination:* ${submittedData.destination}
📅 *Travel Date:* ${submittedData.travelDate}
👥 *Passengers:* ${submittedData.passengers}
🚗 *Vehicle:* ${submittedData.vehicle || "Not selected"}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappText);

    // Opens WhatsApp chat in a new tab
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );

    // Switch popup state to the Thank You screen
    setIsSubmittedOnWhatsApp(true);
  }

  // ANTIGRAVITY CHANGE: Delay form submission by 2.5 seconds to show the loader spinner on the button first, then present the ticket estimation popup.
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage(""); // Make sure no message is displayed above the submit button

    const submittedDetails = { ...formData };

    setTimeout(() => {
      // 1. Show popup overlay with details
      setSubmittedData(submittedDetails);
      setShowPopup(true);
      setIsSubmittedOnWhatsApp(false);
      setStatus("success");

      // 2. Reset form input fields
      setFormData({
        name: "",
        phone: "",
        pickup: "",
        destination: "",
        travelDate: "",
        passengers: "1",
        vehicle: "",
        tripType: "one-way",
        honeypot: "",
      });

      // 3. Fire the email API in the background asynchronously so the client is not blocked
      fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Background email sent successfully.");
          } else {
            console.warn("Background email failed to send:", data.message);
          }
        })
        .catch((err) => {
          console.error("Background email send failed with error:", err);
        });
    }, 2500); // 2.5 seconds delay to show loader spinner
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 self-stretch w-full"
      >
        {/* Trip Type Toggle */}
        <div className="col-span-1 sm:col-span-2">
          <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-transparent w-full">
            <button
              type="button"
              onClick={() => handleTripType("one-way")}
              className={`flex-1 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold leading-normal transition-all duration-200 ${
                formData.tripType === "one-way"
                  ? "bg-primary text-text-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primery"
              }`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => handleTripType("round-trip")}
              className={`flex-1 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold leading-normal transition-all duration-200 ${
                formData.tripType === "round-trip"
                  ? "bg-primary text-text-primary"
                  : "bg-transparent text-text-secondary hover:text-text-primery"
              }`}
            >
              Round Trip
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Name
          </label>
          <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
            <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
              <img src="/icons/lucide_user.svg" alt="user icon" />
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="text-text-primery max-lg:text-sm leading-normal w-full outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Phone
          </label>
          <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
            <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
              <img src="/icons/fluent_call-16-regular.svg" alt="phone icon" />
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="text-text-primery leading-normal w-full max-lg:text-sm outline-none"
            />
          </div>
        </div>

        {/* Pickup */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Pickup
          </label>
          <AnimatedSelect
            icon="/icons/basil_location-outline.svg"
            value={formData.pickup}
            onChange={(val) => handleSelectChange("pickup", val)}
            options={pickupOptions}
            placeholder="Select Pickup"
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Destination
          </label>

          <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
            <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
              <img src="/icons/iconamoon_location-light.svg" alt="user icon" />
            </span>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Your Destination"
              required
              className="text-text-primery max-lg:text-sm leading-normal w-full outline-none"
            />
          </div>
        </div>

        {/* Travel Date */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Travel Date
          </label>
          <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
            <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
              <img src="/icons/uiw_date.svg" alt="calendar icon" />
            </span>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              required
              className="text-text-primery leading-normal w-full max-lg:text-sm outline-none"
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="flex flex-col">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Passengers
          </label>
          <AnimatedSelect
            icon="/icons/lucide_user.svg"
            value={formData.passengers}
            onChange={(val) => handleSelectChange("passengers", val)}
            options={passengerOptions}
            placeholder="Select Passengers"
          />
        </div>

        {/* Choose Vehicle */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
            Choose Vehicle
          </label>
          <AnimatedSelect
            icon="/icons/car.svg"
            value={formData.vehicle}
            onChange={(val) => handleSelectChange("vehicle", val)}
            options={vehicleOptions}
            placeholder="Select Vehicle"
            openDirection="up"
          />
        </div>

        {/* Success / Error message */}
        {message && (
          <div
            className={`col-span-1 sm:col-span-2 px-4 py-3 rounded-lg text-sm font-medium ${
              status === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Honeypot field (hidden for users, filled by bots) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit */}
        <div className="col-span-1 sm:col-span-2 w-full">
          <button
            type="submit"
            // ANTIGRAVITY CHANGE: Only enable button when isFormComplete is true, and not loading
            disabled={!isFormComplete || status === "loading"}
            className="text-text-primary leading-normal max-lg:text-sm font-bold flex justify-center items-center gap-2.5 py-2 lg:py-[14px] w-full bg-primary rounded-lg cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span>Book Now</span>
                <span>
                  <img src="/icons/glyphs_arrow-bold.svg" alt="arrow" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* ANTIGRAVITY CHANGE: Rendering the modular SubmitModal component containing Ticket estimation & Thank you views */}
      <SubmitModal
        showPopup={showPopup}
        submittedData={submittedData}
        isSubmittedOnWhatsApp={isSubmittedOnWhatsApp}
        closePopup={closePopup}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        setIsSubmittedOnWhatsApp={setIsSubmittedOnWhatsApp}
      />
    </>
  );
}
