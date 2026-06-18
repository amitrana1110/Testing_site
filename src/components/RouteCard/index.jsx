"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import BookingFormModal from "@/components/Forms/BookingFormModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import defaultRoutes from "@/data/routeData.json";

/* ── Swiper Card ── */
function RouteCard({ route }) {
  return (
    <div className="relative w-full h-105 rounded-2xl overflow-hidden cursor-pointer group">
      <Image
        src={route.img}
        alt={`${route.from} to ${route.to}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        priority={route.id <= 2}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-2">
        <h3 className="text-white text-[24px] lg:h2 font-semibold leading-normal">
          {route.from} →<br />
          {route.to}
        </h3>
        <p className="text-primary text-sm lg:text-[18px] font-semibold tracking-normal uppercase">
          {route.tag}
        </p>
      </div>
    </div>
  );
}

/* ── All Routes Table Row ── */
function RouteRow({ route, onBookNow }) {
  return (
    <div
      className="group flex flex-col gap-2 p-5 bg-white rounded-2xl border border-border text-center h-full
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:shadow-xl cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        {/* Icon circle */}
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <img
            src="/icons/location.svg"
            alt="location icon"
            width={20}
            height={20}
          />
        </div>

        {/* Route title */}
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-text-primary text-[20px] font-semibold leading-normal w-full">
            {route.from} → {route.to}
          </h3>
          <p className="text-text-secondary text-xs font-semibold  uppercase">
            {route.tag}
          </p>
        </div>
      </div>

      {/* Divider with taxi animation on hover */}
      <div className="relative w-full h-px bg-border overflow-visible my-1">
        {/* Static divider line */}
        <div className="absolute inset-0 bg-border" />

        {/* Taxi icon — hidden by default, runs left to right on card hover */}
        {/* translate-x-[-100%] starts it off-screen left, group-hover moves it to off-screen right */}
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2
                        opacity-0 group-hover:opacity-100
                        -translate-x-full group-hover:translate-x-[1000%] lg:group-hover:translate-x-[1200%]
                        transition-all duration-1200 ease-in-out
                        pointer-events-none"
        >
          {/* Inline taxi SVG so no external file needed */}
          <svg
            width="28"
            height="18"
            viewBox="0 0 64 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body */}
            <rect x="4" y="12" width="52" height="14" rx="4" fill="#F5A800" />
            {/* Roof / cabin */}
            <path d="M16 12 L20 4 L44 4 L48 12 Z" fill="#F5A800" />
            {/* Windows */}
            <rect
              x="21"
              y="5"
              width="9"
              height="6"
              rx="1"
              fill="#1a1a1a"
              opacity="0.6"
            />
            <rect
              x="34"
              y="5"
              width="9"
              height="6"
              rx="1"
              fill="#1a1a1a"
              opacity="0.6"
            />
            {/* Wheels */}
            <circle cx="16" cy="26" r="5" fill="#1a1a1a" />
            <circle cx="16" cy="26" r="2" fill="#888" />
            <circle cx="46" cy="26" r="5" fill="#1a1a1a" />
            <circle cx="46" cy="26" r="2" fill="#888" />
            {/* Headlight */}
            <rect
              x="54"
              y="16"
              width="4"
              height="3"
              rx="1"
              fill="#fff"
              opacity="0.9"
            />
            {/* TAXI text */}
            <text
              x="22"
              y="22"
              fontSize="7"
              fontWeight="bold"
              fill="#1a1a1a"
              fontFamily="sans-serif"
            >
              TAXI
            </text>
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center gap-0.5 flex-1">
          <span className="text-xs text-text-secondary font-medium">
            Distance
          </span>
          <span className="text-text-primary text-sm font-bold">
            {route.distance}
          </span>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex flex-col items-center gap-0.5 flex-1">
          <span className="text-xs text-text-secondary font-medium">
            Duration
          </span>
          <span className="text-text-primary text-sm font-bold">
            {route.duration}
          </span>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex flex-col items-center gap-0.5 flex-1">
          <span className="text-xs text-text-secondary font-medium">Fare</span>
          <span className="text-text-primary text-sm font-bold">
            {route.fare}
          </span>
        </div>
      </div>

      {/* Book Now */}
      <button
        onClick={onBookNow}
        className="mt-auto w-full flex items-center justify-center gap-1.5 bg-primary text-text-primary font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-primary-hover"
      >
        <span>Book Now</span>
        <img
          src="/icons/glyphs_arrow-bold.svg"
          alt="arrow"
          className="w-4 h-4"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}

export default function PopularRoutes({ routes = defaultRoutes }) {
  const [showAll, setShowAll] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const swiperRef = useRef(null);

  const handleBookNow = (route) => {
    setSelectedRoute(route);
    setShowBookingModal(true);
  };

  return (
    <>
      <section className="w-full bg-background py-14">
        <MaxWidthContainer className="px-0!">
          <div className="">
            {/* Header row */}
            <div className="flex items-start justify-between px-4 mb-4">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <h2 className="text-text-primary h2 lg:text-[36px] font-bold leading-normal">
                    Popular Routes
                  </h2>
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="lg:hidden flex items-center gap-1 text-text-primary hover:text-text-secondary transition duration-300 text-sm lg:text-[20px] font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {showAll ? (
                      <>
                        <img
                          src="/icons/glyphs_arrow-bold.svg"
                          alt="arrow"
                          className="w-5 h-5 rotate-180"
                          width={20}
                          height={20}
                        />
                        Show Less
                      </>
                    ) : (
                      <>
                        All Routes
                        <img
                          src="/icons/glyphs_arrow-bold.svg"
                          alt="arrow"
                          className="w-5 h-5"
                          width={20}
                          height={20}
                        />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center w-full justify-between">
                  <p className="text-text-secondary text-sm lg:text-[20px] leading-normal">
                    Most frequented destinations by our travelers
                  </p>
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="max-lg:hidden flex items-center gap-1 text-text-primary hover:text-text-secondary transition duration-300 text-sm lg:text-[20px] font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {showAll ? (
                      <>
                        <img
                          src="/icons/glyphs_arrow-bold.svg"
                          alt="arrow"
                          className="w-5 h-5 rotate-180"
                          width={20}
                          height={20}
                        />
                        Show Less
                      </>
                    ) : (
                      <>
                        View All Routes
                        <img
                          src="/icons/glyphs_arrow-bold.svg"
                          alt="arrow"
                          className="w-5 h-5"
                          width={20}
                          height={20}
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SWIPER */}
            {/* CHANGE: overflow-x-clip stops page scroll, overflow visible on Swiper shows right padding */}
            {!showAll && (
              <div className="mt-6 overflow-x-clip">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={1.2}
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  breakpoints={{
                    480: { slidesPerView: 1.5, spaceBetween: 10 },
                    640: { slidesPerView: 2.2, spaceBetween: 10 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                  }}
                  // CHANGE: removed wrapperClass — use style padding instead so
                  // Swiper's own layout engine respects left AND right spacing
                  style={{
                    overflow: "visible",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  // CHANGE: centeredSlidesBounds makes last card stop in center
                  // instead of sticking to the right edge of the screen
                  centeredSlidesBounds={true}
                  className="pb-14!"
                >
                  {routes.map((route) => (
                    <SwiperSlide key={route.id}>
                      <div className="" onClick={() => setShowAll(true)}>
                        <RouteCard route={route} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Both nav buttons on the left, same line as pagination bullets */}
                <div className="max-lg:hidden flex items-center gap-2 px-4 -mt-9">
                  {/* Prev */}
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-primary transition-colors cursor-pointer z-10"
                    aria-label="Previous"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  {/* Next */}
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-white shadow-sm hover:bg-primary transition-colors cursor-pointer z-10"
                    aria-label="Next"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* ALL ROUTES LIST */}
            {showAll && (
              <div className=" px-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {routes.map((route) => (
                  <RouteRow
                    key={route.id}
                    route={route}
                    onBookNow={() => handleBookNow(route)}
                  />
                ))}
              </div>
            )}
          </div>
        </MaxWidthContainer>
      </section>
      <BookingFormModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedRoute(null);
        }}
        initialData={
          selectedRoute
            ? { pickup: selectedRoute.from, destination: selectedRoute.to }
            : null
        }
      />
    </>
  );
}
