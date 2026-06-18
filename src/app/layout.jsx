import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import BookingPopup from "@/components/BookingPopUp";
import headerData from "@/data/headerData.json";
import footerData from "@/data/footerData.json";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ANTIGRAVITY CHANGE: Added SEO Metadata to enable page titles and descriptions in search results
export const metadata = {
  title: "Rana Taxi Services Kotdwara | Cab Booking in Dehradun & Delhi",
  description:
    "Book reliable, safe, and affordable taxi services from Kotdwara, Rishikesh, Dehradun, and Delhi. Special tour packages for Kedarnath and Badrinath Char Dham Yatra.",
  keywords: [
    "taxi service Kotdwara",
    "cab Rishikesh",
    "Kedarnath taxi package",
    "Dehradun to Delhi cab",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`antialiased ${poppins.className} bg-white text-text-primary`}
      >
        <Header items={headerData} />
        {children}
        <BookingPopup />
        <Footer data={footerData} />
      </body>
    </html>
  );
}
