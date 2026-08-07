"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryController = exports.RepositoryController = void 0;
const repository_service_js_1 = require("./repository.service.js");
const repository_types_js_1 = require("./repository.types.js");
class RepositoryController {
    async add(req, res) {
        try {
            const data = repository_types_js_1.AddRepositorySchema.parse(req.body);
            const result = await repository_service_js_1.repositoryService.addRepository(data);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const organizationId = req.query.organizationId;
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            const result = await repository_service_js_1.repositoryService.listByOrganization(organizationId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async toggleActive(req, res) {
        try {
            const id = req.params.id;
            const { active } = req.body;
            if (typeof active !== 'boolean') {
                res.status(400).json({ error: 'active boolean is required' });
                return;
            }
            const result = await repository_service_js_1.repositoryService.toggleActive(id, active);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.RepositoryController = RepositoryController;
exports.repositoryController = new RepositoryController();
