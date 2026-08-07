"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishingRepository = exports.PublishingRepository = void 0;
const prisma_service_js_1 = require("../../db/prisma.service.js");
class PublishingRepository {
    async upsertConnectedPlatform(data) {
        return prisma_service_js_1.prismaService.client.connectedPlatform.upsert({
            where: {
                userId_provider: {
                    userId: data.userId,
                    provider: data.provider,
                },
            },
            update: {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiry: data.expiry,
            },
            create: {
                userId: data.userId,
                provider: data.provider,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiry: data.expiry,
            },
        });
    }
    async getConnectedPlatform(userId, provider) {
        return prisma_service_js_1.prismaService.client.connectedPlatform.findUnique({
            where: {
                userId_provider: {
                    userId,
                    provider,
                },
            },
        });
    }
    async createPublication(contentId, provider) {
        return prisma_service_js_1.prismaService.client.publication.create({
            data: {
                contentId,
                provider,
                status: 'PENDING',
            },
        });
    }
    async updatePublicationStatus(publicationId, status, externalPostId, errorMessage) {
        return prisma_service_js_1.prismaService.client.publication.update({
            where: { id: publicationId },
            data: {
                status,
                externalPostId,
                errorMessage,
                publishedAt: status === 'PUBLISHED' ? new Date() : null,
            },
        });
    }
}
exports.PublishingRepository = PublishingRepository;
exports.publishingRepository = new PublishingRepository();
