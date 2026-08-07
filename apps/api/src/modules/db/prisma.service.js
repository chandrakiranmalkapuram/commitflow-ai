"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaService = exports.PrismaService = void 0;
const client_1 = require("@prisma/client");
class PrismaService {
    client;
    constructor() {
        this.client = new client_1.PrismaClient();
    }
}
exports.PrismaService = PrismaService;
exports.prismaService = new PrismaService();
