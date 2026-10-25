import React, { useState } from "react";
import { Shield, MessageSquareText, Link2, History, BookOpen, Info, Menu, X, Activity } from "lucide-react";

export default function Navbar({ activePage, setActivePage, isServerOnline }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Shield },
    { id: "scan-message", label: "Scan Message", icon: MessageSquareText },
    { id: "check-url", label: "Check URL", icon: Link2 },
    { id: "scan-history", label: "Scan History", icon: History },
    { id: "safety-tips", label: "Safety Tips", icon: BookOpen },
    { id: "about", label: "About", icon: Info },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Tagline */}
          <div 
            onClick={() => handleNavClick("dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                  ScamShield
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-1 font-mono tracking-wider">
                DETECT. UNDERSTAND. STAY SAFE.
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm shadow-sky-950"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Server Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <span className={`w-2 h-2 rounded-full ${isServerOnline ? "bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" : "bg-red-400"}`} />
            <span className={isServerOnline ? "text-emerald-400" : "text-red-400"}>
              {isServerOnline ? "Engine Online" : "Engine Offline"}
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070d1d]/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                    : "text-slate-300 hover:bg-slate-850"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono px-3 py-2 text-slate-400">
            <span>Detection Engine:</span>
            <span className={isServerOnline ? "text-emerald-400" : "text-red-400"}>
              {isServerOnline ? "Active (port 5000)" : "Disconnected"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
