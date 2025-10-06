import { useVehicleData } from '@/hooks/useVehicleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useMemo } from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function Statistics() {
  const vehicles = useVehicleData();

  const consumptionData = useMemo(() => {
    return vehicles.map((v) => ({
      name: v.id,
      consumption: v.instantConsumption,
    }));
  }, [vehicles]);

  const statusData = useMemo(() => {
    const on = vehicles.filter((v) => v.status === 'on').length;
    const off = vehicles.length - on;
    return [
      { name: 'Ligados', value: on, color: 'hsl(var(--success))' },
      { name: 'Desligados', value: off, color: 'hsl(var(--muted-foreground))' },
    ];
  }, [vehicles]);

  const tempData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = new Date().getHours() - (11 - i);
      const avgTemp = vehicles.reduce((acc, v) => acc + v.engineTemp, 0) / vehicles.length;
      return {
        time: `${hour < 0 ? hour + 24 : hour}:00`,
        temp: avgTemp + Math.random() * 10 - 5,
      };
    });
  }, [vehicles]);

  const topSpeeds = useMemo(() => {
    return [...vehicles]
      .sort((a, b) => b.speed - a.speed)
      .slice(0, 5);
  }, [vehicles]);

  const alerts = useMemo(() => {
    return vehicles.filter(
      (v) => v.injectionStatus === 'fault' || v.engineTemp > 105 || v.fuel < 15
    );
  }, [vehicles]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Estatísticas</h1>
        <p className="text-muted-foreground mt-1">Análise detalhada da frota</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consumo Médio por Veículo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '11px' }}
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

        <Card>
          <CardHeader>
            <CardTitle>Status da Frota</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Temperatura Média da Frota</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tempData}>
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
                  dataKey="temp"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top 5 Velocidades do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSpeeds.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{vehicle.id}</p>
                      <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{vehicle.speed} km/h</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Alertas Ativos ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum alerta ativo no momento
                </p>
              ) : (
                alerts.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <div>
                      <p className="font-medium">{vehicle.id}</p>
                      <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {vehicle.injectionStatus === 'fault' && (
                        <Badge variant="destructive" className="text-xs">
                          Falha Injeção
                        </Badge>
                      )}
                      {vehicle.engineTemp > 105 && (
                        <Badge variant="destructive" className="text-xs">
                          Temp. Alta
                        </Badge>
                      )}
                      {vehicle.fuel < 15 && (
                        <Badge variant="destructive" className="text-xs">
                          Comb. Baixo
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
