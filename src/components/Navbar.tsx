import React, { useState, useEffect } from 'react';
import {
  Layers,
  Terminal,
  Code2,
  Database,
  Activity,
  Cpu,
  Shield,
  UserCheck,
  RefreshCw,
  Sparkles,
  Server,
  Zap,
  Box,
} from 'lucide-react';
import { springEngine } from '../services/springEngine';
import { User, JvmMetrics } from '../types/ecommerce';

export type ActiveTab = 'api' | 'code' | 'database' | 'actuator' | 'architecture' | 'deployment';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onResetDb: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onResetDb }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(springEngine.getCurrentUser());
  const [users, setUsers] = useState<User[]>(springEngine.getUsers());
  const [metrics, setMetrics] = useState<JvmMetrics>(springEngine.getMetrics());
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = springEngine.subscribe(() => {
      setCurrentUser(springEngine.getCurrentUser());
      setUsers(springEngine.getUsers());
      setMetrics(springEngine.getMetrics());
    });
    return unsubscribe;
  }, []);

  const tabs: { id: ActiveTab; label: string; icon: any; badge?: string }[] = [
    { id: 'api', label: 'API Playground & JVM Live', icon: Terminal, badge: 'Live' },
    { id: 'code', label: 'Java 21 Codebase', icon: Code2 },
    { id: 'database', label: 'JPA & DB Schema', icon: Database },
    { id: 'actuator', label: 'Actuator & Metrics', icon: Activity },
    { id: 'architecture', label: 'Architecture & Events', icon: Layers },
    { id: 'deployment', label: 'Docker & Maven CI', icon: Box },
  ];

  return (
    <header className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur sticky top-0 z-40">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Spring Boot Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                {/* Spring Boot Leaf Icon */}
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 3.86 2.19 7.21 5.42 8.9L12 15l4.58 5.9C19.81 19.21 22 15.86 22 12c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-2.4 1.07-4.55 2.76-6.02L12 12l5.24-6.02C18.93 7.45 20 9.6 20 12c0 4.41-3.59 8-8 8z"/>
                  <circle cx="12" cy="7.5" r="2.5" fill="#34d399"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-100 text-lg tracking-tight">Spring Boot 3.3</span>
                <span className="text-xs px-2 py-0.5 font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Java 21 LTS
                </span>
                <span className="text-xs px-2 py-0.5 font-mono text-slate-400 bg-slate-800 border border-slate-700/60 rounded-full hidden sm:inline-block">
                  Modular E-Commerce
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                Spring Data JPA • Spring Security 6 • Redis Cache • Flyway • RFC 7807
              </p>
            </div>
          </div>

          {/* JVM Status & Security Context Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Live JVM Status Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">JVM:</span>
              <span className="text-emerald-400 font-semibold">{metrics.heapUsedMb}MB / {metrics.heapMaxMb}MB</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Threads:</span>
              <span className="text-cyan-400">{metrics.activeThreads}</span>
            </div>

            {/* Security Context Selector */}
            <div className="relative">
              <button
                id="user-context-selector-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs text-slate-200 transition shadow-sm"
                title="Switch Spring Security Authentication Context"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-slate-400">Auth:</span>
                <span className="font-medium truncate max-w-[130px]">
                  {currentUser ? currentUser.fullName.split(' ')[0] : 'Anonymous'}
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  currentUser?.role === 'ROLE_ADMIN'
                    ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                    : currentUser?.role === 'ROLE_SELLER'
                    ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
                    : currentUser
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {currentUser ? currentUser.role.replace('ROLE_', '') : 'UNAUTH'}
                </span>
              </button>

              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-semibold text-slate-300">Spring Security Context</p>
                    <p className="text-[11px] text-slate-400">Simulate authenticated JWT principal roles</p>
                  </div>
                  <div className="py-1 space-y-1">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          springEngine.switchUser(u.id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition text-xs ${
                          currentUser?.id === u.id
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={u.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                            alt={u.fullName}
                            className="w-6 h-6 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <p className="font-medium text-slate-200">{u.fullName}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {u.role.replace('ROLE_', '')}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        springEngine.setAnonymous();
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition text-xs ${
                        !currentUser
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                          ?
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">Anonymous / Unauthenticated</p>
                          <p className="text-[10px] text-slate-400">Public requests only (401 on secure paths)</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Database Button */}
            <button
              id="reset-db-btn"
              onClick={onResetDb}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg border border-slate-800 transition"
              title="Reset Simulated Database & Catalog to Initial State"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
