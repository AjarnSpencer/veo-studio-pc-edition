import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AspectRatio, GenerationMode, Resolution, VeoModel, } from '../types';
import { ArrowRightIcon, ChevronDownIcon, FilmIcon, FramesModeIcon, PlusIcon, RectangleStackIcon, ReferencesModeIcon, SlidersHorizontalIcon, SparklesIcon, TextModeIcon, TvIcon, XMarkIcon, } from './icons';
const aspectRatioDisplayNames = {
    [AspectRatio.LANDSCAPE]: 'Landscape (16:9)',
    [AspectRatio.PORTRAIT]: 'Portrait (9:16)',
};
const modeIcons = {
    [GenerationMode.TEXT_TO_VIDEO]: _jsx(TextModeIcon, { className: "w-5 h-5" }),
    [GenerationMode.FRAMES_TO_VIDEO]: _jsx(FramesModeIcon, { className: "w-5 h-5" }),
    [GenerationMode.REFERENCES_TO_VIDEO]: (_jsx(ReferencesModeIcon, { className: "w-5 h-5" })),
    [GenerationMode.EXTEND_VIDEO]: _jsx(FilmIcon, { className: "w-5 h-5" }),
};
const costPer7Seconds = {
    [VeoModel.VEO_FAST]: 0.0035 * 7, // $0.0245
    [VeoModel.VEO]: 0.007 * 7, // $0.049
};
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            if (base64) {
                resolve({ file, base64 });
            }
            else {
                reject(new Error('Failed to read file as base64.'));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
const fileToImageFile = (file) => fileToBase64(file);
const fileToVideoFile = (file) => fileToBase64(file);
const CustomSelect = ({ label, value, onChange, icon, children, disabled = false }) => (_jsxs("div", { children: [_jsx("label", { className: `text-xs block mb-1.5 font-medium ${disabled ? 'text-gray-500' : 'text-gray-400'}`, children: label }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: icon }), _jsx("select", { value: value, onChange: onChange, disabled: disabled, className: "w-full bg-[#1f1f1f] border border-gray-600 rounded-lg pl-10 pr-8 py-2.5 appearance-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700/50 disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed", children: children }), _jsx(ChevronDownIcon, { className: `w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-gray-600' : 'text-gray-400'}` })] })] }));
const ImageUpload = ({ onSelect, onRemove, image, label }) => {
    const inputRef = useRef(null);
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageFile = await fileToImageFile(file);
                onSelect(imageFile);
            }
            catch (error) {
                console.error('Error converting file:', error);
            }
        }
        // Reset input value to allow selecting the same file again
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    if (image) {
        return (_jsxs("div", { className: "relative w-28 h-20 group", children: [_jsx("img", { src: URL.createObjectURL(image.file), alt: "preview", className: "w-full h-full object-cover rounded-lg" }), _jsx("button", { type: "button", onClick: onRemove, className: "absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity", "aria-label": "Remove image", children: _jsx(XMarkIcon, { className: "w-4 h-4" }) })] }));
    }
    return (_jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: "w-28 h-20 bg-gray-700/50 hover:bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors", children: [_jsx(PlusIcon, { className: "w-6 h-6" }), _jsx("span", { className: "text-xs mt-1", children: label }), _jsx("input", { type: "file", ref: inputRef, onChange: handleFileChange, accept: "image/*", className: "hidden" })] }));
};
const VideoUpload = ({ onSelect, onRemove, video, label }) => {
    const inputRef = useRef(null);
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const videoFile = await fileToVideoFile(file);
                onSelect(videoFile);
            }
            catch (error) {
                console.error('Error converting file:', error);
            }
        }
    };
    if (video) {
        return (_jsxs("div", { className: "relative w-48 h-28 group", children: [_jsx("video", { src: URL.createObjectURL(video.file), muted: true, loop: true, className: "w-full h-full object-cover rounded-lg" }), _jsx("button", { type: "button", onClick: onRemove, className: "absolute top-1 right-1 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity", "aria-label": "Remove video", children: _jsx(XMarkIcon, { className: "w-4 h-4" }) })] }));
    }
    return (_jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: "w-48 h-28 bg-gray-700/50 hover:bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors text-center", children: [_jsx(PlusIcon, { className: "w-6 h-6" }), _jsx("span", { className: "text-xs mt-1 px-2", children: label }), _jsx("input", { type: "file", ref: inputRef, onChange: handleFileChange, accept: "video/*", className: "hidden" })] }));
};
const PromptForm = ({ onGenerate, initialValues, }) => {
    const [prompt, setPrompt] = useState(initialValues?.prompt ?? '');
    const [model, setModel] = useState(initialValues?.model ?? VeoModel.VEO_FAST);
    const [aspectRatio, setAspectRatio] = useState(initialValues?.aspectRatio ?? AspectRatio.LANDSCAPE);
    const [resolution, setResolution] = useState(initialValues?.resolution ?? Resolution.P720);
    const [generationMode, setGenerationMode] = useState(initialValues?.mode ?? GenerationMode.TEXT_TO_VIDEO);
    const [startFrame, setStartFrame] = useState(initialValues?.startFrame ?? null);
    const [endFrame, setEndFrame] = useState(initialValues?.endFrame ?? null);
    const [referenceImages, setReferenceImages] = useState(initialValues?.referenceImages ?? []);
    const [styleImage, setStyleImage] = useState(initialValues?.styleImage ?? null);
    const [inputVideo, setInputVideo] = useState(initialValues?.inputVideo ?? null);
    const [inputVideoObject, setInputVideoObject] = useState(initialValues?.inputVideoObject ?? null);
    const [isLooping, setIsLooping] = useState(initialValues?.isLooping ?? false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
    const textareaRef = useRef(null);
    const modeSelectorRef = useRef(null);
    // Sync state with initialValues prop when it changes (e.g., for "Extend" or "Try Again")
    useEffect(() => {
        if (initialValues) {
            setPrompt(initialValues.prompt ?? '');
            setModel(initialValues.model ?? VeoModel.VEO_FAST);
            setAspectRatio(initialValues.aspectRatio ?? AspectRatio.LANDSCAPE);
            setResolution(initialValues.resolution ?? Resolution.P720);
            setGenerationMode(initialValues.mode ?? GenerationMode.TEXT_TO_VIDEO);
            setStartFrame(initialValues.startFrame ?? null);
            setEndFrame(initialValues.endFrame ?? null);
            setReferenceImages(initialValues.referenceImages ?? []);
            setStyleImage(initialValues.styleImage ?? null);
            setInputVideo(initialValues.inputVideo ?? null);
            setInputVideoObject(initialValues.inputVideoObject ?? null);
            setIsLooping(initialValues.isLooping ?? false);
        }
    }, [initialValues]);
    useEffect(() => {
        if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
            setModel(VeoModel.VEO);
            setAspectRatio(AspectRatio.LANDSCAPE);
            setResolution(Resolution.P720);
        }
        else if (generationMode === GenerationMode.EXTEND_VIDEO) {
            setResolution(Resolution.P720);
        }
    }, [generationMode]);
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [prompt]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modeSelectorRef.current &&
                !modeSelectorRef.current.contains(event.target)) {
                setIsModeSelectorOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onGenerate({
            prompt,
            model,
            aspectRatio,
            resolution,
            mode: generationMode,
            startFrame,
            endFrame,
            referenceImages,
            styleImage,
            inputVideo,
            inputVideoObject,
            isLooping,
        });
    }, [
        prompt,
        model,
        aspectRatio,
        resolution,
        generationMode,
        startFrame,
        endFrame,
        referenceImages,
        styleImage,
        inputVideo,
        inputVideoObject,
        onGenerate,
        isLooping,
    ]);
    const handleSelectMode = (mode) => {
        setGenerationMode(mode);
        setIsModeSelectorOpen(false);
        // Reset media when mode changes to avoid confusion
        setStartFrame(null);
        setEndFrame(null);
        setReferenceImages([]);
        setStyleImage(null);
        setInputVideo(null);
        setInputVideoObject(null);
        setIsLooping(false);
    };
    const promptPlaceholder = {
        [GenerationMode.TEXT_TO_VIDEO]: 'Describe the video you want to create...',
        [GenerationMode.FRAMES_TO_VIDEO]: 'Describe motion between start and end frames (optional)...',
        [GenerationMode.REFERENCES_TO_VIDEO]: 'Describe a video using reference and style images...',
        [GenerationMode.EXTEND_VIDEO]: 'Describe what happens next (optional)...',
    }[generationMode];
    const selectableModes = [
        GenerationMode.TEXT_TO_VIDEO,
        GenerationMode.FRAMES_TO_VIDEO,
        GenerationMode.REFERENCES_TO_VIDEO,
    ];
    const renderMediaUploads = () => {
        if (generationMode === GenerationMode.FRAMES_TO_VIDEO) {
            return (_jsxs("div", { className: "mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-4", children: [_jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(ImageUpload, { label: "Start Frame", image: startFrame, onSelect: setStartFrame, onRemove: () => {
                                    setStartFrame(null);
                                    setIsLooping(false);
                                } }), !isLooping && (_jsx(ImageUpload, { label: "End Frame", image: endFrame, onSelect: setEndFrame, onRemove: () => setEndFrame(null) }))] }), startFrame && !endFrame && (_jsxs("div", { className: "mt-3 flex items-center", children: [_jsx("input", { id: "loop-video-checkbox", type: "checkbox", checked: isLooping, onChange: (e) => setIsLooping(e.target.checked), className: "w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-offset-gray-800 cursor-pointer" }), _jsx("label", { htmlFor: "loop-video-checkbox", className: "ml-2 text-sm font-medium text-gray-300 cursor-pointer", children: "Create a looping video" })] }))] }));
        }
        if (generationMode === GenerationMode.REFERENCES_TO_VIDEO) {
            return (_jsxs("div", { className: "mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex flex-wrap items-center justify-center gap-2", children: [referenceImages.map((img, index) => (_jsx(ImageUpload, { image: img, label: "", onSelect: () => { }, onRemove: () => setReferenceImages((imgs) => imgs.filter((_, i) => i !== index)) }, index))), referenceImages.length < 3 && (_jsx(ImageUpload, { label: "Add Reference", onSelect: (img) => setReferenceImages((imgs) => [...imgs, img]) }))] }));
        }
        if (generationMode === GenerationMode.EXTEND_VIDEO) {
            return (_jsx("div", { className: "mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 flex items-center justify-center gap-4", children: _jsx(VideoUpload, { label: _jsxs(_Fragment, { children: ["Input Video", _jsx("br", {}), "(must be 720p veo generated)"] }), video: inputVideo, onSelect: setInputVideo, onRemove: () => {
                        setInputVideo(null);
                        setInputVideoObject(null);
                    } }) }));
        }
        return null;
    };
    const isRefMode = generationMode === GenerationMode.REFERENCES_TO_VIDEO;
    const isExtendMode = generationMode === GenerationMode.EXTEND_VIDEO;
    let isSubmitDisabled = false;
    let tooltipText = '';
    switch (generationMode) {
        case GenerationMode.TEXT_TO_VIDEO:
            isSubmitDisabled = !prompt.trim();
            if (isSubmitDisabled) {
                tooltipText = 'Please enter a prompt.';
            }
            break;
        case GenerationMode.FRAMES_TO_VIDEO:
            isSubmitDisabled = !startFrame;
            if (isSubmitDisabled) {
                tooltipText = 'A start frame is required.';
            }
            break;
        case GenerationMode.REFERENCES_TO_VIDEO:
            const hasNoRefs = referenceImages.length === 0;
            const hasNoPrompt = !prompt.trim();
            isSubmitDisabled = hasNoRefs || hasNoPrompt;
            if (hasNoRefs && hasNoPrompt) {
                tooltipText = 'Please add reference image(s) and enter a prompt.';
            }
            else if (hasNoRefs) {
                tooltipText = 'At least one reference image is required.';
            }
            else if (hasNoPrompt) {
                tooltipText = 'Please enter a prompt.';
            }
            break;
        case GenerationMode.EXTEND_VIDEO:
            isSubmitDisabled = !inputVideoObject;
            if (isSubmitDisabled) {
                tooltipText =
                    'An input video from a previous generation is required to extend.';
            }
            break;
    }
    const estimatedCost = costPer7Seconds[model];
    return (_jsxs("div", { className: "relative w-full", children: [isSettingsOpen && (_jsx("div", { className: "absolute bottom-full left-0 right-0 mb-3 p-4 bg-[#2c2c2e] rounded-xl border border-gray-700 shadow-2xl", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(CustomSelect, { label: "Model", value: model, onChange: (e) => setModel(e.target.value), icon: _jsx(SparklesIcon, { className: "w-5 h-5 text-gray-400" }), disabled: isRefMode, children: Object.values(VeoModel).map((modelValue) => (_jsx("option", { value: modelValue, children: modelValue }, modelValue))) }), _jsx(CustomSelect, { label: "Aspect Ratio", value: aspectRatio, onChange: (e) => setAspectRatio(e.target.value), icon: _jsx(RectangleStackIcon, { className: "w-5 h-5 text-gray-400" }), disabled: isRefMode || isExtendMode, children: Object.entries(aspectRatioDisplayNames).map(([key, name]) => (_jsx("option", { value: key, children: name }, key))) }), _jsxs("div", { children: [_jsxs(CustomSelect, { label: "Resolution", value: resolution, onChange: (e) => setResolution(e.target.value), icon: _jsx(TvIcon, { className: "w-5 h-5 text-gray-400" }), disabled: isRefMode || isExtendMode, children: [_jsx("option", { value: Resolution.P720, children: "720p" }), _jsx("option", { value: Resolution.P1080, children: "1080p" })] }), resolution === Resolution.P1080 && (_jsx("p", { className: "text-xs text-yellow-400/80 mt-2", children: "1080p videos can't be extended." }))] })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "w-full", children: [renderMediaUploads(), _jsxs("div", { className: "flex items-end gap-2 bg-[#1f1f1f] border border-gray-600 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500", children: [_jsxs("div", { className: "relative", ref: modeSelectorRef, children: [_jsxs("button", { type: "button", onClick: () => setIsModeSelectorOpen((prev) => !prev), className: "flex shrink-0 items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors", "aria-label": "Select generation mode", children: [modeIcons[generationMode], _jsx("span", { className: "font-medium text-sm whitespace-nowrap", children: generationMode })] }), isModeSelectorOpen && (_jsx("div", { className: "absolute bottom-full mb-2 w-60 bg-[#2c2c2e] border border-gray-600 rounded-lg shadow-xl overflow-hidden z-10", children: selectableModes.map((mode) => (_jsxs("button", { type: "button", onClick: () => handleSelectMode(mode), className: `w-full text-left flex items-center gap-3 p-3 hover:bg-indigo-600/50 ${generationMode === mode ? 'bg-indigo-600/30 text-white' : 'text-gray-300'}`, children: [modeIcons[mode], _jsx("span", { children: mode })] }, mode))) }))] }), _jsx("textarea", { ref: textareaRef, value: prompt, onChange: (e) => setPrompt(e.target.value), placeholder: promptPlaceholder, className: "flex-grow bg-transparent focus:outline-none resize-none text-base text-gray-200 placeholder-gray-500 max-h-48 py-2", rows: 1 }), _jsx("button", { type: "button", onClick: () => setIsSettingsOpen((prev) => !prev), className: `p-2.5 rounded-full hover:bg-gray-700 ${isSettingsOpen ? 'bg-gray-700 text-white' : 'text-gray-300'}`, "aria-label": "Toggle settings", children: _jsx(SlidersHorizontalIcon, { className: "w-5 h-5" }) }), _jsxs("div", { className: "relative group", children: [_jsx("button", { type: "submit", className: "p-2.5 bg-indigo-600 rounded-full hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed", "aria-label": "Generate video", disabled: isSubmitDisabled, children: _jsx(ArrowRightIcon, { className: "w-5 h-5 text-white" }) }), isSubmitDisabled && tooltipText && (_jsx("div", { role: "tooltip", className: "absolute bottom-full right-0 mb-2 w-max max-w-xs px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10", children: tooltipText }))] })] }), _jsxs("p", { className: "text-xs text-gray-500 text-center mt-2 px-4", children: ["Veo is a paid-only model. You will be charged on your Cloud project. Est. cost for this 7s video: ~$", estimatedCost.toFixed(3), ". See", ' ', _jsx("a", { href: "https://ai.google.dev/gemini-api/docs/pricing#veo-3", target: "_blank", rel: "noopener noreferrer", className: "text-indigo-400 hover:underline", children: "pricing details" }), "."] })] })] }));
};
export default PromptForm;
