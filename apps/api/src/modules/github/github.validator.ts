import { GithubPushPayload } from './github.types.js';

export function validateGithubPushPayload(
  payload: unknown,
): payload is GithubPushPayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const data = payload as Partial<GithubPushPayload>;

  return (
    typeof data.ref === 'string' &&
    typeof data.repository?.name === 'string' &&
    Array.isArray(data.commits)
  );
}