"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGithubPushEvent = mapGithubPushEvent;
function mapGithubPushEvent(payload) {
    return {
        repository: payload.repository.full_name,
        branch: payload.ref.replace('refs/heads/', ''),
        commit: payload.after,
        author: payload.head_commit?.author.name ??
            payload.sender.login,
        message: payload.head_commit?.message ??
            '',
        changedFiles: {
            added: payload.commits.flatMap((commit) => commit.added),
            modified: payload.commits.flatMap((commit) => commit.modified),
            removed: payload.commits.flatMap((commit) => commit.removed),
        },
    };
}
