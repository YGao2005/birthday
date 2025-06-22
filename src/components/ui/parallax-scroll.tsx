// src/components/ui/parallax-scroll.tsx
"use client";

import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

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
        className={cn("parallax-scroll h-[100vh] items-start overflow-y-auto w-full", className)}
        ref={gridRef}
      >
        <div className="grid grid-cols-2 items-start gap-8 py-20 px-16 pl-20 pr-12 max-w-none">
          <div className="grid gap-8">
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={"grid-1" + idx}
                className="relative group"
              >
                <Image
                  src={el}
                  className="h-72 w-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl"
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-8">
            {secondPart.map((el, idx) => (
              <motion.div
                style={{ y: translateSecond }}
                key={"grid-2" + idx}
                className="relative group"
              >
                <Image
                  src={el}
                  className="h-72 w-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl"
                  height={400}
                  width={400}
                  alt="gallery image"
                  quality={90}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
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