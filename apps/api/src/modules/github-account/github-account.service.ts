import { githubAccountRepository } from './github-account.repository.js';
import { ConnectGithubAccountRequest, GithubAccountDto } from './github-account.types.js';
import { encrypt } from '../../utils/encryption.util.js';

export class GithubAccountService {
  private get clientId() {
    return process.env.GITHUB_CLIENT_ID || '';
  }
  private get clientSecret() {
    return process.env.GITHUB_CLIENT_SECRET || '';
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(`GitHub OAuth Error: ${data.error_description}`);
    }
    return data.access_token;
  }

  async fetchGithubUser(accessToken: string) {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user from GitHub API');
    }
    return response.json();
  }

  async handleCallback(userId: string, code: string): Promise<GithubAccountDto> {
    const accessToken = await this.exchangeCodeForToken(code);
    const ghUser = await this.fetchGithubUser(accessToken);

    const encryptedToken = encrypt(accessToken);

    const account = await githubAccountRepository.upsert({
      userId,
      githubUserId: ghUser.id.toString(),
      username: ghUser.login,
      avatarUrl: ghUser.avatar_url,
      accessToken: encryptedToken,
    });

    return {
      id: account.id,
      userId: account.userId,
      githubUserId: account.githubUserId,
      username: account.username,
      avatarUrl: account.avatarUrl,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }

  async connectAccount(userId: string, data: ConnectGithubAccountRequest): Promise<GithubAccountDto> {
    const encryptedToken = encrypt(data.accessToken);

    const account = await githubAccountRepository.upsert({
      userId,
      githubUserId: data.githubUserId,
      username: data.username,
      avatarUrl: data.avatarUrl,
      accessToken: encryptedToken,
    });

    return {
      id: account.id,
      userId: account.userId,
      githubUserId: account.githubUserId,
      username: account.username,
      avatarUrl: account.avatarUrl,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }

  async getAccount(userId: string): Promise<GithubAccountDto | null> {
    const account = await githubAccountRepository.findByUserId(userId);
    if (!account) return null;

    return {
      id: account.id,
      userId: account.userId,
      githubUserId: account.githubUserId,
      username: account.username,
      avatarUrl: account.avatarUrl,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}

export const githubAccountService = new GithubAccountService();
