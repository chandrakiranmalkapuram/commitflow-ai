"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationController = exports.GenerationController = void 0;
const generation_service_js_1 = require("./generation.service.js");
const organization_repository_js_1 = require("../organization/organization.repository.js");
class GenerationController {
    async checkAccess(req, res, organizationId) {
        if (!req.user?.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return false;
        }
        if (!organizationId) {
            res.status(400).json({ error: 'organizationId query parameter is required' });
            return false;
        }
        const isMember = await organization_repository_js_1.organizationRepository.isMember(req.user.userId, organizationId);
        if (!isMember) {
            res.status(403).json({ error: 'Forbidden: You do not have access to this organization' });
            return false;
        }
        return true;
    }
    async listGenerations(req, res) {
        try {
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            if (!(await this.checkAccess(req, res, organizationId)))
                return;
            const generations = await generation_service_js_1.generationService.listGenerations(organizationId);
            res.status(200).json(generations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getGeneration(req, res) {
        try {
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            if (!(await this.checkAccess(req, res, organizationId)))
                return;
            const id = req.params.id;
            const generation = await generation_service_js_1.generationService.getGeneration(id, organizationId);
            if (!generation) {
                res.status(404).json({ error: 'Generation not found' });
                return;
            }
            res.status(200).json(generation);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getGenerationContent(req, res) {
        try {
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            if (!(await this.checkAccess(req, res, organizationId)))
                return;
            const id = req.params.id;
            const content = await generation_service_js_1.generationService.getGenerationContent(id, organizationId);
            res.status(200).json(content);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.GenerationController = GenerationController;
exports.generationController = new GenerationController();
