import React from "react";
import ImageGallery from "../../components/Gallery";
import galleryData from "@/data/galleryData.json";

export const metadata = {
  title: "Travel Photo Gallery | Rana Taxi Services Kotdwara",
  description:
    "Explore beautiful travel photos of Kedarnath Mandir, Badrinath, Rishikesh Ganga Aarti, Haridwar, Dehradun, and Mussoorie captured during our taxi trips.",
  keywords: [
    "Rana taxi gallery",
    "chardham yatra photos",
    "Uttarakhand travel pictures",
    "Rishikesh images",
  ],
};

function page() {
  return (
    <div>
      <ImageGallery photos={galleryData.photos} filters={galleryData.filters} />
    </div>
  );
}

export default page;
