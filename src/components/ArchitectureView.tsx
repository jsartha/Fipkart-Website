import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Shield,
  Database,
  Cpu,
  Server,
  Zap,
  Radio,
  CheckCircle2,
  Lock,
  Sparkles,
  GitBranch,
  Repeat,
  Mail,
  Box,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeFlowStep, setActiveFlowStep] = useState<number>(1);

  const flowSteps = [
    {
      step: 1,
      name: '1. JWT Authentication & Security Filter',
      component: 'JwtAuthenticationFilter & SecurityConfig',
      description: 'Incoming HTTP request with Bearer JWT is parsed. HMAC-SHA256 signature is verified, user identity is loaded, and SecurityContextHolder is set.',
      tag: 'Spring Security 6',
      color: 'border-blue-500 text-blue-400 bg-blue-950/20',
    },
    {
      step: 2,
      name: '2. DispatcherServlet & Controller Routing',
      component: 'OrderController.java (@RestController)',
      description: 'DispatcherServlet matches URL route. Request body is deserialized and validated using Jakarta Bean Validation (@Valid).',
      tag: 'Spring MVC & Validation',
      color: 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
    },
    {
      step: 3,
      name: '3. Transaction Boundary & Stock Guard',
      component: 'OrderService.java (@Transactional)',
      description: 'TransactionInterceptor starts DB transaction. ProductRepository executes SELECT ... FOR UPDATE (Pessimistic Locking) preventing concurrent overselling.',
      tag: '@Transactional & Pessimistic Lock',
      color: 'border-amber-500 text-amber-400 bg-amber-950/20',
    },
    {
      step: 4,
      name: '4. Financial Calculation & Payment Gateway',
      component: 'PaymentService & CouponService',
      description: 'Discounts, 8% state tax, and shipping tiers calculated. Payment gateway initiates charge and acquires authorization reference.',
      tag: 'Business Rules Engine',
      color: 'border-teal-500 text-teal-400 bg-teal-950/20',
    },
    {
      step: 5,
      name: '5. JPA Persistence & Hibernate Flush',
      component: 'OrderRepository (Hibernate ORM 6)',
      description: 'Order aggregate and cascade OrderItems are persisted into PostgreSQL 16 via HikariCP connection pool. JDBC batching optimizes write throughput.',
      tag: 'Spring Data JPA & PostgreSQL',
      color: 'border-purple-500 text-purple-400 bg-purple-950/20',
    },
    {
      step: 6,
      name: '6. Domain Event Emission & Kafka Bus',
      component: 'ApplicationEventPublisher & Kafka',
      description: 'Transaction commits successfully. OrderCreatedEvent is emitted to Kafka topic order-events to trigger async invoice emails and analytics processing.',
      tag: 'Event-Driven Architecture',
      color: 'border-cyan-500 text-cyan-400 bg-cyan-950/20',
    },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">
                System Topology & Transaction Lifecycle
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Clean Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Domain-Driven Design (DDD) modular monolith with asynchronous Kafka event streaming.
            </p>
          </div>
        </div>
      </div>

      {/* Layered Architectural Tier Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Layered Component Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Presentation Tier */}
          <div className="bg-slate-950 border border-blue-500/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs">
              <Shield className="w-4 h-4" />
              <span>1. Presentation Tier</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li className="bg-slate-900 p-1.5 rounded">SecurityFilterChain</li>
              <li className="bg-slate-900 p-1.5 rounded">JwtAuthFilter</li>
              <li className="bg-slate-900 p-1.5 rounded">OrderController</li>
              <li className="bg-slate-900 p-1.5 rounded">GlobalExceptionHandler</li>
            </ul>
          </div>

          {/* Application & Service Tier */}
          <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
              <Cpu className="w-4 h-4" />
              <span>2. Service Tier</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li className="bg-slate-900 p-1.5 rounded">@Transactional Engine</li>
              <li className="bg-slate-900 p-1.5 rounded">OrderService</li>
              <li className="bg-slate-900 p-1.5 rounded">ProductService</li>
              <li className="bg-slate-900 p-1.5 rounded">PaymentService</li>
            </ul>
          </div>

          {/* Persistence & Data Tier */}
          <div className="bg-slate-950 border border-purple-500/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-semibold text-xs">
              <Database className="w-4 h-4" />
              <span>3. Persistence Tier</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li className="bg-slate-900 p-1.5 rounded">Spring Data JPA</li>
              <li className="bg-slate-900 p-1.5 rounded">Hibernate ORM 6</li>
              <li className="bg-slate-900 p-1.5 rounded">PostgreSQL 16</li>
              <li className="bg-slate-900 p-1.5 rounded">Redis 7.2 Cache</li>
            </ul>
          </div>

          {/* Messaging & Events Tier */}
          <div className="bg-slate-950 border border-teal-500/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-semibold text-xs">
              <Radio className="w-4 h-4" />
              <span>4. Event Pipeline</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li className="bg-slate-900 p-1.5 rounded">OrderCreatedEvent</li>
              <li className="bg-slate-900 p-1.5 rounded">Kafka Producer</li>
              <li className="bg-slate-900 p-1.5 rounded">Notification Worker</li>
              <li className="bg-slate-900 p-1.5 rounded">Inventory Sync</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Step-by-Step Interactive Order Transaction Debugger */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Interactive Request Lifecycle: POST /api/v1/orders/checkout
            </h3>
            <p className="text-xs text-slate-400">
              Click any stage below to inspect the internal Spring Boot runtime flow.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-slate-950 rounded-lg text-emerald-400 border border-slate-800 font-semibold">
            Stage {activeFlowStep} of {flowSteps.length}
          </span>
        </div>

        {/* Step Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {flowSteps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveFlowStep(s.step)}
              className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between ${
                activeFlowStep === s.step
                  ? `${s.color} ring-1 ring-emerald-500/40 shadow-md`
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase">{s.tag}</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 line-clamp-1">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Breakdown */}
        {flowSteps.find((s) => s.step === activeFlowStep) && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-emerald-400 text-sm">
                {flowSteps[activeFlowStep - 1].name}
              </span>
              <span className="text-slate-400 font-sans">
                {flowSteps[activeFlowStep - 1].component}
              </span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed pt-1">
              {flowSteps[activeFlowStep - 1].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
