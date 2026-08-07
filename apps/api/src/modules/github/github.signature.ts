import crypto from 'crypto';

export function verifyGithubSignature(
  payload: Buffer,
  signature: string | undefined,
  secret: string,
): boolean {
  if (!signature) {
    return false;
  }

  const expectedSignature =
    'sha256=' +
    crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature),
  );
}