import React from "react";
import { Shield, PhoneCall, ExternalLink, Lock, EyeOff } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#040711] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base">ScamShield AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Democratizing cyber fraud awareness through transparent, rule-based heuristics. Inspect suspicious SMS, WhatsApp messages, job offers, and deceptive URLs without sending personal data to external APIs.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Offline Rules
              </span>
              <span className="flex items-center gap-1">
                <EyeOff className="w-3.5 h-3.5 text-sky-400" /> Zero Credential Logging
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("dashboard")} className="hover:text-sky-400 transition-colors">
                  Dashboard Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("scan-message")} className="hover:text-sky-400 transition-colors">
                  Message Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("check-url")} className="hover:text-sky-400 transition-colors">
                  URL Safety Checker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("safety-tips")} className="hover:text-sky-400 transition-colors">
                  Cyber Safety Education
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline India */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Emergency Reporting (India)
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300">National Cyber Helpline:</span>
              </div>
              <div className="text-xl font-bold font-mono text-amber-400">
                1930
              </div>
              <a 
                href="https://cybercrime.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 underline pt-1"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ScamShield AI — MVP Demonstration Project. For educational and protective awareness only.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate("about")} className="hover:text-slate-400 transition-colors">
              About & Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
