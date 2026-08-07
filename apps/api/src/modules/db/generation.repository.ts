import { prismaService } from './prisma.service.js';
import { AnalysisResult } from '../analyzer/analyzer.types.js';
import { AiUnderstandingResult } from '../ai/ai.types.js';
import { GeneratedContent } from '../content/content.types.js';
import { ImagePromptResult } from '../image/image.types.js';

export class GenerationRepository {
  private get prisma() {
    return prismaService.client;
  }

  async createGeneration(commitSha: string, owner: string, repo: string, organizationId: string) {
    return this.prisma.generation.create({
      data: {
        commitSha,
        owner,
        repo,
        organizationId,
        status: 'PROCESSING',
      },
    });
  }

  async updateGenerationStatus(id: string, status: 'PROCESSING' | 'COMPLETED' | 'FAILED') {
    return this.prisma.generation.update({
      where: { id },
      data: { status },
    });
  }

  async saveGitAnalysis(generationId: string, analysis: AnalysisResult) {
    return this.prisma.gitAnalysis.create({
      data: {
        generationId,
        metrics: analysis.metrics as any,
        categories: analysis.categories as any,
        languages: analysis.languages,
        fileStatuses: analysis.fileStatuses as any,
      },
    });
  }

  async saveAiUnderstanding(generationId: string, understanding: AiUnderstandingResult) {
    return this.prisma.aiUnderstanding.create({
      data: {
        generationId,
        featureName: understanding.featureName,
        category: understanding.category,
        technicalSummary: understanding.technicalSummary,
        businessSummary: understanding.businessSummary,
        technologiesUsed: understanding.technologiesUsed,
        developerAchievements: understanding.developerAchievements,
        complexity: understanding.complexity,
        confidenceScore: understanding.confidenceScore,
        suggestedHighlights: understanding.suggestedHighlights,
        doNotMentionPublicly: understanding.doNotMentionPublicly,
      },
    });
  }

  async saveGeneratedContent(generationId: string, content: GeneratedContent) {
    return this.prisma.generatedContent.create({
      data: {
        generationId,
        platform: content.metadata.platform,
        tone: content.metadata.tone,
        version: content.metadata.version,
        text: content.text,
        status: content.metadata.status,
      },
    });
  }

  async saveImagePrompt(generationId: string, prompt: ImagePromptResult) {
    return this.prisma.imagePrompt.create({
      data: {
        generationId,
        visualStyle: prompt.visualStyle,
        theme: prompt.theme,
        composition: prompt.composition,
        colorPalette: prompt.colorPalette,
        imagePrompt: prompt.imagePrompt,
        negativePrompt: prompt.negativePrompt,
        aspectRatio: prompt.aspectRatio,
        intendedUsagePlatform: prompt.intendedUsagePlatform,
      },
    });
  }

  async saveGeneratedImage(generationId: string, result: import('../image/providers/image-provider.types.js').GeneratedImageResult) {
    return this.prisma.generatedImage.create({
      data: {
        generationId,
        provider: result.provider,
        model: result.model,
        imageUrl: result.imageUrl,
        status: result.status,
      },
    });
  }
}

export const generationRepository = new GenerationRepository();
