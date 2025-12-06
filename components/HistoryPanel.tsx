/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {GenerationHistoryItem} from '../types';
import {XMarkIcon} from './icons';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: GenerationHistoryItem[];
  onSelect: (item: GenerationHistoryItem['item']) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#1c1c1e] border-l border-gray-700 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Session History</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="Close history panel">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </header>
          <div className="flex-grow overflow-y-auto p-4">
            {history.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Generated videos will appear here.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {history.map(({id, thumbnailUrl, item}) => (
                  <li key={id}>
                    <button
                      onClick={() => onSelect(item)}
                      className="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/50 transition-colors text-left group">
                      <div className="flex-shrink-0 w-24 h-16 bg-black rounded-md overflow-hidden">
                        <img
                          src={thumbnailUrl}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className="text-sm text-gray-300 group-hover:text-white truncate">
                          {item.config.prompt || 'Video generation'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.config.mode}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPanel;
