// src/components/gallery/back-button.tsx
"use client";

import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className = "" }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleBack}
      className={`back-button fixed top-20 left-32 z-[10002] flex items-center gap-3 group ${className}`}
    >
      <div className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
        <ArrowLeft
          className="absolute left-1/2 top-1/2 h-5 w-5 translate-x-2/3 translate-y-2/3 text-white transition-transform duration-300 group-hover:scale-110"
          style={{ width: "20px", height: "20px" }}
        />
      </div>
      
      {/* Text label */}
      <span className="text-sm font-medium text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Back to Gallery
      </span>
    </button>
  );
};

// Alternative minimal back button with better hover state
export const MinimalBackButton = ({ className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className={`back-button fixed top-20 left-32 z-[10002] group ${className}`}
    >
      <div className="relative">
        {/* Hover background */}
        <div className="absolute -inset-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Main circle */}
        <div className="relative w-12 h-12 bg-black/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black/30 group-hover:border-white/30">
            <ArrowLeft className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" style={{ width: '20px', height: '20px' }} />
        </div>
      </div>
    </button>
  );
};