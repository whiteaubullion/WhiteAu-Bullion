import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const newPath = fullPath.replace(new RegExp(`\\${ext}$`), '.webp');
        console.log(`Converting ${fullPath} to ${newPath}`);
        
        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(newPath);
          console.log(`Success: ${newPath}`);
          // Do not delete original yet, just in case
        } catch (err) {
          console.error(`Error converting ${fullPath}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting WebP conversion...');
  await processDirectory(publicDir);
  console.log('Done!');
}

run();
