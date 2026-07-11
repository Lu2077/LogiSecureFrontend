export const LOGISECURE_LOCATIONS = ["rotterdam", "houston", "singapore"];
export const threatEventKey = "logisecure:threat_events";

export const LOCATION_LABELS: Record<string, string> = {
  rotterdam: "Rotterdam HQ (Europe)",
  houston: "Houston Hub (Americas)",
  singapore: "Singapore Port (APAC)"
};

export function sortEventsBySeverity(events: any[]) {
  if (!events) return [];
  const severityWeight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
  return [...events].sort((a, b) => {
    const weightA = severityWeight[a.severity?.toLowerCase()] || 0;
    const weightB = severityWeight[b.severity?.toLowerCase()] || 0;
    return weightB - weightA;
  });
}

// Control dinámico de la URL de la API para la presentación
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://railway.app";

// 1. Agregamos getBaseUrl y setBaseUrl que te pedía el selector de locaciones
export function getBaseUrl() {
  return API_BASE_URL;
}

export function setBaseUrl(url: string) {
  API_BASE_URL = url;
}

export async function fetchDashboardSync(hq: string = "rotterdam") {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/sync?hq=${hq}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.warn("API Offline or Mock Mode, falling back:", error);
    return {
      location: hq,
      timestamp: Date.now() / 1000,
      air_traffic: { status: "success", flights: [] },
      maritime_traffic: { status: "success", vessels: [] },
      land_traffic: { status: "success", fleet: [] },
      weather_telemetry: { temp: 22, condition: "Clear" },
      global_incidents: []
    };
  }
}

export async function postAgentAnalyze(payload: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/agent-analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Agent analyze failed");
    return await response.json();
  } catch (error) {
    return {
      status: "success",
      provider: "Fireworks AI (Simulated)",
      analysis: "Análisis del agente de contingencia logístico activo en modo seguro.",
      summary: "Ruta estable sin incidentes críticos en la simulación.",
      alerts: [],
      affected_shipments: [],
      alternative_routes: []
    };
  }
}

export async function fetchAgentStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/agent-status`);
    if (!response.ok) throw new Error("Agent status check failed");
    return await response.json();
  } catch (error) {
    return {
      status: "ready",
      provider: "Fireworks AI",
      model: "llama-v3p1-8b-instruct",
      confidence_threshold: 0.7
    };
  }
}
