# Project Improvements Log

This document lists all the critical fixes, performance optimizations, responsiveness improvements, and security enhancements made to the **Rana Taxi Services** project.

---

## 🛠️ 1. Bug Fixes & Core Mailer Enhancements

- **Mailer Env Configuration Fix:** Moved SMTP credentials from `src/components/Forms/.env` to the project root in `.env.local`. Next.js only loads env files from the project root; subfolder env files were ignored, leaving `process.env.EMAIL_HOST` undefined.
- **Server-side Validation:** Added check statements in [route.js](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/api/booking/route.js#L29-L40) to log setup errors if env variables are missing.
- **Form Field Validation:** Modified the "Book Now" submit button to stay disabled until all required inputs (`Name`, `Phone`, `Pickup`, `Destination`, `Travel Date`) are entered.
- **10-Digit Phone Length Validation:** Added client-side validation check in Booking, Custom Yatra, and Contact forms to ensure entered phone numbers contain at least 10 digits before starting dispatch loaders, displaying an error message if invalid.

---

## 📱 2. Custom Booking Modal & WhatsApp Redirection

- **2.5s Loader Spinner:** Clicking **Book Now** shows a loading spinner on the button for 2.5 seconds first to indicate active processing.
- **Non-Blocking Asynchronous Sending:** The popup displays **instantly** (0-second delay) after loading completes while Nodemailer sends the email asynchronously in the background, preventing slow SMTP connections from blocking the user.
- **Custom Ticket Estimation Card:** Shows a beautiful summary card containing the user's booking details (Customer, Route, Date/Time, Vehicle) with a green **Send Request to WhatsApp** button.
- **Hotkey Hotline Call:** Added a click-to-call direct audio call button for the hotline `+91 95286 15204`.
- **Stateful Thank You Screen:** Clicking the WhatsApp button opens the pre-filled chat in a new tab and transitions the popup to a dedicated **Thank You for Booking!** card.
- **Full Reset on Dismissal:** Closing the modal clears the input fields, resets status to idle, and hides success messages.
- **PopModal Component Modularization:** Extracted the raw modal layout from the form into separate modular files under `src/components/PopModal/`:
  - [SubmitModal.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/SubmitModal.jsx) — Wrapper / State controller
  - [TicketDetailsView.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/TicketDetailsView.jsx) — Ticket Estimation details card
  - [ThankYouView.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/ThankYouView.jsx) — Final thank you card
- **Mobile Responsiveness:** Made the modal overlay scrollable, constrained modal heights on landscape/short screens, and enabled word wrapping for routes and customer names to prevent layout breaking.

---

## 📸 3. Gallery Page Optimizations

- **Project-specific Filters:** Configured filters in [ImageGallery](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Gallery/index.jsx) to match Rana Taxi destinations: _Kedarnath_, _Badrinath_, _Rishikesh_, _Haridwar_, _Dehradun_, _Mussoorie_, _Lansdowne_, and _Delhi_.
- **Mobile Column Drop Fix:** Previously, columns were manually split into three arrays, with the third column hidden on mobile viewports. **This hid 1/3 of the photos from mobile users.** Replaced this with a CSS Column-based native responsive masonry grid (`columns-2 md:columns-3`) so no images are lost.
- **Responsive Header Stacking:** Styled the gallery search layout to wrap cleanly on mobile screens.

---

## ⚡ 4. Code Quality & Performance Enhancements

- **Font Loading Optimization:** Cleaned up unused template fonts (`Geist` and `Geist_Mono`) inside [layout.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/layout.jsx) to reduce bundle size and speed up page renders.
- **SEO Metadata Setup:** Added default SEO `metadata` config in the root layout to provide descriptive browser titles, meta descriptions, and keywords for search engine indexing.
- **Route Card Image Optimization:** Replaced standard HTML `<img>` tags inside [RouteCard](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/RouteCard/index.jsx) with Next.js’s optimized `<Image />` component to enable on-demand compression and prevent Layout Shift.
- **Broken Navigation Links Fixed:** Corrected the quick links inside [Footer/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Footer/index.jsx) to point to active files (e.g. `"/contact-about"` instead of broken `"/about"` and `"/contact"`).
- **CSS-only Carousel Pagination Fix:** Added dynamic animation names (`charDhamSlide_${count}` and `charDhamDot_${count}`) to [AutoCarousel.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/packages/AutoCarousel.jsx) to prevent multiple carousel instances (the 4-Dham and 2-Dham packages) from overriding each other's global CSS keyframes, resolving the issue where multiple pagination dots were active/moving at the same time.

---

## 🔒 5. Anti-Spam Security

- **Honeypot Trap Protection:** Added a hidden honey trap input field to the booking form and created a validation check inside `src/app/api/booking/route.js` to automatically flag and block automated bot submissions without adding heavy third-party captcha scripts.

---

## ⚙️ 6. Externalized Component Configurations (JSON-Driven Props)

- **Static Data Separation:** Extracted all hardcoded list arrays and content text strings from UI components into distinct JSON files stored in `src/data/` for easy maintainability.
- **Refactored Components:** Modified components to accept data as props instead of using hardcoded variables, defining local fallback defaults to prevent components from breaking if props are omitted:
  - [Header.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Header/Header.jsx) — Receives navigation items from [headerData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/headerData.json).
  - [HeroSection.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Banner/HeroSection.jsx) — Receives headlines, badges, call/WhatsApp numbers, and text copies from [heroData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/heroData.json).
  - [Banner.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Banner/Banner.jsx) — Receives banner subtitles, headings, and buttons from [bannerData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/bannerData.json).
  - [WhyChooseUs/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/WhyChooseUs/index.jsx) — Receives value proposition cards list from [whyChooseUsData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/whyChooseUsData.json).
  - [RouteCard/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/RouteCard/index.jsx) — Receives routes data from [routeData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/routeData.json).
  - [Testimonials/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Testimonials/index.jsx) — Receives user review cards from [testimonialsData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/testimonialsData.json).
  - [Faq/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Faq/index.jsx) — Receives accordion items from [faqData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/faqData.json).
  - [Footer/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Footer/index.jsx) — Receives link arrays and contact text details from [footerData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/footerData.json) (mapping icons dynamically in-component to keep clean JSON).
  - [Gallery/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Gallery/index.jsx) — Receives images metadata and filters list from [galleryData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/galleryData.json).
  - [Aboutsection/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Aboutsection/index.jsx) — Receives stats and descriptive paragraphs from [aboutData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/aboutData.json).
  - [Contactinfocard/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Contactinfocard/index.jsx) — Receives contact card titles, icons, and values from [contactInfoCardsData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/contactInfoCardsData.json).
  - [Contactsection/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Contactsection/index.jsx) — Receives section heading and map embed details from [contactSectionData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/contactSectionData.json).
- **Pure JSON Data Conversion:** Replaced the JavaScript data exports `packageData.js` and `doDham.js` with pure JSON structures [packageData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/packageData.json) and [doDham.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/doDham.json) and updated the packages page imports.
- **Unified Prop Threading:** Refactored the core pages (`page.jsx`, `layout.jsx`, `packages/page.jsx`, `gallery/page.jsx`, and `contact-about/page.jsx`) to import the JSON configurations and thread them to components as props, enabling effortless data updates directly inside the `src/data/` folder.

---

## ⚡ 7. Mobile Performance Optimizations (Lighthouse Score Improvements)

- **High-Performance Image Optimizer:** Installed `sharp` devDependency to allow Next.js to run native optimized image compilation on the server.
- **Source Image Compression:** Created a Node.js utility script [compress-images.js](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/scripts/compress-images.js) to compress all public assets inside `/public/assets/images/`. This reduced local file sizes by up to 90% (e.g. `badrinath.webp` from **2.9 MB to 287 KB**, `kedarnath.webp` from **1.4 MB to 198 KB**, and `delhi.webp` from **1.3 MB to 48 KB**), solving bandwidth/payload bottlenecks on mobile viewports.
- **Hero Background Preloading:** Refactored [HeroSection.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Banner/HeroSection.jsx) to load its background image using Next.js `<Image fill priority />` instead of an inline CSS background-image style. This flags the background as a high-priority preloaded LCP (Largest Contentful Paint) asset, removing layout shifts (CLS) and optimizing page initialization metrics on mobile.

---

## 📱 8. Booking Modal Dimensions & Transition Flow Updates

- **Expanded Modal Sizing:** Increased the maximum width of the booking submit details modal to `800px` (`max-w-[800px]`) and configured it to take full height on mobile.
- **Responsive Layout Sizing (Thank You vs Details)**: Implemented conditional resizing inside [SubmitModal.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/SubmitModal.jsx) so that the Thank You popup transitions back to a compact modal size (`max-w-[480px]`, `h-auto` with padded margins) on both mobile and desktop viewports, keeping it neat and sized appropriately.
- **Scroll-Free Layout**: Set the modal container to `overflow-hidden` and organized details vertically inside a centered card to prevent scroll bars and ensure the user gets a seamless card visual.
- **Implicit Thank-You Popup Transition**: Rewrote the dismissal/close controls inside [SubmitModal.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/SubmitModal.jsx) so that if a user closes or dismisses the ticket view (via the top "X" button, the backdrop overlay, or the bottom "Dismiss" link) without proceeding to WhatsApp, they are automatically transitioned to the **Thank You** screen instead of dismissing the modal instantly.

---

## 🛠️ 9. Choose Vehicle Dropdown Placement (Clipping Prevention)

- **Upward Dropdown Panel Support**: Added an `openDirection` prop (supporting `"up"` | `"down"`) to the [AnimatedSelect.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Forms/AnimatedSelect.jsx) custom dropdown component.
- **Hero Banner Integration**: Applied `openDirection="up"` to the **Choose Vehicle** select inside the [BookingForm](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Forms/index.jsx). This causes the vehicle options list to open upwards (over the form area) instead of downwards, preventing the options list from extending past the bottom of the card and getting clipped or hidden by the section boundaries on mobile viewports.

---

## 🚕 10. Dynamic Route Pre-filling in Booking Modal

- **Pre-fill State Initialization**: Updated [index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Forms/index.jsx) (BookingForm) to accept an `initialData` prop containing `pickup` and `destination` values. Added case-insensitive handling for the pickup dropdown by auto-lowercasing the passed value.
- **Modal Overlay Integration**: Modified [BookingFormModal.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Forms/BookingFormModal.jsx) to receive an `initialData` object prop and thread it directly to the BookingForm component when mounted.
- **Interactive Route Cards Hook**: Added `selectedRoute` state inside [RouteCard/index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/RouteCard/index.jsx) (PopularRoutes). Clicking **Book Now** on any popular route card now sets the active route in state, automatically populating the form's **Pickup** and **Destination** fields to match the clicked route card (e.g. clicking "Kotdwara to Delhi" will pre-fill "Kotdwara" and "Delhi" instantly).

---

## 📄 11. Responsive Brochure Download & View Links

- **Anchor Tag Refactoring**: Replaced the static `<button>` tags for "Download Brochure" with responsive `<a>` anchor tags inside [PackageCard.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/packages/PackageCard.jsx) and [PackageCardReverse.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/packages/PackageCardReverse.jsx).
- **Viewport-Based Target Actions**: Styled and mapped two distinct links using Tailwind responsive visibility utilities (`hidden md:block` and `block md:hidden`):
  - **Desktop Browser view**: Displays a link referencing `/assets/RanaTaxiService_Brochure_v2.pdf` with `target="_blank" rel="noopener noreferrer"`. Clicking opens the PDF in a new tab for native browser viewing and optional printing/download.
  - **Mobile Device view**: Displays a link referencing the same PDF with the `download="RanaTaxiService_Brochure.pdf"` attribute. Clicking downloads the PDF file directly onto the mobile device's storage.

---

## 📸 12. Masonry Gallery Aspect-Ratio & Load Stabilization (Unsplash Style)

- **Metadata Dimension Capture**: Created and executed an automated metadata-extraction script [get-image-sizes.js](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/scripts/get-image-sizes.js) to resolve the exact original aspect ratios and sizes of all local and remote Unsplash/Pexels gallery images, updating [galleryData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/galleryData.json) with their true dimensions.
- **Exact Aspect Ratio Loading Placeholder**: Updated `PhotoCard` inside [index.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Gallery/index.jsx) to calculate `aspectRatio` dynamically using the photo's original `width/height`. This ensures that the skeleton loader placeholder exactly matches the original photo shape, resulting in **zero layout shifts (CLS = 0)** when images finish loading.
- **Aspect-Ratio Preserved Image Rendering**: Reconfigured Next.js `<Image>` component properties to pass the exact original `width` and `height` properties instead of forcing a default square shape. This allows the browser to natively compute and display images in their true original aspect ratios (similar to Unsplash grids) without cropping, clipping, or distortion.
- **Load Error Handling**: Added `onError` states that safely hide skeletons and render a fallback broken-image icon instead of keeping the loader animated indefinitely in case of remote link failures.
- **Valid Remote Resource Updates**: Replaced a broken, 404-returning remote Unsplash URL in [galleryData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/galleryData.json) with a high-resolution, valid mountain valley image to ensure it loads flawlessly.

---

## 🛕 13. Packages Custom Yatra Form & Popup Submission Flow

- **Functional Form Submission**: Refactored [CustomYatraForm.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Forms/CustomYatraForm.jsx) to include state-driven loading, success, and error indicators, alongside a 2.5s spinner loader during active processing.
- **Unified Submit Details & Thank You Popups**: Interfaced the modular [SubmitModal.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/SubmitModal.jsx) with the custom yatra flow, passing `type="yatra"` to enable specific layout rendering.
- **Dynamic Custom Yatra Rendering in Modal**: Updated [TicketDetailsView.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/TicketDetailsView.jsx) to check the form type. For `"yatra"`, it shows Pickup City, Duration (Days), and Passenger counts instead of the default booking route layouts, preserving the user's styling.
- **Nodemailer Custom Yatra API Route**: Created [route.js](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/api/custom-yatra/route.js) to parse Custom Yatra fields, handle honeypot bot trap validation, and dispatch a beautifully structured HTML email summary to the dispatch desk in the background without blocking the client.
- **Custom Yatra WhatsApp Redirection**: Built a dynamic WhatsApp text generator in `CustomYatraForm.jsx` that forwards full planning requests (Name, Phone, Pickup City, Travel Date, No. of Days, No. of People, Vehicle preference, and Special Requirements) directly to dispatch on button click, seamlessly transitioning the popup to the Thank You view.
- **Validation & Input Alignment**: Aligned the custom select state key (fixed `city` -> `pickup` binding bug) and disabled the submit button until required fields are fully completed.

---

## 📱 14. About Us Banner WhatsApp Button Integration

- **WhatsApp Icon Addition**: Added a high-resolution, emerald-green WhatsApp SVG icon to the `buttonIcons` catalog inside [Banner.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Banner/Banner.jsx).
- **Flexible Banner Button Keys**: Enhanced the buttons render mapping inside `Banner.jsx` to dynamically support both standard fields (`href`, `label`) and WhatsApp-specific fields (`whatsappLink`, `whatsappText`).
- **Target & Rel Attribute Auto-Routing**: Programmed `Banner.jsx` to automatically append `target="_blank" rel="noopener noreferrer"` to external WhatsApp links, ensuring they launch cleanly in a new tab without redirecting the user away from the website.
- **About Us Page Banner Mapping**: Integrated the newly created [aboutBannerData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/aboutBannerData.json) into the About Us page [page.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/contact-about/page.jsx#L13) to display a contact call-to-action with both phone call and WhatsApp options.

---

## 📸 15. Gallery Tag Normalization & Filter Matching Fix

- **Tag String Splitting**: Resolved the issue where Delhi, Haridwar, and other filter tabs did not show their uploaded photos because tags were defined as comma-separated strings inside arrays (e.g. `["haridwar, ganga arti"]` and `["new delhi, delhi, qutab minar"]`) instead of clean separate tags. Modified them to distinct, array-separated elements (`["haridwar", "ganga arti"]` and `["new delhi", "delhi", "qutab minar"]`).
- **Tag Correction & Synonyms**: Corrected misspelled tags (like `"masoori"`, `"msoori"` to `"mussoorie"`) and normalized case/names across all 49 images to ensure they match filter list options exactly.
- **Filter Expansion**: Registered missing filter elements `"Gangotri"` and `"Yamunotri"` inside [galleryData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/galleryData.json) to match all destinations available in the dataset.

---

## ⚡ 16. Packages Page Custom Yatra Form Smooth Scroll

- **Container Element Target ID**: Enabled prop forwarding in [MaxWidthContainer.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Common/MaxWidthContainer.jsx) (`...props`) and added `id="custom-yatra-form"` to the CustomYatraForm outer container.
- **Semantic Anchor Path Routing**: Updated `href` inside [bannerData.json](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/data/bannerData.json) to point to `/packages#custom-yatra-form` to ensure proper routing from other pages and SEO crawl semantic accuracy.
- **Smooth Scrolling Handler**: Marked [Banner.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Banner/Banner.jsx) as `"use client"` and intercepted clicks on the Custom Packages button (`btn.id === "custom"`). If the form container exists on the page, the handler calls `.scrollIntoView({ behavior: "smooth", block: "start" })` to perform a smooth scroll on both desktop and mobile viewports.

---

## 📧 17. Contact & About Page Form Email & WhatsApp Integration

- **API Handler Endpoint**: Created a server-side API endpoint [route.js](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/api/contact/route.js) that validates contact fields, executes honeypot spam checking, and compiles/sends a detailed HTML email summary to the dispatch office using Nodemailer.
- **SubmitModal Integration**: Interfaced the [ContactSection](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Contactsection/index.jsx) form with the modular [SubmitModal](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/SubmitModal.jsx) flow, passing `type="contact"` to customize text copies.
- **Conditional Row Rendering**: Updated [TicketDetailsView.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/PopModal/TicketDetailsView.jsx) to display only Customer name, Phone, and the message content, hiding irrelevant travel fields (such as destination, date/time, and vehicle preferences) when a generic inquiry is submitted.
- **Loading & Spinner State Controls**: Linked state variables to show a spinner on the submit button for 2.5 seconds during processing, disabled input actions while submitting, and pre-formatted a detailed WhatsApp redirect text forwarding query details.

---

## ⚡ 18. UX, SEO, and Stability Optimizations Sweep

- **Header Call Now Links**: Wrapped navigation Call Now buttons inside [Header.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/Header/Header.jsx) in telephone anchors (`href="tel:+919528615204"`) for instant click-to-call dialing on mobile/desktop.
- **Promo Popup Dismissal Caching**: Integrated `sessionStorage` checks inside [BookingPopup](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/components/BookingPopUp/index.jsx) to cache the user's dismissal, preventing the marketing discount overlay from repeatedly popping up on page transitions during a session.
- **Page-Specific SEO Metadata**: Exported dedicated `metadata` configurations inside [packages/page.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/packages/page.jsx#L10), [gallery/page.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/gallery/page.jsx#L5), and [contact-about/page.jsx](file:///c:/Users/AmitSinghRana/Pictures/taxi-service-main-main/taxi-service-main/src/app/contact-about/page.jsx#L14) to override layout defaults with specific, targeted titles and search indexing tags.
