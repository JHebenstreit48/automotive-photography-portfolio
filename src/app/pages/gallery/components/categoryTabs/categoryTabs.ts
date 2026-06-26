import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoryTabs.html',
  styleUrl: './categoryTabs.scss'
})
export class CategoryTabs {
  categories = input.required<string[]>();
  activeCategory = input.required<string>();
  categorySelected = output<string>();

  formatLabel(category: string): string {
    const labels: Record<string, string> = {
      exotic: 'Exotic',
      everyday: 'Everyday',
      heritageAndDefunct: 'Heritage & Defunct',
      luxury: 'Luxury',
      track: 'Track',
      vans: 'Vans',
      electric: 'Electric',
    };
    return labels[category] ?? category;
  }
}