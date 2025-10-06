import { useVehicleData } from '@/hooks/useVehicleData';
import { StatCard } from '@/components/StatCard';
import { Truck, Gauge, Fuel, Zap, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

export default function Dashboard() {
  const vehicles = useVehicleData();

  const stats = useMemo(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'on').length;
    const avgSpeed = vehicles.reduce((acc, v) => acc + v.speed, 0) / vehicles.length;
    const avgFuel = vehicles.reduce((acc, v) => acc + v.fuel, 0) / vehicles.length;
    const vehiclesWithFault = vehicles.filter(v => v.injectionStatus === 'fault').length;

    return {
      total: vehicles.length,
      active: activeVehicles,
      avgSpeed: avgSpeed.toFixed(1),
      avgFuel: avgFuel.toFixed(1),
      faults: vehiclesWithFault,
    };
  }, [vehicles]);

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = new Date().getHours() - (11 - i);
      return {
        time: `${hour < 0 ? hour + 24 : hour}:00`,
        speed: Math.floor(Math.random() * 40 + 60),
      };
    });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral da frota em tempo real</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Veículos Ativos"
          value={`${stats.active}/${stats.total}`}
          icon={Truck}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Velocidade Média"
          value={`${stats.avgSpeed} km/h`}
          icon={Gauge}
        />
        <StatCard
          title="Combustível Médio"
          value={`${stats.avgFuel}%`}
          icon={Fuel}
        />
        <StatCard
          title="Alertas Ativos"
          value={stats.faults}
          icon={Zap}
          trend={{ value: 12, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Velocidade Média da Frota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
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
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status dos Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicles.slice(0, 6).map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        vehicle.status === 'on' ? 'bg-success' : 'bg-muted-foreground'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{vehicle.id}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{vehicle.speed} km/h</p>
                    <p className="text-xs text-muted-foreground">{vehicle.fuel.toFixed(0)}% comb.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
