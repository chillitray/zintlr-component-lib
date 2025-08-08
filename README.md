# 🎯 Zintlr Component Library

A comprehensive React component library and utility toolkit for Zintlr applications, featuring UI components, logging utilities, request handlers, and development tools.

## 📦 Package Overview

**Package Name:** `zintlr-component-lib`
**License:** MIT
**Author:** Sandeep (Zintlr)

## 🚀 Quick Start

### Installation

```bash
npm install git+https://github.com/chillitray/zintlr-component-lib.git#main
```

### Basic Usage

```javascript
import { Button, toast, BaseApiHandler } from 'zintlr-component-lib';

// Use components
<Button title="Click me" onClick={() => toast.success('Hello!')} />

// Use logging utilities
const wrappedHandler = BaseApiHandler.wrap(myApiHandler);
```

## 🛠️ CLI Tools

The package includes a powerful CLI for development and deployment:

### Available Commands

```bash
# Build package with version management
npx zintlr-component-lib build

# Initialize Sentry configuration files
npx zintlr-component-lib sentry-init

# Remove Sentry configuration files
npx zintlr-component-lib sentry-clean

# Show help
npx zintlr-component-lib help
```

### Build Command Features

The `build` command provides:
- **Automatic version management** - Prompts for version updates when uncommitted changes are detected
- **Clean builds** - Removes dist folder before building
- **Git integration** - Detects uncommitted changes and suggests commit commands
- **Build summary** - Shows package information and installation instructions

### Sentry Integration

The CLI includes Sentry configuration management:
- **`sentry-init`** - Creates Sentry config files from templates
- **`sentry-clean`** - Removes Sentry config files
- **Template files** - Pre-configured Sentry setups for client, server, and edge environments

## 📚 Components


#### Validation System
```javascript
import {
  setValidationConfig,
  getValidationSchema,
  getAllValidationSchemas
} from 'zintlr-component-lib';

// Set up validation schemas
setValidationConfig({
  user: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required()
  })
});

// Get validation schema
const userSchema = getValidationSchema('user');
```

## 🏗️ Build System

### Rollup Configuration

The package uses Rollup for building with the following features:

- **Multiple formats**: CommonJS and ES Modules
- **TypeScript support**: Full TypeScript compilation
- **CSS extraction**: PostCSS processing with Tailwind CSS
- **Tree shaking**: Dead code elimination
- **Minification**: Terser for production builds
- **Source maps**: For debugging
- **Peer dependencies**: External dependency handling

### Build Outputs

- **CommonJS**: `dist/index.cjs.js`
- **ES Modules**: `dist/index.mjs.js`
- **TypeScript types**: `dist/index.d.ts`
- **CSS**: `dist/index.css`

## 🎨 Styling

### Tailwind CSS Integration

The package includes Tailwind CSS v4 with:
- Custom color schemes
- Responsive design utilities
- Component-specific styling

### CSS Classes

Components use semantic class names:
- `bg-grayish-120` - Light gray background
- `text-text-black` - Primary text color
- `border-text-black` - Border color

## 🔒 Security Features

### JWT Handling
- Secure JWT verification and decryption
- Token validation utilities
- Server-side security helpers

### Request Validation
- Yup schema validation
- Configurable validation rules
- Type-safe validation system

## 📋 Development Scripts

```bash
# Build package
npm run build

# Development mode with watch
npm run dev

# Clean build artifacts
npm run clean:dist

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run prettier
npm run format

# Package build with version management
npm run build:package
```

## 🔧 Configuration Files

### TypeScript Configuration
- Strict type checking
- React JSX support
- Module resolution
- Declaration file generation

### ESLint Configuration
- React-specific rules
- Import/export validation
- Code quality standards
- Prettier integration

### PostCSS Configuration
- Tailwind CSS processing
- Autoprefixer
- CSS optimization

## 📦 Package Structure

```
zintlr-component-lib/
├── src/
│   ├── bin/                    # CLI tools
│   │   ├── build-script.js     # Build automation
│   │   └── index.js           # CLI entry point
│   ├── components/             # React components
│   │   ├── utils/             # Component utilities
│   │   └── index.js           # Component exports
│   ├── constants/             # Constants and configs
│   ├── handlers/              # Request handlers
│   │   ├── Subitems/          # Handler utilities
│   │   └── index.js           # Handler exports
│   ├── helpers/               # Utility functions
│   │   ├── Subitems/          # Helper utilities
│   │   └── index.js           # Helper exports
│   ├── logger/                # Logging system
│   │   ├── Subitems/          # Logger utilities
│   │   └── index.js           # Logger exports
│   ├── templates/             # Sentry config templates
│   ├── index.css              # Global styles
│   └── index.js               # Main entry point
├── dist/                      # Build output
├── rollup.config.mjs          # Build configuration
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Package metadata
```

## 🔄 Version Management

The build system includes intelligent version management:

1. **Git Status Detection** - Checks for uncommitted changes
2. **Version Prompting** - Interactive version selection
3. **Automatic Updates** - Updates package.json version
4. **Commit Suggestions** - Provides git commands for changes

### Version Types
- **Major** (x.0.0) - Breaking changes
- **Minor** (0.x.0) - New features
- **Patch** (0.0.x) - Bug fixes

## 🚀 Deployment

### Publishing Process

1. **Build** - Run `npm run build:package`
2. **Version** - Select version update type
3. **Commit** - Commit changes with version
4. **Tag** - Create git tag
5. **Push** - Push to repository

### Installation Commands

```bash
# Latest version
npm install git+https://github.com/chillitray/zintlr-component-lib.git#main

# Specific version
npm install git+https://github.com/chillitray/zintlr-component-lib.git#v1.0.0
```

## 🤝 Contributing

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Husky hooks: `npm run prepare`
4. Start development: `npm run dev`

### Code Quality

- **Linting**: ESLint with React rules
- **Formatting**: Prettier integration
- **Type Safety**: TypeScript strict mode
- **Pre-commit**: Automated quality checks

### Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run prettier

# Full format and fix
npm run format
```

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Support

For issues, questions, or contributions:
- **Repository**: [GitHub](https://github.com/chillitray/zintlr-component-lib)
- **Author**: Sandeep (Zintlr)

---

**Built with ❤️ for the Zintlr team**
