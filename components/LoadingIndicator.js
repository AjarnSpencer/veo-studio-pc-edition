import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
const loadingMessages = [
    "Warming up the digital director...",
    "Gathering pixels and photons...",
    "Storyboarding your vision...",
    "Consulting with the AI muse...",
    "Rendering the first scene...",
    "Applying cinematic lighting...",
    "This can take a few minutes, hang tight!",
    "Adding a touch of movie magic...",
    "Composing the final cut...",
    "Polishing the masterpiece...",
    "Teaching the AI to say 'I'll be back'...",
    "Checking for digital dust bunnies...",
    "Calibrating the irony sensors...",
    "Untangling the timelines...",
    "Enhancing to ludicrous speed...",
    "Don't worry, the pixels are friendly.",
    "Harvesting nano banana stems...",
    "Praying to the Gemini star...",
    "Starting a draft for your oscar speech..."
];
const LoadingIndicator = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 3000); // Change message every 3 seconds
        return () => clearInterval(intervalId);
    }, []);
    return (_jsxs("div", { className: "flex flex-col items-center justify-center p-12 bg-gray-800/50 rounded-lg border border-gray-700", children: [_jsx("div", { className: "w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin" }), _jsx("h2", { className: "text-2xl font-semibold mt-8 text-gray-200", children: "Generating Your Video" }), _jsx("p", { className: "mt-2 text-gray-400 text-center transition-opacity duration-500", children: loadingMessages[messageIndex] })] }));
};
export default LoadingIndicator;
