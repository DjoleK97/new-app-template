/**
 * Session storage key used in localStorage
 */
const SESSION_ID_KEY = "seoska_korpa_session_id";

/**
 * Generates a random UUID v4
 * This is a simple implementation that doesn't require the uuid package
 */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets the current session ID from localStorage or creates a new one if it doesn't exist
 * @returns The session ID as a string
 */
export function getSessionId(): string {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return "";
  }

  // Try to get existing session ID from localStorage
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  // If no session ID exists, create a new one and store it
  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Clears the session ID from localStorage
 * Useful when a guest user logs in and we want to merge carts
 */
export function clearSessionId(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_ID_KEY);
  }
}
