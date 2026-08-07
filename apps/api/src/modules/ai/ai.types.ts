import { z } from 'zod';
import { AnalysisResult } from '../analyzer/analyzer.types.js';

export const AiUnderstandingSchema = z.object({
  featureName: z.string(),
  category: z.string(),
  technicalSummary: z.string(),
  businessSummary: z.string(),
  technologiesUsed: z.array(z.string()),
  developerAchievements: z.array(z.string()),
  complexity: z.enum(['Low', 'Medium', 'High']),
  confidenceScore: z.number().min(0).max(100),
  suggestedHighlights: z.array(z.string()),
  doNotMentionPublicly: z.array(z.string()),
});

export type AiUnderstandingResult = z.infer<typeof AiUnderstandingSchema>;

export interface AiProvider {
  generateUnderstanding(analysis: AnalysisResult): Promise<AiUnderstandingResult>;
  generateContent(systemPrompt: string, userPrompt: string): Promise<string>;
}
