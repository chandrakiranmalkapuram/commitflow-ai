"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryRepository = exports.RepositoryRepository = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class RepositoryRepository {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async create(data) {
        return this.prisma.repository.create({
            data: {
                organizationId: data.organizationId,
                githubRepositoryId: data.githubRepositoryId,
                name: data.name,
                owner: data.owner,
                defaultBranch: data.defaultBranch || 'main',
                installationId: data.installationId,
            },
        });
    }
    async findByOrganization(organizationId) {
        return this.prisma.repository.findMany({
            where: { organizationId },
        });
    }
    async findByOwnerAndName(owner, name) {
        return this.prisma.repository.findUnique({
            where: {
                owner_name: { owner, name },
            },
        });
    }
    async updateActiveStatus(id, active) {
        return this.prisma.repository.update({
            where: { id },
            data: { active },
        });
    }
}
exports.RepositoryRepository = RepositoryRepository;
exports.repositoryRepository = new RepositoryRepository();
