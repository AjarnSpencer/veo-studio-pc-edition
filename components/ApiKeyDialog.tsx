/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {KeyIcon, XMarkIcon} from './icons';

interface ApiKeyDialogProps {
  isAiStudio: boolean;
  onContinue: () => void;
  onSave: (apiKey: string) => void;
  onClose: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  isAiStudio,
  onContinue,
  onSave,
  onClose,
}) => {
  const [localApiKey, setLocalApiKey] = useState('');

  const handleSave = () => {
    if (localApiKey.trim()) {
      onSave(localApiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl max-w-lg w-full p-8 text-center flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Close dialog">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="bg-indigo-600/20 p-4 rounded-full mb-6">
          <KeyIcon className="w-12 h-12 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Paid API Key Required for Veo
        </h2>
        <p className="text-gray-300 mb-6">
          Veo is a paid-only video generation model. To use this feature, please
          provide an API key associated with a paid Google Cloud project that has
          billing enabled.
        </p>

        {!isAiStudio && (
          <div className="w-full mb-6 text-left">
            <label
              htmlFor="apiKeyInput"
              className="block text-sm font-medium text-gray-300 mb-2">
              Enter your Google Cloud API Key
            </label>
            <input
              id="apiKeyInput"
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="Paste your API key here"
              className="w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your key is stored in sessionStorage and only lasts for this
              session.
            </p>
          </div>
        )}

        <p className="text-gray-400 mb-8 text-sm">
          For more information, see the{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline font-medium">
            how to enable billing
          </a>{' '}
          and{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/pricing#veo-3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline font-medium">
            Veo pricing
          </a>
          .
        </p>
        {isAiStudio ? (
          <button
            onClick={onContinue}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg">
            Continue to Select a Paid API Key
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={!localApiKey.trim()}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg disabled:bg-gray-600 disabled:cursor-not-allowed">
            Save and Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyDialog;
