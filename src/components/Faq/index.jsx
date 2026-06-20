"use client";

import { useState } from "react";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import ScrollReveal from "../Common/ScrollReveal";
import defaultFaqs from "@/data/faqData.json";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden ">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center max-lg:w-full lg:justify-between p-2.5 lg:p-6 text-left cursor-pointer"
      >
        <span className="text-text-primary max-lg:w-full text-base lg:text-[22px]  font-medium leading-normal pr-6">
          {faq.question}
        </span>
        {/* Chevron — rotates when open */}
        <span className="">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 26 26"
            className={`lg:w-6.5 lg:h-6.5 w-4 h-4  shrink-0 text-text-secondary transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Answer — smooth expand/collapse */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-2.5 lg:px-6  pb-5 text-text-secondary text-sm leading-normal">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({ faqs = defaultFaqs }) {
  // only one item open at a time — null means all closed
  const [openId, setOpenId] = useState(null);

  function handleToggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="w-full bg-background lg:pb-16 lg:mt-2">
      <MaxWidthContainer>
        <div className="flex flex-col items-center ">
          {/* Heading */}
          <ScrollReveal direction="up">
            <h2 className="text-text-primary text-[28px] lg:text-[36px] font-semibold leading-normal text-center mb-5 lg:mb-10 w-full ">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          {/* FAQ list */}
          <div className="flex flex-col gap-2 w-full max-w-200">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.id} delay={index * 100} direction="up">
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
