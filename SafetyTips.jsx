import React from "react";
import { 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  AlertTriangle, 
  PhoneCall, 
  ExternalLink, 
  Smartphone, 
  TrendingUp, 
  Briefcase, 
  HelpCircle 
} from "lucide-react";

export default function SafetyTips() {
  const safetyRules = [
    {
      icon: Lock,
      title: "The Golden Rule of UPI PIN",
      highlight: "UPI PIN is NEVER needed to receive money",
      description: "Entering your UPI PIN or MPIN immediately debits money from your account. If a buyer or sender on OLX, WhatsApp, or Facebook Marketplace tells you to 'enter PIN to claim money', it is guaranteed 100% fraud."
    },
    {
      icon: CreditCard,
      title: "Protect OTPs & Confidential Banking Credentials",
      highlight: "Never share OTPs with anyone",
      description: "Genuine bank managers, customer support agents, and fraud investigators will never call or message to ask for an OTP, CVV, or NetBanking password. OTP is the final barrier protecting your funds."
    },
    {
      icon: Smartphone,
      title: "Say NO to Remote Access Software",
      highlight: "Never install AnyDesk, TeamViewer, or QuickSupport on request",
      description: "Scammers pretend to fix KYC errors, electricity bill disconnection, or refund glitches by instructing victims to install remote desktop apps. Once connected, they capture your OTPs and control your screen."
    },
    {
      icon: Briefcase,
      title: "Job Offer & Part-Time Task Scams",
      highlight: "Never pay money to get a job or task payout",
      description: "Real companies and recruiters never require registration charges, training deposits, or courier fees. Beware of Telegram groups offering daily income for liking YouTube videos or submitting fake hotel reviews."
    },
    {
      icon: TrendingUp,
      title: "Guaranteed High Return & Crypto Schemes",
      highlight: "Guaranteed high returns do not exist",
      description: "Promises to 'double your money in 24 hours' or claims of '100% zero-risk AI trading' are textbook Ponzi schemes. Scammers show fake trading dashboards and demand more money when you attempt to withdraw."
    },
    {
      icon: AlertTriangle,
      title: "Beware of Digital Arrest & Police Coercion",
      highlight: "Police never arrest or summon people via WhatsApp video calls",
      description: "Fraudsters impersonate CBI, Customs, Narcotics Bureau, or TRAI officials claiming a parcel in your name contains narcotics or passport fraud. Law enforcement agencies never demand cash transfers to 'clear your name'."
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cyber Hygiene & Fraud Defense</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Online Fraud Prevention & Safety Education
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Knowledge is the most effective firewall. Understanding deceptive patterns and psychological triggers protects your finances and personal identity.
        </p>
      </div>

      {/* Emergency Cyber Fraud Help Card (India Focus) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Official Indian Citizen Incident Response</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Report Financial Cyber Fraud Promptly
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have transferred money or lost funds to a fraudster, the <strong className="text-amber-300">Golden Hour</strong> is critical. Dialing <strong className="text-amber-300">1930</strong> immediately allows the Indian Cyber Crime Coordination Centre (I4C) to alert beneficiary banks and freeze the stolen funds before the criminal withdraws them.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center w-full md:w-auto">
              <span className="text-[11px] text-slate-400 font-mono block">Helpline Number</span>
              <div className="text-3xl font-extrabold font-mono text-amber-400">1930</div>
              <span className="text-[10px] text-amber-300/80">Toll-free 24x7</span>
            </div>
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-colors w-full md:w-auto justify-center"
            >
              <span>Visit National Cybercrime Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Safety Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyRules.map((rule, idx) => {
          const Icon = rule.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base">{rule.title}</h3>
              </div>

              <div className="text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-lg">
                ⚠️ {rule.highlight}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {rule.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Verification Checklist */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Before You Click or Pay: A Quick 5-Point Mental Check</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">1. Pause and Breathe</span>
            <p className="text-slate-400">Scammers create artificial panic. Always step back and give yourself 15 minutes before acting.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">2. Verify the Sender</span>
            <p className="text-slate-400">Check the phone number or sender address. Genuine bank SMS will show an official header, not a random 10-digit mobile number.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">3. Inspect the Domain</span>
            <p className="text-slate-400">Look for typos (paypa1, sbi-kyc-portal). If in doubt, use a bookmarked official link or open your official mobile app.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">4. Ask a Confidant</span>
            <p className="text-slate-400">Discuss unexpected prize, investment, or emergency claims with family, friends, or your local bank manager.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">5. Protect Credentials</span>
            <p className="text-slate-400">Keep passwords, PINs, and OTPs strictly private. No legitimate service will ever demand them to verify your account.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="font-bold text-sky-400 block">6. Report Promptly</span>
            <p className="text-slate-400">Reporting attempts helps law enforcement shut down fraudulent bank accounts, mule wallets, and malicious domains.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
