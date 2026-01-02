/**
 * Convert JPG frames to WebP format
 * 
 * Usage:
 *   1. Install sharp: npm install sharp
 *   2. Run: node scripts/convert-to-webp.js
 * 
 * Options:
 *   --quality=80     Set WebP quality (1-100, default: 80)
 *   --delete-originals   Delete JPG files after conversion
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const quality = parseInt(args.find(a => a.startsWith('--quality='))?.split('=')[1] || '80');
const deleteOriginals = args.includes('--delete-originals');

const FRAMES_DIR = path.join(__dirname, '../public/frames');

async function convertFrames() {
  // Dynamic import for sharp (ES module)
  const sharp = (await import('sharp')).default;

  console.log('🎬 Converting frames to WebP...\n');
  console.log(`   Quality: ${quality}`);
  console.log(`   Delete originals: ${deleteOriginals}`);
  console.log(`   Source: ${FRAMES_DIR}\n`);

  // Get all JPG files
  const files = fs.readdirSync(FRAMES_DIR)
    .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .sort();

  if (files.length === 0) {
    console.log('❌ No JPG files found in frames directory');
    return;
  }

  console.log(`   Found ${files.length} JPG files\n`);

  let converted = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const file of files) {
    const inputPath = path.join(FRAMES_DIR, file);
    const outputPath = path.join(FRAMES_DIR, file.replace(/\.jpe?g$/i, '.webp'));

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      totalWebpSize += webpStats.size;

      converted++;

      // Progress indicator
      if (converted % 20 === 0 || converted === files.length) {
        const percent = Math.round((converted / files.length) * 100);
        process.stdout.write(`\r   Progress: ${converted}/${files.length} (${percent}%)`);
      }

      // Delete original if flag is set
      if (deleteOriginals) {
        fs.unlinkSync(inputPath);
      }
    } catch (err) {
      console.error(`\n❌ Error converting ${file}:`, err.message);
    }
  }

  console.log('\n');

  // Summary
  const savedMB = ((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2);
  const savedPercent = Math.round((1 - totalWebpSize / totalOriginalSize) * 100);

  console.log('✅ Conversion complete!\n');
  console.log(`   Converted: ${converted} files`);
  console.log(`   Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   WebP size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved: ${savedMB} MB (${savedPercent}%)\n`);

  if (!deleteOriginals) {
    console.log('💡 Tip: Run with --delete-originals to remove JPG files after conversion');
    console.log('   node scripts/convert-to-webp.js --delete-originals\n');
  }

  console.log('📝 Next steps:');
  console.log('   1. Update frame-background.tsx to use .webp extension');
  console.log('   2. Change: return `/frames/frame_${paddedNumber}.jpg`');
  console.log('   3. To:     return `/frames/frame_${paddedNumber}.webp`\n');
}

convertFrames().catch(console.error);

