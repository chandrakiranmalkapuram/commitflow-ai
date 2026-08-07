"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRepositorySchema = void 0;
const zod_1 = require("zod");
exports.AddRepositorySchema = zod_1.z.object({
    organizationId: zod_1.z.string(),
    githubRepositoryId: zod_1.z.string(),
    name: zod_1.z.string(),
    owner: zod_1.z.string(),
    defaultBranch: zod_1.z.string().optional(),
    installationId: zod_1.z.string().optional(),
});
