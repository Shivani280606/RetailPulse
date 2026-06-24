"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Box,
  Brain,
  Download,
  LineChart,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type Metric = {
  label: string;
  value: string;
  note: string;
};

type Module = {
  title: string;
  copy: string;
  icon: React.ElementType;
  tone: "green" | "blue" | "amber" | "red";
};

const headlineMetrics: Metric[] = [
  { label: "Revenue processed", value: "GBP 17.7M+", note: "Cleaned retail transactions" },
  { label: "Customers profiled", value: "5,878", note: "RFM and churn-ready records" },
  { label: "Hybrid MAPE", value: "11.2%", note: "Prophet plus LSTM forecast" },
  { label: "Churn AUC", value: "0.814", note: "Customer risk classifier" },
];

const modules: Module[] = [
  {
    title: "Sales Intelligence",
    copy: "Track revenue movement, customer demand, country performance, and product concentration from cleaned transaction data.",
    icon: BarChart3,
    tone: "green",
  },
  {
    title: "Customer Health",
    copy: "Translate RFM behavior into useful segments and surface churn-prone accounts for retention planning.",
    icon: Users,
    tone: "blue",
  },
  {
    title: "Demand Forecasting",
    copy: "Compare Prophet, LSTM, and blended forecasts, then stress-test growth or event assumptions before acting.",
    icon: LineChart,
    tone: "amber",
  },
  {
    title: "Inventory Control",
    copy: "Prioritize Class A products, calculate reorder points, and simulate policy choices before purchase orders are placed.",
    icon: Box,
    tone: "red",
  },
];

const forecastSeries = [34, 39, 37, 44, 48, 52, 49, 57, 61, 59, 64, 69];
const alertRows = [
  ["Revenue", "Normal", "Tracking within the accepted operating band"],
  ["Inventory", "Watch", "Two priority products are close to reorder point"],
  ["Forecast", "Good", "Current error remains below the 12% target"],
  ["Churn", "Watch", "Retention list refreshed for high-risk customers"],
];

function Sparkline({ values }: { values: number[] }) {
  const path = useMemo(() => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 100 - ((value - min) / (max - min || 1)) * 100;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Revenue forecast trend">
      <path d={path} />
    </svg>
  );
}

export default function Dashboard() {
  const [selectedModule, setSelectedModule] = useState(modules[0].title);
  const active = modules.find((module) => module.title === selectedModule) ?? modules[0];
  const ActiveIcon = active.icon;

  return (
    <main>
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <Activity aria-hidden />
          <span>RetailPulse</span>
        </div>
        <nav>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.title}
                className={module.title === selectedModule ? "active" : ""}
                onClick={() => setSelectedModule(module.title)}
                title={module.title}
              >
                <Icon aria-hidden />
                <span>{module.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Retail analytics command center</p>
            <h1>Operational insight from transaction data to inventory action.</h1>
          </div>
          <div className="searchBox">
            <Search aria-hidden />
            <span>Search reports, products, segments</span>
          </div>
        </header>

        <section className="metrics" aria-label="Key metrics">
          {headlineMetrics.map((metric) => (
            <article key={metric.label} className="metricCard">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <section className="dashboardGrid">
          <article className={`focusPanel ${active.tone}`}>
            <div className="panelHeader">
              <ActiveIcon aria-hidden />
              <div>
                <p className="eyebrow">Active module</p>
                <h2>{active.title}</h2>
              </div>
            </div>
            <p>{active.copy}</p>
            <div className="actionRow">
              <button title="Open module">
                <TrendingUp aria-hidden />
                <span>Open view</span>
              </button>
              <button title="Export module data">
                <Download aria-hidden />
                <span>Export</span>
              </button>
            </div>
          </article>

          <article className="chartPanel">
            <div className="panelHeader">
              <Brain aria-hidden />
              <div>
                <p className="eyebrow">Forecast pulse</p>
                <h2>Revenue outlook</h2>
              </div>
            </div>
            <Sparkline values={forecastSeries} />
            <div className="chartFooter">
              <span>Saved hybrid forecast</span>
              <strong>+18.4%</strong>
            </div>
          </article>
        </section>

        <section className="tablePanel">
          <div className="panelHeader">
            <AlertTriangle aria-hidden />
            <div>
              <p className="eyebrow">Monitoring feed</p>
              <h2>Current operating signals</h2>
            </div>
          </div>
          <div className="signalTable" role="table" aria-label="Operating signals">
            {alertRows.map(([area, status, detail]) => (
              <div className="signalRow" role="row" key={area}>
                <span role="cell">{area}</span>
                <strong role="cell" className={status.toLowerCase()}>
                  {status}
                </strong>
                <p role="cell">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
