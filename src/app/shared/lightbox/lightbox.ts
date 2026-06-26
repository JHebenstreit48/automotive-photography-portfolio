import { Component, input, output, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryImageMetadata } from '@app/types/galleryImageMetadata';

@Component({
  selector: 'app-lightbox',
  imports: [CommonModule],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
})
export class Lightbox implements OnInit {
  images = input.required<GalleryImageMetadata[]>();
  currentIndex = input.required<number>();
  close = output<void>();

  activeIndex = signal(0);

  ngOnInit(): void {
    this.activeIndex.set(this.currentIndex());
  }

  next(): void {
    this.activeIndex.update((i) => (i + 1) % this.images().length);
  }

  prev(): void {
    this.activeIndex.update((i) => (i - 1 + this.images().length) % this.images().length);
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get gearLine(): string {
    const v = this.images()[this.activeIndex()];
    return [v.camera, v.iso ? `ISO ${v.iso}` : null, v.aperture].filter(Boolean).join(' · ');
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'Escape') this.close.emit();
  }
}