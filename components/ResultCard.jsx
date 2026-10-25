import React, { useState } from "react";
import RiskGauge from "./RiskGauge";
import RiskBadge from "./RiskBadge";
import DisclaimerBanner from "./DisclaimerBanner";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Shield, ShieldAlert, Sparkles, Copy, Check } from "lucide-react";

export default function ResultCard({ result, type = "message", onScanAgain }) {
  const [copied, setCopied] = useState(false);
  const [expandedWarning, setExpandedWarning] = useState(null);

  if (!result) return null;

  const {
    score = 0,
    category = "Low Risk",
    warnings = [],
    generalRecommendations = [],
    securityNotes = [],
    disclaimer,
    analyzedAt
  } = result;

  const handleCopySummary = () => {
    const text = `ScamShield AI Analysis (${type.toUpperCase()}):\nRisk Score: ${score}/100 (${category})\nWarning Signs Detected: ${warnings.length}\nAnalyzed at: ${new Date(analyzedAt).toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHigh = score >= 60;
  const isMedium = score >= 30 && score < 60;
  const isLow = score < 30;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Overview Card */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md transition-all ${
        isHigh 
          ? "bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border-red-500/30 shadow-2xl shadow-red-950/30" 
          : isMedium 
          ? "bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/30 shadow-2xl shadow-amber-950/30" 
          : "bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30 shadow-2xl shadow-emerald-950/30"
      }`}>
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
          {/* Risk Gauge */}
          <div className="w-full lg:w-72 flex justify-center">
            <RiskGauge score={score} category={category} />
          </div>

          {/* Analysis Summary */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <RiskBadge category={category} size="lg" />
              <span className="text-xs text-slate-400 font-mono">
                {new Date(analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {isHigh && "High Risk Indicators Detected"}
              {isMedium && "Suspicious Patterns Identified"}
              {isLow && "No Immediate High-Risk Red Flags Detected"}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {isHigh && "This submission contains classic deception tactics frequently used in active cyber financial scams. Do NOT click links, send money, or share credentials."}
              {isMedium && "This submission displays unusual or coercive characteristics. Exercise elevated caution and verify through independent authenticated channels."}
              {isLow && "No known high-risk scam signatures were triggered by offline heuristics. However, never rely entirely on automated scans — stay vigilant."}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                {copied ? "Copied Analysis!" : "Copy Summary"}
              </button>
              {onScanAgain && (
                <button
                  onClick={onScanAgain}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-xs font-semibold text-sky-300 transition-colors border border-sky-500/30"
                >
                  Analyze Another
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detected Warning Signs Breakdown */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-sky-400" />
            <h4 className="font-bold text-white text-lg">
              Detected Warning Signs ({warnings.length})
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            {warnings.length === 0 ? "Clean heuristic check" : "Click card to expand advice"}
          </span>
        </div>

        {warnings.length === 0 ? (
          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>None of our standard rule patterns (credential phishing, OTP harvesting, artificial urgency, advance fee demand) were matched in this submission.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {warnings.map((w, idx) => {
              const isExpanded = expandedWarning === idx || warnings.length <= 2;
              return (
                <div 
                  key={idx}
                  className="border border-slate-800 bg-slate-850/60 hover:border-slate-700 rounded-xl transition-colors overflow-hidden"
                >
                  <div 
                    onClick={() => setExpandedWarning(expandedWarning === idx ? null : idx)}
                    className="p-4 cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        w.severity === "critical" ? "bg-red-500 animate-ping" : w.severity === "high" ? "bg-red-400" : "bg-amber-400"
                      }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-slate-100 text-sm">{w.name}</h5>
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                            w.severity === "critical" ? "bg-red-950 text-red-300 border border-red-800/60" :
                            w.severity === "high" ? "bg-red-950/70 text-red-400 border border-red-800/40" :
                            "bg-amber-950/70 text-amber-300 border border-amber-800/40"
                          }`}>
                            {w.severity} (+{w.weight} pts)
                          </span>
                        </div>
                        {w.matchedSnippet && (
                          <div className="mt-1 text-xs text-slate-400 font-mono bg-slate-900/90 px-2 py-1 rounded inline-block">
                            Trigger: <span className="text-amber-300">"{w.matchedSnippet}"</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3 bg-slate-900/40 text-xs">
                      <div>
                        <span className="font-semibold text-slate-300 block mb-1">Why this matters:</span>
                        <p className="text-slate-400 leading-relaxed">{w.explanation}</p>
                      </div>
                      {w.recommendation && (
                        <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-800/30 text-sky-200">
                          <span className="font-semibold block text-sky-300 mb-0.5">Recommended Action:</span>
                          <p>{w.recommendation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Next Steps & Safety Actions */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-white text-lg">Recommended Next Steps</h4>
        </div>

        <ul className="space-y-2.5">
          {generalRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
          <li className="flex items-start gap-2.5 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
            <span>If you suspect financial fraud in India, immediately dial the national cyber helpline <strong className="text-sky-300">1930</strong> or register a complaint at <strong className="text-sky-300">cybercrime.gov.in</strong>.</span>
          </li>
        </ul>

        {securityNotes.length > 0 && (
          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
            {securityNotes.map((note, idx) => (
              <p key={idx}>• {note}</p>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <DisclaimerBanner customText={disclaimer} />
    </div>
  );
}
