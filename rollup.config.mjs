import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: "src/index.jsx",
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
  ],
  plugins: [
    json(),
    nodePolyfills(),
    resolve({
      extensions: [".js", ".jsx"],
      exportConditions: ['node', 'import', 'require', 'default'],
      preferBuiltins: true,
      browser: true
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true
    }),
    babel({
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {
          runtime: "classic",
          development: process.env.NODE_ENV === "development"
        }]
      ],
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
      exclude: "node_modules/**"
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
