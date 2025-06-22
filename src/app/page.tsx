"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import "./gallery.css";
import { GlareCard } from "@/components/ui/glare-card";

// Simple static data - no complex video objects
const galleryItems = [
  { id: "1-1", name: "Birthday", image: "/images/birthday.JPG" },
  { id: "1-2", name: "Cafes", image: "/images/cafe.JPG" },
  { id: "1-3", name: "Disney", image: "/images/disney.JPG" },
  { id: "1-4", name: "Finals", image: "/images/finals.JPG" },
  { id: "2-1", name: "Getty", image: "/images/getty.JPG" },
  { id: "2-2", name: "K-Town", image: "/images/ktown.JPG" },
  { id: "2-3", name: "Bay", image: "/images/leigh.JPG"},
  { id: "3-1", name: "SF", image: "/images/SF.JPG"},
];

const layoutPositions = [
  // Row 1: 3 items (left, center, right)
  { item: galleryItems[0], position: 'left', offsetY: 0 },
  { item: galleryItems[1], position: 'center', offsetY: 0 },
  { item: galleryItems[2], position: 'right', offsetY: 0 },
  
  // Row 2: 2 items (offset positions)
  { item: galleryItems[3], position: 'left-center', offsetY: 300 },
  { item: galleryItems[4], position: 'right-center', offsetY: 300 },
  
  // Row 3: 3 items (left, center, right)
  { item: galleryItems[5], position: 'left', offsetY: 600 },
  { item: galleryItems[6], position: 'center', offsetY: 600 },
  { item: galleryItems[7], position: 'right', offsetY: 600 },
  
  // Row 4: 1 item (center)
  //{ item: galleryItems[8], position: 'center', offsetY: 840 },
];


function App() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isHoveringCard = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      // Don't apply gallery movement when hovering over a GlareCard
      if (isHoveringCard.current) return;

      const mouseEvent = e as MouseEvent;
      const { clientX, clientY, currentTarget } = mouseEvent;
      const { width, height } = (
        currentTarget as Element
      ).getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;

      const sensitivity = 1;
      const deltaX = (centerX - clientX) / sensitivity;
      const deltaY = (centerY - clientY) / sensitivity;

      if (galleryRef.current) {
        galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
      }
    };

    const container = document.querySelector(".container");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const handleCardMouseEnter = () => {
    isHoveringCard.current = true;
  };

  const handleCardMouseLeave = () => {
    isHoveringCard.current = false;
  };

  const getPositionStyle = (position: string, offsetY: number) => {
    const baseStyles = {
      position: 'absolute' as const,
      top: `${offsetY}px`,
    };
    
    switch (position) {
      case 'left':
        return { ...baseStyles, left: '7%' };
      case 'center':
        return { ...baseStyles, left: '50%', transform: 'translateX(-50%)' };
      case 'right':
        return { ...baseStyles, right: '7%' };
      case 'left-center':
        return { ...baseStyles, left: '25%' };
      case 'right-center':
        return { ...baseStyles, right: '25%' };
      default:
        return baseStyles;
    }
  };

  return (
    <div className="container">
      <div className="gallery" ref={galleryRef}>
        {layoutPositions.map(({ item, position, offsetY }) => (
          <div
            key={item.id}
            className="gallery-item"
            style={getPositionStyle(position, offsetY)}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <GlareCard className="flex flex-col items-center justify-center h-full w-full">
              <Image
                className="h-full w-full absolute inset-0 object-cover rounded-[var(--radius)]"
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 240px, (max-width: 1200px) 280px, 320px"
                quality={95}
                priority={offsetY === 0} // Prioritize first row images
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-end">
                <p className="font-bold text-white text-2xl drop-shadow-lg">
                  {item.name}
                </p>
              </div>
            </GlareCard>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
