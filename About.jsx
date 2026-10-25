import React from "react";
import { Info, Shield, Lock, EyeOff, Server, Terminal, Code2, AlertTriangle, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>System Architecture & Privacy</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          About ScamShield AI
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          ScamShield AI is an open, transparent cybersecurity analysis tool designed to help citizens and internet users evaluate potential digital scams.
        </p>
      </div>

      {/* Core Privacy & Security Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">Zero Credential Logging</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The backend engine strictly processes inputs in ephemeral memory. Submitted texts, passwords, OTPs, or identifiers are never persisted to server disks, log files, or databases.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">Client-Side Scan History</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Scan logs exist exclusively on your device within your browser's LocalStorage. You can clear or reset this history at any time with a single click.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">No Third-Party AI Data Leaks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlike wrappers around paid external LLM APIs, ScamShield AI operates a self-contained, rule-based detection engine. Your private messages are never sent to external AI corporations.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-400" />
          <span>Technology Architecture</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400">Frontend Layer</span>
            <p className="text-slate-400">React 18 with Vite for ultra-fast, modern reactive UI delivery.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400">Styling & Icons</span>
            <p className="text-slate-400">Tailwind CSS with dark cyber navy palette and Lucide React icons.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400">Backend API</span>
            <p className="text-slate-400">Node.js with Express, input validation, CORS, and strict payload limiting.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400">Testing Framework</span>
            <p className="text-slate-400">Vitest for automated regression testing of heuristic detection patterns.</p>
          </div>
        </div>
      </div>

      {/* Known Limitations & Educational Disclaimer */}
      <div className="bg-amber-950/20 rounded-2xl border border-amber-800/40 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-base">Known Limitations & Boundaries</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          ScamShield AI utilizes deterministic, pattern-based heuristics. While highly effective at catching recognized fraud templates (OTP requests, fake KYC warnings, digital arrest threats, advance fee scams, and URL typosquatting), heuristics possess inherent boundaries:
        </p>
        <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
          <li><strong>Zero live threat intelligence:</strong> Domains are inspected offline via structural attributes; newly registered phishing domains with benign keywords may not trigger alerts.</li>
          <li><strong>Possibility of false results:</strong> Highly crafted social engineering may bypass rules, while benign urgent announcements could trigger warnings.</li>
          <li><strong>HTTPS misconception:</strong> Over 80% of modern phishing sites utilize valid free SSL/TLS certificates. HTTPS encrypts communication with the server, but does not prove the server operator is honest.</li>
        </ul>
      </div>
    </div>
  );
}
