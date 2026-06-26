import { environment } from '@env/environment';
export function getImageUrl(path: string): string {
  if (!path) return '';

  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }

  const bucket = environment.storageBucket;
  const encoded = encodeURIComponent(path);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media`;
}