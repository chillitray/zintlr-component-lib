const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.js"], // Entry point for the library
  format: ["esm"], // Output formats
  dts: true, // Enable TypeScript declaration generation
  splitting: false, // Don't split the output
  sourcemap: false, // Generate source maps
  clean: true, // Clean the output directory
  treeshake: true, // Remove unused code
  minify: false, // Minify the output
  target: ['es2015', 'node16'], // Target ES2020 and Node.js 16
  platform: 'browser', // Target browser platform
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minifyIdentifiers: false, // Don't minify identifiers
  minifyWhitespace: false, // Minify whitespace
  minifySyntax: false, // Minify syntax
  loader: { // Loader for different file types
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx'
  },
  esbuildOptions: (options) => { // ESBuild options
    options.mainFields = ['module', 'main']; // Main fields for module resolution
    options.conditions = ['import', 'require']; // Conditions for module resolution
  },
});
