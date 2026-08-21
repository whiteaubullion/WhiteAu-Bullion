const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = '../71b691be702cdfd28e5db477cfd5ca6c.jpg';
const outputDir = './public/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Approximate coordinates for the 736x1349 image
// We'll crop a slightly larger area to be safe, since they'll be on a black card anyway
const crops = [
  { name: 'shield', left: 160, top: 120, width: 220, height: 220 },
  { name: 'home', left: 450, top: 300, width: 220, height: 220 },
  { name: 'rupee', left: 160, top: 540, width: 220, height: 220 },
  { name: 'gold-bars', left: 400, top: 1050, width: 280, height: 220 }
];

async function extract() {
  for (const crop of crops) {
    try {
      await sharp(inputFile)
        .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
        .webp({ quality: 90 })
        .toFile(path.join(outputDir, `${crop.name}.webp`));
      console.log(`Successfully extracted ${crop.name}.webp`);
    } catch (e) {
      console.error(`Error extracting ${crop.name}:`, e);
    }
  }
}

extract();
