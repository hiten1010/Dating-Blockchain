/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    
    // Add this to handle pdfmake in webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config
  },
  
  // Add image domains configuration
  images: {
    domains: ['i.pravatar.cc'], // Add the pravatar domain for profile images
  },
}


export default nextConfig;