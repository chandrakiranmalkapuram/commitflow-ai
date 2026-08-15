import { prismaService } from '../db/prisma.service.js';
import { ConnectPlatformDto } from './publishing.types.js';

export class PublishingRepository {
  async upsertConnectedPlatform(data: ConnectPlatformDto) {
    return prismaService.client.connectedPlatform.upsert({
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

  async getConnectedPlatform(userId: string, provider: string) {
    return prismaService.client.connectedPlatform.findUnique({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
    });
  }

  async createPublication(contentId: string, provider: string) {
    return prismaService.client.publication.create({
      data: {
        contentId,
        provider,
        status: 'PENDING',
      },
    });
  }

  async updatePublicationStatus(
    publicationId: string,
    status: 'PUBLISHED' | 'FAILED',
    externalPostId?: string,
    errorMessage?: string,
  ) {
    return prismaService.client.publication.update({
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

export const publishingRepository = new PublishingRepository();
