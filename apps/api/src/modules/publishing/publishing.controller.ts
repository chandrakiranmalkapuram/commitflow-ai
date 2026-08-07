import { Request, Response } from 'express';
import { publishingRepository } from './publishing.repository.js';
import { queueService } from '../queue/queue.service.js';
import { prismaService } from '../db/prisma.service.js';

export class PublishingController {
  async publishContent(req: Request, res: Response) {
    try {
      const { contentId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the publication record (it should have been created during approval)
      // Since a GeneratedContent can have multiple publications (if multiple platforms),
      // for now we'll just get the latest pending publication for this content.
      const publication = await prismaService.client.publication.findFirst({
        where: {
          contentId,
          status: 'PENDING',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!publication) {
        return res.status(404).json({ error: 'No PENDING publication found for this content.' });
      }

      // Check if user has connected platform
      const connectedPlatform = await publishingRepository.getConnectedPlatform(userId, publication.provider);
      if (!connectedPlatform) {
        return res.status(400).json({ error: `You must connect your ${publication.provider} account first.` });
      }

      // Enqueue job
      await queueService.enqueuePublishJob({
        publicationId: publication.id,
        userId: userId,
      });

      res.status(202).json({ message: 'Publishing job enqueued successfully.', publicationId: publication.id });
    } catch (error: any) {
      console.error('[Publishing Controller]', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export const publishingController = new PublishingController();
