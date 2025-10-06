import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, BarChart3, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Veículos', href: '/vehicles', icon: Truck },
  { name: 'Estatísticas', href: '/statistics', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
      >
        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-sidebar-foreground">FleetView</h1>
                  <p className="text-xs text-sidebar-foreground/60">Motorhome Manager</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-sidebar-accent group',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className={cn('px-4 py-3 rounded-lg bg-sidebar-accent', collapsed && 'px-2')}>
              <p className="text-xs text-sidebar-foreground/60">
                {!collapsed ? 'Sistema de Monitoramento v2.0' : 'v2.0'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
