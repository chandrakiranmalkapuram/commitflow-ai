import { api } from '../services/api';
import type { Repository } from './repositories.types';

export const repositoriesApi = {
  list: async (organizationId: string): Promise<Repository[]> => {
    const response = await api.get<Repository[]>(`/api/repositories?organizationId=${organizationId}`);
    return response.data;
  },
  
  toggleActive: async (id: string, active: boolean): Promise<Repository> => {
    const response = await api.patch<Repository>(`/api/repositories/${id}/active`, { active });
    return response.data;
  }
};
