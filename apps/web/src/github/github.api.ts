import { api } from '../services/api';
import type { GithubAccount } from './github.types';

export const githubApi = {
  getAccount: async (): Promise<GithubAccount> => {
    const response = await api.get<GithubAccount>('/api/github/me');
    return response.data;
  },
  
  handleCallback: async (code: string): Promise<GithubAccount> => {
    const response = await api.get<GithubAccount>(`/api/github/callback?code=${code}`);
    return response.data;
  }
};
