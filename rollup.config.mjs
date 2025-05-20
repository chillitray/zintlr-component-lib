import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.jsx", // Entry point of your application
  output: {
    file: "dist/bundle.js", // Output file
    format: "esm", // Output format (esm for ES Modules)
    sourcemap: true, // Generate sourcemaps for debugging
  },
  plugins: [
    resolve({
      extensions: [".js", ".jsx"], // Resolve Node.js modules and JSX files
    }),
    commonjs(), // Convert CommonJS modules to ES6
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "bundled",
      exclude: "node_modules/**", // Exclude node_modules from transpilation
    }),
    postcss({
      extract: true, // Extract CSS into a separate file
      minimize: true, // Minify the CSS
    }),
    terser(), // Minify the output JavaScript
  ],
  external: ["react", "react-dom"], // Specify external dependencies
};
