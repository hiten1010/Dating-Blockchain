/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    
    // Add this to handle pdfmake in webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      net: false,
      tls: false,
    };

    // Handle Verida font files by excluding them from direct imports
    if (isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        // Exclude the Verida font files from server-side compilation
        if (entries['pages/_app']) {
          entries['pages/_app'] = entries['pages/_app'].filter(
            (entry) => !entry.includes('@verida/account-web-vault/dist/assets/fonts')
          );
        }
        return entries;
      };
    }

    // Handle font files as static assets
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    // Add a specific rule to handle Verida font imports
    config.module.rules.push({
      test: /vault-modal-login\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: /require\(['"]\.\/(assets\/fonts\/[^'"]+)['"]\)/g,
        replace: '""', // Replace font imports with empty string
      },
    });
    
    // Handle native modules
    if (isServer) {
      config.externals = [
        ...config.externals,
        { '@verida/account-web-vault': 'commonjs @verida/account-web-vault' },
        { '@verida/client-ts': 'commonjs @verida/client-ts' },
        { '@verida/types': 'commonjs @verida/types' }
      ]
    }
    
    return config
  },
  
  // Add image domains configuration
  images: {
    domains: ['i.pravatar.cc'], // Add the pravatar domain for profile images
  },

  // Add transpilePackages to ensure proper handling of Verida packages
  transpilePackages: [
    '@verida/account-web-vault',
    '@verida/client-ts',
    '@verida/types'
  ]
}


export default nextConfig;