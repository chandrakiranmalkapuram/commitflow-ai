import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { QueueJobNames, ProcessGithubPushJob, ProcessPublishJob } from './queue.types.js';

export const QUEUE_NAME = 'commitflow-queue';

export const redisConnection = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379',
  {
    maxRetriesPerRequest: null,
  },
);

export class QueueService {
  public queue: Queue;

  constructor() {
    this.queue = new Queue(QUEUE_NAME, {
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    });
  }

  async enqueueGithubPush(jobData: ProcessGithubPushJob) {
    return this.queue.add('process-github-push', jobData);
  }

  async enqueuePublishJob(jobData: ProcessPublishJob) {
    return this.queue.add('process-publish', jobData);
  }

  async close() {
    await this.queue.close();
  }
}

export const queueService = new QueueService();
