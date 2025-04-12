"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Dashboard() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  // Show loading or nothing while checking auth
  if (!isLoaded || !userId) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      {/* Header */}
      <header className="w-full p-6 border-b border-gray-200 bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-primary-900 font-semibold text-xl">Vivik</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-primary-900 font-medium">
                Home
              </Link>
              <Link href="/dashboard/explore" className="text-gray-600 hover:text-primary-900 transition-colors">
                Explore
              </Link>
              <Link href="/dashboard/groups" className="text-gray-600 hover:text-primary-900 transition-colors">
                Groups
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border-2 border-primary-200",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="glassmorphism p-8 rounded-xl">
          <h1 className="text-3xl font-bold">Welcome to Vivik!</h1>
          <p className="mt-2 text-gray-600">This is your dashboard. More features coming soon.</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-semibold text-primary-800">Find people</h2>
              <p className="mt-2 text-gray-600">Discover people with similar interests nearby.</p>
            </div>
            
            <div className="bg-white bg-opacity-70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-semibold text-primary-800">Groups</h2>
              <p className="mt-2 text-gray-600">Chat with the groups you've joined.</p>
            </div>
            
            <div className="bg-white bg-opacity-70 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-semibold text-primary-800">Your Profile</h2>
              <p className="mt-2 text-gray-600">Update your interests and profile information.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 