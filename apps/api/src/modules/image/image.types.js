"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePromptSchema = void 0;
const zod_1 = require("zod");
const content_types_js_1 = require("../content/content.types.js");
exports.ImagePromptSchema = zod_1.z.object({
    visualStyle: zod_1.z.string(),
    theme: zod_1.z.string(),
    composition: zod_1.z.string(),
    colorPalette: zod_1.z.string(),
    imagePrompt: zod_1.z.string(),
    negativePrompt: zod_1.z.string(),
    aspectRatio: zod_1.z.string(),
    intendedUsagePlatform: zod_1.z.nativeEnum(content_types_js_1.Platform),
});
