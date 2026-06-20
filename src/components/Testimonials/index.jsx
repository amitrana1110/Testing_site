"use client";

import MaxWidthContainer from "../Common/MaxWidthContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import ScrollReveal from "../Common/ScrollReveal";
import defaultTestimonials from "@/data/testimonialsData.json";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <img key={i} src="/icons/star.svg" alt="" width={16} height={16} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex flex-col gap-2 lg:gap-3.5 p-3 lg:py-5.25 lg:px-4 bg-surface rounded-2xl border border-border h-full">
      <div className="w-10 h-10 lg:w-15.5 lg:h-15.5 rounded-full overflow-hidden relative">
        <Image
          src={testimonial.img}
          alt={testimonial.name}
          fill
          sizes="(max-width: 768px) 40px, 62px"
          className="object-cover"
        />
      </div>
      <div className="">
        <h2 className="text-text-primary text-[20px] lg:h2 font-semibold leading-normal">
          {testimonial.name}
        </h2>
        <p className="text-text-secondary text-sm lg:text-lg leading-normal mt-1 flex-1">
          {testimonial.review}
        </p>
        <div className="mt-4">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials = defaultTestimonials }) {
  return (
    <section className="w-full bg-background ">
      <MaxWidthContainer className="px-0!">
        <div className="flex flex-col items-center">
          {/* Header */}
          <ScrollReveal direction="up" className="flex flex-col items-center gap-1 lg:gap-2 mb-5 lg:mb-10">
            <h2 className="text-text-primary h2 lg:text-[36px] font-semibold leading-normal text-center">
              What Our Customers Say
            </h2>
            <p className="text-text-secondary max-lg:text-sm leading-normal text-center">
              Trusted by thousands of happy travelers
            </p>
          </ScrollReveal>

          {/* Single Swiper — autoplay loop, responsive breakpoints */}
          <ScrollReveal direction="up" className="w-full overflow-x-clip">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 10 },
                640: { slidesPerView: 2.2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              style={{ paddingLeft: "4px", paddingRight: "16px" }}
              className="pb-10!"
              wrapperClass="px-4!"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} className="h-auto!">
                  <TestimonialCard testimonial={t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </ScrollReveal>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
