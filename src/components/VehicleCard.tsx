import { Vehicle } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gauge, Zap, Thermometer, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{vehicle.model}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{vehicle.plate}</p>
          </div>
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
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Gauge className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Velocidade</p>
              <p className="text-sm font-semibold">{vehicle.speed} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">RPM</p>
              <p className="text-sm font-semibold">{vehicle.rpm}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Thermometer className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Temperatura</p>
              <p className="text-sm font-semibold">{vehicle.engineTemp.toFixed(1)}°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Throttle</p>
              <p className="text-sm font-semibold">{vehicle.throttlePosition.toFixed(0)}%</p>
            </div>
          </div>
        </div>
        {vehicle.dtcCodes.length > 0 && (
          <div className="mt-4 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-xs font-medium text-destructive">
              ⚠️ {vehicle.dtcCodes.length} código(s) de falha
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
