import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  MessageSquareText, 
  Link2, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  FileSearch, 
  History,
  Lock,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { getScanStats } from "../services/storage";

export default function Dashboard({ onNavigate, onPreloadMessage, onPreloadUrl }) {
  const [stats, setStats] = useState({
    totalScans: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    recentScans: []
  });

  const [quickMessage, setQuickMessage] = useState("");
  const [quickUrl, setQuickUrl] = useState("");

  useEffect(() => {
    setStats(getScanStats());
  }, []);

  const handleQuickMessageSubmit = (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    onPreloadMessage(quickMessage.trim());
    onNavigate("scan-message");
  };

  const handleQuickUrlSubmit = (e) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    onPreloadUrl(quickUrl.trim());
    onNavigate("check-url");
  };

  const commonWarningTactics = [
    {
      title: "Digital Arrest & Police Coercion",
      desc: "Fake police or CBI officers threatening arrest via WhatsApp/video calls for non-existent parcels or money laundering.",
      severity: "High",
      icon: ShieldAlert
    },
    {
      title: "OTP & UPI PIN Harvesting",
      desc: "Trick messages requesting UPI PIN or OTP to 'receive' rewards or cashback. Entering a PIN always debits money.",
      severity: "Critical",
      icon: Lock
    },
    {
      title: "Part-Time Task & Job Fee Fraud",
      desc: "Promises of ₹3,000–₹5,000/day for liking videos, followed by demands for 'registration' or 'crypto deposit' fees.",
      severity: "High",
      icon: AlertTriangle
    },
    {
      title: "Remote Desktop Takeover",
      desc: "Instruction to install AnyDesk, TeamViewer, or QuickSupport to 'resolve KYC' or 'process refunds', granting full phone access.",
      severity: "Critical",
      icon: ShieldAlert
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0f1d38] via-[#091224] to-[#070c18] border border-blue-900/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cyber Threat Detection Heuristics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop Fraud Before It Strikes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
              Detect. Understand. Stay Safe.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            ScamShield AI analyzes suspicious messages, fraudulent job offers, unverified payment demands, and lookalike URLs using transparent, privacy-first offline rules.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("scan-message")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Scan Suspicious Message</span>
            </button>

            <button
              onClick={() => onNavigate("check-url")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-[1.02]"
            >
              <Link2 className="w-4 h-4 text-sky-400" />
              <span>Check Suspicious URL</span>
            </button>
          </div>
        </div>
      </section>

      {/* Actual Scan Statistics from Local Storage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <span>Local Device Scan Activity</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Stored locally on your browser
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Total Scans
            </span>
            <div className="text-3xl font-extrabold text-white mt-1 font-mono">
              {stats.totalScans}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Messages and URLs evaluated
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-red-950/60 shadow-md">
            <span className="text-xs font-medium text-red-400 uppercase tracking-wider block flex items-center justify-between">
              High Risk Results
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            </span>
            <div className="text-3xl font-extrabold text-red-400 mt-1 font-mono">
              {stats.highRisk}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Severe scam indicators triggered
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-950/60 shadow-md">
            <span className="text-xs font-medium text-amber-300 uppercase tracking-wider block">
              Medium Risk Results
            </span>
            <div className="text-3xl font-extrabold text-amber-300 mt-1 font-mono">
              {stats.mediumRisk}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Suspicious or coercive traits
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-950/60 shadow-md">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider block">
              Low Risk Results
            </span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
              {stats.lowRisk}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              No known red flags matched
            </span>
          </div>
        </div>
      </section>

      {/* Quick Analysis Previews */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Message Scanner Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Quick Message Check</h3>
              <p className="text-xs text-slate-400">Paste SMS, WhatsApp message, email, or job offer</p>
            </div>
          </div>

          <form onSubmit={handleQuickMessageSubmit} className="space-y-3">
            <textarea
              rows={3}
              value={quickMessage}
              onChange={(e) => setQuickMessage(e.target.value)}
              placeholder="e.g. Your electricity will be disconnected tonight. Pay immediately or call +91-9988..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none font-sans"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Heuristic engine</span>
              <button
                type="submit"
                disabled={!quickMessage.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
              >
                <span>Analyze in Full Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick URL Checker Preview */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Quick URL Inspection</h3>
              <p className="text-xs text-slate-400">Examine lookalikes, IP addresses, and shorteners safely</p>
            </div>
          </div>

          <form onSubmit={handleQuickUrlSubmit} className="space-y-3">
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="e.g. http://192.168.1.1/sbi-kyc-login.html"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Never connects to URL</span>
              <button
                type="submit"
                disabled={!quickUrl.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
              >
                <span>Check URL Safety</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Recent Scans Overview */}
      <section className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Recent Scans On This Device</h3>
          </div>
          {stats.recentScans.length > 0 && (
            <button
              onClick={() => onNavigate("scan-history")}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>View full history</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {stats.recentScans.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-950/60 border border-slate-850 space-y-2">
            <FileSearch className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400 font-medium">No scans recorded on this device yet.</p>
            <p className="text-xs text-slate-500">Try scanning a sample message or checking a suspicious URL.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {stats.recentScans.map((scan) => (
              <div key={scan.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`p-1.5 rounded-lg text-xs font-mono uppercase ${
                    scan.type === "message" ? "bg-sky-950 text-sky-300 border border-sky-800/40" : "bg-purple-950 text-purple-300 border border-purple-800/40"
                  }`}>
                    {scan.type}
                  </span>
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-200 truncate">{scan.summary}</p>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(scan.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    {scan.score}/100
                  </span>
                  <RiskBadge category={scan.category} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Common Scam Tactics Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Active Scam Tactics & Warning Signs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonWarningTactics.map((tactic, idx) => {
            const Icon = tactic.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <h4 className="font-semibold text-white text-sm">{tactic.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/40">
                    {tactic.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tactic.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Indian Emergency Helpline Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <PhoneCall className="w-5 h-5 text-amber-400 animate-bounce" />
            <h3 className="font-bold text-white text-base">Victim of an Online Financial Cyber Scam in India?</h3>
          </div>
          <p className="text-xs text-slate-300">
            Call the National Cyber Crime Reporting Helpline immediately to request a fraudulent transaction hold.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-extrabold text-2xl tracking-wider">
            1930
          </div>
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
