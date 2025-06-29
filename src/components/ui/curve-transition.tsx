"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { getGalleryBySlug } from "@/data/gallery-data";
import { text, curve, translate } from "./curve-animations";
import "./curve-transition.css";

interface CurveTransitionProps {
  children: React.ReactNode;
}

// Route mapping function
const getRouteLabel = (pathname: string, query: any): string => {
  if (pathname === "/") return "Gallery";
  
  if (pathname === "/gallery/[category]") {
    const slug = query.category;
    // Handle transition states where query might be undefined
    if (!slug) return "Gallery";
    const gallery = getGalleryBySlug(slug);
    return gallery?.name || "Gallery";
  }
  
  return "Gallery";
};

// Animation helper
const anim = (variants: any) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit"
  };
};

// SVG Component
const CurveSVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
    M0 300 
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

export default function CurveTransition({ children }: CurveTransitionProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const [dimensions, setDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    resize();
    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const routeLabel = getRouteLabel(pathname, router.query);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="curve-transition"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Background overlay */}
        <div
          style={{ opacity: dimensions.width == null ? 1 : 0 }}
          className="curve-background"
        />
        
        {/* Route label */}
        <motion.p className="route-label" {...anim(text)}>
          {routeLabel}
        </motion.p>
        
        {/* SVG Curve */}
        {dimensions.width != null && dimensions.height != null && (
          <CurveSVG height={dimensions.height} width={dimensions.width} />
        )}
        
        {/* Page content */}
        <div className="curve-transition-content">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}