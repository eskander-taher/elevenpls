/**
 * Remove every other frame between 1-171, then rename all frames sequentially
 *
 * Usage: node scripts/reduce-frames.js
 */

const fs = require("fs");
const path = require("path");

const FRAMES_DIR = path.join(__dirname, "../public/frames");

function main() {
	console.log("🎬 Reducing frames...\n");

	// Step 1: Delete every other frame from 1-171 (keep odd, delete even)
	console.log("Step 1: Deleting every other frame (2, 4, 6, ... 170)...");

	let deleted = 0;
	for (let i = 2; i <= 170; i += 2) {
		const filename = `frame_${String(i).padStart(4, "0")}.jpg`;
		const filepath = path.join(FRAMES_DIR, filename);

		if (fs.existsSync(filepath)) {
			fs.unlinkSync(filepath);
			deleted++;
		}
	}
	console.log(`   Deleted ${deleted} frames\n`);

	// Step 2: Get remaining files and sort them
	console.log("Step 2: Renaming remaining frames sequentially...");

	const remainingFiles = fs
		.readdirSync(FRAMES_DIR)
		.filter((f) => f.match(/^frame_\d{4}\.jpg$/))
		.sort();

	console.log(`   Found ${remainingFiles.length} remaining frames`);

	// Step 3: Rename to temp names first (to avoid conflicts)
	console.log("   Renaming to temp names...");
	for (const file of remainingFiles) {
		const oldPath = path.join(FRAMES_DIR, file);
		const tempPath = path.join(FRAMES_DIR, `temp_${file}`);
		fs.renameSync(oldPath, tempPath);
	}

	// Step 4: Rename to final sequential names
	console.log("   Renaming to final sequential names...");
	const tempFiles = fs
		.readdirSync(FRAMES_DIR)
		.filter((f) => f.startsWith("temp_frame_"))
		.sort();

	for (let i = 0; i < tempFiles.length; i++) {
		const oldPath = path.join(FRAMES_DIR, tempFiles[i]);
		const newFilename = `frame_${String(i + 1).padStart(4, "0")}.jpg`;
		const newPath = path.join(FRAMES_DIR, newFilename);
		fs.renameSync(oldPath, newPath);
	}

	console.log(`   Renamed ${tempFiles.length} frames\n`);

	// Summary
	console.log("✅ Done!\n");
	console.log(`   Original frames 1-171: Reduced from 171 to ${Math.ceil(171 / 2)} frames`);
	console.log(`   Original frames 172-231: Kept all 60 frames`);
	console.log(`   Total frames now: ${tempFiles.length}\n`);

	console.log("📝 Update frame-background.tsx:");
	console.log(`   - TOTAL_IMAGE_FRAMES = ${tempFiles.length}`);
	console.log(`   - AUTO_PLAY_FRAMES = ${Math.ceil(171 / 2)} (was 171, now half)`);
	console.log(`   - FPS = 15 (was 30, halve it to maintain same duration)\n`);
}

main();
