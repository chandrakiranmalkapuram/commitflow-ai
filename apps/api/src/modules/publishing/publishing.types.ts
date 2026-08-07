export interface ConnectPlatformDto {
  userId: string;
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiry?: Date;
}

export interface PublishRequestDto {
  contentId: string;
  provider: string;
}

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  errorMessage?: string;
}
