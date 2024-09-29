/** @type {import('prettier').Config} */
export default {
	tailwindFunctions: ['clsx', 'cn'],
	plugins: [
		'@prettier/plugin-php',
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss'
	],
	tailwindConfig: './tailwind.config.js',
	arrowParens: 'always',
	printWidth: 80,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'none',
	bracketSpacing: true,
	endOfLine: 'auto',
	singleAttributePerLine: true
};
