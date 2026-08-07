"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_js_1 = require("../user/user.service.js");
const organization_service_js_1 = require("../organization/organization.service.js");
class AuthService {
    get jwtSecret() {
        return process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';
    }
    get jwtRefreshSecret() {
        return process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_do_not_use_in_prod';
    }
    async register(data) {
        const passwordHash = await bcryptjs_1.default.hash(data.password, 10);
        // 1. Create User
        const user = await user_service_js_1.userService.createUser({
            name: data.name,
            email: data.email,
            passwordHash,
        });
        // 2. Create personal Organization if name not provided, otherwise use provided name
        const orgName = data.organizationName || `${data.name}'s Workspace`;
        await organization_service_js_1.organizationService.createOrganization({
            name: orgName,
            ownerId: user.id,
        });
        // 3. Generate tokens
        const tokens = this.generateTokens(user.id);
        return {
            user: user_service_js_1.userService.mapToDto(user),
            tokens,
        };
    }
    async login(data) {
        const user = await user_service_js_1.userService.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await bcryptjs_1.default.compare(data.password, user.passwordHash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const tokens = this.generateTokens(user.id);
        return {
            user: user_service_js_1.userService.mapToDto(user),
            tokens,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, this.jwtRefreshSecret);
            return this.generateTokens(decoded.userId);
        }
        catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }
    generateTokens(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ userId }, this.jwtSecret, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, this.jwtRefreshSecret, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
