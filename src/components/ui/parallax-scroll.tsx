// src/components/ui/parallax-scroll.tsx
"use client";

import { useScroll, useTransform, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";

export const ParallaxScroll = ({
  images,
  className,
  isSideLayout = false,
  onImageClick,
}: {
  images: string[];
  className?: string;
  isSideLayout?: boolean;
  onImageClick?: (imageIndex: number) => void;
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

  // Helper function to calculate delay with a maximum cap
  const calculateDelay = (columnLength: number, idx: number, baseDelay: number = 0.25) => {
    const maxDelaySteps = 15; // Cap at 15 steps (0.75s max additional delay)
    const actualSteps = Math.min(columnLength - 1 - idx, maxDelaySteps);
    return baseDelay + actualSteps * 0.05;
  };

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
              <BlurFade 
                key={"grid-1" + idx} 
                delay={calculateDelay(firstPart.length, idx)} 
                direction="up"
                inView
              >
                <motion.div
                  style={{ y: translateFirst }}
                  className="relative group cursor-none"
                  onClick={() => onImageClick?.(idx)}
                >
                  <Image
                    src={el}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    height={400}
                    width={400}
                    alt="gallery image"
                    quality={90}
                    loading={idx < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transition-transform duration-700 ease-out group-hover:scale-[1.5] rounded-lg" />
                </motion.div>
              </BlurFade>
            ))}
          </div>
          <div>
            {secondPart.map((el, idx) => (
              <BlurFade 
                key={"grid-2" + idx} 
                delay={calculateDelay(secondPart.length, idx)} 
                direction="up"
                inView
              >
                <motion.div
                  style={{ y: translateSecond }}
                  className="relative group cursor-none"
                  onClick={() => onImageClick?.(firstPart.length + idx)}
                >
                  <Image
                    src={el}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    height={400}
                    width={400}
                    alt="gallery image"
                    quality={90}
                    loading={idx < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transition-transform duration-700 ease-out group-hover:scale-[1.025] rounded-lg" />
                </motion.div>
              </BlurFade>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-6xl mx-auto gap-12 py-20 px-10">
        <div className="grid gap-12">
          {firstPart.map((el, idx) => (
            <BlurFade 
              key={"grid-1" + idx} 
              delay={calculateDelay(firstPart.length, idx)} 
              direction="up"
              inView
            >
              <motion.div
                style={{ y: translateFirst }}
                className="relative group cursor-none rounded-lg"
                onClick={() => onImageClick?.(idx)}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-2xl"
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transition-transform duration-700 ease-out group-hover:scale-[1.025] rounded-lg" />
              </motion.div>
            </BlurFade>
          ))}
        </div>
        <div className="grid gap-12">
          {secondPart.map((el, idx) => (
            <BlurFade 
              key={"grid-2" + idx} 
              delay={calculateDelay(secondPart.length, idx)} 
              direction="up"
              inView
            >
              <motion.div
                style={{ y: translateSecond }}
                className="relative group cursor-none rounded-lg"
                onClick={() => onImageClick?.(firstPart.length + idx)}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-2xl"
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transition-transform duration-700 ease-out group-hover:scale-[1.025] rounded-lg" />
              </motion.div>
            </BlurFade>
          ))}
        </div>
        <div className="grid gap-12">
          {thirdPart.map((el, idx) => (
            <BlurFade 
              key={"grid-3" + idx} 
              delay={calculateDelay(thirdPart.length, idx)} 
              direction="up"
              inView
            >
              <motion.div
                style={{ y: translateThird }}
                className="relative group cursor-none rounded-lg"
                onClick={() => onImageClick?.(firstPart.length + secondPart.length + idx)}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover object-center rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-2xl"
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transition-transform duration-700 ease-out group-hover:scale-[1.025] rounded-lg" />
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
};