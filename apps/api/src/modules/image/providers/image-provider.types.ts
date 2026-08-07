import { ImagePromptResult } from '../image.types.js';

export interface GeneratedImageResult {
  provider: string;
  model: string;
  imageUrl: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface ImageProvider {
  generateImage(prompt: ImagePromptResult): Promise<GeneratedImageResult>;
}
