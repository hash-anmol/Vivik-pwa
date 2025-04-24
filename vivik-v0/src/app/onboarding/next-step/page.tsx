"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NextStepPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top progress bar */}
      <div className="w-full px-6 pt-6 pb-12">
        <Link href="/onboarding/basic-info" className="inline-block mb-6">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-primary w-2/5 h-2 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pb-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Next Step</h1>
        <p className="text-gray-500 text-lg mb-10 text-center">
          This is a placeholder for the next step in the onboarding process.
        </p>
        
        <div className="w-full max-w-md space-y-4">
          <Link href="/dashboard">
            <Button className="w-full h-14 text-lg font-medium">
              Skip to Dashboard
            </Button>
          </Link>
          
          <Link href="/onboarding/basic-info">
            <Button variant="outline" className="w-full h-14 text-lg font-medium">
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 




