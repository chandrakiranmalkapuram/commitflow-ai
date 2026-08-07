"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRepository = exports.OrganizationRepository = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class OrganizationRepository {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async create(data) {
        return this.prisma.organization.create({ data });
    }
    async findById(id) {
        return this.prisma.organization.findUnique({ where: { id } });
    }
    async findByName(name) {
        return this.prisma.organization.findFirst({ where: { name } });
    }
    async addMember(data) {
        return this.prisma.organizationMember.create({
            data: {
                organizationId: data.organizationId,
                userId: data.userId,
                role: data.role || 'MEMBER',
            },
        });
    }
    async getMemberships(userId) {
        return this.prisma.organizationMember.findMany({
            where: { userId },
            include: { organization: true },
        });
    }
    async isMember(userId, organizationId) {
        const member = await this.prisma.organizationMember.findUnique({
            where: {
                userId_organizationId: {
                    userId,
                    organizationId,
                },
            },
        });
        return !!member;
    }
}
exports.OrganizationRepository = OrganizationRepository;
exports.organizationRepository = new OrganizationRepository();
