import { useState, useEffect } from 'react';
import { Vehicle, generateVehicles, updateVehicle } from '@/lib/mockData';

export function useVehicleData() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => generateVehicles(12));

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle => updateVehicle(vehicle))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return vehicles;
}
