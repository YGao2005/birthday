// src/app/gallery/[category]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BackButton } from "@/components/gallery/back-button";
import { getGalleryBySlug } from "@/data/gallery-data";
import { BlurFade } from "@/components/magicui/blur-fade";
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
        <div className="gallery-content">
          <BlurFade delay={0.8} direction="up" inView>
            <h1 className="gallery-title font-montserrat">
              {galleryItem.name}
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.7} direction="up" inView>
            <p className="gallery-description">
              "She's mine now!" - Maggie
            </p>
          </BlurFade>

          {galleryItem.description && (
            <BlurFade delay={0.6} direction="up" inView>
              <p className="gallery-description">
                {galleryItem.description}
              </p>
            </BlurFade>
          )}
          
          <BlurFade delay={0.5} direction="up" inView>
            <div className="gallery-count">
              {galleryItem.images.length} photos
            </div>
          </BlurFade>
          
          <BlurFade delay={0.4} direction="up" inView>
            <div className="gallery-divider" />
          </BlurFade>
        </div>
      </div>

      {/* Right Side - Parallax Gallery */}
      <div className="gallery-right-panel">
        <ParallaxScroll images={galleryItem.images} isSideLayout={true} />
      </div>
    </div>
  );
}