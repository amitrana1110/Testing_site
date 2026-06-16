import React from "react";
import Banner from "@/components/Banner/Banner";
import ImageGallery from "../../components/Gallery";
import galleryData from "@/data/galleryData.json";

function page() {
  return (
    <div>
      <ImageGallery photos={galleryData.photos} filters={galleryData.filters} />
    </div>
  );
}

export default page;
