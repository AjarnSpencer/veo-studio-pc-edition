export var AppState;
(function (AppState) {
    AppState[AppState["IDLE"] = 0] = "IDLE";
    AppState[AppState["LOADING"] = 1] = "LOADING";
    AppState[AppState["SUCCESS"] = 2] = "SUCCESS";
    AppState[AppState["ERROR"] = 3] = "ERROR";
})(AppState || (AppState = {}));
export var VeoModel;
(function (VeoModel) {
    VeoModel["VEO_FAST"] = "veo-3.1-fast-generate-preview";
    VeoModel["VEO"] = "veo-3.1-generate-preview";
})(VeoModel || (VeoModel = {}));
export var AspectRatio;
(function (AspectRatio) {
    AspectRatio["LANDSCAPE"] = "16:9";
    AspectRatio["PORTRAIT"] = "9:16";
})(AspectRatio || (AspectRatio = {}));
export var Resolution;
(function (Resolution) {
    Resolution["P720"] = "720p";
    Resolution["P1080"] = "1080p";
})(Resolution || (Resolution = {}));
export var GenerationMode;
(function (GenerationMode) {
    GenerationMode["TEXT_TO_VIDEO"] = "Text to Video";
    GenerationMode["FRAMES_TO_VIDEO"] = "Frames to Video";
    GenerationMode["REFERENCES_TO_VIDEO"] = "References to Video";
    GenerationMode["EXTEND_VIDEO"] = "Extend Video";
})(GenerationMode || (GenerationMode = {}));
