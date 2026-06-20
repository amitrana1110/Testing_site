import AutoCarousel from "./AutoCarousel";
import AccordionItem from "./AccordionItem";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import ScrollReveal from "../Common/ScrollReveal";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount, currency) {
  return `${currency}${amount.toLocaleString("en-IN")}`;
}

// ─── Main Component ────────────────────────────────────────────────────────────

/**
 * PackageCard
 *
 * @param {{ pkg: import('../data/packageData').packageData }} props
 */
export default function PackageCard({ pkg }) {
  const {
    badge,
    title,
    price,
    currency,
    images,
    temples,
    includes,
    itinerary,
  } = pkg;

  return (
    <MaxWidthContainer>
      <div className="text-center h2 leading-normal font-bold mt-3 lg:mt-5 mb-5 lg:mb-10 lg:text-[36px]">
        <h1>Char Dham Yatra</h1>
      </div>
      <ScrollReveal direction="up" duration={800}>
        <article
          className="
            w-full max-w-[1220px] mx-auto
            rounded-[18px]
            lg:border border-border
            overflow-hidden
            bg-surface
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-[40%_58%]">
            {/* ── Left: Image Carousel ── */}
            <div className="relative md:min-h-[520px]">
              <AutoCarousel images={images} badge={badge} intervalSeconds={4} />
            </div>

            {/* ── Right: Content ── */}
            <div className="flex flex-col gap-3 lg:gap-7 lg:p-5 md:overflow-y-auto">
              {/* Header: title + price */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="">
                  <h2 className="text-xl tracking-tight lg:h2 font-semibold text-text-primary leading-normal max-lg:mt-4  min-w-[180px]">
                    {title}
                  </h2>
                  <div className="flex gap-2.5 mt-2 lg:mt-4">
                    <span className="flex items-center max-lg:text-xs shrink-0 gap-2.5 border border-border rounded-lg px-2 py-1 text-text-secondary leading-normal">
                      {" "}
                      <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                        <img src="/icons/clock.svg" alt="" />
                      </span>{" "}
                      10-12 Days
                    </span>

                    <span className="flex items-center max-lg:text-xs gap-2.5 border border-border rounded-lg px-2 py-1 text-text-secondary leading-normal">
                      {" "}
                      <span className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                        <img src="/icons/yellow_location.svg" alt="" />
                      </span>{" "}
                      Kotdwar / Dehradun / Delhi
                    </span>
                  </div>
                </div>
                <div className="text-right max-lg:flex items-center gap-2 shrink-0">
                  <p className="text-lg lg:text-xs text-text-secondary leading-normal mb-0.5">
                    Starting from
                  </p>
                  <p
                    className="text-2xl md:text-[1.75rem] font-bold leading-none"
                    style={{ color: "#D4880A" }}
                  >
                    {formatPrice(price, currency)}
                  </p>
                  <p className="text-lg lg:text-xs text-text-secondary leading-normal mt-0.5">
                    per person
                  </p>
                </div>
              </div>

              {/* Temples + Includes grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-15">
                {/* Temples */}
                <div className="">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-6 h-6 aspect-square">
                      <img src="/icons/temple.svg" alt="" />
                    </div>
                    <h3 className="text-[22px] font-medium leading-normal text-text-primary">
                      Temples Covered
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 mt-2 lg:mt-3.75">
                    {temples.map((temple) => (
                      <li
                        key={temple}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span
                          className="mt-[6px] w-[6px] h-[6px] rounded-full shrink-0"
                          style={{ backgroundColor: "#F5A623" }}
                          aria-hidden="true"
                        />
                        {temple}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Includes */}
                <div className="">
                  <div className="flex gap-2.5 items-center">
                    <div className="w-6 h-6 aspect-square">
                      <img src="/icons/tick.svg" alt="" />
                    </div>
                    <h3 className="text-[22px] font-medium leading-normal text-text-primary">
                      Includes
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 mt-2 lg:mt-3.75">
                    {includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <div className="w-4 h-4 lg:w-6 lg:h-6 aspect-square">
                          <img src="/icons/tick.svg" alt="" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Itinerary accordion */}
              <div className="rounded-xl border border-border bg-background overflow-hidden">
                {/* Accordion header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b-2 border-border bg-surface mb-2.5">
                  <div className="w-6 h-6 aspect-square">
                    <img src="/icons/caliender.svg" alt="" />
                  </div>
                  <span className="text-base lg:text-[22px] leading-normal font-medium text-text-primary">
                    Detailed Itinerary
                  </span>
                </div>

                {/* Accordion items */}
                <div className="bg-surface">
                  {itinerary.map((item, index) => (
                    <AccordionItem
                      key={item.day}
                      day={item.day}
                      title={item.title}
                      description={item.description}
                      isLast={index === itinerary.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-5.5 mt-auto pt-1">
                <button
                  type="button"
                  className="
                    w-full px-4.75 py-3 lg:py-5.5 rounded-xl
                    text-text-primary
                    font-bold leading-normal
                    transition-all duration-200
                    hover:-translate-y-0.5 active:scale-[0.98]
                    bg-primary hover:bg-primary-hover
                  "
                >
                  Book {temples.length} Dham Yatra
                </button>

                {/* Desktop link — Opens in a new tab */}
                <a
                  href="/assets/RanaTaxiService_Brochure_v2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    hidden md:block w-full px-4.75 py-3 lg:py-5.5 rounded-xl
                    font-bold leading-normal text-center
                    border-2 border-text-primary bg-transparent text-text-primary
                    transition-all duration-200
                    hover:bg-text-primary hover:text-background hover:-translate-y-0.5
                    active:scale-[0.98]
                  "
                >
                  Download Brochure
                </a>

                {/* Mobile link — Triggers download */}
                <a
                  href="/assets/RanaTaxiService_Brochure_v2.pdf"
                  download="RanaTaxiService_Brochure.pdf"
                  className="
                    block md:hidden w-full px-4.75 py-3 lg:py-5.5 rounded-xl
                    font-bold leading-normal text-center
                    border-2 border-text-primary bg-transparent text-text-primary
                    transition-all duration-200
                    hover:bg-text-primary hover:text-background hover:-translate-y-0.5
                    active:scale-[0.98] max-lg:mb-2
                  "
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </article>
      </ScrollReveal>
    </MaxWidthContainer>
  );
}
