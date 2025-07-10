// Please check if we need this or not 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... your existing Next.js config

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

        // Optional: Mark certain packages as external
        config.externals = config.externals || [];
        if (typeof config.externals === 'function') {
            const originalExternals = config.externals;
            config.externals = (context, request, callback) => {
                // Handle zintlr-component-lib dynamic imports
                if (request.includes('zintlr-component-lib')) {
                    return callback(null, 'commonjs ' + request);
                }
                return originalExternals(context, request, callback);
            };
        }

        return config;
    },

    // Optional: Transpile the package if needed
    transpilePackages: ['zintlr-component-lib'],
};

module.exports = nextConfig;
