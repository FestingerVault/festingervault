import {
	__ as wp__,
	_n as wp_n,
	_nx as wp_nx,
	_x as wp_x
} from '@wordpress/i18n';

/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string} text     Text to translate.
 *
 * @return {string} Translated text.
 */
export function __(text: string): string {
	return wp__(text, 'festingervault');
}
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 *
 * @return {string} The translated singular or plural form.
 */
export function _n(single: string, plural: string, number: number): string {
	return wp_n(single, plural, number, 'festingervault');
}
/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string} text     Text to translate.
 * @param {string} context  Context information for the translators.
 *
 * @return {string} Translated context string without pipe.
 */
export function _x(text: string, context: string): string {
	return wp_x(text, context, 'festingervault');
}
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} context  Context information for the translators.
 *
 * @return {string} The translated singular or plural form.
 */
export function _nx(
	single: string,
	plural: string,
	number: number,
	context: string
): string {
	return wp_nx(single, plural, number, context, 'festingervault');
}
