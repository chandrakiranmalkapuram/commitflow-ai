export interface GithubPushPayload {
  ref: string;
  before: string;
  after: string;

  repository: {
    id: number;
    name: string;
    full_name: string;
    owner: {
      name: string;
    };
  };

  sender: {
    login: string;
  };

  head_commit?: {
    id: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
  };

  commits: Array<{
    id: string;
    message: string;
    added: string[];
    modified: string[];
    removed: string[];
  }>;
}

export interface CommitFileDiff {
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
}

export interface CommitDiffResult {
  sha: string;
  message: string;
  author: string;
  files: CommitFileDiff[];
}