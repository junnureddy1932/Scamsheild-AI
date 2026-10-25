import React from "react";
import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";

export default function RiskBadge({ category, size = "md" }) {
  const isHigh = category === "High Risk";
  const isMedium = category === "Medium Risk";
  const isLow = category === "Low Risk";

  const sizeClasses = size === "lg" 
    ? "px-4 py-1.5 text-base font-bold" 
    : size === "sm" 
    ? "px-2 py-0.5 text-xs font-medium" 
    : "px-3 py-1 text-sm font-semibold";

  if (isHigh) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-red-950/80 text-red-400 border border-red-500/40 shadow-sm shadow-red-900/40 ${sizeClasses}`}>
        <ShieldAlert className={size === "lg" ? "w-5 h-5 text-red-400 animate-pulse" : "w-4 h-4 text-red-400"} />
        <span>High Risk</span>
      </span>
    );
  }

  if (isMedium) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-900/40 ${sizeClasses}`}>
        <AlertTriangle className={size === "lg" ? "w-5 h-5 text-amber-400" : "w-4 h-4 text-amber-400"} />
        <span>Medium Risk</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-900/40 ${sizeClasses}`}>
      <ShieldCheck className={size === "lg" ? "w-5 h-5 text-emerald-400" : "w-4 h-4 text-emerald-400"} />
      <span>Low Detected Risk</span>
    </span>
  );
}
