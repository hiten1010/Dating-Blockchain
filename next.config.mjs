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
    };
    
    // Add support for loading font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });
    
    // Add this to prevent native modules from being bundled on the server side
    if (isServer) {
      // For server-side code
      config.externals = [
        ...config.externals,
        { '@verida/account-web-vault': 'commonjs @verida/account-web-vault' }
      ]
    }
    
    return config
  },
  
  // Add image domains configuration
  images: {
    domains: ['i.pravatar.cc'], // Add the pravatar domain for profile images
  },
}


export default nextConfig;