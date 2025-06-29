// src/components/gallery/main-gallery.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GlareCard } from "@/components/ui/glare-card";
import { galleryData } from "@/data/gallery-data";

const layoutPositions = [
  // Row 1: 3 items (left, center, right)
  { position: 'left', offsetY: 0 },
  { position: 'center', offsetY: 0 },
  { position: 'right', offsetY: 0 },
  
  // Row 2: 2 items (offset positions)
  { position: 'left-center', offsetY: 300 },
  { position: 'right-center', offsetY: 300 },
  
  // Row 3: 3 items (left, center, right)
  { position: 'left', offsetY: 600 },
  { position: 'center', offsetY: 600 },
  { position: 'right', offsetY: 600 },
];

export function MainGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const isHoveringCard = useRef(false);
  const [isHoveringGlareCard, setIsHoveringGlareCard] = useState(false);
  const router = useRouter();

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
    setIsHoveringGlareCard(true);
  };

  const handleCardMouseLeave = () => {
    isHoveringCard.current = false;
    setIsHoveringGlareCard(false);
  };

  const handleCardClick = (slug: string) => {
    router.push(`/gallery/${slug}`);
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
        {layoutPositions.map(({ position, offsetY }, index) => {
          const item = galleryData[index];
          if (!item) return null;

          return (
            <div
              key={item.id}
              className="gallery-item"
              style={getPositionStyle(position, offsetY)}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => handleCardClick(item.slug)}
            >
              <GlareCard 
                className="flex flex-col items-center justify-center h-full w-full"
                title={item.name}
              >
                <Image
                  className="h-full w-full absolute inset-0 object-cover rounded-[var(--radius)]"
                  src={item.coverImage}
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
              </GlareCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}