import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BackButton } from "@/components/gallery/back-button";
import { getGalleryBySlug } from "@/data/gallery-data";
import CurveTransition from "@/components/ui/curve-transition";
import { ImageCarousel } from "@/components/ui/image-carousel";
import "@/styles/gallery/[category]/gallery-category.css";

export default function CutePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const galleryItem = getGalleryBySlug('cute');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleImageClick = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsCarouselOpen(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };
  
  if (!galleryItem) {
    return <div>Gallery not found</div>;
  }

  return (
    <CurveTransition backgroundColor="#000">
      <div className="gallery-layout">
        <BackButton />
        
        <div className="gallery-left-panel">
          <div className={`gallery-content transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="gallery-title font-montserrat">
              {galleryItem.name}
            </h1>
            
            <p className="gallery-description">
              "🍞🧀🐾" - Ellie
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

        <div className="gallery-right-panel">
          <ParallaxScroll 
            images={galleryItem.images} 
            isSideLayout={true} 
            onImageClick={handleImageClick}
          />
        </div>

        {/* Image Carousel Modal */}
        <ImageCarousel
          images={galleryItem.images}
          initialIndex={selectedImageIndex}
          isOpen={isCarouselOpen}
          onClose={handleCloseCarousel}
        />
      </div>
    </CurveTransition>
  );
} 