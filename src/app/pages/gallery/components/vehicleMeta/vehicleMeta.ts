import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryImageMetadata } from '@app/types/galleryImageMetadata';

@Component({
  selector: 'app-vehicle-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicleMeta.html',
  styleUrl: './vehicleMeta.scss'
})
export class VehicleMeta {
  vehicle = input.required<GalleryImageMetadata>();

  formatDate(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get vehicleTitle(): string {
    const v = this.vehicle();
    const parts = [v.make, v.model, v.year?.toString()].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '';
  }

  get gearLine(): string {
    const v = this.vehicle();
    return [
      v.camera,
      v.iso ? `ISO ${v.iso}` : null,
      v.aperture
    ].filter(Boolean).join(' · ');
  }
}