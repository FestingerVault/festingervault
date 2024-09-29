/**
 * Converts kebab-case string to camelCase.
 *
 * @param {string} input The string to convert.
 * @return {string} The converted string.
 */
export function dashToCamelCase(input: string): string {
	return input.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
