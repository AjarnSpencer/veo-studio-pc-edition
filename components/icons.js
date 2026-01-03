import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ArrowDown, ArrowRight, Baseline, ChevronDown, Clock, Download, Film, Image, KeyRound, Layers, Plus, RefreshCw, SlidersHorizontal, Sparkles, Tv, X, } from 'lucide-react';
const defaultProps = {
    strokeWidth: 1.5,
};
export const KeyIcon = (props) => (_jsx(KeyRound, { ...defaultProps, ...props }));
export const ArrowPathIcon = (props) => _jsx(RefreshCw, { ...defaultProps, ...props });
export const SparklesIcon = (props) => (_jsx(Sparkles, { ...defaultProps, ...props }));
export const PlusIcon = (props) => (_jsx(Plus, { ...defaultProps, ...props }));
export const ChevronDownIcon = (props) => _jsx(ChevronDown, { ...defaultProps, ...props });
export const SlidersHorizontalIcon = (props) => _jsx(SlidersHorizontal, { ...defaultProps, ...props });
export const ArrowRightIcon = (props) => _jsx(ArrowRight, { ...defaultProps, ...props });
export const RectangleStackIcon = (props) => _jsx(Layers, { ...defaultProps, ...props });
export const XMarkIcon = (props) => (_jsx(X, { ...defaultProps, ...props }));
export const TextModeIcon = (props) => (_jsx(Baseline, { ...defaultProps, ...props }));
export const FramesModeIcon = (props) => _jsx(Image, { ...defaultProps, ...props });
export const ReferencesModeIcon = (props) => _jsx(Film, { ...defaultProps, ...props });
export const TvIcon = (props) => (_jsx(Tv, { ...defaultProps, ...props }));
export const FilmIcon = (props) => (_jsx(Film, { ...defaultProps, ...props }));
export const HistoryIcon = (props) => (_jsx(Clock, { ...defaultProps, ...props }));
export const DownloadIcon = (props) => _jsx(Download, { ...defaultProps, ...props });
// This icon had a different stroke width in the original file, so we preserve it.
export const CurvedArrowDownIcon = (props) => _jsx(ArrowDown, { ...props, strokeWidth: 3 });
