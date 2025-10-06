export interface Vehicle {
  id: string;
  model: string;
  plate: string;
  status: 'on' | 'off';
  speed: number;
  rpm: number;
  engineTemp: number;
  fuel: number;
  tirePressure: number[];
  lat: number;
  lng: number;
  battery: number;
  injectionStatus: 'normal' | 'fault';
  oilPressure: number;
  instantConsumption: number;
  lastUpdate: Date;
}

const vehicleModels = [
  'Mercedes-Benz Sprinter',
  'Fiat Ducato',
  'Iveco Daily',
  'Renault Master',
  'Ford Transit',
  'Volkswagen Crafter',
];

const brazilCoordinates = [
  { lat: -23.550520, lng: -46.633308 }, // São Paulo
  { lat: -22.906847, lng: -43.172896 }, // Rio de Janeiro
  { lat: -15.826691, lng: -47.921822 }, // Brasília
  { lat: -30.034647, lng: -51.217658 }, // Porto Alegre
  { lat: -19.916681, lng: -43.934493 }, // Belo Horizonte
  { lat: -25.441105, lng: -49.276855 }, // Curitiba
];

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomInRange(min, max));
}

export function generateVehicles(count: number): Vehicle[] {
  return Array.from({ length: count }, (_, i) => {
    const coords = brazilCoordinates[i % brazilCoordinates.length];
    return {
      id: `VH${String(i + 1).padStart(3, '0')}`,
      model: vehicleModels[i % vehicleModels.length],
      plate: `ABC${randomInt(1000, 9999)}`,
      status: Math.random() > 0.2 ? 'on' : 'off',
      speed: randomInt(0, 120),
      rpm: randomInt(800, 5000),
      engineTemp: randomInRange(70, 110),
      fuel: randomInRange(0, 100),
      tirePressure: Array.from({ length: 4 }, () => randomInRange(28, 35)),
      lat: coords.lat + randomInRange(-0.5, 0.5),
      lng: coords.lng + randomInRange(-0.5, 0.5),
      battery: randomInRange(11.8, 14.2),
      injectionStatus: Math.random() > 0.15 ? 'normal' : 'fault',
      oilPressure: randomInRange(20, 60),
      instantConsumption: randomInRange(5, 15),
      lastUpdate: new Date(),
    };
  });
}

export function updateVehicle(vehicle: Vehicle): Vehicle {
  const isOn = vehicle.status === 'on';
  
  return {
    ...vehicle,
    speed: isOn ? randomInt(0, 120) : 0,
    rpm: isOn ? randomInt(800, 5000) : 0,
    engineTemp: isOn ? randomInRange(70, 110) : randomInRange(20, 40),
    fuel: Math.max(0, vehicle.fuel - randomInRange(0, 0.5)),
    tirePressure: vehicle.tirePressure.map(p => p + randomInRange(-0.2, 0.2)),
    lat: vehicle.lat + randomInRange(-0.001, 0.001),
    lng: vehicle.lng + randomInRange(-0.001, 0.001),
    battery: randomInRange(11.8, 14.2),
    injectionStatus: Math.random() > 0.05 ? 'normal' : 'fault',
    oilPressure: isOn ? randomInRange(20, 60) : randomInRange(0, 10),
    instantConsumption: isOn ? randomInRange(5, 15) : 0,
    lastUpdate: new Date(),
  };
}

export function generateHistoricalData(vehicle: Vehicle, hours: number = 24) {
  const data = [];
  const now = Date.now();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      speed: randomInt(0, 120),
      consumption: randomInRange(5, 15),
      engineTemp: randomInRange(70, 110),
      rpm: randomInt(800, 5000),
    });
  }
  
  return data;
}
