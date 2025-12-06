/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {GenerateVideoParams} from '../types';
import {
  ArrowPathIcon,
  DownloadIcon,
  PlusIcon,
  SparklesIcon,
  XMarkIcon,
} from './icons';

interface VideoResultProps {
  videoUrl: string;
  config: GenerateVideoParams;
  onRetry: () => void;
  onNewVideo: () => void;
  onExtend: () => void;
  canExtend: boolean;
}

const VideoResult: React.FC<VideoResultProps> = ({
  videoUrl,
  config,
  onRetry,
  onNewVideo,
  onExtend,
  canExtend,
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;

    // Create a user-friendly filename from the prompt
    const sanitizedPrompt =
      config.prompt
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // remove special characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .slice(0, 50) || 'veo-video'; // truncate and provide fallback

    link.download = `${sanitizedPrompt}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-8 p-8 bg-gray-800/50 rounded-lg border border-gray-700 shadow-2xl">
      <button
        onClick={onNewVideo}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        aria-label="Close and create new video">
        <XMarkIcon className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-bold text-gray-200">
        Your Creation is Ready!
      </h2>
      <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
          <DownloadIcon className="w-5 h-5" />
          Download
        </button>
        {canExtend && (
          <button
            onClick={onExtend}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
            <SparklesIcon className="w-5 h-5" />
            Extend
          </button>
        )}
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
          <ArrowPathIcon className="w-5 h-5" />
          Retry
        </button>
        <button
          onClick={onNewVideo}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
          <PlusIcon className="w-5 h-5" />
          New Video
        </button>
      </div>
    </div>
  );
};

export default VideoResult;
