import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Shield,
  Clock,
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Code,
  Layers,
  Terminal,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import { apiEndpoints } from '../data/endpoints';
import { ApiEndpoint } from '../types/ecommerce';
import { springEngine, ApiResponse } from '../services/springEngine';
import { SpringConsole } from './SpringConsole';

export const ApiPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(apiEndpoints[7]); // Default to checkout
  const [httpMethod, setHttpMethod] = useState<string>(selectedEndpoint.method);
  const [path, setPath] = useState<string>(selectedEndpoint.path);
  const [queryParams, setQueryParams] = useState<string>(
    selectedEndpoint.defaultQueryParams ? JSON.stringify(selectedEndpoint.defaultQueryParams, null, 2) : '{}'
  );
  const [requestBody, setRequestBody] = useState<string>(
    selectedEndpoint.defaultBody ? JSON.stringify(selectedEndpoint.defaultBody, null, 2) : ''
  );
  const [activeReqTab, setActiveReqTab] = useState<'body' | 'params' | 'headers'>('body');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewSplitConsole, setViewSplitConsole] = useState<boolean>(true);

  // Sync state when endpoint selection changes
  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setHttpMethod(ep.method);
    setPath(ep.path);
    setQueryParams(ep.defaultQueryParams ? JSON.stringify(ep.defaultQueryParams, null, 2) : '{}');
    setRequestBody(ep.defaultBody ? JSON.stringify(ep.defaultBody, null, 2) : '');
    setActiveReqTab(ep.method === 'GET' ? 'params' : 'body');
  };

  const handleSendRequest = async () => {
    setIsLoading(true);
    let parsedBody: any = undefined;
    if (httpMethod !== 'GET' && requestBody.trim()) {
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        // Invalid JSON body
        setIsLoading(false);
        setResponse({
          status: 400,
          statusText: 'Bad Request',
          durationMs: 4,
          data: {
            type: 'https://api.ecommerce.io/errors/invalid-json',
            title: 'Malformed JSON Payload',
            status: 400,
            detail: 'Failed to parse request JSON payload. Check syntax commas and quotes.',
          },
          headers: {},
          sqlQueriesExecuted: [],
        });
        return;
      }
    }

    let parsedParams: Record<string, string> = {};
    if (queryParams.trim()) {
      try {
        parsedParams = JSON.parse(queryParams);
      } catch (e) {
        // ignore
      }
    }

    // Replace URL template params like {id}
    let actualPath = path;
    if (parsedParams.id && actualPath.includes('{id}')) {
      actualPath = actualPath.replace('{id}', parsedParams.id);
    }

    const token = springEngine.getJwtToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await springEngine.executeRequest(httpMethod, actualPath, parsedBody, parsedParams, headers);
      setResponse(res);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Preset Handlers
  const runPreset = (type: 'checkout' | 'insufficient_stock' | 'login' | 'products' | 'admin_product' | 'coupon' | 'health') => {
    if (type === 'checkout') {
      const ep = apiEndpoints.find((e) => e.id === 'orders-checkout')!;
      handleSelectEndpoint(ep);
      setRequestBody(JSON.stringify({
        items: [
          { productId: 'prod_001', quantity: 1 },
          { productId: 'prod_004', quantity: 2 }
        ],
        couponCode: 'SPRING2026',
        paymentMethod: 'STRIPE',
        shippingAddress: {
          fullName: 'Alex Reynolds',
          street: '742 Evergreen Terrace',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        }
      }, null, 2));
    } else if (type === 'insufficient_stock') {
      const ep = apiEndpoints.find((e) => e.id === 'orders-checkout')!;
      handleSelectEndpoint(ep);
      setRequestBody(JSON.stringify({
        items: [
          { productId: 'prod_003', quantity: 999 } // 999 exceeds stock of 7
        ],
        paymentMethod: 'CREDIT_CARD',
        shippingAddress: {
          fullName: 'Alex Reynolds',
          street: '742 Evergreen Terrace',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        }
      }, null, 2));
    } else if (type === 'login') {
      const ep = apiEndpoints.find((e) => e.id === 'auth-login')!;
      handleSelectEndpoint(ep);
    } else if (type === 'products') {
      const ep = apiEndpoints.find((e) => e.id === 'products-list')!;
      handleSelectEndpoint(ep);
      setQueryParams(JSON.stringify({ category: 'electronics', page: '0', size: '10' }, null, 2));
    } else if (type === 'admin_product') {
      springEngine.switchUser('usr_a01'); // Switch to Admin
      const ep = apiEndpoints.find((e) => e.id === 'products-create')!;
      handleSelectEndpoint(ep);
    } else if (type === 'coupon') {
      const ep = apiEndpoints.find((e) => e.id === 'cart-apply-coupon')!;
      handleSelectEndpoint(ep);
      setRequestBody(JSON.stringify({ couponCode: 'SPRING2026' }, null, 2));
    } else if (type === 'health') {
      const ep = apiEndpoints.find((e) => e.id === 'actuator-health')!;
      handleSelectEndpoint(ep);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'POST':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'PUT':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'DELETE':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    } else if (status >= 400 && status < 500) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    } else {
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  const categories = ['All', 'Authentication', 'Products', 'Cart', 'Orders', 'Coupons', 'Actuator'];
  const filteredEndpoints = activeCategory === 'All'
    ? apiEndpoints
    : apiEndpoints.filter((e) => e.category === activeCategory);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 1-Click Interactive Presets Ribbon */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Quick Test Scenarios:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="preset-checkout-btn"
              onClick={() => runPreset('checkout')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 transition shadow-sm flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Order Checkout (@Transactional)</span>
            </button>

            <button
              id="preset-stock-fail-btn"
              onClick={() => runPreset('insufficient_stock')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-700/60 transition shadow-sm flex items-center space-x-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Stock Depletion (400 ProblemDetail)</span>
            </button>

            <button
              id="preset-admin-prod-btn"
              onClick={() => runPreset('admin_product')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-700/60 transition shadow-sm flex items-center space-x-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Product Add (@PreAuthorize)</span>
            </button>

            <button
              id="preset-coupon-btn"
              onClick={() => runPreset('coupon')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-950/60 hover:bg-teal-900/80 text-teal-300 border border-teal-700/60 transition shadow-sm"
            >
              Apply 15% Voucher
            </button>

            <button
              id="preset-health-btn"
              onClick={() => runPreset('health')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-950/60 hover:bg-sky-900/80 text-sky-300 border border-sky-700/60 transition shadow-sm"
            >
              Actuator Health Probes
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* Left Column: Endpoints Directory */}
        <div className="lg:col-span-4 flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          {/* Header & Filter Tabs */}
          <div className="p-3 bg-slate-900 border-b border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">
                REST Endpoints ({apiEndpoints.length})
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                OpenAPI 3.0
              </span>
            </div>
            {/* Category Selector */}
            <div className="flex space-x-1 overflow-x-auto no-scrollbar py-0.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition ${
                    activeCategory === c
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Endpoints List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 max-h-[520px] scrollbar-thin scrollbar-thumb-slate-800">
            {filteredEndpoints.map((ep) => {
              const isSelected = selectedEndpoint.id === ep.id;
              return (
                <button
                  key={ep.id}
                  id={`endpoint-item-${ep.id}`}
                  onClick={() => handleSelectEndpoint(ep)}
                  className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getMethodBadge(ep.method)}`}>
                        {ep.method}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 truncate max-w-[170px]">
                        {ep.path}
                      </span>
                    </div>
                    {ep.requiresAuth && (
                      <span className="text-[10px] text-amber-400 flex items-center" title="Requires JWT Auth">
                        <Shield className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {ep.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right Column: Request Builder & Live Response Inspector */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Request Header Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-24">
                <span className={`w-full block text-center font-mono font-bold text-xs py-2 rounded-lg border ${getMethodBadge(httpMethod)}`}>
                  {httpMethod}
                </span>
              </div>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="/api/v1/..."
              />
              <button
                id="send-request-btn"
                onClick={handleSendRequest}
                disabled={isLoading}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-emerald-950/60 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Send</span>
              </button>
            </div>

            {/* Request Tabs */}
            <div className="border-t border-slate-800/80 pt-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-2">
                  {httpMethod !== 'GET' && (
                    <button
                      onClick={() => setActiveReqTab('body')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition ${
                        activeReqTab === 'body'
                          ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      JSON Body
                    </button>
                  )}
                  <button
                    onClick={() => setActiveReqTab('params')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                      activeReqTab === 'params'
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Query / Path Params
                  </button>
                  <button
                    onClick={() => setActiveReqTab('headers')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                      activeReqTab === 'headers'
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Headers & JWT
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 font-sans">
                  {selectedEndpoint.description}
                </span>
              </div>

              {/* Tab Contents */}
              {activeReqTab === 'body' && httpMethod !== 'GET' && (
                <div className="relative">
                  <textarea
                    rows={6}
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/70 resize-y"
                    placeholder="Enter JSON request payload..."
                  />
                  <div className="absolute right-2 top-2 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-1.5 py-0.5 rounded">
                    application/json
                  </div>
                </div>
              )}

              {activeReqTab === 'params' && (
                <textarea
                  rows={4}
                  value={queryParams}
                  onChange={(e) => setQueryParams(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500/70"
                  placeholder='{"page": "0", "size": "10", "category": "electronics"}'
                />
              )}

              {activeReqTab === 'headers' && (
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-slate-400">Content-Type:</span>
                    <span className="text-emerald-400">application/json</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="text-slate-400">Accept:</span>
                    <span className="text-slate-200">application/json</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400">Authorization:</span>
                    <span className="text-amber-300 truncate max-w-[280px]">
                      {springEngine.getJwtToken()
                        ? `Bearer ${springEngine.getJwtToken().substring(0, 30)}...`
                        : '(None - Anonymous)'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Response Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {/* Response Status Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Response
                </span>
                {response && (
                  <>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(response.status)}`}>
                      {response.status} {response.statusText}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{response.durationMs} ms</span>
                    </span>
                  </>
                )}
              </div>

              {response && (
                <button
                  onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 flex items-center space-x-1.5 transition"
                >
                  {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedResponse ? 'Copied' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            {/* Response Body Output */}
            <div className="p-4 bg-slate-950 font-mono text-xs min-h-[200px] max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
              {response ? (
                <pre className="text-slate-100 leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500 space-y-2">
                  <Terminal className="w-8 h-8 text-slate-700" />
                  <p className="text-xs">Click <strong className="text-emerald-400">Send</strong> or choose a test scenario to execute request.</p>
                </div>
              )}
            </div>

            {/* Hibernate SQL Queries Executed Section */}
            {response && response.sqlQueriesExecuted && response.sqlQueriesExecuted.length > 0 && (
              <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 font-mono text-xs">
                <div className="flex items-center space-x-2 text-purple-400 mb-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[11px] uppercase tracking-wider">
                    Hibernate SQL Generated ({response.sqlQueriesExecuted.length} Queries):
                  </span>
                </div>
                <div className="space-y-1">
                  {response.sqlQueriesExecuted.map((q, idx) => (
                    <div key={idx} className="p-2 rounded bg-purple-950/20 border border-purple-900/40 text-purple-200 text-[11px]">
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Integrated Spring Boot Console Stream */}
          <div className="h-64">
            <SpringConsole />
          </div>

        </div>
      </div>
    </div>
  );
};
