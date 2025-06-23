// src/components/ui/parallax-scroll.tsx
"use client";

import { useScroll, useTransform, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ParallaxScroll = ({
  images,
  className,
  isSideLayout = false,
}: {
  images: string[];
  className?: string;
  isSideLayout?: boolean;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  
  // Listen to wheel events on the entire document when component is active
  useEffect(() => {
    if (!gridRef.current) return;
    
    let currentScroll = 0;
    const maxScroll = gridRef.current.scrollHeight - gridRef.current.clientHeight;
    
    const handleWheel = (e: WheelEvent) => {
      if (!isActive || !gridRef.current) return;
      
      // Prevent default scrolling behavior
      e.preventDefault();
      
      // Update scroll position
      currentScroll = Math.max(0, Math.min(currentScroll + e.deltaY, maxScroll));
      
      // Update the grid scroll
      gridRef.current.scrollTop = currentScroll;
      
      // Update motion values
      scrollY.set(currentScroll);
      scrollYProgress.set(currentScroll / maxScroll);
    };
    
    // Add passive: false to enable preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isActive, scrollY, scrollYProgress]);
  
  // Set active state when component mounts
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // For side layout, we'll use 2 columns instead of 3
  if (isSideLayout) {
    const half = Math.ceil(images.length / 2);
    const firstPart = images.slice(0, half);
    const secondPart = images.slice(half);

    return (
      <div
        className={cn("parallax-scroll-side", className)}
        ref={gridRef}
      >
        <div className="grid">
          <div>
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={"grid-1" + idx}
                className="group"
              >
                <Image
                  src={el}
                  className=""
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
          <div>
            {secondPart.map((el, idx) => (
              <motion.div
                style={{ y: translateSecond }}
                key={"grid-2" + idx}
                className="group"
              >
                <Image
                  src={el}
                  className=""
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Original 3-column layout for full-width usage
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("parallax-scroll h-[100vh] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-10 py-20 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="relative group cursor-pointer"
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl"
                height={400}
                width={400}
                alt="gallery image"
                quality={90}
                loading={idx < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="relative group cursor-pointer"
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl"
                height={400}
                width={400}
                alt="gallery image"
                quality={90}
                loading={idx < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3" + idx}
              className="relative group cursor-pointer"
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl"
                height={400}
                width={400}
                alt="gallery image"
                quality={90}
                loading={idx < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};