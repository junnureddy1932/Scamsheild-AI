import React, { useState, useEffect } from "react";
import { History, Trash2, Eye, Shield, AlertTriangle, CheckCircle2, MessageSquareText, Link2, X, Search, Filter } from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import ResultCard from "../components/ResultCard";
import { getScanHistory, clearScanHistory } from "../services/storage";

export default function ScanHistory({ onNavigate }) {
  const [history, setHistory] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(getScanHistory());
  }, []);

  const handleClear = () => {
    clearScanHistory();
    setHistory([]);
    setSelectedScan(null);
    setShowClearConfirm(false);
  };

  const filteredHistory = history.filter((item) => {
    const matchesType = 
      filterType === "all" ? true :
      filterType === "high" ? item.category === "High Risk" :
      filterType === "medium" ? item.category === "Medium Risk" :
      filterType === "low" ? item.category === "Low Risk" :
      item.type === filterType;

    const matchesSearch = searchQuery.trim() === "" ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-medium">
            <History className="w-3.5 h-3.5 text-sky-400" />
            <span>Local Device Storage</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Scan History
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Previous evaluations stored purely in your browser's LocalStorage. Summaries are privacy-sanitized.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-300 text-xs font-semibold border border-red-800/40 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal for Clearing */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2 rounded-xl bg-red-950 border border-red-800/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Clear All Scan Records?</h3>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              This will permanently delete all {history.length} stored scan logs from this browser's local memory. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                Yes, Delete History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search Bar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Filter:</span>
            {[
              { id: "all", label: "All" },
              { id: "high", label: "High Risk" },
              { id: "medium", label: "Medium" },
              { id: "low", label: "Low Risk" },
              { id: "message", label: "Messages" },
              { id: "url", label: "URLs" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  filterType === f.id
                    ? "bg-sky-600/20 text-sky-300 border border-sky-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-semibold text-white text-base">
              {history.length === 0 ? "No Scan History Recorded" : "No Matching Records"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {history.length === 0
                ? "Scans you perform on messages or URLs will automatically appear here for your review."
                : "No items match your active search or risk filters."}
            </p>
          </div>
          {history.length === 0 && (
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigate("scan-message")}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                Scan a Message
              </button>
              <button
                onClick={() => onNavigate("check-url")}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                Check a URL
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  item.type === "message" ? "bg-sky-950/70 text-sky-400 border border-sky-800/40" : "bg-purple-950/70 text-purple-400 border border-purple-800/40"
                }`}>
                  {item.type === "message" ? <MessageSquareText className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-100 truncate pr-2">
                    {item.summary}
                  </p>

                  <div className="text-xs text-slate-400">
                    Warnings triggered: <span className="text-amber-400 font-mono font-bold">{item.warningsCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-300">
                    {item.score}/100
                  </span>
                  <RiskBadge category={item.category} size="sm" />
                </div>

                {item.details && (
                  <button
                    onClick={() => setSelectedScan(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Result</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Inspection Drawer / Modal */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1329] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-white text-lg">Historical Scan Details</h3>
              </div>
              <button
                onClick={() => setSelectedScan(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              Scanned: {new Date(selectedScan.timestamp).toLocaleString()} | Type: {selectedScan.type.toUpperCase()}
            </div>

            <ResultCard result={selectedScan.details} type={selectedScan.type} />
          </div>
        </div>
      )}
    </div>
  );
}
