import resolve from "@rollup/plugin-node-resolve"; // Resolves node_modules imports
import commonjs from "@rollup/plugin-commonjs"; // Converts CommonJS modules to ES6
import typescript from "@rollup/plugin-typescript"; // Handles TypeScript files
import babel from "@rollup/plugin-babel"; // Transpiles code with Babel
import dts from "rollup-plugin-dts"; // Generates TypeScript declaration files (.d.ts)
import terser from "@rollup/plugin-terser"; // Minifies the output bundles
import peerDepsExternal from "rollup-plugin-peer-deps-external"; // Automatically externalizes peerDependencies
import postcss from "rollup-plugin-postcss"; // Processes and extracts CSS
import { createRequire } from "module"; // Allows using require in ES modules
const require = createRequire(import.meta.url); // Create a require function for ESM context
const packageJson = require("./package.json"); // Import package.json for config values

const external = [
  ...Object.keys(packageJson.dependencies || {}), // Externalize all dependencies
  ...Object.keys(packageJson.peerDependencies || {}), // Externalize all peerDependencies
  ...Object.keys(packageJson.optionalDependencies || {}), // Externalize all optionalDependencies
]

export default [
  {
    input: "src/index.js", // Entry point for the library
    output: [
      {
        file: packageJson.main, // Output file for CommonJS build
        format: "cjs", // CommonJS format
        sourcemap: true, // Generate source maps
        exports: 'named', // Named exports
      },
      {
        file: packageJson.module, // Output file for ESModule build
        format: "esm", // ESModule format
        sourcemap: true, // Generate source maps
        exports: 'named', // Named exports
      },
    ],
    external: ['react', 'react-dom', "next", "axios", "yup", "jsonwebtoken", "cookie", "crypto"], // Mark these modules as external (not bundled)
    plugins: [
      peerDepsExternal(), // Exclude peer dependencies from bundle
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // Resolve these file extensions
      }),
      commonjs(), // Convert CommonJS modules to ES6
      babel({
        babelHelpers: 'bundled', // Bundle Babel helpers
        exclude: 'node_modules/**', // Exclude node_modules from Babel
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Process these file extensions
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }], // Use preset-env for JS
          ['@babel/preset-react', { runtime: 'automatic' }] // Use preset-react for JSX
        ]
      }),
      typescript({ tsconfig: "./tsconfig.json", module: "esnext" }), // Compile TypeScript using tsconfig
      terser(), // Minify the output
      postcss({
        extract: true, // ensures index.css is output to dist/
      }) // Process and extract CSS
    ],

  },
  {
    input: "src/index.js", // Entry point for type declarations
    output: [{ file: packageJson.types }], // Output file for .d.ts types
    plugins: [dts()], // Generate TypeScript declaration files
    external: [/\.(css|less|scss)$/, ...external], // Exclude CSS and dependencies from type bundle
  },
];
