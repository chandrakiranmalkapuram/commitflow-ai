import { Request, Response } from 'express';

import {
  verifyGithubSignature,
} from '../github/github.signature.js';

import {
  processGithubWebhook,
} from './webhook.service.js';


export async function receiveGithubWebhook(
  req: Request,
  res: Response,
) {

  const signature =
    req.headers[
    'x-hub-signature-256'
    ] as string;


  const secret =
    process.env.GITHUB_WEBHOOK_SECRET;


  if (!secret) {
    return res.status(500).json({
      message:
        'Webhook secret missing',
    });
  }


  const isValid =
    verifyGithubSignature(
      req.body,
      signature,
      secret,
    );


  if (!isValid) {
    return res.status(401).json({
      message:
        'Invalid GitHub signature',
    });
  }


  try {

    const event =
      await processGithubWebhook(
        JSON.parse(
          req.body.toString(),
        ),
      );


    return res.status(200).json({
      received: true,
      event,
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : 'Invalid payload',
    });

  }
}