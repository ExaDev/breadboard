import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json" assert { type: "json"};
import jsx from "rollup-plugin-jsx";


const extensions = [".js", ".jsx", ".ts", ".tsx"];

const name = "RollupTypeScriptBabel";

export default {
	input: "./src/index.ts",

	// Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
	// https://rollupjs.org/guide/en/#external
	external: [],

	plugins: [
		// Allows node_modules resolution
		resolve({ extensions }),

		// Allow bundling cjs modules. Rollup doesn't understand cjs
		commonjs(),

		// Compile TypeScript/JavaScript files
		babel({
			extensions,
			babelHelpers: "bundled",
			include: ["src/**/*", "src/Board.ts"],
			exclude: ["node_modules/**", "package.json"],
		}),
		jsx({ factory: "Board.jsx" })

	],
	output: [
		{
			file: pkg.main,
			format: "cjs",
		},
		{
			file: pkg.module,
			format: "es",
		},
		{
			file: pkg.browser,
			format: "iife",
			name,

			// https://rollupjs.org/guide/en/#outputglobals
			globals: {},
		},
	],
};
