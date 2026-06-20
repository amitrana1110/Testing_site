"use client";

import { useState } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import ScrollReveal from "../Common/ScrollReveal";
import defaultContactSectionData from "@/data/contactSectionData.json";
import SubmitModal from "@/components/PopModal/SubmitModal";

const WHATSAPP_NUMBER = "917409199129";

export default function ContactSection({ data = defaultContactSectionData }) {
  const {
    title = defaultContactSectionData.title,
    mapUrl = defaultContactSectionData.mapUrl,
  } = data || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [apiMessage, setApiMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmittedOnWhatsApp, setIsSubmittedOnWhatsApp] = useState(false);

  const isFormComplete =
    form.name.trim() !== "" &&
    form.phone.replace(/\D/g, "").length >= 10;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function closePopup() {
    setShowPopup(false);
    setSubmittedData(null);
    setIsSubmittedOnWhatsApp(false);
    setApiMessage("");
    setStatus("idle");
  }

  function handleWhatsAppRedirect() {
    if (!submittedData) return;

    const whatsappText = `
🚕 *New Contact Inquiry*

👤 *Name:* ${submittedData.name}
📞 *Phone:* ${submittedData.phone}
📝 *Message:* ${submittedData.message || "No message provided."}
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

  async function handleSubmit(e) {
    e.preventDefault();

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus("error");
      setApiMessage("Phone number must be at least 10 digits.");
      return;
    }

    setStatus("loading");
    setApiMessage("");

    const submittedDetails = { ...form };

    setTimeout(() => {
      // 1. Show popup overlay with details
      setSubmittedData(submittedDetails);
      setShowPopup(true);
      setIsSubmittedOnWhatsApp(false);
      setStatus("success");

      // 2. Reset form input fields
      setForm({
        name: "",
        phone: "",
        message: "",
        honeypot: "",
      });

      // 3. Fire the email API in the background asynchronously so the client is not blocked
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Background contact email sent successfully.");
          } else {
            console.warn(
              "Background contact email submission failed:",
              data.message,
            );
          }
        })
        .catch((err) => {
          console.error("Background contact email submission errored:", err);
        });
    }, 2500); // 2.5 second delay to show button loading spinner
  }

  return (
    <>
      <MaxWidthContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start lg:mt-7">
          {/* Left: Form */}
          <ScrollReveal direction="up" className="w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-2xl border border-border p-3 lg:p-5.5"
            >
              <h2 className="h2 lg:text-[36px] font-bold leading-normal text-text-primary mb-2 lg:mb-4">
                {title}
              </h2>

              <div className="flex flex-col gap-4 lg:gap-5">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                    Name
                  </label>
                  <div className="flex items-center gap-1.25 lg:gap-5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
                    <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                      <img src="/icons/lucide_user.svg" alt="user icon" />
                    </span>
                    <input
                      type="text"
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
                  <div className="flex items-center gap-1.25 lg:gap-5 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border">
                    <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                      <img
                        src="/icons/fluent_call-16-regular.svg"
                        alt="user icon"
                      />
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="e.g +91 98765 43210"
                      className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-text-secondary max-lg:text-sm leading-normal mb-1.25">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="e.g.  I want to visit Triyuginarayan Temple also..."
                    rows={6}
                    className="text-text-primery max-lg:text-sm leading-normal w-full outline-none bg-transparent placeholder:text-gray-400 p-2.5 lg:py-4 lg:px-5.25 rounded-lg self-stretch border border-border resize-none"
                  />
                </div>

                {/* Honeypot field (hidden for users, filled by bots) */}
                <div style={{ display: "none" }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange("honeypot")}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Success / Error message */}
                {apiMessage && (
                  <div
                    className={`col-span-1 sm:col-span-2 px-4 py-3 rounded-lg text-sm font-medium ${
                      status === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {apiMessage}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isFormComplete || status === "loading"}
                  className="text-text-primary leading-normal max-lg:text-sm font-bold flex justify-center items-center gap-2.5 py-3 lg:py-3.5 w-full bg-primary rounded-lg cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed mt-1 lg:mt-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-text-primary"
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
                      <span>Get Custom Quote</span>
                      <span>
                        <img src="/icons/glyphs_arrow-bold.svg" alt="arrow" />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>

          {/* Right: Map */}
          <ScrollReveal direction="up" delay={200} className="w-full h-100 lg:h-full lg:min-h-140">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-border">
              <iframe
                title="Our location map"
                src={mapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </MaxWidthContainer>

      <SubmitModal
        showPopup={showPopup}
        submittedData={submittedData}
        isSubmittedOnWhatsApp={isSubmittedOnWhatsApp}
        closePopup={closePopup}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        setIsSubmittedOnWhatsApp={setIsSubmittedOnWhatsApp}
        type="contact"
      />
    </>
  );
}
