import { z } from 'zod';
import { AiUnderstandingResult } from '../../ai/ai.types.js';
import { AiFactory } from '../../ai/ai.factory.js';
import {
  ContentGenerator,
  ToneProfile,
  Platform,
  GeneratedContent,
} from '../content.types.js';

export class LinkedinGenerator implements ContentGenerator {
  async generate(
    understanding: AiUnderstandingResult,
    tone: ToneProfile,
  ): Promise<GeneratedContent> {
    const provider = AiFactory.getProvider();

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
    const textSchema = z.string().min(10).max(3000);
    const validatedText = textSchema.parse(rawContent.trim());

    return {
      text: validatedText,
      metadata: {
        platform: Platform.LinkedIn,
        tone,
        version: 1,
        creationTime: new Date().toISOString(),
        status: 'DRAFT',
      },
    };
  }
}
