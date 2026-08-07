"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubService = exports.GithubService = void 0;
const rest_1 = require("@octokit/rest");
class GithubService {
    octokit;
    constructor() {
        // Note: In the future, this can be refactored to support GitHub Apps
        // by dynamically instantiating Octokit with an installation token.
        this.octokit = new rest_1.Octokit({
            auth: process.env.GITHUB_TOKEN,
        });
    }
    async fetchCommitDiff(owner, repo, commitSha) {
        try {
            const { data } = await this.octokit.rest.repos.getCommit({
                owner,
                repo,
                ref: commitSha,
            });
            const files = (data.files || []).map((file) => ({
                filename: file.filename,
                status: file.status,
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
        }
        catch (error) {
            console.error(`Error fetching commit ${commitSha} from ${owner}/${repo}:`, error instanceof Error ? error.message : error);
            throw new Error(`Failed to fetch commit diff for ${commitSha}`);
        }
    }
}
exports.GithubService = GithubService;
exports.githubService = new GithubService();
