"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinGenerator = void 0;
const zod_1 = require("zod");
const ai_factory_js_1 = require("../../ai/ai.factory.js");
const content_types_js_1 = require("../content.types.js");
class LinkedinGenerator {
    async generate(understanding, tone) {
        const provider = ai_factory_js_1.AiFactory.getProvider();
        const systemPrompt = `You are an expert social media manager writing a LinkedIn post for a software engineer. The tone should be ${tone}. Ensure the post is engaging, uses appropriate hashtags, and does not mention any sensitive information marked as 'doNotMentionPublicly'. Keep it under 3000 characters.`;
        const userPrompt = `
Generate a LinkedIn post based on the following AI Understanding of a git commit:

Feature: ${understanding.featureName}
Category: ${understanding.category}
Technical Summary: ${understanding.technicalSummary}
Business Value: ${understanding.businessSummary}
Technologies: ${understanding.technologiesUsed.join(', ')}
Achievements: ${understanding.developerAchievements.join(', ')}
Highlights: ${understanding.suggestedHighlights.join(', ')}
DO NOT MENTION: ${understanding.doNotMentionPublicly.join(', ')}

Output ONLY the text of the LinkedIn post. Do not wrap in markdown quotes.
`;
        const rawContent = await provider.generateContent(systemPrompt, userPrompt);
        // Validate the generated text
        const textSchema = zod_1.z.string().min(10).max(3000);
        const validatedText = textSchema.parse(rawContent.trim());
        return {
            text: validatedText,
            metadata: {
                platform: content_types_js_1.Platform.LinkedIn,
                tone,
                version: 1,
                creationTime: new Date().toISOString(),
                status: 'DRAFT',
            },
        };
    }
}
exports.LinkedinGenerator = LinkedinGenerator;
