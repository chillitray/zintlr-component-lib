# Zintlr Component Library - Usage Guide

## Webpack Warnings Resolution

This library uses dynamic imports for auto-detection features, which can cause webpack warnings. Here's how to resolve them:

### For Next.js Projects

Add this to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore warnings about critical dependencies from zintlr-component-lib
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules\/zintlr-component-lib/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    // Handle external dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // Optional: Transpile the package if needed
  transpilePackages: ['zintlr-component-lib'],
};

module.exports = nextConfig;
```

### For Webpack Projects

Add this to your `webpack.config.js`:

```javascript
module.exports = {
  // ... your existing config

  // Ignore warnings about critical dependencies
  ignoreWarnings: [
    {
      module: /node_modules\/zintlr-component-lib/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],

  externals: {
    // Mark these as external to prevent bundling issues
    'react': 'React',
    'react-dom': 'ReactDOM',
    'axios': 'axios',
    'yup': 'yup',
    'jsonwebtoken': 'jsonwebtoken',
    'moment': 'moment',
    'xlsx': 'XLSX',
    'sonner': 'sonner',
  },
};
```

### For Create React App

Add this to your `package.json`:

```json
{
  "scripts": {
    "start": "GENERATE_SOURCEMAP=false react-scripts start",
    "build": "GENERATE_SOURCEMAP=false react-scripts build"
  }
}
```

Or create a `craco.config.js` file:

```javascript
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        {
          module: /node_modules\/zintlr-component-lib/,
          message: /Critical dependency: the request of a dependency is an expression/,
        },
      ];
      return webpackConfig;
    },
  },
};
```

### For Vite Projects

Add this to your `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['zintlr-component-lib'],
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'axios', 'yup', 'jsonwebtoken', 'moment', 'xlsx', 'sonner'],
    },
  },
});
```

## Why This Happens

The library uses dynamic imports in the auto-detection features:

1. **Domain Auto-Detection**: Tries to import endpoints files from various possible paths
2. **Validator Auto-Detection**: Tries to import validator files from various possible paths

These dynamic imports are necessary for the auto-detection functionality but cannot be statically analyzed by webpack.

## Alternative: Disable Auto-Detection

If you don't need the auto-detection features, you can disable them:

```javascript
import { request_caller } from 'zintlr-component-lib';

// Disable auto-detection
const response = await request_caller({
  method: 'post',
  endpoint: 'your-endpoint',
  data: yourData,
  autoDetectValidators: false,
  autoDetectDomain: false,
  domain: 'https://your-api-domain.com'
});
```

## Manual Configuration

You can also manually configure the paths:

```javascript
import {
  setEndpointsPath,
  setValidatorPath,
  autoDetectDomainHandler,
  autoDetectValidatorsHandler
} from 'zintlr-component-lib';

// Set custom paths
setEndpointsPath('src/config/endpoints.js');
setValidatorPath('src/validators/api-validators.js');

// Initialize manually
await autoDetectDomainHandler();
await autoDetectValidatorsHandler();
```

## Support

If you continue to experience issues, please:

1. Check that all peer dependencies are installed
2. Ensure your bundler configuration is properly set up
3. Consider using the manual configuration approach instead of auto-detection
