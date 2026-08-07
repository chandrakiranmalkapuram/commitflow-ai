"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationService = exports.GenerationService = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class GenerationService {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async listGenerations(organizationId) {
        return this.prisma.generation.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getGeneration(id, organizationId) {
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
    async getGenerationContent(generationId, organizationId) {
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
exports.GenerationService = GenerationService;
exports.generationService = new GenerationService();
