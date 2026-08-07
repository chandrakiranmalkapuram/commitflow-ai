"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
function encrypt(text) {
    const secretKey = process.env.ENCRYPTION_KEY;
    if (!secretKey || secretKey.length < 32) {
        throw new Error('ENCRYPTION_KEY environment variable is not set or is too short');
    }
    // Derive a key using pbkdf2
    const salt = crypto_1.default.randomBytes(SALT_LENGTH);
    const key = crypto_1.default.pbkdf2Sync(secretKey, salt, 100000, KEY_LENGTH, 'sha512');
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    // Combine into a single base64 string: salt:iv:tag:encryptedData
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}
function decrypt(encdata) {
    const secretKey = process.env.ENCRYPTION_KEY;
    if (!secretKey || secretKey.length < 32) {
        throw new Error('ENCRYPTION_KEY environment variable is not set or is too short');
    }
    const data = Buffer.from(encdata, 'base64');
    // Extract components
    const salt = data.subarray(0, SALT_LENGTH);
    const iv = data.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = data.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = data.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const key = crypto_1.default.pbkdf2Sync(secretKey, salt, 100000, KEY_LENGTH, 'sha512');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    const decrypted = decipher.update(encrypted) + decipher.final('utf8');
    return decrypted;
}
