"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { getGalleryBySlug } from "@/data/gallery-data";
import { text, curve, translate } from "./curve-animations";
import "./curve-transition.css";

interface CurveTransitionProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

// Route mapping function
const getRouteLabel = (route: string, query: any): string => {
  if (route === "/") return "Gallery";
  
  if (route === "/gallery/[category]") {
    const slug = query.category;
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

export default function CurveTransition({ 
  children, 
  backgroundColor = "transparent" 
}: CurveTransitionProps) {
  const router = useRouter();
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

  const routeLabel = getRouteLabel(router.route, router.query);

  return (
    <motion.div 
      className="page curve" 
      style={{ backgroundColor }}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {/* Background overlay */}
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="background"
      />
      
      {/* Route label */}
      <motion.p className="route" {...anim(text)}>
        {routeLabel}
      </motion.p>
      
      {/* SVG Curve */}
      {dimensions.width != null && dimensions.height != null && (
        <CurveSVG height={dimensions.height} width={dimensions.width} />
      )}
      
      {/* Page content */}
      {children}
    </motion.div>
  );
}