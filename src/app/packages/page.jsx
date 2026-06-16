import React from "react";
import Banner from "@/components/Banner/Banner";
import packageData from "@/data/packageData.json";
import doDham from "@/data/doDham.json";
import bannerData from "@/data/bannerData.json";
import PackageCard from "@/components/packages/PackageCard";
import PackageCardReverse from "@/components/packages/PackageCardReverse";
import CustomYatraForm from "../../components/Forms/CustomYatraForm";

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
