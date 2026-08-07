import { z } from 'zod';
import { AiUnderstandingResult } from '../../ai/ai.types.js';
import { AiFactory } from '../../ai/ai.factory.js';
import { Platform } from '../../content/content.types.js';
import { ImagePromptGenerator, ImagePromptResult, ImagePromptSchema } from '../image.types.js';

export class StandardImagePromptGenerator implements ImagePromptGenerator {
  async generatePrompt(
    understanding: AiUnderstandingResult,
    platform: Platform,
  ): Promise<ImagePromptResult> {
    const provider = AiFactory.getProvider();

    const systemPrompt = `You are an expert AI image prompt engineer. Your job is to take the provided software engineering context and output STRICTLY VALID JSON matching the requested schema. Generate a highly descriptive and artistic prompt designed for a high-end diffusion model. Do not output markdown code blocks, just raw JSON.`;

    const userPrompt = `
Context for Image Generation:
Feature: ${understanding.featureName}
Category: ${understanding.category}
Technologies: ${understanding.technologiesUsed.join(', ')}
Target Platform: ${platform}

# Required JSON Output Schema
{
  "visualStyle": "string (e.g. Cyberpunk, Minimalist, Corporate, Abstract)",
  "theme": "string (e.g. Code Refactoring, Launch, Data Migration)",
  "composition": "string (e.g. Center-focused, Rule of Thirds)",
  "colorPalette": "string (e.g. Dark mode with neon accents)",
  "imagePrompt": "string (The highly detailed prompt to pass to the image generator)",
  "negativePrompt": "string (Things to avoid generating)",
  "aspectRatio": "string (e.g. 16:9, 1:1, suitable for the platform)",
  "intendedUsagePlatform": "${platform}"
}

Output ONLY valid JSON matching the schema above.
`;

    const rawContent = await provider.generateContent(systemPrompt, userPrompt);

    // Strip markdown blocks if present (since generateContent does not enforce response_format json_object on Grok currently)
    let cleanedContent = rawContent.trim();
    if (cleanedContent.startsWith('\`\`\`json')) {
      cleanedContent = cleanedContent.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
    } else if (cleanedContent.startsWith('\`\`\`')) {
      cleanedContent = cleanedContent.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
    }

    const parsedJson = JSON.parse(cleanedContent);

    return ImagePromptSchema.parse(parsedJson);
  }
}
