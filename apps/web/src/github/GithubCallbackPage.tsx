import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { githubApi } from './github.api';
import { Loader2, GitBranch, AlertTriangle } from 'lucide-react';

export function GithubCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const code = searchParams.get('code');
  const hasAttempted = useRef(false);

  const mutation = useMutation({
    mutationFn: (authCode: string) => githubApi.handleCallback(authCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['github-account'] });
      navigate('/settings/github', { replace: true });
    },
  });

  useEffect(() => {
    if (code && !hasAttempted.current) {
      hasAttempted.current = true;
      mutation.mutate(code);
    } else if (!code && !hasAttempted.current) {
      // If there's no code, redirect back
      navigate('/settings/github', { replace: true });
    }
  }, [code, navigate, mutation]);

  if (mutation.isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failed</h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          We couldn't connect your GitHub account. {mutation.error?.message || 'An unknown error occurred.'}
        </p>
        <button
          onClick={() => navigate('/settings/github')}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-10 px-6"
        >
          Return to Settings
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-blue-50 animate-pulse" />
        <div className="relative bg-white rounded-full p-4 shadow-sm border border-gray-100">
          <GitBranch className="h-12 w-12 text-gray-900" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        Connecting to GitHub
      </h2>
      <p className="text-gray-500">
        Please wait while we securely link your account...
      </p>
    </div>
  );
}
