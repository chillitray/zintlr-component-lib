# Zintlr Library

A React component library for Zintlr's design system.

## Installation

To install the component library in your project:

```bash
npm install git+https://github.com/Sandeep-zintlr/zintlr-component-lib.git#main
```

## Development

### Building the Package

To build the package, run:

```bash
npm run build
```

The build process includes:

1. Compilation of components
2. Type generation
3. Version management
4. Build summary generation

### Version Management

During the build process, if there are any uncommitted changes, you'll be prompted to update the version number. The versioning follows semantic versioning (SemVer) principles:

1. **Major Update (x.0.0)**
   - Breaking changes
   - Incompatible API changes
   - Major feature additions
   - Example: 1.0.0 → 2.0.0

2. **Minor Update (0.x.0)**
   - New features in a backwards-compatible manner
   - Substantial new functionality/improvements
   - No breaking changes
   - Example: 1.0.0 → 1.1.0

3. **Patch Update (0.0.x)**
   - Bug fixes
   - Small improvements
   - Backwards-compatible changes
   - Example: 1.0.0 → 1.0.1

4. **Keep Current Version**
   - No version change needed
   - Documentation updates
   - Non-code changes
   - Example: 1.0.0 → 1.0.0 (no change)

#### Version Update Process Example

When you run `npm run build` and there are uncommitted changes:

1. You'll see your current version (e.g., "Current version: 1.0.0")
2. Select an option (1-4):
   ```bash
   Current version: 1.0.0
   1. Major update (x.0.0)
   2. Minor update (0.x.0)
   3. Patch update (0.0.x)
   4. Keep current version
   ```
3. After selection:
   - The version in `package.json` is automatically updated
   - A git tag is suggested for the new version
   - Commit messages are prepared with the new version

For example, if you select option 1 (Major update) when at version 1.0.0:
- Version in package.json changes to 2.0.0
- Build summary will show the new version
- Git commands will be suggested:
  ```bash
  git add .
  git commit -m "Updated package to version 2.0.0"
  git tag v2.0.0
  git push && git push --tags
  ```

### Build Output

After a successful build:
- The compiled files will be in the `dist` directory
- A build summary will show:
  - Package name and version
  - Main and module entry points
  - Installation command
  - Git commit instructions (if there are changes)

## Usage

Import components from the library:

```jsx
import { ComponentName } from 'zintlr-component-lib';
```

## File Extensions

The project uses different file extensions for specific purposes:

### `.js` (JavaScript) Files
- Regular JavaScript files
- Can use both CommonJS (`require()`/`module.exports`) and ES Modules (`import`/`export`)
- Traditional format supported by all JavaScript environments

### `.mjs` (ES Modules JavaScript) Files
- Explicitly denotes that a file uses ES Modules
- Allows using ES Modules in Node.js without additional configuration
- Provides better static analysis and tree-shaking capabilities
- Clearer module boundaries and better dependency management

### `.map` (Source Map) Files
- Maps minified/transpiled code back to original source code
- Enables debugging using original source code in browser dev tools
- Automatically generated during build process
- Essential for debugging production code and transpiled code
- Makes debugging easier by showing original source instead of minified version

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run `npm run build` to build and version your changes
4. Commit and push your changes
5. Create a pull request

## License

ISC


npm update kerna hi i nhi
husky ko push mat kerna github repo per 
