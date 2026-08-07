"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryService = exports.RepositoryService = void 0;
const repository_repository_js_1 = require("./repository.repository.js");
class RepositoryService {
    async addRepository(data) {
        const existing = await repository_repository_js_1.repositoryRepository.findByOwnerAndName(data.owner, data.name);
        if (existing) {
            throw new Error('Repository already added');
        }
        const repo = await repository_repository_js_1.repositoryRepository.create(data);
        return repo;
    }
    async listByOrganization(organizationId) {
        return repository_repository_js_1.repositoryRepository.findByOrganization(organizationId);
    }
    async toggleActive(id, active) {
        return repository_repository_js_1.repositoryRepository.updateActiveStatus(id, active);
    }
    async findByOwnerAndName(owner, name) {
        return repository_repository_js_1.repositoryRepository.findByOwnerAndName(owner, name);
    }
}
exports.RepositoryService = RepositoryService;
exports.repositoryService = new RepositoryService();
