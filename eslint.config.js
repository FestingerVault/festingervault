import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import ReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const plugins = {
	plugins: { 'react-hooks': ReactHooks, 'react-compiler': reactCompiler },
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/react-in-jsx-scope': 'off',
		'react-compiler/react-compiler': 'error'
	}
};
const config = [
	{
		files: ['src/**/*.{ts,tsx}']
	},
	{
		settings: {
			react: {
				version: 'detect'
			}
		},
		languageOptions: { globals: globals.browser }
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	plugins,
	{
		ignores: [
			'src/components/ui/*',
			'src/vite/**/*',
			'build/**/*',
			'deploy/**/*',
			'scripts/**/*',
			'src/router.ts'
		]
	}
];
export default config;
