import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Trash2,
  Copy,
  Check,
  Search,
  Pause,
  Play,
  Filter,
  Flame,
  ShieldCheck,
  Database,
  ArrowRightLeft,
  Radio,
} from 'lucide-react';
import { springEngine } from '../services/springEngine';
import { SpringLog } from '../types/ecommerce';

export const SpringConsole: React.FC = () => {
  const [logs, setLogs] = useState<SpringLog[]>(springEngine.getLogs());
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = springEngine.subscribe(() => {
      setLogs([...springEngine.getLogs()]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0; // newest logs are at the top or we can reverse
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((l) => {
    if (filterType === 'HTTP' && l.logger.indexOf('DispatcherServlet') === -1) return false;
    if (filterType === 'HIBERNATE' && l.type !== 'HIBERNATE') return false;
    if (filterType === 'SECURITY' && l.type !== 'SECURITY') return false;
    if (filterType === 'TRANSACTION' && l.type !== 'TRANSACTION') return false;
    if (filterType === 'EVENT' && l.type !== 'EVENT') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.message.toLowerCase().includes(q) ||
        l.logger.toLowerCase().includes(q) ||
        l.level.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyLogs = () => {
    const text = filteredLogs
      .map(
        (l) =>
          `${l.timestamp}  ${l.level.padEnd(5)} 94821 --- ${l.thread.padEnd(16)} ${l.logger.padEnd(36)} : ${l.message}`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'WARN':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'DEBUG':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'TRACE':
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
      case 'INFO':
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200 font-sans text-xs">Spring Boot Tomcat Log Stream</span>
          <span className="text-[11px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
            Port 8080 • PID 94821
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-32 sm:w-44"
            />
          </div>

          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-1.5 rounded-md border transition ${
              autoScroll
                ? 'bg-slate-800 text-emerald-400 border-slate-700'
                : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
            title={autoScroll ? 'Pause auto-scroll' : 'Resume auto-scroll'}
          >
            {autoScroll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopyLogs}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Copy Logs to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => springEngine.clearLogs()}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
            title="Clear Console Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto text-[11px]">
        <span className="text-slate-500 flex items-center mr-1 text-[10px] uppercase tracking-wider font-semibold">
          <Filter className="w-3 h-3 mr-1" /> Channels:
        </span>
        {[
          { id: 'ALL', label: 'All Logs', count: logs.length },
          { id: 'HTTP', label: 'DispatcherServlet', count: logs.filter((l) => l.logger.includes('DispatcherServlet')).length },
          { id: 'HIBERNATE', label: 'Hibernate SQL', count: logs.filter((l) => l.type === 'HIBERNATE').length },
          { id: 'SECURITY', label: 'Spring Security', count: logs.filter((l) => l.type === 'SECURITY').length },
          { id: 'TRANSACTION', label: '@Transactional', count: logs.filter((l) => l.type === 'TRANSACTION').length },
          { id: 'EVENT', label: 'Kafka / Events', count: logs.filter((l) => l.type === 'EVENT').length },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-2 py-0.5 rounded-md transition whitespace-nowrap ${
              filterType === f.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Log Output Canvas */}
      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-1 select-text scrollbar-thin scrollbar-thumb-slate-800"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>No log events matching the selected filter.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isHibernate = log.type === 'HIBERNATE';
            const isSecurity = log.type === 'SECURITY';
            const isTransaction = log.type === 'TRANSACTION';
            const isEvent = log.type === 'EVENT';

            return (
              <div
                key={log.id}
                className={`py-0.5 px-1.5 rounded hover:bg-slate-900/90 transition-colors leading-relaxed flex items-start space-x-2 ${
                  isHibernate
                    ? 'border-l-2 border-purple-500/60 bg-purple-950/10'
                    : isSecurity
                    ? 'border-l-2 border-blue-500/60 bg-blue-950/10'
                    : isTransaction
                    ? 'border-l-2 border-amber-500/60 bg-amber-950/10'
                    : isEvent
                    ? 'border-l-2 border-teal-500/60 bg-teal-950/10'
                    : ''
                }`}
              >
                {/* Timestamp */}
                <span className="text-slate-500 whitespace-nowrap select-none">{log.timestamp}</span>

                {/* Level badge */}
                <span
                  className={`px-1 py-0.2 rounded border text-[10px] font-bold whitespace-nowrap select-none ${getLevelColor(
                    log.level
                  )}`}
                >
                  {log.level}
                </span>

                {/* Thread */}
                <span className="text-cyan-400/80 whitespace-nowrap hidden md:inline select-none">
                  {log.thread}
                </span>

                {/* Logger Class */}
                <span
                  className="text-slate-400 truncate max-w-[200px] hidden lg:inline font-mono select-none"
                  title={log.logger}
                >
                  {log.logger.split('.').slice(-2).join('.')} :
                </span>

                {/* Message */}
                <span
                  className={`flex-1 break-all ${
                    isHibernate
                      ? 'text-purple-300 font-mono font-medium'
                      : isSecurity
                      ? 'text-blue-300'
                      : isTransaction
                      ? 'text-amber-300'
                      : isEvent
                      ? 'text-teal-300'
                      : log.level === 'ERROR'
                      ? 'text-rose-300 font-semibold'
                      : log.level === 'WARN'
                      ? 'text-amber-300'
                      : 'text-slate-200'
                  }`}
                >
                  {log.message}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
