"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationsApi = void 0;
const api_1 = require("../services/api");
exports.generationsApi = {
    get: async (id, organizationId) => {
        const response = await api_1.api.get(`/api/generations/${id}?organizationId=${organizationId}`);
        return response.data;
    },
    approveContent: async (contentId) => {
        await api_1.api.post(`/api/content/${contentId}/approve`);
    },
    rejectContent: async (contentId) => {
        await api_1.api.post(`/api/content/${contentId}/reject`);
    }
};
