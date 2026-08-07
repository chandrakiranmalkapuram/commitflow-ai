"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationService = exports.OrganizationService = void 0;
const organization_repository_js_1 = require("./organization.repository.js");
class OrganizationService {
    async createOrganization(data) {
        // 1. Create org
        const org = await organization_repository_js_1.organizationRepository.create(data);
        // 2. Add owner as a member with OWNER role
        await organization_repository_js_1.organizationRepository.addMember({
            organizationId: org.id,
            userId: data.ownerId,
            role: 'OWNER',
        });
        return org;
    }
    async findById(id) {
        return organization_repository_js_1.organizationRepository.findById(id);
    }
    async findOrCreateByName(name, ownerId) {
        let org = await organization_repository_js_1.organizationRepository.findByName(name);
        if (!org) {
            org = await this.createOrganization({ name, ownerId });
        }
        return org;
    }
    async getUserOrganizations(userId) {
        const memberships = await organization_repository_js_1.organizationRepository.getMemberships(userId);
        return memberships.map((m) => m.organization);
    }
}
exports.OrganizationService = OrganizationService;
exports.organizationService = new OrganizationService();
