import AdmZip from 'adm-zip';
import { config } from 'dotenv';
import fs from 'fs-extra';
import { sync as syncGlob } from 'glob';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import path from 'path';

config();

const zip = new AdmZip();

const patterns = [
	'admin/**',
	'build/**',
	'includes/**',
	'languages/**',
	'public/**',
	`plugin.php`,
	'uninstall.php'
];

// Define the destination directory
const destination = `deploy`;
// Ensure the destination directory exists
fs.ensureDirSync(destination);
// Function to copy matched files to the destination
patterns.forEach((pattern) => {
	const files = syncGlob(pattern, { nocase: true, nodir: true });
	files.forEach((file) => {
		const destPath = path.join(destination, file);
		fs.ensureDirSync(path.dirname(destPath)); // Ensure the destination directory exists
		fs.copySync(file, destPath);
	});
});
zip.addLocalFolder('./deploy', process.env.SLUG);
fs.ensureDirSync('./dist');
zip.writeZip(`./dist/${process.env.SLUG}.zip`);
(async () => {
	const markdown = MarkdownIt({
		html: true
	});
	const data = {
		name: process.env.NAME,
		slug: process.env.SLUG,
		version: process.env.VERSION.replace(
			'{TS}',
			process.env?.GITHUB_RUN_NUMBER ?? Date.now().toString().slice(0, -3)
		),
		author: process.env.AUTHOR_NAME,
		author_profile: process.env.AUTHOR_URL,
		requires: process.env.MIN_WP,
		tested: process.env.TESTED_WP,
		requires_php: process.env.MIN_PHP,
		requires_plugins: process.env.REQUIRES_PLUGINS.split(',').map((i) =>
			i.trim()
		),
		compatibility: [],
		last_updated: moment().utc().format(),
		added: moment().utc().format(),
		homepage: process.env.URI,
		sections: {
			description: process.env.DESCRIPTION,
			installation: markdown.render(
				fs.readFileSync('./INSTALL.md', 'utf8')
			),
			changelog: markdown.render(
				fs.readFileSync('./CHANGELOG.md', 'utf8')
			)
		},
		banners: {
			low: process.env.BANNER_URL_LOW,
			high: process.env.BANNER_URL_HIGH
		},
		icon: process.env.ICON_URL,
		screenshots: {}
	};

	fs.writeFileSync('./dist/info.json', JSON.stringify(data));
})();
console.log('All files have been copied successfully.');
