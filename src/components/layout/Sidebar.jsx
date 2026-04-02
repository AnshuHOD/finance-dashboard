import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Lightbulb, Wallet } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ReceiptText },
    { name: 'Insights', path: '/insights', icon: Lightbulb },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-primary-card border-r border-primary-border h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
          <Wallet className="text-primary w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">Zorvyn</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
                isActive 
                  ? "bg-accent-blue/10 text-accent-blue font-medium" 
                  : "text-text-secondary hover:bg-primary-hover hover:text-text-primary"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-primary-border">
        <div className="bg-primary/50 rounded-lg p-3">
          <p className="text-xs text-text-secondary uppercase font-semibold">Current Plan</p>
          <p className="text-sm font-medium mt-1">Free Tier</p>
          <button className="w-full mt-3 py-1.5 bg-primary-border hover:bg-primary-hover text-xs rounded transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
