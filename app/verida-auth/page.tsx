import { VeridaAuthExample } from '@/app/components/verida-auth-example';

export default function VeridaAuthPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Verida Authentication Demo
      </h1>
      <p className="text-center mb-8 max-w-xl mx-auto">
        This page demonstrates the custom Verida authentication implementation
        that avoids font loading issues during server-side rendering.
      </p>
      
      <div className="max-w-md mx-auto">
        <VeridaAuthExample />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          This implementation uses a custom wrapper around the Verida client
          to avoid font loading issues during Next.js build/deployment.
        </p>
      </div>
    </div>
  );
} 