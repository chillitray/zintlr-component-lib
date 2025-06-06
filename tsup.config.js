const { defineConfig } = require("tsup");
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to get all imports from files
function getAllImports() {
  const imports = new Set();
  const errors = [];
  
  // Get all JS/JSX files in src directory
  const files = glob.sync('src/**/*.{js,jsx}');
  
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
        imports.forEach(({package: pkg, file}) => {
          if (!allDeps[pkg] && !['path', 'fs', 'util'].includes(pkg)) {
            errors.push(`Missing dependency: "${pkg}" is imported in ${file} but not found in package.json`);
          }
        });

        if (errors.length > 0) {
          throw new Error('\n' + errors.join('\n'));
        }
      });
    }
  };
}

// Plugin to handle external imports
function handleExternalImports() {
  return {
    name: 'handle-external-imports',
    setup(build) {
      build.onResolve({ filter: /^(react|xlsx|moment|next)/ }, args => {
        return { external: true, sideEffects: false }
      })
    }
  }
}

module.exports = defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    'sonner',
    'xlsx',
    'moment',
    'next',
    'next/router'
  ],
  noExternal: [],
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  loader: {
    '.js': 'jsx'
  },
  esbuildOptions: (options) => {
    options.mainFields = ['module', 'main'];
    options.conditions = ['import', 'require'];
  },
  esbuildPlugins: [
    validateDependencies(),
    handleExternalImports()
  ]
}); 