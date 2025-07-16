const { defineConfig } = require("tsup");
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to get all imports from files
function getAllImports() {
  const imports = new Set();

  // Get all JS/JSX/TS/TSX files in src directory
  const files = glob.sync('src/**/*.{js,jsx,ts,tsx}');

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Match both import and require statements
    const importMatches = content.match(/(?:import.*?from\s+['"]([^'"./][^'"]*?)['"]|require\(['"]([^'"./][^'"]*?)['"]\))/g) || [];

    importMatches.forEach(match => {
      const packageName = match.match(/['"]([^'"./][^'"]*)['"]/) || [];
      if (packageName[1]) {
        const rootPackage = packageName[1].split('/')[0];
        imports.add({
          package: rootPackage,
          file: file
        });
      }
    });
  });

  return imports;
}

// Function to validate dependencies
function validateDependencies() {
  return {
    name: 'validate-deps',
    setup(build) {
      build.onStart(async () => {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        const allDeps = {
          ...packageJson.dependencies,
          ...packageJson.peerDependencies,
          ...packageJson.devDependencies
        };

        const imports = getAllImports();
        const errors = [];

        // Check for missing dependencies
        imports.forEach(({ package: pkg, file }) => {
          if (!allDeps[pkg] && !['path', 'fs', 'util'].includes(pkg)) {
            errors.push(`Missing dependency: "${pkg}" is imported in ${file} but not found in package.json`);
          }
        });

        if (errors.length > 0) {
          console.warn('\n' + errors.join('\n'));
          // Don't throw error, just warn - some dependencies might be conditionally loaded
        }
      });
    }
  };
}

// Plugin to handle external imports and dynamic imports
function handleExternalImports() {
  return {
    name: 'handle-external-imports',
    setup(build) {
      // Handle React - always external (provided by consumer)
      build.onResolve({ filter: /^react$|^react-dom$|^react\/jsx-runtime$|^react\/jsx-dev-runtime$/ }, args => {
        return { external: true, sideEffects: false }
      })

      // Handle Next.js - external (provided by consumer)
      build.onResolve({ filter: /^next/ }, args => {
        return { external: true, sideEffects: false }
      })

      // Handle peer dependencies - external (provided by consumer)
      build.onResolve({ filter: /^(sonner|xlsx|moment|axios|yup|jsonwebtoken)$/ }, args => {
        return { external: true, sideEffects: false }
      })

      // Bundle these dependencies (they're in dependencies, not peerDependencies)
      // react-type-animation, react-switch, framer-motion, react-icons, clsx, tailwind-merge
      // These will be bundled automatically since they're not in external array

      // Handle dynamic imports to prevent webpack warnings
      build.onResolve({ filter: /.*/ }, args => {
        // If it's a dynamic import (variable path), mark as external
        if (args.pluginData?.dynamicImport) {
          return { external: true, sideEffects: false }
        }
        return null
      })
    }
  }
}

module.exports = defineConfig({
  entry: ["src/index.js"], // Entry point for the library
  format: ["esm", "cjs"], // Output formats
  dts: true, // Enable TypeScript declaration generation
  splitting: false, // Don't split the output
  sourcemap: true, // Generate source maps
  clean: true, // Clean the output directory
  treeshake: true, // Remove unused code
  minify: true, // Minify the output
  target: ['es2020', 'node16'], // Target ES2020 and Node.js 16
  platform: 'browser', // Target browser platform
  external: [ // External dependencies that should not be bundled
    'react',
    'react-dom',
    'sonner',
    'xlsx',
    'moment',
    'next',
    'next/router',
    'axios',
    'yup',
    'jsonwebtoken'
  ],
  jsx: 'automatic', // Supports JSX
  minifyIdentifiers: false, // Don't minify identifiers
  minifyWhitespace: true, // Minify whitespace
  minifySyntax: true, // Minify syntax
  loader: { // Loader for different file types
    '.js': 'jsx',
    '.jsx': 'jsx',
    '.ts': 'tsx',
    '.tsx': 'tsx'
  },
  esbuildOptions: (options) => { // ESBuild options
    options.mainFields = ['module', 'main']; // Main fields for module resolution
    options.conditions = ['import', 'require']; // Conditions for module resolution
    options.target = ['es2020', 'node16']; // Target ES2020 and Node.js 16
    options.jsx = 'transform'; // JSX transform
    options.jsxFactory = 'React.createElement'; // JSX factory function
    options.jsxFragment = 'React.Fragment'; // JSX fragment function
  },
  esbuildPlugins: [ // ESBuild plugins
    validateDependencies(), // Validate dependencies
    handleExternalImports() // Handle external imports
  ]
});
