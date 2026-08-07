export type ContentStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'PUBLISHED' | 'REJECTED' | 'FAILED';

export interface GitAnalysis {
  id: string;
  metrics: any;
  categories: any;
  languages: string[];
  fileStatuses: any;
  createdAt: string;
}

export interface AiUnderstanding {
  id: string;
  featureName: string;
  category: string;
  technicalSummary: string;
  businessSummary: string;
  technologiesUsed: string[];
  developerAchievements: string[];
  complexity: string;
  confidenceScore: number;
  suggestedHighlights: string[];
  doNotMentionPublicly: string[];
  createdAt: string;
}

export interface GeneratedContent {
  id: string;
  platform: string;
  tone: string;
  text: string;
  version: number;
  status: ContentStatus;
  createdAt: string;
}

export interface ImagePrompt {
  id: string;
  visualStyle: string;
  theme: string;
  composition: string;
  colorPalette: string;
  imagePrompt: string;
  negativePrompt: string;
  aspectRatio: string;
  intendedUsagePlatform: string;
}

export interface GeneratedImage {
  id: string;
  provider: string;
  model: string;
  imageUrl: string;
  status: string;
}

export interface GenerationDetail {
  id: string;
  organizationId: string;
  commitSha: string;
  owner: string;
  repo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  
  gitAnalysis?: GitAnalysis;
  aiUnderstanding?: AiUnderstanding;
  imagePrompt?: ImagePrompt;
  generatedImage?: GeneratedImage;
  generatedContent: GeneratedContent[];
}
