"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_repository_js_1 = require("./user.repository.js");
class UserService {
    async createUser(data) {
        const existing = await user_repository_js_1.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error('User already exists');
        }
        return user_repository_js_1.userRepository.create(data);
    }
    async findByEmail(email) {
        return user_repository_js_1.userRepository.findByEmail(email);
    }
    async findById(id) {
        return user_repository_js_1.userRepository.findById(id);
    }
    mapToDto(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
