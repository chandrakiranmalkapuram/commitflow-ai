import { AiUnderstandingResult } from '../ai/ai.types.js';

export enum ToneProfile {
  Professional = 'Professional',
  Technical = 'Technical',
  Founder = 'Founder',
  Recruiter = 'Recruiter',
  Friendly = 'Friendly',
  Minimal = 'Minimal',
}

export enum Platform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  DevTo = 'DevTo',
  Medium = 'Medium',
  Hashnode = 'Hashnode',
  GitHubRelease = 'GitHubRelease',
  Portfolio = 'Portfolio',
  Resume = 'Resume',
}

export interface ContentMetadata {
  platform: Platform;
  tone: ToneProfile;
  version: number;
  creationTime: string;
  status: 'DRAFT' | 'PUBLISHED' | 'FAILED';
}

export interface GeneratedContent {
  text: string;
  metadata: ContentMetadata;
}

export interface ContentGenerator {
  generate(understanding: AiUnderstandingResult, tone: ToneProfile): Promise<GeneratedContent>;
}
