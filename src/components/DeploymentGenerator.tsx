import React, { useState, useEffect } from 'react';
import {
  Box,
  Copy,
  Check,
  Download,
  Terminal,
  Server,
  Cloud,
  CheckCircle2,
  FileCode,
  Layers,
} from 'lucide-react';
import Prism from 'prismjs';

export const DeploymentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docker' | 'compose' | 'k8s' | 'github_actions' | 'quickstart'>('compose');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  const dockerfileCode = `# Multi-stage Docker build for Java 21 Spring Boot Application
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=builder --chown=spring:spring /app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-XX:+UseZGC -XX:+ZGenerational -XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`;

  const dockerComposeCode = `version: '3.8'

services:
  ecommerce-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ecommerce-spring-api
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=jdbc:postgresql://postgres:5432/ecommerce_db
      - DB_USER=postgres
      - DB_PASSWORD=postgres_secret
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=9a8f3b2c1e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - ecommerce-net

  postgres:
    image: postgres:16-alpine
    container_name: ecommerce-postgres
    environment:
      - POSTGRES_DB=ecommerce_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres_secret
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d ecommerce_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - ecommerce-net

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - ecommerce-net

volumes:
  pgdata:

networks:
  ecommerce-net:
    driver: bridge`;

  const k8sCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecommerce-api-deployment
  labels:
    app: ecommerce-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ecommerce-api
  template:
    metadata:
      labels:
        app: ecommerce-api
    spec:
      containers:
      - name: ecommerce-api
        image: ghcr.io/ecommerce/ecommerce-api:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/v1/actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/v1/actuator/health/readiness
            port: 8080
          initialDelaySeconds: 20
          periodSeconds: 5
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: DB_URL
          valueFrom:
            secretKeyRef:
              name: ecommerce-db-secret
              key: url
---
apiVersion: v1
kind: Service
metadata:
  name: ecommerce-api-service
spec:
  type: ClusterIP
  selector:
    app: ecommerce-api
  ports:
  - port: 80
    targetPort: 8080`;

  const githubActionsCode = `name: Java Spring Boot CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up JDK 21
      uses: actions/setup-java@v4
      with:
        java-version: '21'
        distribution: 'temurin'
        cache: maven

    - name: Run Unit & Integration Tests (with Testcontainers)
      run: ./mvnw clean verify -B

    - name: Build Production Docker Image
      run: docker build -t ecommerce-api:latest .

    - name: Scan Vulnerabilities with Trivy
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'ecommerce-api:latest'
        format: 'table'
        exit-code: '0'`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'docker':
        return { code: dockerfileCode, lang: 'dockerfile', filename: 'Dockerfile' };
      case 'compose':
        return { code: dockerComposeCode, lang: 'yaml', filename: 'docker-compose.yml' };
      case 'k8s':
        return { code: k8sCode, lang: 'yaml', filename: 'k8s-deployment.yaml' };
      case 'github_actions':
        return { code: githubActionsCode, lang: 'yaml', filename: '.github/workflows/maven-ci.yml' };
      default:
        return { code: dockerComposeCode, lang: 'yaml', filename: 'docker-compose.yml' };
    }
  };

  const current = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">
                Containerization & Cloud Native Deployment
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Docker • K8s • CI/CD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Production deployment manifests with PostgreSQL 16, Redis 7, and Kubernetes probes.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'compose'
                ? 'bg-slate-800 text-blue-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            docker-compose.yml
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'docker'
                ? 'bg-slate-800 text-blue-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dockerfile
          </button>
          <button
            onClick={() => setActiveTab('k8s')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'k8s'
                ? 'bg-slate-800 text-blue-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kubernetes (k8s)
          </button>
          <button
            onClick={() => setActiveTab('github_actions')}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === 'github_actions'
                ? 'bg-slate-800 text-blue-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            GitHub Actions CI
          </button>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col flex-1">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="font-mono font-bold text-slate-200 text-xs">{current.filename}</span>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="p-4 bg-slate-950 font-mono text-xs overflow-auto max-h-[580px] scrollbar-thin scrollbar-thumb-slate-800">
          <pre className="!bg-transparent !p-0 !m-0">
            <code className={`language-${current.lang} text-slate-200 leading-relaxed`}>
              {current.code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
