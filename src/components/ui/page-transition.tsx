// src/components/ui/page-transition.tsx
"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Simple wrapper for now - can be enhanced later with smooth transitions
export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
};

// Placeholder for gallery-specific transitions
export const PageTransitionGallery = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
};

// Future transition variants (commented out for now)
/*
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export const slideTransitionVariants = {
  initial: { x: 300, opacity: 0, scale: 0.8 },
  animate: { x: 0, opacity: 1, scale: 1 },
  exit: { x: -300, opacity: 0, scale: 0.8 }
};

export const scaleTransitionVariants = {
  initial: { scale: 0.8, opacity: 0, rotateX: 15 },
  animate: { scale: 1, opacity: 1, rotateX: 0 },
  exit: { scale: 1.1, opacity: 0, rotateX: -15 }
};
*/