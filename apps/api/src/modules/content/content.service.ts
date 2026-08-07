import { AiUnderstandingResult } from '../ai/ai.types.js';
import { Platform, ToneProfile, ContentGenerator, GeneratedContent } from './content.types.js';
import { prismaService } from '../db/prisma.service.js';
import { LinkedinGenerator } from './generators/linkedin.generator.js';
import { publishingService } from '../publishing/publishing.service.js';

export class ContentService {
  private generators: Map<Platform, ContentGenerator>;

  constructor() {
    this.generators = new Map();
    this.generators.set(Platform.LinkedIn, new LinkedinGenerator());
    // Register future generators here (Twitter, DevTo, Hashnode, etc.)
  }

  async generateContent(
    understanding: AiUnderstandingResult,
    platform: Platform,
    tone: ToneProfile = ToneProfile.Professional,
  ): Promise<GeneratedContent> {
    const generator = this.generators.get(platform);
    
    if (!generator) {
      throw new Error(`No generator registered for platform: ${platform}`);
    }

    console.log(`[Content Service] Generating content for ${platform} with tone ${tone}`);
    return generator.generate(understanding, tone);
  }

  async approveContent(contentId: string, organizationId: string) {
    const content = await prismaService.client.generatedContent.findUnique({
      where: { id: contentId },
      include: { generation: true },
    });

    if (!content || content.generation.organizationId !== organizationId) {
      throw new Error('Content not found or access denied');
    }

    const updatedContent = await prismaService.client.generatedContent.update({
      where: { id: contentId },
      data: { status: 'APPROVED' },
    });

    // Prepare for publishing (DO NOT auto-publish yet)
    await publishingService.preparePublish(contentId, content.platform);

    return updatedContent;
  }

  async rejectContent(contentId: string, organizationId: string) {
    const content = await prismaService.client.generatedContent.findUnique({
      where: { id: contentId },
      include: { generation: true },
    });

    if (!content || content.generation.organizationId !== organizationId) {
      throw new Error('Content not found or access denied');
    }

    return prismaService.client.generatedContent.update({
      where: { id: contentId },
      data: { status: 'REJECTED' },
    });
  }
}

export const contentService = new ContentService();
