"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_js_1 = require("./auth.service.js");
const auth_types_js_1 = require("./auth.types.js");
class AuthController {
    async register(req, res) {
        try {
            const data = auth_types_js_1.RegisterSchema.parse(req.body);
            const result = await auth_service_js_1.authService.register(data);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            const data = auth_types_js_1.LoginSchema.parse(req.body);
            const result = await auth_service_js_1.authService.login(data);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    async refresh(req, res) {
        try {
            const data = auth_types_js_1.RefreshTokenSchema.parse(req.body);
            const tokens = await auth_service_js_1.authService.refreshTokens(data.refreshToken);
            res.status(200).json(tokens);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    async logout(req, res) {
        // In a stateless JWT setup, logout is typically handled client-side by deleting tokens.
        // For completeness, we return a 200 OK.
        res.status(200).json({ message: 'Logged out successfully' });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
