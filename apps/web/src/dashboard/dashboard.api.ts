import { api } from '../services/api';
import type { DashboardStats, Generation } from './dashboard.types';

export const dashboardApi = {
  getStats: async (organizationId: string): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>(`/api/dashboard?organizationId=${organizationId}`);
    return response.data;
  },

  getRecentGenerations: async (organizationId: string): Promise<Generation[]> => {
    const response = await api.get<Generation[]>(`/api/generations?organizationId=${organizationId}`);
    return response.data;
  },
};
