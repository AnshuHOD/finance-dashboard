import React from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const { role, setRole } = useApp();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/transactions': return 'Transactions';
      case '/insights': return 'Insights';
      default: return 'Finance';
    }
  };

  return (
    <header className="h-16 border-b border-primary-border bg-primary/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">{getPageTitle(location.pathname)}</h1>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center bg-primary-card border border-primary-border rounded-lg px-2 py-1">
          <User className="w-4 h-4 text-text-secondary mr-2" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-sm focus:outline-none cursor-pointer pr-4 appearance-none"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <ChevronDown className="w-4 h-4 text-text-secondary -ml-4 pointer-events-none" />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 border border-primary-border rounded-lg bg-primary-card hover:bg-primary-hover transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5 text-accent-gold" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="p-2 border border-primary-border rounded-lg bg-primary-card hover:bg-primary-hover relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-primary-card"></span>
        </button>

        <div className="h-8 w-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm border border-accent-blue/30">
          AH
        </div>
      </div>
    </header>
  );
};

export default Header;
