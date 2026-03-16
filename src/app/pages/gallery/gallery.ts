import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lightbox } from '@shared/lightbox/lightbox';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  camera?: string;
  location?: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, Lightbox],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  currentIndex = signal(0);
  lightboxOpen = signal(false);
  lightboxIndex = signal(0);

  images: GalleryImage[] = [
    {
      id: 1,
      src: '/images/ferrari-458-speciale-side-view.jpg',
      alt: 'Ferrari 458 Speciale Spider',
      location: 'Exotic Car Dealership',
    },
    {
      id: 2,
      src: '/images/ferrari-458-speciale-front-view.jpg',
      alt: 'Ferrari 458 Speciale Spider',
      location: 'Exotic Car Dealership',
    },
    {
      id: 3,
      src: '/images/ferrari-458-speciale-three-quarters-view.jpg',
      alt: 'Ferrari 458 Speciale Spider',
      location: 'Exotic Car Dealership',
    },
    {
      id: 4,
      src: '/images/ferrari-458-speciale-shifter-view.jpg',
      alt: 'Ferrari 458 Speciale Shifter',
      location: 'Exotic Car Dealership',
    },
    {
      id: 5,
      src: '/images/lamborghini-huracan-evo-front.jpg',
      alt: 'Lamborghini Huracán Evo',
      location: "Lamborghini Museum, Sant'Agata Bolognese, Italy",
    },
    {
      id: 6,
      src: '/images/lamborghini-aventador-svj-side-view.jpg',
      alt: 'Lamborghini Aventador SVJ',
      location: "Lamborghini Museum, Sant'Agata Bolognese, Italy",
    },
    {
      id: 7,
      src: '/images/lamborghini-centenario-side-view.jpg',
      alt: 'Lamborghini Centenario',
      location: "Lamborghini Museum, Sant'Agata Bolognese, Italy",
    },
    {
      id: 8,
      src: '/images/ferrari-dino-206gt-1967.jpg',
      alt: 'Ferrari Dino 206 GT (1967)',
      location: 'Museo Enzo Ferrari Modena, Italy',
    },
    {
      id: 9,
      src: '/images/ferrari-488-pista-2018.jpg',
      alt: 'Ferrari 488 Pista (2018)',
      location: 'Museo Enzo Ferrari Modena, Italy',
    },
    // { id: 5, src: '/images/lamborghini-svj-green.jpg', alt: 'Lamborghini Aventador SVJ', location: 'Lamborghini Museum, Italy' },
    // { id: 6, src: '/images/lamborghini-gallardo-silver.jpg', alt: 'Lamborghini Gallardo', location: 'Lamborghini Museum, Italy' },
    // { id: 7, src: '/images/lamborghini-asterion-blue.jpg', alt: 'Lamborghini Asterion Concept', location: 'Lamborghini Museum, Italy' },
    // { id: 8, src: '/images/lamborghini-concept-white.jpg', alt: 'Lamborghini Concept', location: 'Lamborghini Museum, Italy' },
    // { id: 9, src: '/images/lamborghini-huracan-orange.jpg', alt: 'Lamborghini Huracán Performante', location: 'Lamborghini Museum, Italy' },
    // { id: 10, src: '/images/ferrari-vintage-547.jpg', alt: 'Vintage Ferrari #547', location: 'Ferrari Museum, Italy' },
    // { id: 11, src: '/images/ferrari-vintage-123.jpg', alt: 'Vintage Ferrari #123', location: 'Ferrari Museum, Italy' },
  ];

  next(): void {
    this.currentIndex.update((i) => (i + 1) % this.images.length);
  }

  prev(): void {
    this.currentIndex.update((i) => (i - 1 + this.images.length) % this.images.length);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }
}
