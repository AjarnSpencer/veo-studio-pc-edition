// This file is for custom global type declarations

interface Window {
  // Define the aistudio object that might be injected by the environment
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}
