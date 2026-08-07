import { api } from '../services/api';
import type { GenerationDetail } from './generations.types';

export const generationsApi = {
  get: async (id: string, organizationId: string): Promise<GenerationDetail> => {
    const response = await api.get<GenerationDetail>(`/api/generations/${id}?organizationId=${organizationId}`);
    return response.data;
  },

  approveContent: async (contentId: string): Promise<void> => {
    await api.post(`/api/content/${contentId}/approve`);
  },

  rejectContent: async (id: string) => {
    const response = await api.post(`/content/${id}/reject`);
    return response.data;
  },

  publishContent: async (id: string) => {
    const response = await api.post(`/publishing/${id}/publish`);
    return response.data;
  }
};
