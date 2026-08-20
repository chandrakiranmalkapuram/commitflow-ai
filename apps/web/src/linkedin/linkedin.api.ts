import { api } from '../services/api';
import type { LinkedinStatus } from './linkedin.types';

export const linkedinApi = {
  getStatus: async (): Promise<LinkedinStatus> => {
    const response = await api.get('/linkedin/status');
    return response.data;
  },
  
  connectUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/linkedin/connect`,
};
