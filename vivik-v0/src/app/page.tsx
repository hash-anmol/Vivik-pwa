import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white to-primary-50">
      {/* Header */}
      <header className="w-full p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-primary-900 font-semibold text-xl">Vivik</span>
          </div>
          
          <div className="flex gap-4">
            <SignedIn>
              <Link 
                href="/dashboard" 
                className="btn-primary"
              >
                Dashboard
              </Link>
            </SignedIn>
            
            <SignedOut>
              <Link 
                href="/sign-in" 
                className="btn-secondary"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="btn-primary"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient">
            Find Your Vibe Tribe
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Connect with people who share your interests and are near you. Build meaningful connections in your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <SignedIn>
              <Link 
                href="/dashboard" 
                className="btn-primary text-lg py-4 px-8"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
            
            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/sign-up" 
                  className="btn-primary text-lg py-4 px-8"
                >
                  Get Started
                </Link>
                <Link 
                  href="/sign-in" 
                  className="btn-secondary text-lg py-4 px-8"
                >
                  Already have an account?
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-gray-600">
        <p className="text-sm">© {new Date().getFullYear()} Vivik. Find your vibe tribe.</p>
      </footer>
    </div>
  );
}
