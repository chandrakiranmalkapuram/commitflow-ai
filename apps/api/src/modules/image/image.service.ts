import { AiUnderstandingResult } from '../ai/ai.types.js';
import { Platform } from '../content/content.types.js';
import { ImagePromptGenerator, ImagePromptResult } from './image.types.js';
import { StandardImagePromptGenerator } from './generators/standard.generator.js';
import { ImageProviderFactory } from './providers/image-provider.factory.js';
import { GeneratedImageResult } from './providers/image-provider.types.js';

export class ImageService {
  private generator: ImagePromptGenerator;

  constructor() {
    // In a more complex setup, this could use a Map based on prompt styles
    this.generator = new StandardImagePromptGenerator();
  }

  async generatePrompt(
    understanding: AiUnderstandingResult,
    platform: Platform,
  ): Promise<ImagePromptResult> {
    console.log(`[Image Service] Generating image prompt for ${platform}`);
    return this.generator.generatePrompt(understanding, platform);
  }

  async generateImage(prompt: ImagePromptResult): Promise<GeneratedImageResult> {
    console.log(`[Image Service] Requesting image generation`);
    const provider = ImageProviderFactory.getProvider();
    return provider.generateImage(prompt);
  }
}

export const imageService = new ImageService();
