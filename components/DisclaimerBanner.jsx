import React from "react";
import { Info } from "lucide-react";

export default function DisclaimerBanner({ customText }) {
  return (
    <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-4 text-xs text-slate-300 flex items-start gap-3 backdrop-blur-sm">
      <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-semibold text-sky-300">
          Heuristic Security Assessment Disclaimer
        </p>
        <p className="leading-relaxed text-slate-400">
          {customText || 
            "ScamShield AI utilizes transparent, rule-based heuristics. Automated indicators may produce false positives or false negatives. Never assume an unflagged message or URL is entirely safe. Always independently verify suspicious communications via official, authenticated channels."
          }
        </p>
      </div>
    </div>
  );
}
