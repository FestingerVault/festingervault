import { config } from "dotenv";
import fs from "fs-extra";
import { sync } from "glob";
import path from "path";
config();

const patterns = [
	"admin/**",
	"build/**",
	"includes/**",
	"languages/**",
	"public/**",
	`${process.env.SLUG}.php`,
	"uninstall.php",
];

// Define the destination directory
const destination = `deploy`;
fs.removeSync(destination);
// Ensure the destination directory exists
fs.ensureDirSync(destination);

// Function to copy matched files to the destination
patterns.forEach(pattern => {
	const files = sync(pattern, { nocase: true, nodir: true });
	files.forEach(file => {
		const destPath = path.join(destination, file);
		fs.ensureDirSync(path.dirname(destPath)); // Ensure the destination directory exists
		fs.copySync(file, destPath);
	});
});

console.log("All files have been copied successfully.");
