/* ============================================================
   Gallery — responsive image grid with lightbox modal.
   ============================================================ */

import { memo, useState } from 'react';
import type { MediaAsset } from '@/types';
import { SmartImage } from '@/components/ui/SmartImage';
import { Modal } from '@/components/ui/Modal';

interface GalleryProps {
  images: MediaAsset[];
  title: string;
}

export const Gallery = memo(function Gallery({ images, title }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  return (
    <div className="gallery">
      <div className="gallery__grid">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            className="gallery__item"
            onClick={() => open(index)}
            aria-label={`Ampliar imagen: ${image.alt}`}
          >
            <SmartImage src={image.src} alt={image.alt} ratio="16 / 10" />
          </button>
        ))}
      </div>

      <Modal open={activeIndex !== null} onClose={close} title={`${title} · Imagen ${(activeIndex ?? 0) + 1} de ${images.length}`}>
        {activeIndex !== null && (
          <div className="gallery__lightbox">
            <SmartImage
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              ratio="16 / 10"
              eager
            />
            <p className="gallery__caption">{images[activeIndex].alt}</p>
          </div>
        )}
      </Modal>
    </div>
  );
});
