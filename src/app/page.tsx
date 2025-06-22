"use client";

import { useEffect, useRef } from "react";
import "./gallery.css";
import { GlareCard } from "@/components/ui/glare-card";

// Simple static data - no complex video objects
const galleryItems = [
  { id: "1-1", name: "Project Alpha", image: "/images/1.jpeg" },
  { id: "1-2", name: "Project Beta", image: "/images/2.jpeg" },
  { id: "1-3", name: "Project Gamma", image: "/images/3.jpeg" },
  { id: "1-4", name: "Project Delta", image: "/images/4.jpeg" },
  { id: "2-1", name: "Project Echo", image: "/images/5.JPG" },
  { id: "2-2", name: "Project Foxtrot", image: "/images/6.JPG" },
  {
    id: "2-3",
    name: "Project Golf",
    image: "/placeholder.svg?height=400&width=320",
  },
  {
    id: "3-1",
    name: "Project Hotel",
    image: "/placeholder.svg?height=400&width=320",
  },
  {
    id: "3-2",
    name: "Project India",
    image: "/placeholder.svg?height=400&width=320",
  },
  {
    id: "3-3",
    name: "Project Juliet",
    image: "/placeholder.svg?height=400&width=320",
  },
  {
    id: "3-4",
    name: "Project Kilo",
    image: "/placeholder.svg?height=400&width=320",
  },
];

// Group items into rows
const rows = [
  galleryItems.slice(0, 4), // First row: 4 items
  galleryItems.slice(4, 7), // Second row: 3 items
  galleryItems.slice(7, 11), // Third row: 4 items
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

  return (
    <div className="container">
      <div className="gallery" ref={galleryRef}>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <GlareCard className="flex flex-col items-center justify-center h-full w-full">
                  <img
                    className="h-full w-full absolute inset-0 object-cover rounded-[var(--radius)]"
                    style={{ aspectRatio: "320/400" }}
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
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
        ))}
      </div>
    </div>
  );
}

export default App;
