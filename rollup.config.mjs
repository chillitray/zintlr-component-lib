import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';

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
    json(),
    resolve({
      extensions: [".js", ".jsx"],
      exportConditions: ['node', 'import', 'require', 'default'],
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
  external: [
    "react",
    "react-dom",
    "next/link",
    "next/image",
    "next/router",
    "next/head",
    /^react-icons($|\/.*)/,
  ],
};
