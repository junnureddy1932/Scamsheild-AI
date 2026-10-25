import React, { useState, useEffect } from "react";
import { Link2, ShieldAlert, Sparkles, Trash2, Loader2, AlertCircle, ExternalLink, AlertTriangle, ShieldCheck } from "lucide-react";
import ResultCard from "../components/ResultCard";
import { analyzeUrlApi } from "../services/api";
import { saveScanResult } from "../services/storage";

const SAMPLE_URLS = [
  {
    title: "Raw IP with Spoofed Path",
    url: "http://192.168.1.105:8080/secure-login/paypal-update/account-verification.php",
    category: "High Risk"
  },
  {
    title: "Brand Typosquatting (PayPal)",
    url: "https://paypa1-security-verify.com/login/update-kyc",
    category: "High Risk"
  },
  {
    title: "Obfuscating Shortener",
    url: "https://bit.ly/urgent-sbi-unfreeze",
    category: "Suspicious"
  },
  {
    title: "Deep Subdomain Phish Trap",
    url: "https://sbi.netbanking.update.kyc.portal-access.xyz/secure",
    category: "High Risk"
  },
  {
    title: "Official Government Portal",
    url: "https://cybercrime.gov.in/",
    category: "Legitimate Benchmark"
  }
];

export default function CheckUrl({ initialUrl = "" }) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleCheck = async (e) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a web address or domain before checking.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeUrlApi(trimmed);
      setResult(data);

      saveScanResult({
        type: "url",
        inputSnippet: trimmed,
        score: data.score,
        category: data.category,
        badgeColor: data.badgeColor,
        warningsCount: data.warnings.length,
        fullResult: data
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred while analyzing the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sampleUrl) => {
    setUrl(sampleUrl);
    setError(null);
    setResult(null);
  };

  const handleClear = () => {
    setUrl("");
    setError(null);
    setResult(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-mono font-medium">
          <Link2 className="w-3.5 h-3.5" />
          <span>Offline URL Heuristic Assessment</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Inspect Suspicious URL
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Examine suspect links safely. Our offline scanner parses domain structure, protocol encryption, raw IP addresses, typosquatting, shorteners, and deceptive subdomains without connecting to or fetching the destination.
        </p>
      </div>

      {/* Security Safety Guarantee Notice */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-200">Safe Offline Inspection Guarantee:</span>
          <p className="text-slate-400">
            ScamShield AI never executes, downloads, or connects to the entered URL. You can inspect links without risking payload execution. Note that HTTPS indicates encrypted transit only, not that a website is genuine.
          </p>
        </div>
      </div>

      {/* Sample demonstration URLs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Sample Demonstration URLs:</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Pre-configured test links
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SAMPLE_URLS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample.url)}
              className="p-3 text-left rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all text-xs group"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200 group-hover:text-sky-300">
                <span>{sample.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {sample.category}
                </span>
              </div>
              <p className="text-slate-500 mt-1 line-clamp-1 text-[11px] font-mono truncate">
                {sample.url}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Enter link or website address:</label>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. http://192.168.1.100:8080/secure/bank-login.html or paypa1-update.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 pl-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono tracking-wide"
            />
          </div>
        </div>

        {/* Error / Validation message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={!url && !result}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={handleCheck}
            disabled={loading || !url.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Evaluating URL Patterns...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-white" />
                <span>Inspect URL Safety</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <ResultCard
          result={result}
          type="url"
          onScanAgain={() => {
            handleClear();
            window.scrollTo({ top: 150, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
