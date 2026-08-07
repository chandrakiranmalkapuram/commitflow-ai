"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubApi = void 0;
const api_1 = require("../services/api");
exports.githubApi = {
    getAccount: async () => {
        const response = await api_1.api.get('/api/github/me');
        return response.data;
    },
    handleCallback: async (code) => {
        const response = await api_1.api.get(`/api/github/callback?code=${code}`);
        return response.data;
    }
};
