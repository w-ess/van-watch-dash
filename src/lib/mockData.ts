export interface Vehicle {
  id: string;
  model: string;
  plate: string;
  status: 'on' | 'off';
  speed: number;
  rpm: number;
  engineTemp: number;
  throttlePosition: number;
  mafSensor: number;
  ignitionTiming: number;
  systemVoltage: number;
  dtcCodes: string[];
  lat: number;
  lng: number;
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

const dtcCodes = ['P0300', 'P0171', 'P0420', 'P0301', 'P0128', 'P0442', 'P0455', 'P0174'];

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomInRange(min, max));
}

function getRandomDTCs(): string[] {
  if (Math.random() > 0.85) {
    const count = randomInt(1, 3);
    const codes = [];
    for (let i = 0; i < count; i++) {
      codes.push(dtcCodes[randomInt(0, dtcCodes.length)]);
    }
    return codes;
  }
  return [];
}

export function generateVehicles(count: number): Vehicle[] {
  return Array.from({ length: count }, (_, i) => {
    const coords = brazilCoordinates[i % brazilCoordinates.length];
    const isOn = Math.random() > 0.2;
    return {
      id: `VH${String(i + 1).padStart(3, '0')}`,
      model: vehicleModels[i % vehicleModels.length],
      plate: `ABC${randomInt(1000, 9999)}`,
      status: isOn ? 'on' : 'off',
      speed: isOn ? randomInt(0, 130) : 0,
      rpm: isOn ? randomInt(700, 5000) : 0,
      engineTemp: isOn ? randomInRange(70, 110) : randomInRange(20, 40),
      throttlePosition: isOn ? randomInRange(0, 100) : 0,
      mafSensor: isOn ? randomInRange(2, 120) : 0,
      ignitionTiming: isOn ? randomInRange(-10, 40) : 0,
      systemVoltage: randomInRange(11.8, 14.4),
      dtcCodes: getRandomDTCs(),
      lat: coords.lat + randomInRange(-0.5, 0.5),
      lng: coords.lng + randomInRange(-0.5, 0.5),
      lastUpdate: new Date(),
    };
  });
}

export function updateVehicle(vehicle: Vehicle): Vehicle {
  const isOn = vehicle.status === 'on';
  
  return {
    ...vehicle,
    speed: isOn ? randomInt(0, 130) : 0,
    rpm: isOn ? randomInt(700, 5000) : 0,
    engineTemp: isOn ? randomInRange(70, 110) : randomInRange(20, 40),
    throttlePosition: isOn ? randomInRange(0, 100) : 0,
    mafSensor: isOn ? randomInRange(2, 120) : 0,
    ignitionTiming: isOn ? randomInRange(-10, 40) : 0,
    systemVoltage: randomInRange(11.8, 14.4),
    dtcCodes: Math.random() > 0.95 ? getRandomDTCs() : vehicle.dtcCodes,
    lat: vehicle.lat + randomInRange(-0.001, 0.001),
    lng: vehicle.lng + randomInRange(-0.001, 0.001),
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
      speed: randomInt(0, 130),
      rpm: randomInt(700, 5000),
      engineTemp: randomInRange(70, 110),
      throttle: randomInRange(0, 100),
      maf: randomInRange(2, 120),
      ignitionTiming: randomInRange(-10, 40),
    });
  }
  
  return data;
}
