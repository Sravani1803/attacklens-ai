import { Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { attackPaths } from "./data/attackPaths";
import { findings } from "./data/findings";

function App() {
  const total = findings.length;
  const critical = findings.filter((f) => f.severity === "Critical").length;
  const hasCritical = critical > 0;
  const high = findings.filter((f) => f.severity === "High").length;

  const avgRisk = Math.round(
    findings.reduce((sum, f) => sum + f.riskScore, 0) / total
  );

  // ✅ NOW chartData is safe
  const chartData = [
    { name: "Critical", count: critical },
    { name: "High", count: high },
    {
      name: "Medium",
      count: findings.filter(f => f.severity === "Medium").length
    }
  ];

  // 🔥 PRIORITY ENGINE
  const prioritized = [...findings].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  const getSeverityColor = (severity) => {
    if (severity === "Critical") return "#ff2e2e";
    if (severity === "High") return "#ff9f1a";
    if (severity === "Medium") return "#22c55e";
    return "#999";
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      {/* 🔥 HEADER */}
      <h1
        style={{
          marginBottom: "8px",
          color: "#ffffff",
          fontWeight: "600",
          letterSpacing: "0.5px",
        }}
      >
        AttackLens AI
      </h1>

      <p style={{ color: "#a0a6c0", marginTop: "4px" }}>
        AI-Powered Cloud and Identity Attack Path Prioritization Dashboard
      </p>

      {/* 🚨 CRITICAL ALERT */}
      {hasCritical && (
        <div
          style={{
            marginTop: "16px",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "#2a0f0f",
            border: "2px solid #ff2e2e",
            color: "#ff4d4f",
            fontWeight: "600",
            letterSpacing: "0.5px",
            animation: "pulseRed 1.2s infinite",
            boxShadow: "0 0 20px rgba(255, 46, 46, 0.7)",
          }}
        >
          🚨 ACTIVE THREAT DETECTED: {critical} CRITICAL ISSUES
        </div>
      )}

      {/* 🔥 METRICS */}
      {/* 📊 THREAT DISTRIBUTION */}
<div style={{ marginTop: "30px" }}>
  <h2 style={{ color: "#ffffff" }}>Threat Distribution</h2>

  <div
    style={{
      background: "#151b2f",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #2a355a"
    }}
  >
     <ResponsiveContainer width="100%" height={260}>
  <BarChart data={chartData}>
    <XAxis dataKey="name" stroke="#94a3b8" />
    <YAxis stroke="#94a3b8" />

    <Tooltip
      contentStyle={{
        backgroundColor: "#151b2f",
        border: "1px solid #2a355a",
        borderRadius: "8px",
        color: "#fff"
      }}
      cursor={{ fill: "rgba(255,255,255,0.05)" }}
    />

    <Bar
      dataKey="count"
      radius={[8, 8, 0, 0]}
      label={{ position: "top", fill: "#cbd5e1" }}
    >
      {chartData.map((entry, index) => {
        let color = "#999";

        if (entry.name === "Critical") color = "#ff2e2e";
        else if (entry.name === "High") color = "#ff9f1a";
        else if (entry.name === "Medium") color = "#22c55e";

        return <Cell key={`cell-${index}`} fill={color} />;
      })}
    </Bar>
  </BarChart>
</ResponsiveContainer>
  </div>
  </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Findings</h3>
          <p>{total}</p>
        </div>

        <div style={{ ...cardStyle, borderColor: "#ff2e2e" }}>
          <h3>Critical</h3>
          <p>{critical}</p>
        </div>

        <div style={{ ...cardStyle, borderColor: "#ff9f1a" }}>
          <h3>High</h3>
          <p>{high}</p>
        </div>

        <div style={cardStyle}>
          <h3>Avg Risk Score</h3>
          <p>{avgRisk}</p>
        </div>
      </div>

      {/* 🔥 PRIORITY REMEDIATION */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#ffffff" }}>Priority Remediation Plan</h2>

        {prioritized.slice(0, 5).map((item, index) => (
          <div
            key={item.id}
            style={{
              background: "#151b2f",
              border:
                index === 0
                  ? "2px solid #ff2e2e"
                  : "1px solid #2a355a",
              padding: "16px",
              borderRadius: "10px",
              marginTop: "10px",

              boxShadow:
                index === 0
                  ? "0 0 20px rgba(255, 46, 46, 0.8)"
                  : "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <strong style={{ color: "#ffffff" }}>
              {index === 0
                ? "🔥 FIX FIRST → "
                : `Step ${index + 1}: `}
              {item.title}
            </strong>

            <p style={{ marginTop: "6px", color: "#a0a6c0" }}>
              {item.remediation}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 ATTACK PATH */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#ffffff" }}>Attack Path Analysis</h2>

        {attackPaths.map((ap) => (
          <div
            key={ap.id}
            style={{
              background: "#151b2f",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #2a355a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              marginTop: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {ap.path.map((step, index) => (
                <div
                  key={index}
                  style={{
                    background: "#1f2a48",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    color: "#e2e8f0",
                  }}
                >
                  {step}
                </div>
              ))}
            </div>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Risk:</strong> {ap.risk}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Explanation:</strong> {ap.description}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 FINDINGS */}
      <div style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
        {findings.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#151b2f",
              padding: "20px",
              borderRadius: "12px",

              border:
                item.severity === "Critical"
                  ? "2px solid #ff2e2e"
                  : item.severity === "High"
                  ? "2px solid #ff9f1a"
                  : "1px solid #2a355a",

              boxShadow:
                item.severity === "Critical"
                  ? "0 0 20px rgba(255, 46, 46, 0.9)"
                  : item.severity === "High"
                  ? "0 0 10px rgba(255, 159, 26, 0.6)"
                  : "0 4px 12px rgba(0,0,0,0.3)",

              animation:
                item.severity === "Critical"
                  ? "pulseRed 1.2s infinite"
                  : "none",

              transition: "all 0.3s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "#ffffff" }}>{item.title}</h2>

              <span
                style={{
                  background: getSeverityColor(item.severity),
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                {item.severity}
              </span>
            </div>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Category:</strong> {item.category}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Asset:</strong> {item.asset}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Risk Score:</strong> {item.riskScore}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>MITRE:</strong> {item.mitre.join(", ")}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>AI Summary:</strong> {item.summary}
            </p>

            <p style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#ffffff" }}>Remediation:</strong> {item.remediation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#151b2f",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #2a355a",
  textAlign: "center",
  color: "#ffffff",
};

export default App;