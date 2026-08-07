"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectGithubAccountSchema = void 0;
const zod_1 = require("zod");
exports.ConnectGithubAccountSchema = zod_1.z.object({
    githubUserId: zod_1.z.string(),
    username: zod_1.z.string(),
    avatarUrl: zod_1.z.string().optional(),
    accessToken: zod_1.z.string(),
});
