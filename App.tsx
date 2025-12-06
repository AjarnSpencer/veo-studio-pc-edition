/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from '@google/genai';
import React, {useCallback, useEffect, useState} from 'react';
import ApiKeyDialog from './components/ApiKeyDialog';
import HistoryPanel from './components/HistoryPanel';
import {CurvedArrowDownIcon, HistoryIcon, KeyIcon} from './components/icons';
import LoadingIndicator from './components/LoadingIndicator';
import PromptForm from './components/PromptForm';
import VideoResult from './components/VideoResult';
import {hasApiKey, saveApiKey} from './services/apiKeyService';
import {generateVideo} from './services/geminiService';
import {
  AppState,
  GenerateVideoParams,
  GenerationHistoryItem,
  GenerationMode,
  Resolution,
  VideoFile,
} from './types';
import {createThumbnail} from './utils';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastConfig, setLastConfig] = useState<GenerateVideoParams | null>(
    null,
  );
  const [lastVideoObject, setLastVideoObject] = useState<Video | null>(null);
  const [lastVideoBlob, setLastVideoBlob] = useState<Blob | null>(null);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<
    GenerationHistoryItem[]
  >([]);

  const isAiStudio = !!window.aistudio;

  const [initialFormValues, setInitialFormValues] =
    useState<GenerateVideoParams | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (isAiStudio) {
        try {
          if (!(await window.aistudio.hasSelectedApiKey())) {
            setIsApiKeyDialogOpen(true);
          }
        } catch (error) {
          console.warn(
            'aistudio.hasSelectedApiKey check failed, assuming no key selected.',
            error,
          );
          setIsApiKeyDialogOpen(true);
        }
      } else {
        if (!hasApiKey()) {
          setIsApiKeyDialogOpen(true);
        }
      }
    };
    checkApiKey();
  }, [isAiStudio]);

  const showStatusError = (message: string) => {
    setErrorMessage(message);
    setAppState(AppState.ERROR);
  };

  const preGenerationKeyCheck = async () => {
    if (isAiStudio) {
      try {
        if (!(await window.aistudio.hasSelectedApiKey())) {
          setIsApiKeyDialogOpen(true);
          return false;
        }
      } catch (error) {
        setIsApiKeyDialogOpen(true);
        return false;
      }
    } else {
      if (!hasApiKey()) {
        setIsApiKeyDialogOpen(true);
        return false;
      }
    }
    return true;
  };

  const handleGenerate = useCallback(
    async (params: GenerateVideoParams) => {
      const keyExists = await preGenerationKeyCheck();
      if (!keyExists) return;

      setAppState(AppState.LOADING);
      setErrorMessage(null);
      setLastConfig(params);
      setInitialFormValues(null);

      try {
        const {objectUrl, blob, video} = await generateVideo(params);
        setVideoUrl(objectUrl);
        setLastVideoBlob(blob);
        setLastVideoObject(video);
        setAppState(AppState.SUCCESS);

        // Add to history
        const thumbnailUrl = await createThumbnail(objectUrl);
        const historyItem: GenerationHistoryItem = {
          id: Date.now().toString(),
          thumbnailUrl,
          item: {
            videoUrl: objectUrl,
            blob,
            video,
            config: params,
          },
        };
        setGenerationHistory((prev) => [historyItem, ...prev]);
      } catch (error) {
        console.error('Video generation failed:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred.';

        let userFriendlyMessage = `Video generation failed: ${errorMessage}`;
        let shouldOpenDialog = false;

        if (typeof errorMessage === 'string') {
          if (
            errorMessage.includes('API key not found') ||
            errorMessage.includes('API_KEY_INVALID') ||
            errorMessage.includes('API key not valid') ||
            errorMessage.toLowerCase().includes('permission denied') ||
            errorMessage.includes('Requested entity was not found.')
          ) {
            userFriendlyMessage =
              'Your API key is invalid, missing permissions, or not found. Please provide a valid, billing-enabled API key.';
            shouldOpenDialog = true;
          }
        }
        setErrorMessage(userFriendlyMessage);
        setAppState(AppState.ERROR);
        if (shouldOpenDialog) {
          setIsApiKeyDialogOpen(true);
        }
      }
    },
    [isAiStudio],
  );

  const handleRetry = useCallback(() => {
    if (lastConfig) {
      handleGenerate(lastConfig);
    }
  }, [lastConfig, handleGenerate]);

  const handleApiKeyDialogContinue = async () => {
    if (isAiStudio) {
      await window.aistudio.openSelectKey();
    }
    setIsApiKeyDialogOpen(false);
    if (appState === AppState.ERROR && lastConfig) {
      handleRetry();
    }
  };

  const handleApiKeySave = (apiKey: string) => {
    saveApiKey(apiKey);
    setIsApiKeyDialogOpen(false);
    if (appState === AppState.ERROR && lastConfig) {
      handleRetry();
    }
  };

  const handleNewVideo = useCallback(() => {
    setAppState(AppState.IDLE);
    setVideoUrl(null);
    setErrorMessage(null);
    setLastConfig(null);
    setLastVideoObject(null);
    setLastVideoBlob(null);
    setInitialFormValues(null);
  }, []);

  const handleTryAgainFromError = useCallback(() => {
    if (lastConfig) {
      setInitialFormValues(lastConfig);
      setAppState(AppState.IDLE);
      setErrorMessage(null);
    } else {
      handleNewVideo();
    }
  }, [lastConfig, handleNewVideo]);

  const handleExtend = useCallback(async () => {
    if (lastConfig && lastVideoBlob && lastVideoObject) {
      try {
        const file = new File([lastVideoBlob], 'last_video.mp4', {
          type: lastVideoBlob.type,
        });
        const videoFile: VideoFile = {file, base64: ''};

        setInitialFormValues({
          ...lastConfig,
          mode: GenerationMode.EXTEND_VIDEO,
          prompt: '',
          inputVideo: videoFile,
          inputVideoObject: lastVideoObject,
          resolution: Resolution.P720,
          startFrame: null,
          endFrame: null,
          referenceImages: [],
          styleImage: null,
          isLooping: false,
        });

        setAppState(AppState.IDLE);
        setVideoUrl(null);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to process video for extension:', error);
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.';
        showStatusError(`Failed to prepare video for extension: ${message}`);
      }
    }
  }, [lastConfig, lastVideoBlob, lastVideoObject]);

  const handleSelectHistoryItem = useCallback(
    (item: GenerationHistoryItem['item']) => {
      setVideoUrl(item.videoUrl);
      setLastVideoBlob(item.blob);
      setLastVideoObject(item.video);
      setLastConfig(item.config);
      setAppState(AppState.SUCCESS);
      setIsHistoryPanelOpen(false);
    },
    [],
  );

  const renderError = (message: string) => (
    <div className="text-center bg-red-900/20 border border-red-500 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
      <p className="text-red-300">{message}</p>
      <button
        onClick={handleTryAgainFromError}
        className="mt-6 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="h-screen bg-black text-gray-200 flex flex-col font-sans overflow-hidden">
      {isApiKeyDialogOpen && (
        <ApiKeyDialog
          isAiStudio={isAiStudio}
          onContinue={handleApiKeyDialogContinue}
          onSave={handleApiKeySave}
          onClose={() => setIsApiKeyDialogOpen(false)}
        />
      )}
      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
        history={generationHistory}
        onSelect={handleSelectHistoryItem}
      />
      <header className="py-6 flex flex-col justify-center items-center px-8 relative z-10">
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <button
            onClick={() => setIsHistoryPanelOpen(true)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Show session history"
            title="Show session history">
            <HistoryIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsApiKeyDialogOpen(true)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            aria-label="Manage API Key"
            title="Manage API Key">
            <KeyIcon className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-5xl font-semibold tracking-wide text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Veo Studio PC Edition
        </h1>
        <div className="text-center mt-1">
          <p className="text-lg text-gray-400">
            by Ajarn Spencer Littlewood in Collaboration with Gemini CLI
            Unleashed
          </p>
          <a
            href="https://github.com/AjarnSpencer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-400 hover:underline transition-colors">
            Author's Github Page
          </a>
        </div>
      </header>
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col p-4">
        {appState === AppState.IDLE ? (
          <>
            <div className="flex-grow flex items-center justify-center">
              <div className="relative text-center">
                <h2 className="text-3xl text-gray-600">
                  Type in the prompt box to start
                </h2>
                <CurvedArrowDownIcon className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-24 h-24 text-gray-700 opacity-60" />
              </div>
            </div>
            <div className="pb-4">
              <PromptForm
                onGenerate={handleGenerate}
                initialValues={initialFormValues}
              />
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            {appState === AppState.LOADING && <LoadingIndicator />}
            {appState === AppState.SUCCESS && videoUrl && lastConfig && (
              <VideoResult
                videoUrl={videoUrl}
                config={lastConfig}
                onRetry={handleRetry}
                onNewVideo={handleNewVideo}
                onExtend={handleExtend}
                canExtend={lastConfig?.resolution === Resolution.P720}
              />
            )}
            {appState === AppState.SUCCESS &&
              !videoUrl &&
              renderError(
                'Video generated, but URL is missing. Please try again.',
              )}
            {appState === AppState.ERROR &&
              errorMessage &&
              renderError(errorMessage)}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
