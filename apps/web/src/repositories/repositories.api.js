"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoriesApi = void 0;
const api_1 = require("../services/api");
exports.repositoriesApi = {
    list: async (organizationId) => {
        const response = await api_1.api.get(`/api/repositories?organizationId=${organizationId}`);
        return response.data;
    },
    toggleActive: async (id, active) => {
        const response = await api_1.api.patch(`/api/repositories/${id}/active`, { active });
        return response.data;
    }
};
