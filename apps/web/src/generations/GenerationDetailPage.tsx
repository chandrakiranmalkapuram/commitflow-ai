import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { generationsApi } from './generations.api';
import { useAuth } from '../auth/AuthProvider';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { CommitSummary } from './components/CommitSummary';
import { GitAnalysisSection } from './components/GitAnalysisSection';
import { AiUnderstandingSection } from './components/AiUnderstandingSection';
import { GeneratedContentSection } from './components/GeneratedContentSection';
import { ImagePromptSection } from './components/ImagePromptSection';

export function GenerationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const organizationId = user?.organizationId || 'org_test_123';

  const { 
    data: generation, 
    isLoading,
    isError 
  } = useQuery({
    queryKey: ['generation', id, organizationId],
    queryFn: () => generationsApi.get(id!, organizationId),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="text-gray-500 font-medium">Loading generation details...</span>
        </div>
      </div>
    );
  }

  if (isError || !generation) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load generation</h3>
        <p className="text-gray-500 max-w-md text-center mb-6">There was an error communicating with the server or the generation doesn't exist.</p>
        <Link 
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 h-10 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 text-gray-600 h-10 w-10"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Review</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and approve the generated content for this commit.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <CommitSummary generation={generation} />
        
        <GeneratedContentSection 
          contents={generation.generatedContent} 
          generationId={generation.id} 
        />
        
        <ImagePromptSection 
          prompt={generation.imagePrompt} 
          image={generation.generatedImage} 
        />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <AiUnderstandingSection understanding={generation.aiUnderstanding} />
          <GitAnalysisSection analysis={generation.gitAnalysis} />
        </div>
      </div>
    </div>
  );
}
