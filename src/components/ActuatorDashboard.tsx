import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Server,
  Database,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { springEngine } from '../services/springEngine';
import { JvmMetrics } from '../types/ecommerce';

export const ActuatorDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<JvmMetrics>(springEngine.getMetrics());

  useEffect(() => {
    const unsubscribe = springEngine.subscribe(() => {
      setMetrics(springEngine.getMetrics());
    });
    return unsubscribe;
  }, []);

  const heapPercentage = Math.round((metrics.heapUsedMb / metrics.heapMaxMb) * 100);
  const hikariPercentage = Math.round((metrics.hikariActiveConnections / metrics.hikariMaxConnections) * 100);

  const actuatorEndpoints = [
    { path: '/api/v1/actuator/health', description: 'Aggregated subsystem health indicators (Liveness & Readiness)' },
    { path: '/api/v1/actuator/metrics', description: 'Micrometer multidimensional JVM and system performance metrics' },
    { path: '/api/v1/actuator/prometheus', description: 'Prometheus scrapable metrics format for Grafana dashboards' },
    { path: '/api/v1/actuator/env', description: 'Active Spring profile properties and system environment variables' },
    { path: '/api/v1/actuator/beans', description: 'IoC ApplicationContext dependency injection bean graph' },
    { path: '/api/v1/actuator/mappings', description: 'DispatcherServlet @RequestMapping HTTP URL route registry' },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">
                Spring Boot Actuator & Observability
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                STATUS: UP
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time JVM runtime statistics, HikariCP database pool telemetry, and health probes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Uptime: {Math.floor(metrics.uptimeSeconds / 60)}m {metrics.uptimeSeconds % 60}s</span>
        </div>
      </div>

      {/* Subsystem Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* DB Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">PostgreSQL DB</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              UP (2ms)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            PostgreSQL 16 via HikariCP-EcomPool
          </p>
          <div className="text-[10px] font-mono text-slate-500">
            Validation: SELECT 1 (Healthy)
          </div>
        </div>

        {/* Redis Cache Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-slate-200">Redis Cache</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              UP (84.5% Hit)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Redis 7.2.4 Standalone instance
          </p>
          <div className="text-[10px] font-mono text-slate-500">
            Keyspace: products::* (TTL 600s)
          </div>
        </div>

        {/* JVM Virtual Threads */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">Virtual Threads</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Java 21 Loom
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Active Threads: {metrics.activeThreads}
          </p>
          <div className="text-[10px] font-mono text-slate-500">
            ForkJoinPool Carrier: 8 cores
          </div>
        </div>

        {/* Disk & Liveness */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">Disk & Liveness</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              UP (82GB Free)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Container filesystem storage
          </p>
          <div className="text-[10px] font-mono text-slate-500">
            Threshold: 10MB (Pass)
          </div>
        </div>
      </div>

      {/* Gauges & Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* JVM Memory Gauge */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-200">JVM Heap Memory Utilization</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {metrics.heapUsedMb} MB / {metrics.heapMaxMb} MB ({heapPercentage}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
              style={{ width: `${heapPercentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">HEAP USED</span>
              <span className="text-emerald-400 font-bold">{metrics.heapUsedMb} MB</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">NON-HEAP (METASPACE)</span>
              <span className="text-slate-300 font-bold">{metrics.nonHeapUsedMb} MB</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">GARBAGE COLLECTOR</span>
              <span className="text-cyan-400 font-bold">Generational ZGC</span>
            </div>
          </div>
        </div>

        {/* HikariCP Connection Pool */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-slate-200">HikariCP Database Pool Health</h3>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400">
              {metrics.hikariActiveConnections} Active / {metrics.hikariMaxConnections} Max
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500 rounded-full"
              style={{ width: `${hikariPercentage}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">ACTIVE LEASES</span>
              <span className="text-purple-300 font-bold">{metrics.hikariActiveConnections}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">IDLE CONNECTIONS</span>
              <span className="text-slate-300 font-bold">{metrics.hikariIdleConnections}</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block text-[10px]">ACQUIRE LATENCY</span>
              <span className="text-emerald-400 font-bold">0.8 ms</span>
            </div>
          </div>
        </div>

      </div>

      {/* Actuator Endpoints Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
            Exposed Spring Boot Actuator Endpoints
          </span>
          <span className="text-[11px] font-mono text-emerald-400">
            management.endpoints.web.exposure.include=*
          </span>
        </div>

        <div className="divide-y divide-slate-800 font-mono text-xs">
          {actuatorEndpoints.map((ep) => (
            <div key={ep.path} className="p-3 px-4 hover:bg-slate-800/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400 font-semibold">{ep.path}</span>
                <span className="text-slate-400 font-sans text-xs">{ep.description}</span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                GET
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
