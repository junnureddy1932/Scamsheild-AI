import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ScanMessage from "./pages/ScanMessage";
import CheckUrl from "./pages/CheckUrl";
import ScanHistory from "./pages/ScanHistory";
import SafetyTips from "./pages/SafetyTips";
import About from "./pages/About";
import { checkServerHealth } from "./services/api";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isServerOnline, setIsServerOnline] = useState(false);
  const [preloadedMessage, setPreloadedMessage] = useState("");
  const [preloadedUrl, setPreloadedUrl] = useState("");

  // Poll server health on load and every 15 seconds
  useEffect(() => {
    let isMounted = true;

    const check = async () => {
      const status = await checkServerHealth();
      if (isMounted) {
        setIsServerOnline(status !== null && status.status === "ok");
      }
    };

    check();
    const interval = setInterval(check, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handlePreloadMessage = (text) => {
    setPreloadedMessage(text);
    setActivePage("scan-message");
  };

  const handlePreloadUrl = (url) => {
    setPreloadedUrl(url);
    setActivePage("check-url");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isServerOnline={isServerOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {activePage === "dashboard" && (
          <Dashboard
            onNavigate={setActivePage}
            onPreloadMessage={handlePreloadMessage}
            onPreloadUrl={handlePreloadUrl}
          />
        )}

        {activePage === "scan-message" && (
          <ScanMessage initialText={preloadedMessage} />
        )}

        {activePage === "check-url" && (
          <CheckUrl initialUrl={preloadedUrl} />
        )}

        {activePage === "scan-history" && (
          <ScanHistory onNavigate={setActivePage} />
        )}

        {activePage === "safety-tips" && (
          <SafetyTips />
        )}

        {activePage === "about" && (
          <About />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}
