import Link from "next/link";
import MaxWidthContainer from "../Common/MaxWidthContainer";
import defaultFooterData from "@/data/footerData.json";

const contactIcons = {
  address: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="#F5A800"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="#F5A800"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  email: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="#F5A800"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

const socialIcons = {
  Instagram: (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
};

export default function Footer({ data = defaultFooterData }) {
  const currentYear = new Date().getFullYear();

  const {
    quickLinks = defaultFooterData.quickLinks,
    serviceAreas = defaultFooterData.serviceAreas,
    contactInfo = defaultFooterData.contactInfo,
    socialLinks = defaultFooterData.socialLinks,
  } = data || {};

  return (
    <footer className="w-full bg-text-primary text-white">
      <MaxWidthContainer>
        <div className="px-4 sm:px-6 lg:px-0 lg:pt-14">
          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1 — Brand */}
            <div className="flex flex-col gap-4.5">
              <Link
                href="/"
                className="text-xl lg:text-[28px] font-semibold leading-normal text-white"
              >
                Rana<span className="text-[#f5a800]">Taxi</span>
              </Link>
              <p className="text-text-light text-sm leading-noermal font-semibold max-w-[240px]">
                Your trusted partner for safe and comfortable journeys across
                the Himalayas
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4 mt-1">
                {socialLinks.map((s) => (
                  <Link
                    key={s.name}
                    href={s.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {socialIcons[s.name]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white text-lg lg:text-xl font-semibold leading-normal">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-text-light text-sm font-semibold leading-normal hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Service Areas */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white text-lg lg:text-xl font-semibold leading-normal">
                Service Areas
              </h3>
              <ul className="flex flex-col gap-3">
                {serviceAreas.map((area) => (
                  <li key={area.name}>
                    <Link
                      href={area.path}
                      className="text-text-light text-sm font-semibold leading-normal hover:text-white transition-colors"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div className="flex flex-col gap-5">
              <h3 className="text-white text-lg lg:text-xl font-semibold leading-normal">
                Contact
              </h3>
              <ul className="flex flex-col gap-4">
                {contactInfo.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0">
                      {contactIcons[item.id]}
                    </span>
                    <span className="text-text-light text-sm font-semibold leading-normal">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/15 mt-12 mb-6" />

          {/* Copyright */}
          <p className="text-text-light leading-normal text-sm text-center">
            © {currentYear} YatraCabs Taxi Service. All rights reserved.
          </p>
        </div>
      </MaxWidthContainer>

      {/* WhatsApp floating button */}
      <Link
        href="https://wa.me/919528615204"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>
    </footer>
  );
}
