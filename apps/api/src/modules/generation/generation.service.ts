import { prismaService } from '../db/prisma.service.js';
import { Generation, GeneratedContent } from '@prisma/client';

export class GenerationService {
  private get prisma() {
    return prismaService.client;
  }

  async listGenerations(organizationId: string): Promise<Generation[]> {
    return this.prisma.generation.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGeneration(id: string, organizationId: string) {
    return this.prisma.generation.findFirst({
      where: { id, organizationId },
      include: {
        gitAnalysis: true,
        aiUnderstanding: true,
        imagePrompt: true,
        generatedImage: true,
        generatedContent: true,
      }
    });
  }

  async getGenerationContent(generationId: string, organizationId: string): Promise<GeneratedContent[]> {
    return this.prisma.generatedContent.findMany({
      where: {
        generationId,
        generation: {
          organizationId,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const generationService = new GenerationService();
