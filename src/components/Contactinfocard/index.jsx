import MaxWidthContainer from "../Common/MaxWidthContainer";
import defaultCards from "@/data/contactInfoCardsData.json";

export default function ContactInfoCards({ cards = defaultCards }) {
  return (
    <MaxWidthContainer>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 mt-2 lg:mt-11">
        {cards.map(({ id, icon, title, description, value, locations }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-1 lg:gap-2 bg-[#FAFAFA] border border-border rounded-2xl px-4 py-6 lg:py-8"
          >
            <div
              className="w-12 h-12 lg:w-15.5 lg:h-15.5
             aspect-square rounded-full bg-primary flex items-center justify-center mb-1.5"
            >
              <img src={icon} alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>

            <h3 className="text-xl lg:h2 font-semibold text-text-primary leading-normal">
              {title}
            </h3>

            <p className="text-text-secondary text-sm lg:text-lg leading-normal">
              {description}
            </p>

            {id === "phone" && (
              <p className="text-xl lg:h2 font-semibold text-text-primary leading-normal">
                {value}
              </p>
            )}

            {id === "locations" && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {locations.map((place) => (
                  <span
                    key={place}
                    className="px-2.5 py-1 leading-normal rounded-lg border border-border text-sm lg:text-lg text-text-primery"
                  >
                    {place}
                  </span>
                ))}
              </div>
            )}

            {id === "availability" && (
              <p className="text-xl lg:h2 font-semibold leading-normal text-[#4CAF50]">
                {value}
              </p>
            )}
          </div>
        ))}
      </div>
    </MaxWidthContainer>
  );
}
