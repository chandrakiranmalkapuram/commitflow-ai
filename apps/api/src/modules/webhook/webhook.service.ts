import { validateGithubPushPayload } from '../github/github.validator.js';
import { queueService } from '../queue/queue.service.js';

export async function processGithubWebhook(payload: unknown) {
  if (!validateGithubPushPayload(payload)) {
    throw new Error('Invalid GitHub payload');
  }

  // Enqueue the heavy lifting to the background worker
  await queueService.enqueueGithubPush({ payload });

  console.log('Successfully enqueued GitHub push payload for background processing.');

  return { success: true, message: 'Webhook queued' };
}