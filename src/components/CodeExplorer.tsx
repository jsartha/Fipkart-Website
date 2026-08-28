import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Folder,
  Copy,
  Check,
  Download,
  Search,
  BookOpen,
  Layers,
  Sparkles,
  Shield,
  Database,
  Cpu,
  Boxes,
  FileText,
  Lock,
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-json';
import { springBootCodebase, JavaFile } from '../data/springBootCodebase';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(springBootCodebase[2]); // Product.java
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedFile]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredFiles = springBootCodebase.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.path.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'domain', label: 'Domain & Entities' },
    { id: 'service', label: 'Services' },
    { id: 'controller', label: 'REST Controllers' },
    { id: 'repository', label: 'Repositories' },
    { id: 'security', label: 'Security & JWT' },
    { id: 'exception', label: 'Exceptions' },
    { id: 'config', label: 'Config & Maven' },
    { id: 'infra', label: 'DB & Docker' },
    { id: 'test', label: 'Unit Tests' },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Description Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-100">
              Spring Boot 3.3.x & Java 21 Enterprise Codebase
            </h2>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Production-Grade
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete DDD clean architecture with JPA optimistic locking, Spring Security 6 stateless JWT, and Redis caching.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadFile}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
            title="Download this file"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download File</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* Left Sidebar: File Tree Navigator */}
        <div className="lg:col-span-4 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          {/* Search Box */}
          <div className="p-3 border-b border-slate-800 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes & files..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex space-x-1 overflow-x-auto no-scrollbar py-0.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition ${
                    activeCategory === c.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[640px] scrollbar-thin scrollbar-thumb-slate-800">
            {filteredFiles.map((f) => {
              const isSelected = selectedFile.path === f.path;
              return (
                <button
                  key={f.path}
                  id={`file-item-${f.name.replace('.', '-')}`}
                  onClick={() => setSelectedFile(f)}
                  className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/95 border-emerald-500/60 shadow ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileCode
                        className={`w-4 h-4 ${
                          f.language === 'java'
                            ? 'text-amber-400'
                            : f.language === 'yaml'
                            ? 'text-sky-400'
                            : f.language === 'sql'
                            ? 'text-purple-400'
                            : 'text-emerald-400'
                        }`}
                      />
                      <span className="text-xs font-semibold text-slate-200 font-mono">
                        {f.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans truncate">
                    {f.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code View & Annotations Explorer */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Active File Header Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 px-4 shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-100">{selectedFile.path}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {selectedFile.code.split('\n').length} lines
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">{selectedFile.description}</p>
              </div>
            </div>

            <button
              id="copy-code-btn"
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Key Annotations & Concepts Badges */}
          {((selectedFile.annotations && selectedFile.annotations.length > 0) ||
            (selectedFile.keyConcepts && selectedFile.keyConcepts.length > 0)) && (
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center mr-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                Patterns in this file:
              </span>
              {selectedFile.annotations?.map((ann, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-700/60"
                >
                  {ann}
                </span>
              ))}
              {selectedFile.keyConcepts?.map((kc, idx) => (
                <span
                  key={idx}
                  className="text-xs font-sans font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {kc}
                </span>
              ))}
            </div>
          )}

          {/* Syntax Highlighted Code Viewer */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-xl overflow-auto max-h-[580px] font-mono text-xs scrollbar-thin scrollbar-thumb-slate-800">
            <pre className="!bg-transparent !p-0 !m-0">
              <code className={`language-${selectedFile.language} text-slate-200 leading-relaxed`}>
                {selectedFile.code}
              </code>
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};
