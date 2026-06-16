import React from "react";
import Banner from "@/components/Banner/Banner";
import Contactinfocards from "@/components/Contactinfocard";
import ContactSection from "../../components/Contactsection";
import AboutSection from "../../components/Aboutsection";
import WhyChooseUs from "@/components/WhyChooseUs";

import bannerData from "@/data/bannerData.json";
import contactInfoCardsData from "@/data/contactInfoCardsData.json";
import contactSectionData from "@/data/contactSectionData.json";
import aboutData from "@/data/aboutData.json";
import whyChooseUsData from "@/data/whyChooseUsData.json";

function page() {
  return (
    <div>
      <Banner data={bannerData} />
      <Contactinfocards cards={contactInfoCardsData} />
      <ContactSection data={contactSectionData} />
      <AboutSection data={aboutData} />
      <WhyChooseUs features={whyChooseUsData} />
    </div>
  );
}

export default page;
