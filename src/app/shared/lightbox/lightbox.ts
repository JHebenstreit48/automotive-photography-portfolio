import { Component, input, output, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryImage } from '@pages/gallery/gallery';

@Component({
  selector: 'app-lightbox',
  imports: [CommonModule],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss'
})
export class Lightbox implements OnInit {
  images = input.required<GalleryImage[]>();
  currentIndex = input.required<number>();
  close = output<void>();

  activeIndex = signal(0);

  ngOnInit(): void {
    this.activeIndex.set(this.currentIndex());
  }

  next(): void {
    this.activeIndex.update(i => (i + 1) % this.images().length);
  }

  prev(): void {
    this.activeIndex.update(i => (i - 1 + this.images().length) % this.images().length);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'Escape') this.close.emit();
  }
}