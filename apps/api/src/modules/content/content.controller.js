"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentController = exports.ContentController = void 0;
const content_service_js_1 = require("./content.service.js");
const organization_repository_js_1 = require("../organization/organization.repository.js");
class ContentController {
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
    async approveContent(req, res) {
        try {
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            if (!(await this.checkAccess(req, res, organizationId)))
                return;
            const id = req.params.id;
            const content = await content_service_js_1.contentService.approveContent(id, organizationId);
            res.status(200).json(content);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async rejectContent(req, res) {
        try {
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            if (!(await this.checkAccess(req, res, organizationId)))
                return;
            const id = req.params.id;
            const content = await content_service_js_1.contentService.rejectContent(id, organizationId);
            res.status(200).json(content);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
exports.ContentController = ContentController;
exports.contentController = new ContentController();
