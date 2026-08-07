import { ImageProvider } from './image-provider.types.js';
import { MockImageProvider } from './mock.provider.js';

export class ImageProviderFactory {
  static getProvider(): ImageProvider {
    const providerName = process.env.IMAGE_PROVIDER || 'mock';

    switch (providerName.toLowerCase()) {
      case 'mock':
        return new MockImageProvider();
      // future implementations: openai, flux, ideogram, stability
      default:
        console.warn(`[ImageProviderFactory] Unknown provider ${providerName}, falling back to mock.`);
        return new MockImageProvider();
    }
  }
}
