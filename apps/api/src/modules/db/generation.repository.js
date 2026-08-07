"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationRepository = exports.GenerationRepository = void 0;
const prisma_service_js_1 = require("./prisma.service.js");
class GenerationRepository {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async createGeneration(commitSha, owner, repo, organizationId) {
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
    async updateGenerationStatus(id, status) {
        return this.prisma.generation.update({
            where: { id },
            data: { status },
        });
    }
    async saveGitAnalysis(generationId, analysis) {
        return this.prisma.gitAnalysis.create({
            data: {
                generationId,
                metrics: analysis.metrics,
                categories: analysis.categories,
                languages: analysis.languages,
                fileStatuses: analysis.fileStatuses,
            },
        });
    }
    async saveAiUnderstanding(generationId, understanding) {
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
    async saveGeneratedContent(generationId, content) {
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
    async saveImagePrompt(generationId, prompt) {
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
    async saveGeneratedImage(generationId, result) {
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
exports.GenerationRepository = GenerationRepository;
exports.generationRepository = new GenerationRepository();
