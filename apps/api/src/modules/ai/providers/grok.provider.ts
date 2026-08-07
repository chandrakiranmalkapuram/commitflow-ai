import OpenAI from 'openai';
import { AiProvider, AiUnderstandingResult, AiUnderstandingSchema } from '../ai.types.js';
import { AnalysisResult } from '../../analyzer/analyzer.types.js';

export class GrokProvider implements AiProvider {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.GROK_API_KEY || '',
      baseURL: 'https://api.x.ai/v1',
    });
  }

  async generateUnderstanding(analysis: AnalysisResult): Promise<AiUnderstandingResult> {
    const prompt = this.buildPrompt(analysis);

    const response = await this.openai.chat.completions.create({
      model: 'grok-2-latest',
      messages: [
        {
          role: 'system',
          content: 'You are an expert developer relations engineer. Analyze the following commit and output STRICTLY VALID JSON matching the requested schema. Do not output markdown code blocks, just raw JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from Grok');
    }

    const parsedJson = JSON.parse(content);
    
    // Attempt to validate with Zod. If this fails, it will throw a ZodError
    return AiUnderstandingSchema.parse(parsedJson);
  }

  private buildPrompt(analysis: AnalysisResult): string {
    return `
Analyze the following git commit and generate a structured JSON response.

# Commit Analysis Data
${JSON.stringify(analysis, null, 2)}

# Required JSON Output Schema
{
  "featureName": "string (Short descriptive name of the change)",
  "category": "string (e.g. Bugfix, Refactoring, Feature, Chore, etc)",
  "technicalSummary": "string (A detailed technical explanation of what changed in the code)",
  "businessSummary": "string (A high-level explanation of why this change matters to users/business)",
  "technologiesUsed": ["string (e.g. React, Node.js, PostgreSQL)"],
  "developerAchievements": ["string (Brag-worthy technical implementations or clever solutions)"],
  "complexity": "Low | Medium | High",
  "confidenceScore": number (0-100, how confident are you in this analysis?),
  "suggestedHighlights": ["string (Key bullet points to highlight on social media later)"],
  "doNotMentionPublicly": ["string (Sensitive info like internal paths, credentials, or private logic that shouldn't be shared)"]
}

Output ONLY valid JSON matching the schema above.
`;
  }

  async generateContent(systemPrompt: string, userPrompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'grok-2-latest',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from Grok');
    }

    return content;
  }
}
