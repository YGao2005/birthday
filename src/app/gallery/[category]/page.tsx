// src/app/gallery/[category]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BackButton } from "@/components/gallery/back-button";
import { getGalleryBySlug } from "@/data/gallery-data";

export default function GalleryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const galleryItem = getGalleryBySlug(category);
  
  if (!galleryItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black relative flex">
      <BackButton />
      
      {/* Left Side - Title and Description */}
      <div className="w-1/2 min-h-screen flex flex-col justify-center px-16 py-20">
        <div className="max-w-lg">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-white mb-8 leading-tight">
            {galleryItem.name}
          </h1>
          
          {galleryItem.description && (
            <p className="text-xl leading-relaxed mb-8">
              {galleryItem.description}
            </p>
          )}
          
          <div className="text-sm text-gray-500 uppercase tracking-widest">
            {galleryItem.images.length} photos
          </div>
          
          {/* Optional: Add some visual element */}
          <div className="mt-12 w-20 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Right Side - Parallax Gallery */}
      <div className="w-1/2 min-h-screen">
        <ParallaxScroll images={galleryItem.images} isSideLayout={true} />
      </div>
    </div>
  );
}