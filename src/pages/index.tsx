// src/pages/index.tsx
import { MainGallery } from "@/components/gallery/main-gallery";
import CurveTransition from "@/components/ui/curve-transition";

export default function HomePage() {
  return (
    <CurveTransition backgroundColor="#000">
      <MainGallery />
    </CurveTransition>
  );
}