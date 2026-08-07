"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = __importDefault(require("axios"));
// Default to localhost:3000 if not provided
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
exports.api = axios_1.default.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to attach JWT token
exports.api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor to handle global errors like 401 Unauthorized
exports.api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
