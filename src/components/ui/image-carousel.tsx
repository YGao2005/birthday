"use client";
import { ArrowRight, X } from "lucide-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { BlurFade } from "@/components/magicui/blur-fade";

import { useState, useRef, useId, useEffect, useCallback } from "react";
import Image from "next/image";
import "@/styles/globals.css";

interface ImageCarouselProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

interface SlideProps {
  src: string;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ src, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-none"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <Image
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={`Gallery image ${index + 1}`}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
            width={800}
            height={800}
            quality={90}
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/20 transition-all duration-1000" />
          )}
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button className="group cursor-none" title={title} onClick={handleClick}>
      <div
        className={`relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 ${
          type === "previous" ? "rotate-180" : ""
        }`}
      >
        <ArrowRight
          className="absolute left-/2 top-1/2 h-5 w-5 translate-x-2/3 translate-y-2/3 text-white transition-transform duration-300 group-hover:scale-110"
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    </button>
  );
};

export function ImageCarousel({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(initialIndex);

  // Update current when initialIndex changes
  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? images.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === images.length ? 0 : next);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        handlePreviousClick();
      } else if (event.key === "ArrowRight") {
        handleNextClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, current, images.length]);

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center cursor-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Animated backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            onClick={onClose}
          />

          {/* Close button with BlurFade */}
          <BlurFade delay={0.2} direction="down" inView>
            <button
              onClick={onClose}
              className="fixed top-4 right-4 z-[60] group cursor-none"
              title="Close carousel"
            >
              <div className="relative h-12 w-12 rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <X
                  className="absolute left-1/2 top-1/2 h-5 w-5 translate-x-2/3 translate-y-2/3 text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </button>
          </BlurFade>

          {/* Carousel container with scale animation */}
          <motion.div
            className="relative w-[70vmin] h-[70vmin] mx-auto z-10"
            aria-labelledby={`carousel-heading-${id}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.6, ease: "easeIn" } }}
          >
            <ul
              className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / images.length)}%)`,
              }}
            >
              {images.map((src, index) => (
                <Slide
                  key={index}
                  src={src}
                  index={index}
                  current={current}
                  handleSlideClick={handleSlideClick}
                />
              ))}
            </ul>

            {/* Navigation controls with staggered animation */}
            <motion.div 
              className="absolute flex justify-center items-center gap-16 w-full top-[calc(100%+1rem)]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
              exit={{ y: 20, opacity: 0, transition: { duration: 0.5 } }}
            >
              <CarouselControl
                type="previous"
                title="Go to previous slide"
                handleClick={handlePreviousClick}
              />

              <CarouselControl
                type="next"
                title="Go to next slide"
                handleClick={handleNextClick}
              />
            </motion.div>

            {/* Image counter with fade animation */}
            <motion.div 
              className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-white text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              {current + 1} / {images.length}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
