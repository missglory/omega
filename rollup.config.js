import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
			// "extends": @tsconfig/svelte/tsconfig.json", "@tsconfig/svelte/tsconfig.json"],
			// "extends": "@tsconfig/svelte/tsconfig.json",
			// extends: "../tsconfig.json",
			// "include": [
			//   "src/**/*",
			//   // "public"
			// ],
			"exclude": ["node_modules/*"],
			"include": ["../../external-types/**/*", "../../examples/**/*", "src/**/*",],
			"compilerOptions": {
				"typeRoots": ["../../node_modules/@types/", "../../external-types/"],
				"target": "es6",

			}
			// "buildOptions": {
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve({
			contentBase: 'public',
			port: 9000
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: true
	}
};
