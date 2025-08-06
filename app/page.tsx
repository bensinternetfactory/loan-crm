import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Loans CRM</h1>
          <p className="text-gray-600">Sign in to access your customer relationship management system</p>
        </div>
        <div className="mt-8">
          <SignIn 
            routing="path" 
            path="/" 
            signUpUrl="/sign-up"
            forceRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}