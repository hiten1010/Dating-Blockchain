/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc'],
  },
  // Tell Next.js to transpile the problematic Verida packages
  transpilePackages: [
    '@verida/client-ts',
    '@verida/account-web-vault',
    '@verida/types',
    '@verida/did-client',
    '@verida/encryption-utils',
  ],
  // Configure webpack to handle problematic modules
  webpack: (config, { isServer }) => {
    // Handle native modules that might cause issues
    if (isServer) {
      // Ensure externals exists
      config.externals = config.externals || [];
      
      // Add 'canvas' and 'encoding' to the list of node modules not to bundle
      config.externals.push('canvas', 'encoding');
      
      // Add Node.js module fallbacks
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
      };
    }

    // Add a rule to handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name]-[hash][ext]',
      },
    });

    // Add a null loader for the problematic font file
    config.module.rules.push({
      test: /.*Sora-Regular\.ttf$/,
      issuer: {
        and: [/@verida/],
      },
      use: {
        loader: 'next/dist/compiled/null-loader',
      },
    });

    // Add aliases for problematic modules to prevent font imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Load all problematic modules through this alias, with font imports removed
      '@verida/account-web-vault/dist/assets/fonts/Sora-Regular.ttf': 'next/dist/compiled/null-loader',
    };

    return config;
  },
};

export default nextConfig;