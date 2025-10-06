import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Bell, Clock, Filter, Palette } from 'lucide-react';

export default function Settings() {
  const [updateInterval, setUpdateInterval] = useState('5');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Personalize o sistema de acordo com suas preferências</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Atualização de Dados</CardTitle>
            </div>
            <CardDescription>
              Defina a frequência de atualização dos dados da frota
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interval">Intervalo de Atualização</Label>
              <Select value={updateInterval} onValueChange={setUpdateInterval}>
                <SelectTrigger id="interval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 segundos</SelectItem>
                  <SelectItem value="5">5 segundos (Padrão)</SelectItem>
                  <SelectItem value="10">10 segundos</SelectItem>
                  <SelectItem value="30">30 segundos</SelectItem>
                  <SelectItem value="60">1 minuto</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Intervalo atual: {updateInterval} segundos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <CardTitle>Filtros de Veículos</CardTitle>
            </div>
            <CardDescription>
              Configure filtros personalizados para visualização
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter">Filtrar por Status</Label>
              <Select defaultValue="all">
                <SelectTrigger id="status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os veículos</SelectItem>
                  <SelectItem value="on">Apenas ligados</SelectItem>
                  <SelectItem value="off">Apenas desligados</SelectItem>
                  <SelectItem value="dtc">Com códigos DTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model-filter">Filtrar por Modelo</Label>
              <Select defaultValue="all">
                <SelectTrigger id="model-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os modelos</SelectItem>
                  <SelectItem value="sprinter">Mercedes-Benz Sprinter</SelectItem>
                  <SelectItem value="ducato">Fiat Ducato</SelectItem>
                  <SelectItem value="daily">Iveco Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>
              Configure alertas e notificações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Alertas Ativos</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre problemas detectados
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="critical">Alertas Críticos</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações de alta prioridade
                </p>
              </div>
              <Switch id="critical" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance">Manutenção</Label>
                <p className="text-sm text-muted-foreground">
                  Lembretes de manutenção preventiva
                </p>
              </div>
              <Switch id="maintenance" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Aparência</CardTitle>
            </div>
            <CardDescription>
              Personalize a aparência da interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Interface em modo escuro (recomendado)
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Tema de Cores</Label>
              <Select defaultValue="blue">
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Azul (Padrão)</SelectItem>
                  <SelectItem value="green">Verde</SelectItem>
                  <SelectItem value="purple">Roxo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
