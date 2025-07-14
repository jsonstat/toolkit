import terser from "@rollup/plugin-terser";
import json from '@rollup/plugin-json';
import pkg from "./package.json" with {type: "json"};

const
	preamble=`// ${pkg.name} v${pkg.version} Copyright ${(new Date).getFullYear()} ${pkg.author.name} ${pkg.homepage}`,
	plugins=[
		json(),
		terser({
			output: {preamble}
		})
	]
;

export default [
	{
		input: "./src/index.js",
		output: [
			{
				name: "JSONstat",
				file: pkg.unpkg,
				format: "iife",
			},
			{
				file: pkg.module,
				format: "esm"
			},
			{
				file: pkg.main,
				format: "cjs"
			},
			{
				file: pkg.browser,
				format: "esm"
			}
		],
		plugins
	}
];
