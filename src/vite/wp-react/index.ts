import viteReact from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { mkdirSync } from 'fs';
import { InputOption } from 'rollup';
import { Plugin, PluginOption } from 'vite';
import { devServer } from './plugins/dev-server.js';
import { externalizeWpPackages } from './plugins/externalize-wp-packages.js';
import WPEnvProcess from './plugins/wp.js';
dotenv.config({ path: '.env' });

export type ViteWpReactOptions = {
	/**
	 * The entry point to your application. Defaults to `js/main.js`.
	 * @default 'js/main.js'
	 */
	input?: InputOption;

	/**
	 * The directory to write the build to. Defaults to `build`.
	 * @default 'build'
	 */
	outDir?: string;

	/**
	 * The directory to write assets to.
	 */
	assetsDir?: string;
	constants?: string[];
};

export default function viteWpReact({
	input = 'js/main.js',
	outDir = 'build',
	assetsDir,
	constants
}: ViteWpReactOptions = {}): PluginOption {
	mkdirSync('languages', { recursive: true });
	const mainPlugin: Plugin = {
		name: 'vwpr:config',
		enforce: 'pre',
		config() {
			return {
				build: {
					outDir,
					assetsDir,
					manifest: 'manifest.json',
					modulePreload: false,
					rollupOptions: {
						input
					}
				},
				css: {
					devSourcemap: false
				}
			};
		}
	};
	return [
		mainPlugin,
		devServer(),
		externalizeWpPackages(),
		viteReact({
			jsxRuntime: 'automatic',
			babel: {
				plugins: [
					[
						'@wordpress/babel-plugin-makepot',
						{
							output: `languages/${process.env.TEXTDOMAIN}.pot`
						}
					]
				]
			}
		}),
		WPEnvProcess({ constants })
	];
}
