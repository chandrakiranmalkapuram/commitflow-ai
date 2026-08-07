import { Request, Response } from 'express';
import { publishingRepository } from '../publishing/publishing.repository.js';
import { encrypt } from '../../utils/encryption.util.js';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI!;

export class LinkedinController {
  async connect(req: Request, res: Response) {
    const scope = encodeURIComponent('openid profile w_member_social');
    const state = req.user?.id || 'state'; // Pass userId in state if possible, though it's better to store it securely. We'll use a simple approach here.
    
    // Create authorization URL
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&state=${state}&scope=${scope}`;
    
    res.redirect(authUrl);
  }

  async callback(req: Request, res: Response) {
    try {
      const { code, state } = req.query;
      
      if (!code) {
        return res.status(400).send('Authorization code missing');
      }
      
      const userId = String(state); // We passed userId in state

      // 1. Exchange code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: String(code),
          redirect_uri: LINKEDIN_REDIRECT_URI,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Failed to exchange token: ${errorText}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      
      // We also could get a refresh_token depending on the app's permissions.
      const refreshToken = tokenData.refresh_token; 
      const expiresIn = tokenData.expires_in;

      let expiry: Date | undefined;
      if (expiresIn) {
        expiry = new Date(Date.now() + expiresIn * 1000);
      }

      // 2. Encrypt the token
      const encryptedAccessToken = encrypt(accessToken);
      const encryptedRefreshToken = refreshToken ? encrypt(refreshToken) : undefined;

      // 3. Upsert into ConnectedPlatform
      await publishingRepository.upsertConnectedPlatform({
        userId,
        provider: 'LINKEDIN',
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiry,
      });

      // 4. Redirect to frontend success page
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/settings/linkedin?success=true`);
    } catch (error: any) {
      console.error('[LinkedIn OAuth] Error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/settings/linkedin?error=oauth_failed`);
    }
  }

  async getStatus(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const platform = await publishingRepository.getConnectedPlatform(userId, 'LINKEDIN');
      
      if (!platform) {
        return res.json({ connected: false });
      }

      // We could also decrypt the token and fetch their profile, but returning connection status is enough.
      res.json({
        connected: true,
        updatedAt: platform.updatedAt,
        expiry: platform.expiry,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const linkedinController = new LinkedinController();
