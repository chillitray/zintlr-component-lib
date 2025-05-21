import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json'; // Add this line

export default {
  input: "src/index.jsx",
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    json(), // Add this before other plugins
    resolve({
      extensions: [".js", ".jsx"],
      exportConditions: ['node', 'import', 'require', 'default'],
      // Add this to properly resolve Next.js imports
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
    }),
    postcss({
      extract: true,
      minimize: true,
    }),
    terser(),
  ],
  // Add all Next.js specific imports to external dependencies
  external: [
    "react",
    "react-dom",
    "next/link",
    "next/image",
    "next/router",
    "next/head",
  ],
};
