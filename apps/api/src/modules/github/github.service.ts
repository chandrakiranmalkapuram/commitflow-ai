import { Octokit } from '@octokit/rest';
import { CommitDiffResult, CommitFileDiff } from './github.types.js';

export class GithubService {
  private octokit: Octokit;

  constructor() {
    // Note: In the future, this can be refactored to support GitHub Apps
    // by dynamically instantiating Octokit with an installation token.
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async fetchCommitDiff(
    owner: string,
    repo: string,
    commitSha: string,
  ): Promise<CommitDiffResult> {
    try {
      const { data } = await this.octokit.rest.repos.getCommit({
        owner,
        repo,
        ref: commitSha,
      });

      const files: CommitFileDiff[] = (data.files || []).map((file) => ({
        filename: file.filename,
        status: file.status as CommitFileDiff['status'],
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch,
      }));

      return {
        sha: data.sha,
        message: data.commit.message,
        author: data.commit.author?.name || 'Unknown',
        files,
      };
    } catch (error) {
      console.error(
        `Error fetching commit ${commitSha} from ${owner}/${repo}:`,
        error instanceof Error ? error.message : error,
      );
      throw new Error(`Failed to fetch commit diff for ${commitSha}`);
    }
  }
}

export const githubService = new GithubService();
