const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "public", "images");

const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);

async function optimiseDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await optimiseDirectory(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (!supportedExtensions.has(ext)) continue;

    const output = fullPath.replace(ext, ".webp");

    const before = fs.statSync(fullPath).size;

    try {
      await sharp(fullPath)
        .webp({
          quality: 82,
          effort: 6,
        })
        .toFile(output);

      const after = fs.statSync(output).size;
      const saving = (((before - after) / before) * 100).toFixed(1);

      console.log(
        `${path.relative(root, fullPath)}
  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (${saving}% saved)`
      );
    } catch (err) {
      console.error(`❌ Failed: ${fullPath}`);
      console.error(err.message);
    }
  }
}

optimiseDirectory(root)
  .then(() => console.log("\n✅ Image optimisation complete."))
  .catch(console.error);
