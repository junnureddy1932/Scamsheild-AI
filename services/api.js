/**
 * API service for communicating with the ScamShield AI backend.
 * Provides transparent error handling when the server is unreachable.
 */

const API_BASE = "/api";

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Server error (${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.error) {
        errorMessage = errorJson.error;
      }
    } catch {
      // keep fallback
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(4000) });
    return await handleResponse(res);
  } catch (err) {
    console.warn("Backend health check failed:", err.message);
    return null;
  }
}

export async function fetchDemoExamples() {
  try {
    const res = await fetch(`${API_BASE}/demo-examples`);
    const data = await handleResponse(res);
    return data.examples || [];
  } catch (err) {
    throw new Error(`Failed to load demonstration examples: ${err.message}`);
  }
}

export async function analyzeMessageApi(message) {
  try {
    const res = await fetch(`${API_BASE}/analyze-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });
    const result = await handleResponse(res);
    return result.data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Unable to connect to the ScamShield AI analysis engine. Ensure the backend server is running on port 5000.");
    }
    throw err;
  }
}

export async function analyzeUrlApi(url) {
  try {
    const res = await fetch(`${API_BASE}/analyze-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });
    const result = await handleResponse(res);
    return result.data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Unable to connect to the ScamShield AI analysis engine. Ensure the backend server is running on port 5000.");
    }
    throw err;
  }
}
