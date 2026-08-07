export type QueueJobNames = 'process-github-push' | 'process-publish';

export interface ProcessGithubPushJob {
  payload: unknown;
}

export interface ProcessPublishJob {
  publicationId: string;
  userId: string;
}
