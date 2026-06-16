import Image from "next/image";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import defaultAboutData from "@/data/aboutData.json";

export default function AboutSection({ data = defaultAboutData }) {
  const {
    badge = defaultAboutData.badge,
    title = defaultAboutData.title,
    paragraphs = defaultAboutData.paragraphs,
    stats = defaultAboutData.stats,
    image = defaultAboutData.image,
  } = data || {};

  return (
    <MaxWidthContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-2 lg:my-11">
        {/* Left: Image */}
        <div className="w-full h-[300px] lg:h-[450px] rounded-2xl overflow-hidden relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-3 lg:gap-6 p-3 lg:p-6">
          <div className="">
            <span className="text-primary text-sm lg:text-lg font-semibold leading-normal uppercase">
              {badge}
            </span>

            <h2 className="h2 lg:text-[36px] font-bold text-text-primary leading-normal mt-2">
              {title}
            </h2>
          </div>

          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-text-secondary text-sm lg:text-xl leading-normal">
              {para}
            </p>
          ))}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 mt-2 lg:mt-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-normal">
                  {stat.value}
                </span>
                <span className="text-text-secondary text-xs sm:text-sm lg:text-base leading-normal">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
}
