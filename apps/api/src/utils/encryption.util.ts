import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;

export function encrypt(text: string): string {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey || secretKey.length < 32) {
    throw new Error('ENCRYPTION_KEY environment variable is not set or is too short');
  }

  // Derive a key using pbkdf2
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = crypto.pbkdf2Sync(secretKey, salt, 100000, KEY_LENGTH, 'sha512');
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Combine into a single base64 string: salt:iv:tag:encryptedData
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

export function decrypt(encdata: string): string {
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

  const key = crypto.pbkdf2Sync(secretKey, salt, 100000, KEY_LENGTH, 'sha512');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = decipher.update(encrypted) + decipher.final('utf8');
  return decrypted;
}
