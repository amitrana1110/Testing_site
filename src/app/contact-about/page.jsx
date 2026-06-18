import React from "react";
import Banner from "@/components/Banner/Banner";
import Contactinfocards from "@/components/Contactinfocard";
import ContactSection from "../../components/Contactsection";
import AboutSection from "../../components/Aboutsection";
import WhyChooseUs from "@/components/WhyChooseUs";

import aboutBannerData from "@/data/aboutBannerData.json";
import contactInfoCardsData from "@/data/contactInfoCardsData.json";
import contactSectionData from "@/data/contactSectionData.json";
import aboutData from "@/data/aboutData.json";
import whyChooseAbout from "@/data/whyChooseAbout.json";

export const metadata = {
  title: "About Us & Contact Cabs Booking | Rana Taxi Services",
  description:
    "Learn more about our premium travel services, verified local drivers, clean vehicles, and check our office location details to get custom quotes.",
  keywords: [
    "about Rana taxi",
    "contact taxi service",
    "Kotdwara cab number",
    "book cab Rishikesh",
  ],
};

function page() {
  return (
    <div>
      <Banner data={aboutBannerData} />
      <Contactinfocards cards={contactInfoCardsData} />
      <ContactSection data={contactSectionData} />
      <AboutSection data={aboutData} />
      <WhyChooseUs features={whyChooseAbout} />
    </div>
  );
}

export default page;
