import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Megaphone, Lightbulb, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'AI Sales Agent', icon: Users },
  { id: 'support', label: 'Customer Support', icon: MessageSquare },
  { id: 'marketing', label: 'AI Marketing', icon: Megaphone },
  { id: 'ceo', label: 'CEO Assistant', icon: Lightbulb },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col p-4 shrink-0 transition-all duration-300">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Nim AI
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
              activeTab === item.id 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5' 
                : 'text-muted hover:bg-white/5 hover:text-white'
            )}
          >
            <item.icon className={clsx(
              "w-5 h-5 transition-colors", 
              activeTab === item.id ? "text-primary" : "text-muted group-hover:text-white"
            )} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
