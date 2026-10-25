import React from "react";

export default function RiskGauge({ score, category }) {
  // Clamp between 0 and 100
  const cleanScore = Math.min(100, Math.max(0, Number(score) || 0));

  let strokeColor = "#10b981"; // emerald
  let glowColor = "rgba(16, 185, 129, 0.3)";
  let textColor = "text-emerald-400";
  let verdictText = "Low Detected Risk";

  if (cleanScore >= 60) {
    strokeColor = "#ef4444"; // red
    glowColor = "rgba(239, 68, 68, 0.4)";
    textColor = "text-red-400";
    verdictText = "High Risk Detected";
  } else if (cleanScore >= 30) {
    strokeColor = "#f59e0b"; // amber
    glowColor = "rgba(245, 158, 11, 0.35)";
    textColor = "text-amber-400";
    verdictText = "Medium Risk Detected";
  }

  // Semi-circle gauge calculation
  const radius = 70;
  const circumference = Math.PI * radius; // 180 degrees arc
  const strokeDashoffset = circumference - (cleanScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none -top-10 opacity-30 transition-all duration-700"
        style={{ backgroundColor: strokeColor }}
      />

      <div className="relative w-48 h-28 flex items-center justify-center">
        <svg viewBox="0 0 160 90" className="w-full h-full overflow-visible">
          {/* Background track */}
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Active colored score arc */}
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease"
            }}
          />
        </svg>

        {/* Score Number Display */}
        <div className="absolute top-10 flex flex-col items-center">
          <div className="flex items-baseline">
            <span className={`text-4xl font-extrabold tracking-tight ${textColor} font-mono`}>
              {cleanScore}
            </span>
            <span className="text-slate-500 text-sm font-semibold ml-0.5">/100</span>
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
            Risk Score
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <div className={`text-base font-bold ${textColor}`}>
          {verdictText}
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Heuristic risk calculation based on identified deception patterns.
        </p>
      </div>

      {/* Scale guide */}
      <div className="grid grid-cols-3 w-full gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center text-[11px] font-mono">
        <div className="flex flex-col items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mb-1"></span>
          <span className="text-slate-400">0–29</span>
          <span className="text-emerald-400 font-sans text-[10px]">Low</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-2 h-2 rounded-full bg-amber-400 mb-1"></span>
          <span className="text-slate-400">30–59</span>
          <span className="text-amber-400 font-sans text-[10px]">Medium</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-2 h-2 rounded-full bg-red-400 mb-1"></span>
          <span className="text-slate-400">60–100</span>
          <span className="text-red-400 font-sans text-[10px]">High</span>
        </div>
      </div>
    </div>
  );
}
