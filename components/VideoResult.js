import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ArrowPathIcon, DownloadIcon, PlusIcon, SparklesIcon, XMarkIcon, } from './icons';
const VideoResult = ({ videoUrl, config, onRetry, onNewVideo, onExtend, canExtend, }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = videoUrl;
        // Create a user-friendly filename from the prompt
        const sanitizedPrompt = config.prompt
            ?.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '') // remove special characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .slice(0, 50) || 'veo-video'; // truncate and provide fallback
        link.download = `${sanitizedPrompt}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (_jsxs("div", { className: "relative w-full flex flex-col items-center gap-8 p-8 bg-gray-800/50 rounded-lg border border-gray-700 shadow-2xl", children: [_jsx("button", { onClick: onNewVideo, className: "absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors", "aria-label": "Close and create new video", children: _jsx(XMarkIcon, { className: "w-6 h-6" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-200", children: "Your Creation is Ready!" }), _jsx("div", { className: "w-full max-w-2xl aspect-video rounded-lg overflow-hidden bg-black shadow-lg", children: _jsx("video", { src: videoUrl, controls: true, autoPlay: true, loop: true, className: "w-full h-full object-contain" }) }), _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [_jsxs("button", { onClick: handleDownload, className: "flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors", children: [_jsx(DownloadIcon, { className: "w-5 h-5" }), "Download"] }), canExtend && (_jsxs("button", { onClick: onExtend, className: "flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors", children: [_jsx(SparklesIcon, { className: "w-5 h-5" }), "Extend"] })), _jsxs("button", { onClick: onRetry, className: "flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors", children: [_jsx(ArrowPathIcon, { className: "w-5 h-5" }), "Retry"] }), _jsxs("button", { onClick: onNewVideo, className: "flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors", children: [_jsx(PlusIcon, { className: "w-5 h-5" }), "New Video"] })] })] }));
};
export default VideoResult;
