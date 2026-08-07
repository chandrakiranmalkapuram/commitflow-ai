import { PublishResult } from './publishing.types.js';

export interface PublisherProvider {
  /**
   * Identifies the platform this provider handles (e.g., 'LINKEDIN', 'TWITTER')
   */
  readonly providerName: string;

  /**
   * Publishes the content to the platform
   * @param text The text to publish
   * @param accessToken The decrypted platform access token
   * @returns The publish result containing external post ID or error
   */
  publish(text: string, accessToken: string): Promise<PublishResult>;
}
