const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dataPath = path.join(__dirname, "..", "src", "data", "galleryData.json");
const publicDir = path.join(__dirname, "..", "public");

console.log("Reading data from:", dataPath);
console.log("Public dir:", publicDir);

const rawData = fs.readFileSync(dataPath, "utf8");
const data = JSON.parse(rawData);

// Typo mapping helper
const typoMap = {
  "/assets/images/gallery/badrinath_3.webp":
    "/assets/images/gallery/badreinath_3.webp",
  "/assets/images/gallery/yamunotri_1.webp":
    "/assets/images/gallery/yamunotri.webp",
  "/assets/images/gallery/masoor.webp": "/assets/images/gallery/masoori.webp",
  "/assets/images/gallery/shiv.webp": "/assets/images/gallery/shiva.webp",
};

async function run() {
  const updatedPhotos = [];
  let idCounter = 1;

  for (const photo of data.photos) {
    let thumb = photo.thumb;
    let src = photo.src;

    // Fix typos in paths
    if (typoMap[thumb]) {
      console.log(`Fixing typo in thumb: ${thumb} -> ${typoMap[thumb]}`);
      thumb = typoMap[thumb];
    }
    if (typoMap[src]) {
      console.log(`Fixing typo in src: ${src} -> ${typoMap[src]}`);
      src = typoMap[src];
    }

    const currentId = idCounter++;
    console.log(`Processing ID ${currentId} (was ${photo.id}): ${thumb}`);

    let width = 600;
    let height = 600;
    let success = false;

    if (thumb.startsWith("/")) {
      // Local file
      const localPath = path.join(publicDir, thumb);
      if (fs.existsSync(localPath)) {
        try {
          const meta = await sharp(localPath).metadata();
          width = meta.width;
          height = meta.height;
          success = true;
          console.log(`  Local image size: ${width}x${height}`);
        } catch (e) {
          console.error(`  Error reading local image:`, e.message);
        }
      } else {
        console.error(`  Local file does not exist: ${localPath}`);
      }
    } else {
      // Remote URL
      try {
        const res = await fetch(thumb);
        if (res.status === 200) {
          const buffer = await res.arrayBuffer();
          const meta = await sharp(Buffer.from(buffer)).metadata();
          width = meta.width;
          height = meta.height;
          success = true;
          console.log(`  Remote image size: ${width}x${height}`);
        } else {
          console.error(`  Failed to fetch: HTTP status ${res.status}`);
        }
      } catch (e) {
        console.error(`  Error fetching remote image:`, e.message);
      }
    }

    // Determine aspect ratio class (just to keep clean records, optional but nice)
    let h = "medium";
    const ratio = width / height;
    if (ratio < 0.7) {
      h = "tall";
    } else if (ratio > 1.3) {
      h = "short";
    }

    updatedPhotos.push({
      ...photo,
      id: currentId,
      src,
      thumb,
      h,
      width,
      height,
      success,
    });
  }

  console.log("\n--- Summary of results ---");
  updatedPhotos.forEach((p) => {
    console.log(
      `ID ${p.id}: success=${p.success}, size=${p.width}x${p.height}, ratio=${(p.width / p.height).toFixed(3)}, path=${p.thumb}`,
    );
  });

  // Write updated data back
  const outputData = {
    ...data,
    photos: updatedPhotos.map((p) => {
      // Remove temporary success field
      const { success, ...rest } = p;
      return rest;
    }),
  };
  fs.writeFileSync(dataPath, JSON.stringify(outputData, null, 2), "utf8");
  console.log("Updated galleryData.json successfully!");
}

run().catch(console.error);
