import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
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
  "react/jsx-runtime",
]

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom', "react/jsx-runtime", "next"],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", module: "esnext" }),
      terser(),
      postcss({
        extract: true, // ensures index.css is output to dist/
      })
    ],

  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, ...external],
  },
];
