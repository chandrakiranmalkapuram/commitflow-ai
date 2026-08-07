import { CommitDiffResult } from '../github/github.types.js';
import { AnalysisResult, AnalysisCategories, AnalysisMetrics } from './analyzer.types.js';

export class AnalyzerService {
  public analyzeCommitDiff(diff: CommitDiffResult): AnalysisResult {
    let additions = 0;
    let deletions = 0;
    const added: string[] = [];
    const modified: string[] = [];
    const removed: string[] = [];
    const languages = new Set<string>();

    const categories: AnalysisCategories = {
      isFrontend: false,
      isBackend: false,
      isApi: false,
      isDatabase: false,
      isDependencyChange: false,
      isReadmeChange: false,
      isDockerChange: false,
      isCiCdChange: false,
      isInfrastructureChange: false,
      isConfigurationChange: false,
      isTestingChange: false,
      isDocumentationChange: false,
    };

    for (const file of diff.files) {
      additions += file.additions;
      deletions += file.deletions;

      if (file.status === 'added') {
        added.push(file.filename);
      } else if (file.status === 'removed') {
        removed.push(file.filename);
      } else {
        modified.push(file.filename);
      }

      this.detectLanguages(file.filename, languages);
      this.detectCategories(file.filename, categories);
    }

    const metrics: AnalysisMetrics = {
      filesChanged: diff.files.length,
      additions,
      deletions,
      commits: 1,
    };

    return {
      commitSha: diff.sha,
      message: diff.message,
      author: diff.author,
      metrics,
      categories,
      languages: Array.from(languages),
      fileStatuses: {
        added,
        modified,
        removed,
      },
    };
  }

  private detectLanguages(filename: string, languages: Set<string>) {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        languages.add('TypeScript');
        break;
      case 'js':
      case 'jsx':
        languages.add('JavaScript');
        break;
      case 'py':
        languages.add('Python');
        break;
      case 'go':
        languages.add('Go');
        break;
      case 'rs':
        languages.add('Rust');
        break;
      case 'java':
        languages.add('Java');
        break;
      case 'html':
        languages.add('HTML');
        break;
      case 'css':
        languages.add('CSS');
        break;
      case 'sql':
        languages.add('SQL');
        break;
    }
  }

  private detectCategories(filename: string, categories: AnalysisCategories) {
    const lowerFile = filename.toLowerCase();

    // Frontend
    if (lowerFile.endsWith('.tsx') || lowerFile.endsWith('.jsx') || lowerFile.includes('apps/web/') || lowerFile.includes('components/') || lowerFile.includes('views/')) {
      categories.isFrontend = true;
    }

    // Backend
    if (lowerFile.includes('apps/api/') || lowerFile.includes('src/modules/') || lowerFile.includes('controller') || lowerFile.includes('service')) {
      categories.isBackend = true;
    }

    // API
    if (lowerFile.includes('route') || lowerFile.includes('controller') || lowerFile.includes('graphql') || lowerFile.includes('trpc')) {
      categories.isApi = true;
    }

    // Database
    if (lowerFile.includes('schema.prisma') || lowerFile.includes('migrations/') || lowerFile.endsWith('.sql')) {
      categories.isDatabase = true;
    }

    // Dependencies
    if (lowerFile.includes('package.json') || lowerFile.includes('pnpm-lock.yaml') || lowerFile.includes('yarn.lock') || lowerFile.includes('package-lock.json')) {
      categories.isDependencyChange = true;
    }

    // README
    if (lowerFile.endsWith('readme.md')) {
      categories.isReadmeChange = true;
    }

    // Docker
    if (lowerFile.includes('dockerfile') || lowerFile.includes('docker-compose')) {
      categories.isDockerChange = true;
    }

    // CI/CD
    if (lowerFile.includes('.github/workflows/') || lowerFile.includes('.gitlab-ci.yml') || lowerFile.includes('circleci')) {
      categories.isCiCdChange = true;
    }

    // Infrastructure
    if (lowerFile.endsWith('.tf') || lowerFile.includes('cdk/') || lowerFile.includes('pulumi/')) {
      categories.isInfrastructureChange = true;
    }

    // Configuration
    if (lowerFile.includes('.env') || lowerFile.includes('tsconfig') || lowerFile.includes('.eslintrc') || lowerFile.includes('.prettierrc')) {
      categories.isConfigurationChange = true;
    }

    // Testing
    if (lowerFile.endsWith('.test.ts') || lowerFile.endsWith('.spec.ts') || lowerFile.includes('__tests__/')) {
      categories.isTestingChange = true;
    }

    // Documentation
    if (lowerFile.endsWith('.md') || lowerFile.includes('docs/')) {
      categories.isDocumentationChange = true;
    }
  }
}

export const analyzerService = new AnalyzerService();
