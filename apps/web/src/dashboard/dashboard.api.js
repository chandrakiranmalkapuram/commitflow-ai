"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardApi = void 0;
const api_1 = require("../services/api");
exports.dashboardApi = {
    getStats: async (organizationId) => {
        const response = await api_1.api.get(`/api/dashboard?organizationId=${organizationId}`);
        return response.data;
    },
    getRecentGenerations: async (organizationId) => {
        const response = await api_1.api.get(`/api/generations?organizationId=${organizationId}`);
        return response.data;
    },
};
