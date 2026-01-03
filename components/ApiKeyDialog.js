import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { KeyIcon, XMarkIcon } from './icons';
const ApiKeyDialog = ({ isAiStudio, onContinue, onSave, onClose, }) => {
    const [localApiKey, setLocalApiKey] = useState('');
    const handleSave = () => {
        if (localApiKey.trim()) {
            onSave(localApiKey.trim());
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl max-w-lg w-full p-8 text-center flex flex-col items-center", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors", "aria-label": "Close dialog", children: _jsx(XMarkIcon, { className: "w-6 h-6" }) }), _jsx("div", { className: "bg-indigo-600/20 p-4 rounded-full mb-6", children: _jsx(KeyIcon, { className: "w-12 h-12 text-indigo-400" }) }), _jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Paid API Key Required for Veo" }), _jsx("p", { className: "text-gray-300 mb-6", children: "Veo is a paid-only video generation model. To use this feature, please provide an API key associated with a paid Google Cloud project that has billing enabled." }), !isAiStudio && (_jsxs("div", { className: "w-full mb-6 text-left", children: [_jsx("label", { htmlFor: "apiKeyInput", className: "block text-sm font-medium text-gray-300 mb-2", children: "Enter your Google Cloud API Key" }), _jsx("input", { id: "apiKeyInput", type: "password", value: localApiKey, onChange: (e) => setLocalApiKey(e.target.value), placeholder: "Paste your API key here", className: "w-full bg-[#1f1f1f] border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Your key is stored in sessionStorage and only lasts for this session." })] })), _jsxs("p", { className: "text-gray-400 mb-8 text-sm", children: ["For more information, see the", ' ', _jsx("a", { href: "https://ai.google.dev/gemini-api/docs/billing", target: "_blank", rel: "noopener noreferrer", className: "text-indigo-400 hover:underline font-medium", children: "how to enable billing" }), ' ', "and", ' ', _jsx("a", { href: "https://ai.google.dev/gemini-api/docs/pricing#veo-3", target: "_blank", rel: "noopener noreferrer", className: "text-indigo-400 hover:underline font-medium", children: "Veo pricing" }), "."] }), isAiStudio ? (_jsx("button", { onClick: onContinue, className: "w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg", children: "Continue to Select a Paid API Key" })) : (_jsx("button", { onClick: handleSave, disabled: !localApiKey.trim(), className: "w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg disabled:bg-gray-600 disabled:cursor-not-allowed", children: "Save and Continue" }))] }) }));
};
export default ApiKeyDialog;
