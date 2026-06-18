import Link from "next/link";
import Image from "next/image";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import BookingForm from "../Forms";
import defaultHeroData from "@/data/heroData.json";

export default function HeroSection({ data = defaultHeroData }) {
  const {
    badge = defaultHeroData.badge,
    titlePart1 = defaultHeroData.titlePart1,
    titlePart2 = defaultHeroData.titlePart2,
    titleHighlight = defaultHeroData.titleHighlight,
    subtext = defaultHeroData.subtext,
    callText = defaultHeroData.callText,
    callNumber = defaultHeroData.callNumber,
    whatsappText = defaultHeroData.whatsappText,
    whatsappLink = defaultHeroData.whatsappLink,
    bookingTitle = defaultHeroData.bookingTitle,
    bookingSubtext = defaultHeroData.bookingSubtext,
  } = data || {};

  return (
    <section className="relative overflow-hidden w-full">
      {/* Optimized Background Image with high loading priority (LCP element) */}
      <Image
        src="/assets/images/bg.webp"
        alt="Rana Taxi Services Background"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <MaxWidthContainer>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center py-10 lg:py-18 gap-5 lg:gap-0 sm:px-6 lg:px-0">
          {/* LEFT */}
          <div className="flex flex-col items-start max-lg:items-center gap-4 w-full lg:max-w-[520px]">
            {/* Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 lg:py-[7px] lg:px-[19px] bg-text-primary border border-primary w-fit rounded-[29px]">
              {/* Pulsing dot — replaces the static yellow_circle.svg */}
              <span className="relative flex items-center justify-center w-3 h-3">
                {/* Wave ring 1 */}
                <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-75 animate-pulse" />
                {/* Wave ring 2 — delayed */}
                <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-40 animate-ping [animation-delay:0.10s]" />
                {/* Inner solid dot */}
                <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
              </span>
              <span className="text-primary max-lg:text-[10px] font-semibold">
                {badge}
              </span>
            </div>

            {/* Heading */}
            <div className="flex flex-col items-start gap-5 lg:gap-[41px] self-stretch">
              <div className="top max-lg:text-center">
                <h1 className="text-[30px] lg:h1 font-bold leading-normal text-white">
                  {titlePart1}
                  <span className="text-primary leading-normal ">
                    {titleHighlight}
                  </span>
                </h1>
                <p className="mt-1.25 text-white leading-normal text-sm lg:text-[20px] max-w-[382px]">
                  {subtext}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col max-lg:justify-center sm:flex-row gap-3 w-full">
                <Link
                  href={`tel:${callNumber.replace(/\s+/g, "")}`}
                  className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
                >
                  <span className="w-6 h-6 aspect-square">
                    <img
                      src="/icons/fluent_call-32-call.svg"
                      alt="phone icon"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="text-white leading-normal font-semibold">
                    {callText}
                  </span>
                </Link>

                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-lg:justify-center items-end gap-1 bg-black hover:bg-text-secondary transition duration-300 text-white font-semibold px-4.75 py-3 rounded-lg border border-border backdrop-blur-sm"
                >
                  <span className="w-6 h-6 aspect-square">
                    <img
                      src="/icons/whatsapp_icon.svg"
                      alt="whatsapp icon"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="text-white leading-normal font-semibold">
                    {whatsappText}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="w-full lg:max-w-[651px] flex flex-col items-start gap-2.5 lg:gap-6 bg-white rounded-2xl px-3 py-5 lg:py-6 lg:px-4.75">
            <div>
              <h2 className="text-text-primary text-[20px] lg:h2 leading-normal font-semibold">
                {bookingTitle}
              </h2>
              <p className="text-text-secondary max-lg:text-sm leading-normal font-semibold">
                {bookingSubtext}
              </p>
            </div>
            {/* BookingForm includes the submit button */}
            <BookingForm />
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
