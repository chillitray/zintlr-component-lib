const path = require('path');

module.exports = {
    // ... your existing webpack config
    module: {
        rules: [
            // ... your existing rules
        ],
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false,
            "crypto": false,
        },
    },
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
    // Ignore warnings about critical dependencies
    ignoreWarnings: [
        {
            module: /node_modules\/zintlr-component-lib/,
            message: /Critical dependency: the request of a dependency is an expression/,
        },
    ],
    // Alternative: Use webpack's built-in ignore plugin
    plugins: [
        // ... your existing plugins
        new (require('webpack')).IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
    ],
};
