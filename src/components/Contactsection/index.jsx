"use client";

import { useState } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import defaultContactSectionData from "@/data/contactSectionData.json";

export default function ContactSection({ data = defaultContactSectionData }) {
  const {
    title = defaultContactSectionData.title,
    mapUrl = defaultContactSectionData.mapUrl,
  } = data || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form:", form);
  }

  return (
    <MaxWidthContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start lg:mt-7">
        {/* Left: Form */}
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

            {/* Submit */}
            <button
              type="submit"
              className="text-text-primary leading-normal max-lg:text-sm font-bold flex justify-center items-center gap-2.5 py-3 lg:py-3.5 w-full bg-primary rounded-lg cursor-pointer hover:bg-primary-hover transition duration-300 ease-in-out mt-1 lg:mt-2"
            >
              <span>Get Custom Quote</span>
              <span>
                <img src="/icons/glyphs_arrow-bold.svg" alt="arrow" />
              </span>
            </button>
          </div>
        </form>

        {/* Right: Map */}
        <div className="w-full h-100 lg:h-full lg:min-h-140 rounded-2xl overflow-hidden border border-border">
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
      </div>
    </MaxWidthContainer>
  );
}
