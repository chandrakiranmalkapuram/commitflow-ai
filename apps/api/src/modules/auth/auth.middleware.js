"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    }
    else {
        res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
};
exports.authenticateJWT = authenticateJWT;
