import { dashToCamelCase } from './dash-to-camel-case.js';

export const WP_PACKAGES: Record<string, string> = Object.fromEntries(
	[
		'a11y',
		'annotations',
		'api-fetch',
		'autop',
		'blob',
		'block-directory',
		'block-editor',
		'block-library',
		'block-serialization-default-parser',
		'blocks',
		'components',
		'compose',
		'core-data',
		'customize-widgets',
		'data',
		'data-controls',
		'date',
		'deprecated',
		'dom',
		'dom-ready',
		'edit-post',
		'edit-site',
		'edit-widgets',
		'editor',
		'element',
		'escape-html',
		'format-library',
		'hooks',
		'html-entities',
		'i18n',
		'is-shallow-equal',
		'keyboard-shortcuts',
		'keycodes',
		'list-reusable-blocks',
		'media-utils',
		'notices',
		'nux',
		'plugins',
		'preferences',
		'preferences-persistence',
		'primitives',
		'priority-queue',
		'redux-routine',
		'reusable-blocks',
		'rich-text',
		'server-side-render',
		'shortcode',
		'style-engine',
		'token-list',
		'url',
		'viewport',
		'warning',
		'widgets',
		'wordcount'
	].map((name) => [`@wordpress/${name}`, `wp.${dashToCamelCase(name)}`])
);

export const NON_WP_PACKAGES: Record<string, string> = {
	jquery: 'jQuery',
	tinymce: 'tinymce',
	moment: 'moment',
	react: 'React',
	...(process.env.NODE_ENV === 'production'
		? { 'react-dom': 'ReactDOM' }
		: {}),
	backbone: 'Backbone',
	lodash: 'lodash',
	'lodash-es': 'lodash'
};

export const WP_EXTERNAL_PACKAGES: Record<string, string> = {
	...NON_WP_PACKAGES,
	...WP_PACKAGES
};
