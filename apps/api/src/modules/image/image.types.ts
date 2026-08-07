import { z } from 'zod';
import { AiUnderstandingResult } from '../ai/ai.types.js';
import { Platform } from '../content/content.types.js';

export const ImagePromptSchema = z.object({
  visualStyle: z.string(),
  theme: z.string(),
  composition: z.string(),
  colorPalette: z.string(),
  imagePrompt: z.string(),
  negativePrompt: z.string(),
  aspectRatio: z.string(),
  intendedUsagePlatform: z.nativeEnum(Platform),
});

export type ImagePromptResult = z.infer<typeof ImagePromptSchema>;

export interface ImagePromptGenerator {
  generatePrompt(
    understanding: AiUnderstandingResult,
    platform: Platform,
  ): Promise<ImagePromptResult>;
}
