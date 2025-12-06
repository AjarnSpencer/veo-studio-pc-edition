/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const API_KEY_SESSION_STORAGE_KEY = 'veo-studio-api-key';

/**
 * Saves the API key to session storage.
 * @param apiKey The API key to save.
 */
export const saveApiKey = (apiKey: string): void => {
  sessionStorage.setItem(API_KEY_SESSION_STORAGE_KEY, apiKey);
};

/**
 * Retrieves the API key. It first checks session storage,
 * then falls back to the environment variable (for developers).
 * @returns The API key.
 * @throws An error if the API key is not found.
 */
export const getApiKey = (): string => {
  // 1. Check session storage (for keys entered in the GUI)
  const sessionKey = sessionStorage.getItem(API_KEY_SESSION_STORAGE_KEY);
  if (sessionKey) {
    return sessionKey;
  }

  // 2. Check environment variable (for developers using .env file)
  // Vite replaces process.env.API_KEY with the actual value at build time.
  const envKey = process.env.API_KEY;
  if (envKey) {
    return envKey;
  }

  // This should ideally not be reached if the UI flow is correct,
  // as generateVideo is only called after a key is confirmed to exist.
  throw new Error('API key not found. Please provide one in the dialog.');
};

/**
 * Checks if an API key is available from any source.
 * @returns True if an API key is available, false otherwise.
 */
export const hasApiKey = (): boolean => {
  if (sessionStorage.getItem(API_KEY_SESSION_STORAGE_KEY)) {
    return true;
  }
  if (process.env.API_KEY) {
    return true;
  }
  return false;
};
