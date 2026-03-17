'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThumbnailClick = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="flex flex-col">
      <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-zinc-900 group">
        <Image
          src={images[activeIndex]}
          alt={`${alt} - Image ${activeIndex + 1}`}
          fill
          priority
          className={`object-cover transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={90}
        />
      </div>
      
      <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square w-20 flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${
              activeIndex === index ? 'border-brand-acid' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
