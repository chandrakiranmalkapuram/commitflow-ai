import { Worker, Job } from 'bullmq';
import { QUEUE_NAME, redisConnection, queueService } from './queue.service.js';
import { githubService } from '../github/github.service.js';
import { mapGithubPushEvent } from '../github/github.mapper.js';
import { GithubPushPayload } from '../github/github.types.js';
import { analyzerService } from '../analyzer/analyzer.service.js';
import { aiUnderstandingService } from '../ai/ai.service.js';
import { contentService } from '../content/content.service.js';
import { Platform, ToneProfile } from '../content/content.types.js';
import { imageService } from '../image/image.service.js';
import { generationRepository } from '../db/generation.repository.js';
import { repositoryService } from '../repository/repository.service.js';
import { prismaService } from '../db/prisma.service.js';
import { publishingRepository } from '../publishing/publishing.repository.js';
import { LinkedinProvider } from '../publishing/providers/linkedin.provider.js';
import { decrypt } from '../../utils/encryption.util.js';

export class QueueWorker {
  public worker: Worker;

  constructor() {
    this.worker = new Worker(
      QUEUE_NAME,
      async (job: Job) => {
        console.log(`[Worker] Processing job ${job.id} of type ${job.name}`);

        switch (job.name) {
          case 'process-github-push': {
            await this.handleGithubPush(job.data.payload);
            break;
          }
          case 'process-publish': {
            await this.handlePublish(job.data.publicationId, job.data.userId);
            break;
          }
          default:
            console.warn(`[Worker] Unknown job name: ${job.name}`);
        }
      },
      {
        connection: redisConnection,
      },
    );

    this.worker.on('completed', (job) => {
      console.log(`[Worker] Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`[Worker] Job ${job?.id} failed with error: ${err.message}`);
    });
  }

  private async handleGithubPush(payload: unknown) {
    const event = mapGithubPushEvent(payload as GithubPushPayload);
    const [owner, repo] = event.repository.split('/');

    if (!event.commit) {
      throw new Error('No commit reference found in payload');
    }

    // Map webhook payload directly to registered Repository
    const registeredRepo = await repositoryService.findByOwnerAndName(owner, repo);
    
    if (!registeredRepo) {
      console.log(`[Worker] Skipped event for ${owner}/${repo} - repository not registered.`);
      return;
    }

    if (!registeredRepo.active) {
      console.log(`[Worker] Skipped event for ${owner}/${repo} - repository registered but inactive.`);
      return;
    }

    // Initialize Generation persistence via Organization ID
    const generation = await generationRepository.createGeneration(event.commit, owner, repo, registeredRepo.organizationId);
    console.log(`[Worker] Created Generation Record: ${generation.id}`);

    try {
      const commitDiff = await githubService.fetchCommitDiff(owner, repo, event.commit);

      // Analyze the diff deterministically
      const analysis = analyzerService.analyzeCommitDiff(commitDiff);
      await generationRepository.saveGitAnalysis(generation.id, analysis);
      console.log('[Worker] Deterministic Analysis Saved');

      // Generate the LLM understanding
      const aiUnderstanding = await aiUnderstandingService.generateUnderstanding(analysis);
      await generationRepository.saveAiUnderstanding(generation.id, aiUnderstanding);
      console.log('[Worker] AI Understanding Saved');

      // Generate Content for LinkedIn
      const linkedinContent = await contentService.generateContent(
        aiUnderstanding,
        Platform.LinkedIn,
        ToneProfile.Professional
      );
      await generationRepository.saveGeneratedContent(generation.id, linkedinContent);
      console.log('[Worker] LinkedIn Content Saved');

      // Generate Image Prompt
      const imagePrompt = await imageService.generatePrompt(aiUnderstanding, Platform.LinkedIn);
      await generationRepository.saveImagePrompt(generation.id, imagePrompt);
      console.log('[Worker] Image Prompt Saved');

      // Generate Image
      const generatedImage = await imageService.generateImage(imagePrompt);
      await generationRepository.saveGeneratedImage(generation.id, generatedImage);
      console.log('[Worker] Image Generation Saved');

      // Mark generation as completed
      await generationRepository.updateGenerationStatus(generation.id, 'COMPLETED');
      console.log(`[Worker] Generation ${generation.id} completed successfully`);

      // Enqueue Publisher Job
      const organization = await prismaService.client.organization.findUnique({
        where: { id: registeredRepo.organizationId },
        select: { ownerId: true }
      });

      if (organization) {
        const publication = await publishingRepository.createPublication(linkedinContent.id, 'LINKEDIN');
        await queueService.enqueuePublishJob({
          publicationId: publication.id,
          userId: organization.ownerId
        });
        console.log(`[Worker] Enqueued publish job for publication ${publication.id}`);
      } else {
        console.warn(`[Worker] Could not find organization owner to enqueue publish job`);
      }

    } catch (error) {
      await generationRepository.updateGenerationStatus(generation.id, 'FAILED');
      console.error(`[Worker] Generation ${generation.id} failed`, error);
      throw error; // Rethrow so BullMQ marks the job as failed
    }
  }

  private async handlePublish(publicationId: string, userId: string) {
    console.log(`[Worker] Handling publish for publication ${publicationId}`);
    
    try {
      const publication = await prismaService.client.publication.findUnique({
        where: { id: publicationId },
        include: { content: true }
      });

      if (!publication) throw new Error('Publication not found');
      
      const platform = await publishingRepository.getConnectedPlatform(userId, publication.provider);
      if (!platform) throw new Error('Connected platform not found for user');

      const accessToken = decrypt(platform.accessToken);
      
      let result;
      if (publication.provider === 'LINKEDIN') {
        const provider = new LinkedinProvider();
        result = await provider.publish(publication.content.text, accessToken);
      } else {
        throw new Error(`Unsupported provider: ${publication.provider}`);
      }

      if (result.success) {
        await publishingRepository.updatePublicationStatus(
          publicationId, 
          'PUBLISHED', 
          result.externalPostId
        );
        console.log(`[Worker] Successfully published ${publicationId}`);
      } else {
        await publishingRepository.updatePublicationStatus(
          publicationId, 
          'FAILED', 
          undefined,
          result.errorMessage
        );
        console.error(`[Worker] Failed to publish ${publicationId}: ${result.errorMessage}`);
      }
    } catch (error: any) {
      console.error(`[Worker] Publish error for ${publicationId}`, error);
      await publishingRepository.updatePublicationStatus(publicationId, 'FAILED', undefined, error.message);
      throw error;
    }
  }

  async close() {
    await this.worker.close();
  }
}

// Initialize and export the worker singleton
export const queueWorker = new QueueWorker();
