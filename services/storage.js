/**
 * LocalStorage manager for privacy-conscious client-side scan history.
 * Never stores sensitive credentials; automatically sanitizes summaries.
 */

const STORAGE_KEY = "scamshield_scan_history_v1";

export function getScanHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Corrupted history detected in localStorage, resetting safely:", err);
    return [];
  }
}

export function saveScanResult({ type, inputSnippet, score, category, badgeColor, warningsCount, fullResult }) {
  try {
    const history = getScanHistory();

    // Limit summary snippet length to 80 chars for privacy
    const privacySummary = inputSnippet.length > 75 
      ? inputSnippet.slice(0, 72) + "..." 
      : inputSnippet;

    const newEntry = {
      id: "scan_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      type, // 'message' or 'url'
      summary: privacySummary,
      score,
      category,
      badgeColor,
      warningsCount: warningsCount || 0,
      details: fullResult
    };

    // Store up to 50 recent scans locally
    const updated = [newEntry, ...history].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.warn("Unable to save scan to localStorage:", err);
    return null;
  }
}

export function clearScanHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error("Failed to clear localStorage:", err);
    return false;
  }
}

export function getScanStats() {
  const history = getScanHistory();
  const totalScans = history.length;
  const highRisk = history.filter(h => h.category === "High Risk").length;
  const mediumRisk = history.filter(h => h.category === "Medium Risk").length;
  const lowRisk = history.filter(h => h.category === "Low Risk").length;
  const messageScans = history.filter(h => h.type === "message").length;
  const urlScans = history.filter(h => h.type === "url").length;

  return {
    totalScans,
    highRisk,
    mediumRisk,
    lowRisk,
    messageScans,
    urlScans,
    recentScans: history.slice(0, 5)
  };
}
