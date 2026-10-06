import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Cpu, DollarSign, Terminal, AlertTriangle, Play } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(null);
  const [prompt, setPrompt] = useState('Analyze system status and optimize capital allocation');
  const [logs, setLogs] = useState(['[SYSTEM]: Robin Orchestrator Dashboard Initialized.']);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://robin-orchestrator.onrender.com";

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/status`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExecute = async () => {
    if (!prompt) return;
    setLoading(true);
    setLogs((prev) => [...prev, `[USER PROMPT]: ${prompt}`]);
    
    try {
      const res = await fetch(`${API_BASE}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const result = await res.json();

      if (result.success) {
        setLogs((prev) => [
          ...prev,
          `[ORCHESTRATOR]: Query executed successfully using OpenRouter.`,
          `[RESPONSE]: ${result.response.substring(0, 200)}...`,
          `[CAPITAL UPDATE]: ROI reached +${result.daily_roi}%`
        ]);
        fetchStatus();
      } else {
        setLogs((prev) => [...prev, `[ERROR]: ${result.error}`]);
      }
    } catch (err) {
      setLogs((prev) => [...prev, `[EXECUTION FAILED]: Could not reach backend.`]);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="#38bdf8" /> Robin Autonomous Orchestrator
          </h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>City of Shadows Ecosystem • OpenRouter Engine</p>
        </div>
        <div style={{ backgroundColor: data?.status === 'ACTIVE' ? '#15803d' : '#b91c1c', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' }}>
          {data?.status || "CONNECTING..."}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Daily ROI Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={16} color="#4ade80" /> DAILY COMPOUNDING ROI
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0', color: data?.daily_roi_percent >= 6 ? '#4ade80' : '#facc15' }}>
            +{data?.daily_roi_percent || 0}%
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Target: 6.00% Daily</div>
        </div>

        {/* Primary LLM Model */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={16} color="#38bdf8" /> PRIMARY ROUTER MODEL
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', margin: '12px 0', color: '#f8fafc', wordBreak: 'break-all' }}>
            {data?.primary_model || "Meta Llama 3.1 70B"}
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8' }}>Fallback Active: {data?.fallback_models?.length || 2} Models</div>
        </div>

        {/* Infra Cost & Budget */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} color="#f87171" /> INFRA SPEND LIMIT
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0', color: '#f8fafc' }}>
            ${data?.infra_cost_usd || 0.00} <span style={{ fontSize: '14px', color: '#64748b' }}>/ ${data?.max_infra_cost_usd || 10}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Auto-Kill Budget Cap</div>
        </div>

        {/* Capital Balance */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#c084fc" /> ACTIVE CAPITAL
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0', color: '#f8fafc' }}>
            ${data?.current_capital || 1000.0}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Start: ${data?.initial_capital || 1000.0}</div>
        </div>

      </div>

      {/* Execution Console & Terminal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Input Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Execute Orchestration Prompt</h3>
          <textarea
            rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ width: '100%', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '12px', boxSizing: 'border-box', marginBottom: '12px' }}
          />
          <button
            onClick={handleExecute}
            disabled={loading}
            style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Play size={16} /> {loading ? "Executing..." : "Run Pipeline"}
          </button>
        </div>

        {/* Terminal Logs */}
        <div style={{ backgroundColor: '#090d16', padding: '16px', borderRadius: '8px', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '13px', overflowY: 'auto', maxHeight: '300px' }}>
          <div style={{ color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Terminal size={14} /> SYSTEM LOGS
          </div>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '6px', color: log.includes('ERROR') ? '#f87171' : log.includes('SUCCESS') || log.includes('CAPITAL') ? '#4ade80' : '#cbd5e1' }}>
              {log}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}