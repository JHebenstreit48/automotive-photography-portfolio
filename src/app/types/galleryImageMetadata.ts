export interface GalleryImageMetadata {
  id: number | string;
  src: string;
  alt: string;
  location?: string;
  category?: string;
  make?: string;
  model?: string;
  year?: number;
  camera?: string;
  iso?: number;
  aperture?: string;
  dateTaken?: string;
  tags?: string[];
  edited?: boolean;
  editedNotes?: string;
}