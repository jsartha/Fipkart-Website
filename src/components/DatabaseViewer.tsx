import React, { useState, useEffect } from 'react';
import {
  Database,
  Table as TableIcon,
  Play,
  Key,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  Code2,
  CheckCircle,
} from 'lucide-react';
import { springEngine } from '../services/springEngine';
import { Product, Order, User, Coupon, Category } from '../types/ecommerce';

export const DatabaseViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tables' | 'er_diagram' | 'sql_console'>('tables');
  const [selectedTable, setSelectedTable] = useState<string>('products');
  const [products, setProducts] = useState<Product[]>(springEngine.getProducts());
  const [orders, setOrders] = useState<Order[]>(springEngine.getOrders());
  const [users, setUsers] = useState<User[]>(springEngine.getUsers());
  const [coupons, setCoupons] = useState<Coupon[]>(springEngine.getCoupons());
  const [categories, setCategories] = useState<Category[]>(springEngine.getCategories());

  // SQL Console state
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM products WHERE stock_quantity < 20 ORDER BY stock_quantity ASC;');
  const [sqlResult, setSqlResult] = useState<{ columns: string[]; rows: any[][]; message?: string; error?: string } | null>(null);

  useEffect(() => {
    const unsubscribe = springEngine.subscribe(() => {
      setProducts([...springEngine.getProducts()]);
      setOrders([...springEngine.getOrders()]);
      setUsers([...springEngine.getUsers()]);
      setCoupons([...springEngine.getCoupons()]);
      setCategories([...springEngine.getCategories()]);
    });
    return unsubscribe;
  }, []);

  const handleRunSql = () => {
    const res = springEngine.executeRawSql(sqlQuery);
    setSqlResult(res);
  };

  const tables = [
    { id: 'products', name: 'products', count: products.length, description: 'Catalog items with stock & version locks' },
    { id: 'orders', name: 'orders', count: orders.length, description: 'Customer transaction records' },
    { id: 'users', name: 'users', count: users.length, description: 'User accounts & RBAC roles' },
    { id: 'coupons', name: 'coupons', count: coupons.length, description: 'Promotional discount vouchers' },
    { id: 'categories', name: 'categories', count: categories.length, description: 'Product taxonomic hierarchy' },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-slate-100">
                PostgreSQL 16 & Hibernate JPA Database Schema
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Flyway V1 Applied
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live schema explorer, JPA relationship graph, and interactive SQL query workbench.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'tables'
                ? 'bg-slate-800 text-purple-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Tables
          </button>
          <button
            onClick={() => setActiveTab('er_diagram')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'er_diagram'
                ? 'bg-slate-800 text-purple-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ER Diagram
          </button>
          <button
            onClick={() => setActiveTab('sql_console')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'sql_console'
                ? 'bg-slate-800 text-purple-300 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SQL Console
          </button>
        </div>
      </div>

      {/* Tab 1: Live Tables Browser */}
      {activeTab === 'tables' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          {/* Left Table Selector */}
          <div className="lg:col-span-3 flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-lg">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Database Tables
            </span>
            {tables.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTable(t.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition flex items-center justify-between ${
                  selectedTable === t.id
                    ? 'bg-purple-950/40 border-purple-500/60 text-purple-200 shadow ring-1 ring-purple-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <TableIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono text-xs font-bold">{t.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.description}</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Right Table Data Grid */}
          <div className="lg:col-span-9 flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TableIcon className="w-4 h-4 text-purple-400" />
                <span className="font-mono font-bold text-slate-200 text-xs">
                  public.{selectedTable}
                </span>
                <span className="text-[11px] text-slate-400">
                  (Live synchronized with Spring Data JPA)
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-3 max-h-[560px] scrollbar-thin scrollbar-thumb-slate-800">
              {/* Products Table */}
              {selectedTable === 'products' && (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2">ID</th>
                      <th className="p-2">SKU</th>
                      <th className="p-2 font-sans">Name</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Stock</th>
                      <th className="p-2 font-sans">Category</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-2 text-slate-400">{p.id}</td>
                        <td className="p-2 text-emerald-400 font-bold">{p.sku}</td>
                        <td className="p-2 text-slate-200 font-sans font-medium">{p.name}</td>
                        <td className="p-2 text-amber-300">${p.price.toFixed(2)}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            p.stockQuantity <= 5
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}>
                            {p.stockQuantity}
                          </span>
                        </td>
                        <td className="p-2 text-slate-400 font-sans">{p.categoryName}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Orders Table */}
              {selectedTable === 'orders' && (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2">Order #</th>
                      <th className="p-2 font-sans">Customer</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Payment</th>
                      <th className="p-2">Coupon</th>
                      <th className="p-2">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-800/40">
                        <td className="p-2 text-emerald-400 font-bold">{o.orderNumber}</td>
                        <td className="p-2 text-slate-200 font-sans">{o.customerName}</td>
                        <td className="p-2 text-amber-300 font-bold">${o.totalAmount.toFixed(2)}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.status === 'PAID'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : o.status === 'SHIPPED'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-2 text-slate-400">{o.paymentMethod}</td>
                        <td className="p-2 text-teal-400">{o.couponCode || '—'}</td>
                        <td className="p-2 text-slate-500">{o.createdAt.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Users Table */}
              {selectedTable === 'users' && (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2">ID</th>
                      <th className="p-2">Email</th>
                      <th className="p-2 font-sans">Full Name</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/40">
                        <td className="p-2 text-slate-400">{u.id}</td>
                        <td className="p-2 text-emerald-400">{u.email}</td>
                        <td className="p-2 text-slate-200 font-sans">{u.fullName}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'ROLE_ADMIN'
                              ? 'bg-purple-900/60 text-purple-300 border border-purple-700'
                              : u.role === 'ROLE_SELLER'
                              ? 'bg-blue-900/60 text-blue-300 border border-blue-700'
                              : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-2 text-emerald-400">{u.enabled ? 'ACTIVE' : 'DISABLED'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Coupons Table */}
              {selectedTable === 'coupons' && (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2">Code</th>
                      <th className="p-2">Discount %</th>
                      <th className="p-2">Max Cap</th>
                      <th className="p-2">Min Order</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-slate-800/40">
                        <td className="p-2 text-teal-400 font-bold">{c.code}</td>
                        <td className="p-2 text-slate-200">{c.discountPercent}%</td>
                        <td className="p-2 text-amber-300">${c.maxDiscount.toFixed(2)}</td>
                        <td className="p-2 text-slate-300">${c.minOrderAmount.toFixed(2)}</td>
                        <td className="p-2 text-emerald-400">{c.active ? 'ACTIVE' : 'EXPIRED'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Categories Table */}
              {selectedTable === 'categories' && (
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2">ID</th>
                      <th className="p-2 font-sans">Name</th>
                      <th className="p-2">Slug</th>
                      <th className="p-2 font-sans">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {categories.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40">
                        <td className="p-2 text-slate-400">{c.id}</td>
                        <td className="p-2 text-slate-200 font-sans font-medium">{c.name}</td>
                        <td className="p-2 text-emerald-400">{c.slug}</td>
                        <td className="p-2 text-slate-400 font-sans">{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Visual ER Diagram */}
      {activeTab === 'er_diagram' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[760px]">
            
            {/* Table: USERS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="px-3 py-2 bg-blue-950/40 border-b border-blue-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-blue-300">users</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between">
                  <span>email (UNIQUE, IDX)</span>
                  <span className="text-slate-500">VARCHAR(128)</span>
                </div>
                <div className="flex justify-between">
                  <span>password_hash</span>
                  <span className="text-slate-500">VARCHAR(255)</span>
                </div>
                <div className="flex justify-between">
                  <span>role (RBAC)</span>
                  <span className="text-slate-500">VARCHAR(32)</span>
                </div>
              </div>
            </div>

            {/* Table: ORDERS */}
            <div className="bg-slate-950 border border-emerald-500/40 rounded-xl overflow-hidden shadow-md ring-1 ring-emerald-500/20">
              <div className="px-3 py-2 bg-emerald-950/40 border-b border-emerald-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-emerald-300">orders (Aggregate Root)</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>order_number (UNIQUE)</span>
                  <span className="text-slate-500">VARCHAR(64)</span>
                </div>
                <div className="flex justify-between text-blue-300">
                  <span>user_id (FK → users.id)</span>
                  <span className="text-slate-500">BIGINT</span>
                </div>
                <div className="flex justify-between">
                  <span>total_amount</span>
                  <span className="text-slate-500">NUMERIC(12,2)</span>
                </div>
                <div className="flex justify-between">
                  <span>status</span>
                  <span className="text-slate-500">VARCHAR(32)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>@Embedded shipping_addr</span>
                  <span className="text-slate-500">EMBEDDED</span>
                </div>
              </div>
            </div>

            {/* Table: ORDER_ITEMS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="px-3 py-2 bg-teal-950/40 border-b border-teal-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-teal-300">order_items</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between text-emerald-300">
                  <span>order_id (FK → orders.id)</span>
                  <span className="text-slate-500">BIGINT</span>
                </div>
                <div className="flex justify-between text-purple-300">
                  <span>product_id (FK → products.id)</span>
                  <span className="text-slate-500">BIGINT</span>
                </div>
                <div className="flex justify-between">
                  <span>quantity</span>
                  <span className="text-slate-500">INT</span>
                </div>
                <div className="flex justify-between">
                  <span>unit_price</span>
                  <span className="text-slate-500">NUMERIC(12,2)</span>
                </div>
              </div>
            </div>

            {/* Table: CATEGORIES */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="px-3 py-2 bg-indigo-950/40 border-b border-indigo-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-indigo-300">categories</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between">
                  <span>slug (UNIQUE)</span>
                  <span className="text-slate-500">VARCHAR(128)</span>
                </div>
                <div className="flex justify-between">
                  <span>name</span>
                  <span className="text-slate-500">VARCHAR(128)</span>
                </div>
              </div>
            </div>

            {/* Table: PRODUCTS */}
            <div className="bg-slate-950 border border-purple-500/40 rounded-xl overflow-hidden shadow-md ring-1 ring-purple-500/20">
              <div className="px-3 py-2 bg-purple-950/40 border-b border-purple-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-purple-300">products</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between">
                  <span>sku (UNIQUE, IDX)</span>
                  <span className="text-slate-500">VARCHAR(64)</span>
                </div>
                <div className="flex justify-between text-indigo-300">
                  <span>category_id (FK → categories.id)</span>
                  <span className="text-slate-500">BIGINT</span>
                </div>
                <div className="flex justify-between">
                  <span>stock_quantity</span>
                  <span className="text-slate-500">INT</span>
                </div>
                <div className="flex justify-between text-rose-300 font-bold">
                  <span>version (@Version Lock)</span>
                  <span className="text-slate-500">BIGINT</span>
                </div>
              </div>
            </div>

            {/* Table: COUPONS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="px-3 py-2 bg-teal-950/40 border-b border-teal-900/50 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-teal-300">coupons</span>
                <span className="text-[10px] font-mono text-slate-400">@Entity</span>
              </div>
              <div className="p-3 space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between text-amber-300 font-semibold">
                  <span className="flex items-center"><Key className="w-3 h-3 mr-1" /> id (PK)</span>
                  <span className="text-slate-500">BIGSERIAL</span>
                </div>
                <div className="flex justify-between text-teal-300">
                  <span>code (UNIQUE)</span>
                  <span className="text-slate-500">VARCHAR(64)</span>
                </div>
                <div className="flex justify-between">
                  <span>discount_percent</span>
                  <span className="text-slate-500">INT</span>
                </div>
                <div className="flex justify-between">
                  <span>active</span>
                  <span className="text-slate-500">BOOLEAN</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Interactive SQL Console */}
      {activeTab === 'sql_console' && (
        <div className="flex flex-col space-y-3 flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Execute PostgreSQL Query
            </span>
            <div className="flex space-x-2">
              {[
                'SELECT * FROM products;',
                'SELECT * FROM orders;',
                'SELECT * FROM users;',
              ].map((sample) => (
                <button
                  key={sample}
                  onClick={() => {
                    setSqlQuery(sample);
                  }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
              placeholder="SELECT * FROM products..."
            />
            <button
              onClick={handleRunSql}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run SQL</span>
            </button>
          </div>

          {/* Results Grid */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 min-h-[220px] max-h-[400px] overflow-auto font-mono text-xs">
            {sqlResult ? (
              <div>
                {sqlResult.error ? (
                  <div className="text-rose-400 p-2">Error: {sqlResult.error}</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        {sqlResult.columns.map((c, i) => (
                          <th key={i} className="p-2 uppercase text-[11px]">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {sqlResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/60">
                          {row.map((val, cIdx) => (
                            <td key={cIdx} className="p-2 text-slate-200">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-600">
                Type an SQL query and click Run SQL to inspect rows.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
