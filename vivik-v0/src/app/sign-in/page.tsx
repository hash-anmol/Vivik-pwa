import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-tr from-primary-50 via-white to-accent-50">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-primary-900 font-semibold text-xl">Vivik</span>
        </Link>

      </div>
      
      <div className="glassmorphism p-8 sm:p-12 w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient">Welcome Back!</h1>
          <p className="mt-2 text-gray-600">Sign in to connect with your vibe tribe</p>
        </div>
        
        <div className="flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-glow',
                card: 'bg-transparent shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 
                  'border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all duration-200',
                formFieldInput: 
                  'w-full p-3 rounded-lg border border-gray-200 transition-all duration-200 bg-white bg-opacity-70 focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:outline-none',
                footer: 'hidden',
              },
            }}
            redirectUrl="/dashboard"
          />
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <p>Don&apos;t have an account? <Link href="/sign-up" className="text-primary-600 hover:text-primary-800 font-medium">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
} 