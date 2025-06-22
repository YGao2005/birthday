"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SmoothCursor } from "./smooth-cursor";

interface GlobalCursorContextType {
  setIsHovering: (hovering: boolean) => void;
}

const GlobalCursorContext = createContext<GlobalCursorContextType | undefined>(undefined);

export function useGlobalCursor() {
  const context = useContext(GlobalCursorContext);
  if (!context) {
    throw new Error("useGlobalCursor must be used within a GlobalCursorProvider");
  }
  return context;
}

export function GlobalCursorProvider({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add global hover detection for interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      
      // Ensure target is an Element before checking properties
      if (!(target instanceof Element)) {
        return;
      }
      
      // Check for interactive elements
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-interactive]") ||
        target.closest(".glare-card") ||
        target.closest(".gallery-item") ||
        target.closest(".back-button") ||
        target.closest(".parallax-scroll") ||
        target.closest(".group") ||
        target.closest("[role='button']") ||
        target.closest("[tabindex]") ||
        (target as HTMLElement).style.cursor === "pointer" ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      
      // Ensure both target and relatedTarget are Elements
      if (!(target instanceof Element) || !(relatedTarget instanceof Element)) {
        setIsHovering(false);
        return;
      }
      
      // Only set hovering to false if we're not moving to another interactive element
      if (!isElementInteractive(relatedTarget)) {
        setIsHovering(false);
      }
    };

    const isElementInteractive = (element: Element): boolean => {
      return !!(
        element.tagName === "BUTTON" ||
        element.tagName === "A" ||
        element.closest("button") ||
        element.closest("a") ||
        element.closest("[data-interactive]") ||
        element.closest(".glare-card") ||
        element.closest(".gallery-item") ||
        element.closest(".back-button") ||
        element.closest(".parallax-scroll") ||
        element.closest(".group") ||
        element.closest("[role='button']") ||
        element.closest("[tabindex]") ||
        (element as HTMLElement).style.cursor === "pointer" ||
        element.classList.contains("cursor-pointer")
      );
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <GlobalCursorContext.Provider value={{ setIsHovering }}>
      <SmoothCursor isHovering={isHovering} />
      {children}
    </GlobalCursorContext.Provider>
  );
} 