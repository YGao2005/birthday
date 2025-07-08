import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BackButton } from "@/components/gallery/back-button";
import { getGalleryBySlug } from "@/data/gallery-data";
import CurveTransition from "@/components/ui/curve-transition";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function GettyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const galleryItem = getGalleryBySlug('getty');
  
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
          <div className="gallery-content">
            <BlurFade delay={0.8} direction="up" inView>
              <h1 className="gallery-title font-montserrat">
                {galleryItem.name}
              </h1>
            </BlurFade>
            
            <BlurFade delay={0.7} direction="up" inView>
              <p className="gallery-description">
                "STOP TAKING PHOTOS OF ME!!!" - Ellie
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