import React, { useMemo, useState } from "react";
import AgentStatus from "./AgentStatus";
import InsightCard from "./InsightCard";
import RecommendationCard from "./RecommendationCard";

const DEFAULT_AGENTS = [
  {
    id: "inventory",
    name: "Inventory Intelligence",
    description: "Monitors stock levels, shortages and inventory anomalies.",
    status: "online",
    lastRun: "2 min ago",
  },
  {
    id: "procurement",
    name: "Procurement Agent",
    description: "Identifies procurement requirements and purchasing risks.",
    status: "online",
    lastRun: "5 min ago",
  },
  {
    id: "planning",
    name: "Project Material Planning",
    description: "Forecasts material requirements across active projects.",
    status: "running",
    lastRun: "Running now",
  },
  {
    id: "logistics",
    name: "Logistics Agent",
    description: "Monitors transfers, dispatches and material movement.",
    status: "online",
    lastRun: "8 min ago",
  },
  {
    id: "finance",
    name: "Finance Agent",
    description: "Analyzes material spending and financial exposure.",
    status: "idle",
    lastRun: "18 min ago",
  },
  {
    id: "operations",
    name: "Operations Agent",
    description: "Identifies operational bottlenecks and site-level issues.",
    status: "online",
    lastRun: "11 min ago",
  },
  {
    id: "audit",
    name: "Audit Agent",
    description: "Detects unusual transactions and inventory discrepancies.",
    status: "online",
    lastRun: "4 min ago",
  },
];

const DEFAULT_INSIGHTS = [
  {
    id: 1,
    title: "Cement stock approaching minimum level",
    description:
      "Bangalore Site is projected to fall below its configured minimum stock level.",
    value: "18 bags remaining",
    type: "inventory",
    severity: "warning",
  },
  {
    id: 2,
    title: "Transfer currently in transit",
    description:
      "Material transfer from Chennai Central Warehouse to Calicut Site is awaiting receipt.",
    value: "TRF-2026-018",
    type: "logistics",
    severity: "info",
  },
  {
    id: 3,
    title: "Procurement requirement detected",
    description:
      "Projected available stock is below the upcoming project requirement.",
    value: "₹2.84L",
    type: "procurement",
    severity: "warning",
  },
];

const DEFAULT_RECOMMENDATIONS = [
  {
    id: 1,
    title: "Transfer cement from Chennai Warehouse",
    reason:
      "Available Chennai stock can cover the projected Bangalore shortage without creating a warehouse shortage.",
    action: "TRANSFER",
    agent: "Inventory Intelligence",
    confidence: 0.94,
    priority: "high",
    source: "Inventory Ledger",
  },
  {
    id: 2,
    title: "Review delayed material receipt",
    reason:
      "A dispatched transfer has remained in transit beyond its expected arrival window.",
    action: "INVESTIGATE",
    agent: "Logistics Agent",
    confidence: 0.87,
    priority: "medium",
    source: "Transfer Ledger",
  },
];

export default function AiCommandCenter({
  agents = DEFAULT_AGENTS,
  insights = DEFAULT_INSIGHTS,
  recommendations = DEFAULT_RECOMMENDATIONS,
  onRecommendationAction,
}) {
  const [query, setQuery] = useState("");
  const [activeAgent, setActiveAgent] = useState("all");

  const filteredAgents = useMemo(() => {
    if (activeAgent === "all") {
      return agents;
    }

    return agents.filter((agent) => agent.id === activeAgent);
  }, [agents, activeAgent]);

  const handleQuerySubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    /*
     * Connect this handler to:
     * POST /api/v1/ai/query
     *
     * The backend must ground responses against
     * the actual inventory/project database.
     */
    console.log("AI query:", query);

    setQuery("");
  };

  return (
    <section className="ai-command-center">
      <div className="page-header">
        <div>
          <span className="page-header__eyebrow">AI Operations</span>
          <h1>AI Command Center</h1>
          <p>
            Monitor AI agents, operational insights and
            inventory recommendations.
          </p>
        </div>
      </div>

      {/* Natural-language query */}
      <form
        className="ai-command-center__query"
        onSubmit={handleQuerySubmit}
      >
        <div className="search-input">
          <span className="search-input__icon">⌕</span>

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask about inventory, projects, transfers or procurement..."
            aria-label="Ask AI"
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!query.trim()}
          >
            Ask AI
          </button>
        </div>
      </form>

      {/* Agent navigation */}
      <div className="ai-command-center__agents">
        <div className="section-header">
          <div>
            <h2>AI Agents</h2>
            <p>Current status of operational intelligence agents.</p>
          </div>
        </div>

        <div className="ai-agent-grid">
          <button
            type="button"
            className={`ai-agent-card ${
              activeAgent === "all" ? "is-active" : ""
            }`}
            onClick={() => setActiveAgent("all")}
          >
            <div className="ai-agent-card__icon">AI</div>
            <div className="ai-agent-card__content">
              <strong>All Agents</strong>
              <span>Command Center</span>
            </div>
          </button>

          {agents.map((agent) => (
            <button
              type="button"
              className={`ai-agent-card ${
                activeAgent === agent.id ? "is-active" : ""
              }`}
              key={agent.id}
              onClick={() => setActiveAgent(agent.id)}
            >
              <div className="ai-agent-card__content">
                <strong>{agent.name}</strong>
                <span>{agent.description}</span>
              </div>

              <AgentStatus
                status={agent.status}
                lastRun={agent.lastRun}
                compact
              />
            </button>
          ))}
        </div>
      </div>

      {/* Agent status */}
      <div className="ai-command-center__status">
        {filteredAgents.map((agent) => (
          <div className="card ai-agent-status-card" key={agent.id}>
            <div>
              <h3>{agent.name}</h3>
              <p>{agent.description}</p>
            </div>

            <AgentStatus
              status={agent.status}
              lastRun={agent.lastRun}
            />
          </div>
        ))}
      </div>

      {/* Insights */}
      <section className="ai-command-center__section">
        <div className="section-header">
          <div>
            <h2>Operational Insights</h2>
            <p>Signals detected from current operational data.</p>
          </div>
        </div>

        <div className="ai-insight-grid">
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              {...insight}
            />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="ai-command-center__section">
        <div className="section-header">
          <div>
            <h2>Recommendations</h2>
            <p>
              AI-generated actions requiring operational review or approval.
            </p>
          </div>
        </div>

        <div className="ai-recommendation-list">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              {...recommendation}
              onAction={onRecommendationAction}
            />
          ))}
        </div>
      </section>
    </section>
  );
}