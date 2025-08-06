import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const external = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  ...Object.keys(packageJson.optionalDependencies || {}),
]

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: ['react', 'react-dom', "next", "axios", "yup", "jsonwebtoken", "cookie", "crypto"],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }),
      typescript({ tsconfig: "./tsconfig.json", module: "esnext" }),
      terser(),
      postcss({
        extract: true, // ensures index.css is output to dist/
      })
    ],

  },
  {
    input: "src/index.js",
    output: [{ file: packageJson.types }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, ...external],
  },
];
