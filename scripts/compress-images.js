const fs = require("fs");
const path = require("path");

// Dynamically import sharp to support both ES module and CJS context properly,
// and make sure it is loaded after installation.
const sharp = require("sharp");

const dir = path.join(__dirname, "../public/assets/images");

async function compressAll() {
  try {
    const files = fs.readdirSync(dir);
    console.log(`Found ${files.length} files in public/assets/images`);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file).toLowerCase();

      if (
        ext === ".webp" ||
        ext === ".png" ||
        ext === ".jpg" ||
        ext === ".jpeg"
      ) {
        try {
          const originalSize = fs.statSync(filePath).size;
          const fileBuffer = fs.readFileSync(filePath);
          const metadata = await sharp(fileBuffer).metadata();

          let pipeline = sharp(fileBuffer);

          // Downscale high-res images to a max dimension of 1200px for mobile/web compatibility
          const maxDim = 1200;
          if (metadata.width > maxDim || metadata.height > maxDim) {
            pipeline = pipeline.resize({
              width: metadata.width > metadata.height ? maxDim : null,
              height: metadata.height >= metadata.width ? maxDim : null,
              fit: "inside",
              withoutEnlargement: true,
            });
          }

          // Re-compress image to WebP with optimized quality
          let compressedBuffer;
          if (ext === ".webp") {
            compressedBuffer = await pipeline
              .webp({ quality: 75, effort: 4 })
              .toBuffer();
          } else if (ext === ".png") {
            compressedBuffer = await pipeline
              .png({ compressionLevel: 8 })
              .toBuffer();
          } else {
            compressedBuffer = await pipeline
              .jpeg({ quality: 75, progressive: true })
              .toBuffer();
          }

          // Only overwrite if we actually reduced the size
          if (compressedBuffer.length < originalSize) {
            fs.writeFileSync(filePath, compressedBuffer);
            console.log(
              `✔ Compressed ${file}: ${(originalSize / 1024).toFixed(1)} KB → ${(compressedBuffer.length / 1024).toFixed(1)} KB`,
            );
          } else {
            console.log(`➖ Skipped ${file} (already optimal)`);
          }
        } catch (e) {
          console.error(`❌ Error processing ${file}:`, e.message);
        }
      }
    }
    console.log("Image compression task completed successfully.");
  } catch (err) {
    console.error("Could not read assets/images directory:", err);
  }
}

compressAll();
