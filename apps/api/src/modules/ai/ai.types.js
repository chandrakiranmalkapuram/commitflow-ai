"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUnderstandingSchema = void 0;
const zod_1 = require("zod");
exports.AiUnderstandingSchema = zod_1.z.object({
    featureName: zod_1.z.string(),
    category: zod_1.z.string(),
    technicalSummary: zod_1.z.string(),
    businessSummary: zod_1.z.string(),
    technologiesUsed: zod_1.z.array(zod_1.z.string()),
    developerAchievements: zod_1.z.array(zod_1.z.string()),
    complexity: zod_1.z.enum(['Low', 'Medium', 'High']),
    confidenceScore: zod_1.z.number().min(0).max(100),
    suggestedHighlights: zod_1.z.array(zod_1.z.string()),
    doNotMentionPublicly: zod_1.z.array(zod_1.z.string()),
});
