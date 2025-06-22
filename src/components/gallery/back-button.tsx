// src/components/gallery/back-button.tsx
"use client";

import { useRouter } from "next/navigation";
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
      className={`back-button fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group ${className}`}
    >
      <div className="flex items-center justify-center">
        <ArrowLeft size={18} />
      </div>
      <span className="text-sm font-medium opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-300">
        Back to Gallery
      </span>
    </button>
  );
};

// Alternative minimal back button
export const MinimalBackButton = ({ className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className={`back-button fixed top-8 left-8 z-50 w-12 h-12 bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-black/30 transition-all duration-300 flex items-center justify-center ${className}`}
    >
      <ArrowLeft size={20} />
    </button>
  );
};