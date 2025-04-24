import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Icon */}
      <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-16">
        <div className="text-blue-400 text-8xl">
          {/* User icon with plus */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
            <path d="M15 3v4" />
            <path d="M13 5h4" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-6">Vivik</h1>

      {/* Description */}
      <p className="text-gray-600 text-xl text-center mb-16">
        Find people nearby,<br />
        who care about what you care about.
      </p>

      {/* Buttons */}
      <div className="w-full max-w-md flex flex-col gap-6">
        <SignedOut>
          <Link
            href="/sign-up"
            className="w-full bg-blue-500 text-white text-xl font-medium py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors text-center"
          >
            Get Started
          </Link>
          
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/sign-in"
              className="text-blue-500 font-medium hover:underline"
            >
              Log in
            </Link>
          </div>
        </SignedOut>
        <SignedIn>

          <Link href="/onboarding/basic-info" className="w-full bg-blue-500 text-white text-xl font-medium py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors text-center">
          Continue Onboarding
          </Link>
          <Link href="/dashboard" className="w-full bg-blue-500 text-white text-xl font-medium py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors text-center">
          Go to Dashboard
          </Link>
        </SignedIn>

      </div>
    </div>
  );
  
}
