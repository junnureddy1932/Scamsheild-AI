import React, { useState, useEffect } from "react";
import { MessageSquareText, ShieldAlert, Sparkles, Trash2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import ResultCard from "../components/ResultCard";
import { analyzeMessageApi, fetchDemoExamples } from "../services/api";
import { saveScanResult } from "../services/storage";

// Fallback demo examples in case backend is loading
const FALLBACK_MESSAGE_DEMOS = [
  {
    id: "demo-bank-otp",
    title: "Bank OTP Phishing",
    category: "Banking Fraud",
    content: "Dear Customer, Your SBI NetBanking access is suspended due to unverified KYC. To avoid permanent block within 2 hours, verify your identity immediately. Reply with your received 6-digit OTP to +91-9876543210 or click http://sbi-kyc-verify-portal.net/unlock"
  },
  {
    id: "demo-job-fee",
    title: "Part-time Job Fee Scam",
    category: "Job Fraud",
    content: "Congratulations! You have been selected for Amazon Work From Home Assistant. Earn ₹3,500 daily just by reviewing products and liking YouTube videos. To confirm your joining kit and employee ID, pay a refundable registration fee of ₹999 via UPI to hr-deposit@fakeupi immediately."
  },
  {
    id: "demo-invest-return",
    title: "Crypto Guaranteed Profit",
    category: "Investment Scam",
    content: "EXCLUSIVE CRYPTO WEALTH: Join our VIP Telegram channel today! Invest ₹10,000 and get guaranteed return of ₹50,000 in 24 hours. 100% zero risk profit guaranteed by international trading bots. Limited slots remaining, contact @CryptoBossAdmin now!"
  },
  {
    id: "demo-lottery-prize",
    title: "Lottery Prize Claim Fee",
    category: "Lottery Scam",
    content: "You have won 1st prize in Kaun Banega Crorepati Lucky Draw of ₹25,00,000! Your lottery number is KBC-8891. To claim your cash prize directly in your bank account, please pay government processing tax of ₹4,500 by clicking bit.ly/kbc-tax-pay."
  },
  {
    id: "demo-normal-delivery",
    title: "Normal BlueDart Delivery",
    category: "Legitimate",
    content: "Your BlueDart shipment with tracking number AWB-9823410 is out for delivery today with courier associate Ramesh. Track your delivery on the official BlueDart app or contact support via bluedart.com. No payment is required for this prepaid package."
  }
];

export default function ScanMessage({ initialText = "" }) {
  const [message, setMessage] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [demoList, setDemoList] = useState(FALLBACK_MESSAGE_DEMOS);

  useEffect(() => {
    if (initialText) {
      setMessage(initialText);
    }
  }, [initialText]);

  useEffect(() => {
    fetchDemoExamples()
      .then((examples) => {
        const msgExamples = examples.filter((e) => e.type === "message");
        if (msgExamples.length > 0) {
          setDemoList(msgExamples);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, []);

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = message.trim();
    if (!trimmed) {
      setError("Please paste or type a message before analyzing.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeMessageApi(trimmed);
      setResult(data);

      // Save to local device history
      saveScanResult({
        type: "message",
        inputSnippet: trimmed,
        score: data.score,
        category: data.category,
        badgeColor: data.badgeColor,
        warningsCount: data.warnings.length,
        fullResult: data
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred during message analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (demo) => {
    setMessage(demo.content);
    setError(null);
    setResult(null);
  };

  const handleClear = () => {
    setMessage("");
    setError(null);
    setResult(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium">
          <MessageSquareText className="w-3.5 h-3.5" />
          <span>Rule-Based Message Inspection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Scan Suspicious Message
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Paste SMS alerts, WhatsApp messages, emails, job offers, investment pitches, or payment demands.
          Our transparent heuristic engine checks for OTP harvesting, urgency threats, advance fees, and remote tool coercion.
        </p>
      </div>

      {/* Synthetic Demonstration Examples Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Synthetic Demonstration Examples:</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Fictional educational data
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {demoList.map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleSelectDemo(demo)}
              className="p-3 text-left rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all text-xs group"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200 group-hover:text-sky-300">
                <span>{demo.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {demo.category}
                </span>
              </div>
              <p className="text-slate-500 mt-1 line-clamp-1 text-[11px] font-mono">
                {demo.content}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box and Action Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="relative">
          <textarea
            rows={6}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste suspicious SMS, email, WhatsApp message, or job offer here...&#10;&#10;Example: 'Dear customer, your bank account is blocked. Verify KYC immediately by replying with your 6-digit OTP...'"
            className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-sans leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-500 pointer-events-none">
            {message.length} chars
          </div>
        </div>

        {/* Validation / Error banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={!message && !result}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear</span>
            </button>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Data is processed locally; credentials are never logged.
            </span>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !message.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-sky-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Evaluating Indicators...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-white" />
                <span>Analyze Message</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <ResultCard
          result={result}
          type="message"
          onScanAgain={() => {
            handleClear();
            window.scrollTo({ top: 150, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
