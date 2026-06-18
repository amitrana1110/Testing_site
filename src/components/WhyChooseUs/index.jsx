"use client";

import MaxWidthContainer from "../Common/MaxWidthContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import defaultFeatures from "@/data/whyChooseUsData.json";

function FeatureCard({ feature }) {
  return (
    <div className="flex h-full py-8 px-4 flex-col items-start gap-3.5 shrink-0 border border-border bg-background rounded-2xl">
      {/* Icon circle */}
      <div className="w-10 h-10 lg:w-15.5 lg:h-15.5 aspect-square bg-primary flex items-center justify-center rounded-full">
        <img
          src={feature.icon}
          alt={feature.title}
          className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
        />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-1.25 lg:gap-2">
        <h3 className="text-text-primary text-sm lg:text-lg font-semibold leading-normal">
          {feature.title}
        </h3>
        <p className="text-text-secondary text-sm lg:text-lg leading-normal">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs({ features = defaultFeatures }) {
  return (
    <section className="w-full bg-white pt-16 pb-10">
      <MaxWidthContainer className="p-0!">
        <div className="flex flex-col items-center lg:px-4 lg:px-0">
          {/* Header */}
          <div className="flex flex-col items-center gap-1 lg:gap-2.5 self-stretch">
            <p className="text-primary text-[16px] lg:text-lg font-semibold leading-normal text-center uppercase">
              Our Promise
            </p>
            <h2 className="text-text-primary text-2xl lg:text-[36px] font-semibold leading-normal text-center">
              Why Choose Rana Taxi?
            </h2>
            <div className="w-35.25 h-1 lg:h-1.5 bg-primary rounded-full" />
          </div>

          {/* Desktop Grid — NO CHANGE */}
          <div className="hidden lg:grid grid-cols-4 gap-5.75 w-full mt-10">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="lg:hidden w-full mt-10 overflow-x-clip">
            <Swiper
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 2.5 },
                640: { slidesPerView: 2.5 },
              }}
              style={{ paddingLeft: "16px", paddingRight: "16px" }}
              className="pb-10!"
              // CHANGE: stretch makes ALL slides — including the last one —
              // take the height of the tallest visible slide at all times
              wrapperClass="!items-stretch"
            >
              {features.map((feature) => (
                // CHANGE: h-full on SwiperSlide works now because parent is stretch
                <SwiperSlide key={feature.title} className="h-auto!">
                  <FeatureCard feature={feature} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
