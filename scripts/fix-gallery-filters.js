const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "src", "data", "galleryData.json");
const rawData = fs.readFileSync(dataPath, "utf8");
const data = JSON.parse(rawData);

// Update filter list to include new destinations
const updatedFilters = [
  "All",
  "Kedarnath",
  "Badrinath",
  "Rishikesh",
  "Haridwar",
  "Dehradun",
  "Mussoorie",
  "Lansdowne",
  "Delhi",
  "Gangotri",
  "Yamunotri",
];

const updatedPhotos = data.photos.map((photo) => {
  // 1. Flatten and split tags by commas
  let tags = [];
  if (Array.isArray(photo.tags)) {
    photo.tags.forEach((t) => {
      if (typeof t === "string") {
        const parts = t.split(",").map((p) => p.trim().toLowerCase());
        tags.push(...parts);
      }
    });
  }

  // 2. Map tags to clean filter names
  const cleanTags = new Set();
  tags.forEach((t) => {
    cleanTags.add(t); // keep original tag

    // Align with filter pills
    if (t.includes("delhi")) {
      cleanTags.add("delhi");
    }
    if (t.includes("haridwar")) {
      cleanTags.add("haridwar");
    }
    if (t.includes("rishikesh")) {
      cleanTags.add("rishikesh");
    }
    if (t.includes("dehradun")) {
      cleanTags.add("dehradun");
    }
    if (
      t.includes("masoori") ||
      t.includes("msoori") ||
      t.includes("mussoorie")
    ) {
      cleanTags.add("mussoorie");
    }
    if (t.includes("lansdowne")) {
      cleanTags.add("lansdowne");
    }
    if (t.includes("kedarnath")) {
      cleanTags.add("kedarnath");
    }
    if (t.includes("badrinath")) {
      cleanTags.add("badrinath");
    }
    if (t.includes("gangotri")) {
      cleanTags.add("gangotri");
    }
    if (t.includes("yamunotri")) {
      cleanTags.add("yamunotri");
    }
  });

  return {
    ...photo,
    tags: Array.from(cleanTags),
  };
});

const outputData = {
  ...data,
  filters: updatedFilters,
  photos: updatedPhotos,
};

fs.writeFileSync(dataPath, JSON.stringify(outputData, null, 2), "utf8");
console.log(
  "Fixed all galleryData.json tags and updated filter pills successfully!",
);
