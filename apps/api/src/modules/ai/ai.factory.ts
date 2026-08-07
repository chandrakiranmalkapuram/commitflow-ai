import { AiProvider } from './ai.types.js';
import { GrokProvider } from './providers/grok.provider.js';

export class AiFactory {
  static getProvider(): AiProvider {
    const providerName = process.env.LLM_PROVIDER || 'grok';

    switch (providerName.toLowerCase()) {
      case 'grok':
        return new GrokProvider();
      // Future providers like 'openai', 'claude', 'gemini' can be added here
      default:
        throw new Error(`Unsupported LLM_PROVIDER: ${providerName}`);
    }
  }
}
