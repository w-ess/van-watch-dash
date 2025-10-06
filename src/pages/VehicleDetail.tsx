import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleData } from '@/hooks/useVehicleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Gauge,
  Activity,
  Thermometer,
  Fuel,
  Droplet,
  Battery,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { generateHistoricalData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicles = useVehicleData();

  const vehicle = vehicles.find((v) => v.id === id);

  const historicalData = useMemo(() => {
    if (!vehicle) return [];
    return generateHistoricalData(vehicle, 12);
  }, [vehicle?.id]);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">Veículo não encontrado</p>
          <Button onClick={() => navigate('/vehicles')} className="mt-4">
            Voltar para Veículos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/vehicles')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{vehicle.model}</h1>
              <Badge
                variant={vehicle.status === 'on' ? 'default' : 'secondary'}
                className={cn(
                  'font-semibold',
                  vehicle.status === 'on' ? 'bg-success text-white' : ''
                )}
              >
                {vehicle.status === 'on' ? 'Ligado' : 'Desligado'}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {vehicle.id} • {vehicle.plate}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Velocidade</p>
                <p className="text-3xl font-bold text-foreground mt-2">{vehicle.speed}</p>
                <p className="text-sm text-muted-foreground">km/h</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RPM</p>
                <p className="text-3xl font-bold text-foreground mt-2">{vehicle.rpm}</p>
                <p className="text-sm text-muted-foreground">rotações/min</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consumo</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {vehicle.instantConsumption.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">km/l</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temperatura</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {vehicle.engineTemp.toFixed(0)}
                </p>
                <p className="text-sm text-muted-foreground">°C</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Combustível</p>
              <Fuel className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{vehicle.fuel.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${vehicle.fuel}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Pressão do Óleo</p>
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <span className="text-2xl font-bold">{vehicle.oilPressure.toFixed(1)}</span>
              <p className="text-sm text-muted-foreground">PSI</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Bateria</p>
              <Battery className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <span className="text-2xl font-bold">{vehicle.battery.toFixed(1)}V</span>
              <p className="text-sm text-muted-foreground">Voltagem</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Velocidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consumo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Status da Injeção Eletrônica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge
              variant={vehicle.injectionStatus === 'normal' ? 'default' : 'destructive'}
              className={cn(
                'text-sm px-4 py-2',
                vehicle.injectionStatus === 'normal' && 'bg-success'
              )}
            >
              {vehicle.injectionStatus === 'normal' ? 'Normal' : 'Falha Detectada'}
            </Badge>
            {vehicle.injectionStatus === 'fault' && (
              <p className="text-sm text-destructive">
                Recomenda-se verificação técnica imediata
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
