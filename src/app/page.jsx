import HeroSection from "@/components/Banner/HeroSection";
import React from "react";
import WhyChooseUs from "@/components/WhyChooseUs";
import RouteCard from "@/components/RouteCard";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/Faq";

import heroData from "@/data/heroData.json";
import whyChooseUsData from "@/data/whyChooseUsData.json";
import routeData from "@/data/routeData.json";
import testimonialsData from "@/data/testimonialsData.json";
import faqData from "@/data/faqData.json";

function Home() {
  return (
    <>
      <HeroSection data={heroData} />
      <WhyChooseUs features={whyChooseUsData} />
      <RouteCard routes={routeData} />
      <Testimonials testimonials={testimonialsData} />
      <FAQ faqs={faqData} />
    </>
  );
}

export default Home;
