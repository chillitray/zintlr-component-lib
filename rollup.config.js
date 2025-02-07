import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/cjs/index.js",
      format: "cjs",
    },
    {
      file: "dist/esm/index.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx"], // Resolves JSX files
    }),
    commonjs(),
    babel({
      presets: ["@babel/preset-react"], // Enables JSX support
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"], // Ensure Babel processes JSX
    }),
  ],
};
