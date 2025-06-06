const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  loader: {
    '.js': 'jsx'
  }
}); 