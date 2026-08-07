"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const prisma_service_js_1 = require("../db/prisma.service.js");
class UserRepository {
    get prisma() {
        return prisma_service_js_1.prismaService.client;
    }
    async create(data) {
        return this.prisma.user.create({ data });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
