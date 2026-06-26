import { environment } from '@env/environment';
import type { Vehicle, VehicleCategory } from '@app/types/vehicle';

const BASE_URL = `${environment.apiBaseUrl}/api/vehicles`;

type AnyObj = Record<string, unknown>;

function mapToVehicle(data: AnyObj): Vehicle {
  return {
    id: String(data['id'] ?? ''),
    filename: String(data['filename'] ?? ''),
    title: String(data['title'] ?? ''),
    category: (data['category'] as VehicleCategory) ?? 'exotic',
    location: data['location'] ? String(data['location']) : undefined,
    dateTaken: data['dateTaken'] ? String(data['dateTaken']) : undefined,
    tags: Array.isArray(data['tags']) ? (data['tags'] as unknown[]).map(String) : undefined,
    featured: typeof data['featured'] === 'boolean' ? (data['featured'] as boolean) : undefined,
    order: typeof data['order'] === 'number' ? (data['order'] as number) : undefined,
    make: data['make'] ? String(data['make']) : undefined,
    model: data['model'] ? String(data['model']) : undefined,
    year: typeof data['year'] === 'number' ? (data['year'] as number) : undefined,
    camera: data['camera'] ? String(data['camera']) : undefined,
    iso: typeof data['iso'] === 'number' ? (data['iso'] as number) : undefined,
    aperture: data['aperture'] ? String(data['aperture']) : undefined,
    format: data['format'] ? String(data['format']) : undefined,
  };
}

export async function fetchVehicles(category?: VehicleCategory): Promise<Vehicle[]> {
  try {
    const url = category
      ? `${BASE_URL}?category=${encodeURIComponent(category)}`
      : BASE_URL;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const json = await res.json();
    const vehicles = json?.data?.vehicles ?? [];

    return vehicles.map((v: AnyObj) => mapToVehicle(v));
  } catch (err) {
    console.error('[vehiclesApi] fetchVehicles error', err);
    return [];
  }
}

export async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const json = await res.json();
    const data = json?.data?.vehicle;

    if (!data) return null;
    return mapToVehicle(data);
  } catch (err) {
    console.error('[vehiclesApi] fetchVehicleById error', err);
    return null;
  }
}