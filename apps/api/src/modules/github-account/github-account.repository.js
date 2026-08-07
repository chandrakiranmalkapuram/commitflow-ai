"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubAccountRepository = exports.GithubAccountRepository = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class GithubAccountRepository {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async upsert(data) {
        return this.prisma.githubAccount.upsert({
            where: { userId: data.userId },
            update: {
                githubUserId: data.githubUserId,
                username: data.username,
                avatarUrl: data.avatarUrl,
                accessToken: data.accessToken,
            },
            create: {
                userId: data.userId,
                githubUserId: data.githubUserId,
                username: data.username,
                avatarUrl: data.avatarUrl,
                accessToken: data.accessToken,
            },
        });
    }
    async findByUserId(userId) {
        return this.prisma.githubAccount.findUnique({
            where: { userId },
        });
    }
}
exports.GithubAccountRepository = GithubAccountRepository;
exports.githubAccountRepository = new GithubAccountRepository();
