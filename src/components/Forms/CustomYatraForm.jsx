"use client";

import { useState } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import AnimatedSelect from "../Forms/AnimatedSelect";
import SubmitModal from "../PopModal/SubmitModal";

const CITY_OPTIONS = [
  { value: "Haridwar", label: "Haridwar" },
  { value: "Rishikesh", label: "Rishikesh" },
  { value: "Dehradun", label: "Dehradun" },
  { value: "Kotdwar", label: "Kotdwar" },
  { value: "Delhi", label: "Delhi" },
];

const VEHICLE_OPTIONS = [
  { value: "Swift Dzire", label: "Swift Dzire" },
  { value: "Toyota Glanza", label: "Toyota Glanza" },
  { value: "Maruti Suzuki Ertiga", label: "Maruti Suzuki Ertiga" },
  { value: "Traveller", label: "Traveller" },
];

const WHATSAPP_NUMBER = "917409199129";

export default function CustomYatraForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    travelDate: "",
    days: "",
    people: "",
    vehicle: "",
    requirements: "",
    honeypot: "", // Honeypot field for bot protection
  });

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmittedOnWhatsApp, setIsSubmittedOnWhatsApp] = useState(false);

  const isFormComplete =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.pickup.trim() !== "" &&
    form.travelDate.trim() !== "" &&
    form.days.toString().trim() !== "" &&
    form.people.toString().trim() !== "";

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFieldValue = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  function closePopup() {
    setShowPopup(false);
    setSubmittedData(null);
    setIsSubmittedOnWhatsApp(false);
    setMessage("");
    setStatus("idle");
  }

  function handleWhatsAppRedirect() {
    if (!submittedData) return;

    const whatsappText = `
🚕 *New Custom Yatra Request*

👤 *Name:* ${submittedData.name}
📞 *Phone:* ${submittedData.phone}
📍 *Pickup:* ${submittedData.pickup}
📅 *Travel Date:* ${submittedData.travelDate}
⏳ *No. of Days:* ${submittedData.days} Days
👥 *No. of People:* ${submittedData.people} pax
🚗 *Vehicle:* ${submittedData.vehicle || "Not selected"}
📝 *Special Requirements:* ${submittedData.requirements || "None"}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappText);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );

    setIsSubmittedOnWhatsApp(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const submittedDetails = { ...form };

    setTimeout(() => {
      // 1. Show details estimation popup
      setSubmittedData(submittedDetails);
      setShowPopup(true);
      setIsSubmittedOnWhatsApp(false);
      setStatus("success");

      // 2. Clear inputs
      setForm({
        name: "",
        phone: "",
        pickup: "",
        travelDate: "",
        days: "",
        people: "",
        vehicle: "",
        requirements: "",
        honeypot: "",
      });

      // 3. Call Nodemailer API asynchronously
      fetch("/api/custom-yatra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Custom yatra request sent to dispatch successfully.");
          } else {
            console.warn(
              "Background custom yatra submission failed:",
              data.message,
            );
          }
        })
        .catch((err) => {
          console.error("Background custom yatra submission errored:", err);
        });
    }, 2500); // 2.5s spinner delay
  }

  return (
    <>
      <MaxWidthContainer id="custom-yatra-form" className="mb-4 lg:my-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:h2 font-extrabold text-gray-900 mb-2">
            Plan Your Custom Yatra
          </h2>
          <p className="text-text-secondary max-lg:text-sm leading-normal">
            Tell us your requirements and we&apos;ll create a perfect itinerary
            for you.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mx-auto rounded-2xl border border-border p-4 lg:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4">
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
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Full Name"
                  className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                Phone Number
              </label>
              <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
                <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                  <img
                    src="/icons/fluent_call-16-regular.svg"
                    alt="phone icon"
                  />
                </span>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="e.g. +91 9876543210"
                  className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400"
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
                value={form.pickup}
                onChange={handleFieldValue("pickup")}
                options={CITY_OPTIONS}
                placeholder="Select City"
              />
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
                  required
                  value={form.travelDate}
                  onChange={handleChange("travelDate")}
                  className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-50"
                />
              </div>
            </div>

            {/* No. of Days */}
            <div className="flex flex-col">
              <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                No. of Days
              </label>
              <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
                <input
                  type="number"
                  required
                  value={form.days}
                  onChange={handleChange("days")}
                  placeholder="e.g. 5"
                  className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* No. of People */}
            <div className="flex flex-col">
              <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                No. of People
              </label>
              <div className="flex items-center gap-1.25 lg:gap-2.5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
                <input
                  type="number"
                  required
                  value={form.people}
                  onChange={handleChange("people")}
                  placeholder="e.g. 4"
                  className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Choose Vehicle */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                Choose Vehicle
              </label>
              <AnimatedSelect
                icon="/icons/car.svg"
                value={form.vehicle}
                onChange={handleFieldValue("vehicle")}
                options={VEHICLE_OPTIONS}
                placeholder="Select Vehicle"
                openDirection="up"
              />
            </div>

            {/* Specific Places / Requirements */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                Specific Places to Visit / Requirements
              </label>
              <textarea
                value={form.requirements}
                onChange={handleChange("requirements")}
                placeholder="e.g.  I want to visit Triyuginarayan Temple also..."
                rows={5}
                className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border resize-none"
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
                value={form.honeypot}
                onChange={handleChange("honeypot")}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2 w-full mt-1 lg:mt-2">
              <button
                type="submit"
                disabled={!isFormComplete || status === "loading"}
                className="text-text-primary leading-normal max-lg:text-sm font-bold flex justify-center items-center gap-2.5 py-2 lg:py-3.5 w-full bg-primary rounded-lg cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
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
                  <span>Get Custom Quote</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </MaxWidthContainer>

      {/* Submit Popup estimation ticket & thank you views */}
      <SubmitModal
        showPopup={showPopup}
        submittedData={submittedData}
        isSubmittedOnWhatsApp={isSubmittedOnWhatsApp}
        closePopup={closePopup}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        setIsSubmittedOnWhatsApp={setIsSubmittedOnWhatsApp}
        type="yatra"
      />
    </>
  );
}
