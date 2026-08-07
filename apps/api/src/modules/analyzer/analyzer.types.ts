export interface AnalysisMetrics {
  filesChanged: number;
  additions: number;
  deletions: number;
  commits: number;
}

export interface AnalysisCategories {
  isFrontend: boolean;
  isBackend: boolean;
  isApi: boolean;
  isDatabase: boolean;
  isDependencyChange: boolean;
  isReadmeChange: boolean;
  isDockerChange: boolean;
  isCiCdChange: boolean;
  isInfrastructureChange: boolean;
  isConfigurationChange: boolean;
  isTestingChange: boolean;
  isDocumentationChange: boolean;
}

export interface AnalysisResult {
  commitSha: string;
  message: string;
  author: string;
  metrics: AnalysisMetrics;
  categories: AnalysisCategories;
  languages: string[];
  fileStatuses: {
    added: string[];
    modified: string[];
    removed: string[];
  };
}
