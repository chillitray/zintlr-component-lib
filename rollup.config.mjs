import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
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
  external: [
    "react",
    "react-dom",
    "prop-types",
    "@reduxjs/toolkit",
    "react-redux",
    "axios",
    "yup",
    /^react-icons/,
    "next/link",
    "next/image",
    "next/router",
    "next/head",
    /^next\/.*/,
    /@babel\/runtime/,
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx"],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto',
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-transform-runtime", { useESModules: true }]
      ],
    }),
    postcss({
      config: {
        path: './postcss.config.mjs',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
    json(),
    terser(),
  ],
};
