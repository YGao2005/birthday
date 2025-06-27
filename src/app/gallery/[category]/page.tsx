// src/app/gallery/[category]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BackButton } from "@/components/gallery/back-button";
import { getGalleryBySlug } from "@/data/gallery-data";
import "./gallery-category.css";

export default function GalleryPage() {
  const params = useParams();
  const category = params.category as string;
  const [isLoaded, setIsLoaded] = useState(false);
  
  const galleryItem = getGalleryBySlug(category);
  
  useEffect(() => {
    // Force a layout recalculation after mount
    setIsLoaded(true);
  }, []);
  
  if (!galleryItem) {
    notFound();
  }

  return (
    <div className="gallery-layout">
      <BackButton />
      
      {/* Left Side - Title and Description */}
      <div className="gallery-left-panel">
        <div className={`gallery-content transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="gallery-title font-montserrat">
            {galleryItem.name}
          </h1>
          
          <p className="gallery-description">
            "She's mine now!" - Maggie
          </p>

          {galleryItem.description && (
            <p className="gallery-description">
              {galleryItem.description}
            </p>
          )}
          
          <div className="gallery-count">
            {galleryItem.images.length} photos
          </div>
          
          <div className="gallery-divider" />
        </div>
      </div>

      {/* Right Side - Parallax Gallery */}
      <div className="gallery-right-panel">
        <ParallaxScroll images={galleryItem.images} isSideLayout={true} />
      </div>
    </div>
  );
}