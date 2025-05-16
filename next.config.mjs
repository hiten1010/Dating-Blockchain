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
    
    // Handle font files as static assets
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    // Create a null module for the problematic Verida font file
    config.module.rules.push({
      test: /Sora-Regular\.ttf$/,
      include: /@verida/,
      use: 'null-loader',
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