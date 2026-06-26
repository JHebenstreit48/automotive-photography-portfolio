import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lightbox } from '@/app/shared/lightbox/lightbox';
import { CategoryTabs } from '@/app/pages/gallery/components/categoryTabs/categoryTabs';
import { BrandFilter } from './components/brandFilter/brandFilter';
import { VehicleService } from '@app/core/services/vehicle.service';
import { getImageUrl } from '@app/utils/imageUrl';

export interface GalleryImage {
  id: number | string;
  src: string;
  alt: string;
  camera?: string;
  location?: string;
  category?: string;
  make?: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, Lightbox, CategoryTabs, BrandFilter],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  currentIndex = signal(0);
  lightboxOpen = signal(false);
  lightboxIndex = signal(0);

  allVehicles = signal<GalleryImage[]>([]);
  activeCategory = signal<string>('');
  activeBrand = signal<string>('');

  categories = computed(() =>
    [...new Set(this.allVehicles().map(v => v.category ?? ''))].filter(Boolean)
  );

  brands = computed(() =>
    [...new Set(
      this.allVehicles()
        .filter(v => v.category === this.activeCategory())
        .map(v => v.make ?? '')
    )].filter(Boolean)
  );

  images = computed(() => {
    let filtered = this.allVehicles();
    if (this.activeCategory()) {
      filtered = filtered.filter(v => v.category === this.activeCategory());
    }
    if (this.activeBrand()) {
      filtered = filtered.filter(v => v.make === this.activeBrand());
    }
    return filtered;
  });

  constructor(private vehicleService: VehicleService) {}

  async ngOnInit(): Promise<void> {
    try {
      const vehicles = await this.vehicleService.getVehicles();
      if (vehicles.length > 0) {
        this.allVehicles.set(vehicles.map(v => ({
          id: v.id,
          src: getImageUrl(`images/${v.category}/${v.make?.toLowerCase()}/${v.filename}`),
          alt: v.title,
          location: v.location,
          camera: v.camera,
          category: v.category,
          make: v.make,
        })));
      }

      if (this.categories().length > 0) {
        this.activeCategory.set(this.categories()[0]);
        if (this.brands().length > 0) {
          this.activeBrand.set(this.brands()[0]);
        }
      }
    } catch (err) {
      console.error('[Gallery] Failed to load vehicles from backend', err);
    }
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
    this.activeBrand.set('');
    this.currentIndex.set(0);
    if (this.brands().length > 0) {
      this.activeBrand.set(this.brands()[0]);
    }
  }

  selectBrand(brand: string): void {
    this.activeBrand.set(brand);
    this.currentIndex.set(0);
  }

  next(): void {
    this.currentIndex.update((i) => (i + 1) % this.images().length);
  }

  prev(): void {
    this.currentIndex.update((i) => (i - 1 + this.images().length) % this.images().length);
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