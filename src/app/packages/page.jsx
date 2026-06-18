import React from "react";
import Banner from "@/components/Banner/Banner";
import packageData from "@/data/packageData.json";
import doDham from "@/data/doDham.json";
import bannerData from "@/data/bannerData.json";
import PackageCard from "@/components/packages/PackageCard";
import PackageCardReverse from "@/components/packages/PackageCardReverse";
import CustomYatraForm from "../../components/Forms/CustomYatraForm";

export const metadata = {
  title: "Tour Packages & Chardham Yatra Cabs | Rana Taxi Services",
  description:
    "Book custom travel packages for 4 Dham Yatra (Kedarnath, Badrinath, Yamunotri, Gangotri) and 2 Dham packages starting from Kotdwara, Haridwar, or Rishikesh.",
  keywords: [
    "chardham tour package",
    "dodham yatra taxi",
    "Kedarnath cab booking",
    "Badrinath travel package",
  ],
};

function page() {
  return (
    <div>
      <Banner data={bannerData} />
      <PackageCard pkg={packageData} />
      <PackageCardReverse pkg={doDham} />
      <CustomYatraForm />
    </div>
  );
}

export default page;
