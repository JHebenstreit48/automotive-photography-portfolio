export type VehicleCategory =
  | 'exotic'
  | 'everyday'
  | 'heritageAndDefunct'
  | 'luxury'
  | 'track'
  | 'vans'
  | 'electric';

export interface Vehicle {
  id: string;
  filename: string;
  title: string;
  category: VehicleCategory;
  location?: string;
  dateTaken?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
  make?: string;
  model?: string;
  year?: number;
  camera?: string;
  iso?: number;
  aperture?: string;
  format?: string;
  edited?: boolean;
  editedNotes?: string;
}