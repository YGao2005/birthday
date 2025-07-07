// src/components/gallery/back-button.tsx
"use client";

import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className = "" }: BackButtonProps) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBack = () => {
    if (isTransitioning) return; // Prevent multiple clicks
    
    setIsTransitioning(true);
    
    // Delay the route change to allow exit animation to start
    setTimeout(() => {
      router.push('/');
    }, 100); // Small delay to let animation begin
  };

  return (
    <button
      onClick={handleBack}
      disabled={isTransitioning}
      className={`back-button fixed top-20 left-32 z-40 flex items-center gap-3 group cursor-none ${
        isTransitioning ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      <div className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
        <ArrowLeft
          className="absolute left-1/2 top-1/2 h-5 w-5 translate-x-2/3 translate-y-2/3 text-white transition-transform duration-300 group-hover:scale-110"
          style={{ width: "20px", height: "20px" }}
        />
      </div>
      
      <span className="text-sm font-medium text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Back to Gallery
      </span>
    </button>
  );
};