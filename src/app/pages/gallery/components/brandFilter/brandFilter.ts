import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brandFilter.html',
  styleUrl: './brandFilter.scss'
})
export class BrandFilter {
  brands = input.required<string[]>();
  activeBrand = input.required<string>();
  brandSelected = output<string>();
}