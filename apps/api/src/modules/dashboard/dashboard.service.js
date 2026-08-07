"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class DashboardService {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async getDashboardStats(organizationId) {
        const [repositoryCount, generationCount, pendingApprovalCount, publishedCount,] = await Promise.all([
            this.prisma.repository.count({ where: { organizationId, active: true } }),
            this.prisma.generation.count({ where: { organizationId } }),
            this.prisma.generatedContent.count({
                where: {
                    generation: { organizationId },
                    status: 'PENDING_APPROVAL'
                }
            }),
            this.prisma.generatedContent.count({
                where: {
                    generation: { organizationId },
                    status: 'PUBLISHED'
                }
            }),
        ]);
        return {
            repositoryCount,
            generationCount,
            pendingApprovalCount,
            publishedCount,
        };
    }
}
exports.DashboardService = DashboardService;
exports.dashboardService = new DashboardService();
