import { AnalysisResult } from '../analyzer/analyzer.types.js';
import { AiUnderstandingResult } from './ai.types.js';
import { AiFactory } from './ai.factory.js';

export class AiUnderstandingService {
  private MAX_RETRIES = 2;

  async generateUnderstanding(analysis: AnalysisResult): Promise<AiUnderstandingResult> {
    const provider = AiFactory.getProvider();
    let attempt = 0;

    while (attempt <= this.MAX_RETRIES) {
      try {
        console.log(`[AI Service] Generating understanding (Attempt ${attempt + 1})`);
        const result = await provider.generateUnderstanding(analysis);
        return result;
      } catch (error: any) {
        attempt++;
        console.warn(`[AI Service] Attempt ${attempt} failed:`, error.message);

        if (attempt > this.MAX_RETRIES) {
          console.error('[AI Service] Max retries reached. Returning controlled failure.');
          throw new Error('AI Understanding generation failed after maximum retries');
        }
      }
    }

    throw new Error('Unexpected error in AI Understanding generation');
  }
}

export const aiUnderstandingService = new AiUnderstandingService();
