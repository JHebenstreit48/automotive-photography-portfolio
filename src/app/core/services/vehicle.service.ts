import { Injectable } from '@angular/core';
import { fetchVehicles, fetchVehicleById } from '@app/api/vehiclesApi';
import type { Vehicle, VehicleCategory } from '@app/types/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  getVehicles(category?: VehicleCategory): Promise<Vehicle[]> {
    return fetchVehicles(category);
  }

  getVehicleById(id: string): Promise<Vehicle | null> {
    return fetchVehicleById(id);
  }
}