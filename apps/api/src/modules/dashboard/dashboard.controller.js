"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.DashboardController = void 0;
const dashboard_service_js_1 = require("./dashboard.service.js");
const organization_repository_js_1 = require("../organization/organization.repository.js");
class DashboardController {
    async getDashboardStats(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const organizationId = req.query.organizationId?.toString();
            if (!organizationId) {
                res.status(400).json({ error: 'organizationId query parameter is required' });
                return;
            }
            // Verify the user is a member of this organization
            const isMember = await organization_repository_js_1.organizationRepository.isMember(req.user.userId, organizationId);
            if (!isMember) {
                res.status(403).json({ error: 'Forbidden: You do not have access to this organization' });
                return;
            }
            const stats = await dashboard_service_js_1.dashboardService.getDashboardStats(organizationId);
            res.status(200).json(stats);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.DashboardController = DashboardController;
exports.dashboardController = new DashboardController();
