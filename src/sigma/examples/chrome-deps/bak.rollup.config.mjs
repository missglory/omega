import serve from 'rollup-plugin-serve'
// import ts from "rollup-plugin-ts"
// import svelte from "rollup-plugin-svelte"
// import typescript from '@rollup/plugin-typescript'
import typescript from "rollup-plugin-typescript"
// css({ output: 'bundle.css' }),
// import sveltePreprocess from "svelte-preprocess";
// import ts from "rollup-plugin-ts"
import svelte from 'rollup-plugin-svelte';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import livereload from 'rollup-plugin-livereload';
// import { terser } from 'rollup-plugin-terser';
// import css from 'rollup-plugin-css-only';
// import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from "svelte-preprocess";

const production = false
export default {
	input: "src/main.js",
	output: {
		// dir: "public",
		format: "iife",
		sourcemap: !production,
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess: sveltePreprocess({
				sourceMap: !production,
				// postcss: {
					// plugins: [
						// require('tailwindcss'),
						// require('autoprefixer'),
					// ]
				// }
			})
		}),
		serve({
			contentBase: "public",
			port: 9000
		}),
		// ts({
		// 	/* Plugin options */
		// }),
		// ,		svelte({
		// 			compilerOptions: {
		// 				// enable run-time checks when not in production
		// 				dev: !production
		// 			},
		// 			preprocess: sveltePreprocess({
		// 				sourceMap: !production,
		// 				postcss: {
		// 					plugins: [
		// 						// require('tailwindcss'),
		// 						// require('autoprefixer'),
		// 					]
		// 				}
		// 			})
		// 		}),
		// css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		// resolve({
		// 	browser: true,
		// 	dedupe: ['svelte']
		// }),
		// commonjs(),
		typescript({
			include: "src/*",
		}),
	],
};