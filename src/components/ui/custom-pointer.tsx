"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CustomPointerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  isHovering?: boolean;
}

/**
 * A custom pointer component that displays a white circle cursor.
 * The circle expands when hovering over interactive elements.
 */
export function CustomPointer({
  className,
  style,
  children,
  isHovering = false,
  ...props
}: CustomPointerProps): React.ReactElement {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Get the parent element directly from the ref
      const parentElement = containerRef.current.parentElement;
      if (parentElement) {
        // Add cursor-none to parent
        parentElement.style.cursor = "none";
        
        // Add event listeners to parent
        const handleMouseMove = (e: MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
        };
        
        const handleMouseEnter = () => {
          setIsActive(true);
        };
        
        const handleMouseLeave = () => {
          setIsActive(false);
        };

        parentElement.addEventListener("mousemove", handleMouseMove);
        parentElement.addEventListener("mouseenter", handleMouseEnter);
        parentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          parentElement.style.cursor = "";
          parentElement.removeEventListener("mousemove", handleMouseMove);
          parentElement.removeEventListener("mouseenter", handleMouseEnter);
          parentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }
  }, [x, y]);

  return (
    <>
      <div ref={containerRef} />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            style={{
              top: y,
              left: x,
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            {...props}
          >
            {children || (
              <motion.div
                className={cn(
                  "rounded-full bg-white mix-blend-difference opacity-50",
                  className
                )}
                animate={{
                  width: isHovering ? "60px" : "20px",
                  height: isHovering ? "60px" : "20px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}