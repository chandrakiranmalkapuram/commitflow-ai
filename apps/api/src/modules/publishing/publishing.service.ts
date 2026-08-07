import { publishingRepository } from './publishing.repository.js';
import { PublisherProvider } from './publishing.provider.interface.js';
import { LinkedinProvider } from './providers/linkedin.provider.js';

export class PublishingService {
  private providers: Map<string, PublisherProvider>;

  constructor() {
    this.providers = new Map();
    const linkedin = new LinkedinProvider();
    this.providers.set(linkedin.providerName, linkedin);
    // Register future providers (Twitter, DevTo) here
  }

  /**
   * Prepares content for publishing by creating a Publication record.
   * Does NOT automatically publish.
   */
  async preparePublish(contentId: string, provider: string) {
    console.log(`[Publishing Service] Preparing publish for content ${contentId} to ${provider}`);
    
    if (!this.providers.has(provider)) {
      throw new Error(`Provider ${provider} is not supported`);
    }

    // Create a pending publication record
    const publication = await publishingRepository.createPublication(contentId, provider);
    
    return publication;
  }
}

export const publishingService = new PublishingService();
