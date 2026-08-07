"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const webhook_route_js_1 = __importDefault(require("./modules/webhook/webhook.route.js"));
const auth_route_js_1 = require("./modules/auth/auth.route.js");
const github_account_route_js_1 = require("./modules/github-account/github-account.route.js");
const repository_route_js_1 = require("./modules/repository/repository.route.js");
const dashboard_route_js_1 = require("./modules/dashboard/dashboard.route.js");
const generation_route_js_1 = require("./modules/generation/generation.route.js");
const content_route_js_1 = require("./modules/content/content.route.js");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.raw({
        type: 'application/json',
    }));
    app.use((0, pino_http_1.default)());
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'ok',
            service: 'commitflow-api',
        });
    });
    app.use('/webhook', webhook_route_js_1.default);
    app.use('/api/auth', express_1.default.json(), auth_route_js_1.authRouter);
    app.use('/api/github', express_1.default.json(), github_account_route_js_1.githubAccountRouter);
    app.use('/api/repositories', express_1.default.json(), repository_route_js_1.repositoryRouter);
    app.use('/api/dashboard', express_1.default.json(), dashboard_route_js_1.dashboardRouter);
    app.use('/api/generations', express_1.default.json(), generation_route_js_1.generationRouter);
    app.use('/api/content', express_1.default.json(), content_route_js_1.contentRouter);
    return app;
}
