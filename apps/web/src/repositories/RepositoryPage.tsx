import { useQuery } from '@tanstack/react-query';
import { repositoriesApi } from './repositories.api';
import { RepositoryList } from './components/RepositoryList';
import { useAuth } from '../auth/AuthProvider';
import { GitBranch } from 'lucide-react';

export function RepositoryPage() {
  const { user } = useAuth();
  const organizationId = user?.organizationId || 'org_test_123';

  const { 
    data: repositories, 
    isLoading,
    isError 
  } = useQuery({
    queryKey: ['repositories', organizationId],
    queryFn: () => repositoriesApi.list(organizationId),
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load repositories</h3>
        <p className="text-gray-500 max-w-md text-center">There was an error communicating with the server. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Repositories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your connected GitHub repositories and tracking preferences.
          </p>
        </div>
        
        {/* Only show top action button if repositories exist and it's not loading to avoid double empty states */}
        {(!isLoading && repositories && repositories.length > 0) && (
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-900 text-white hover:bg-gray-900/90 h-10 py-2 px-4"
            onClick={() => alert("GitHub OAuth flow will be implemented later")}
          >
            <GitBranch className="mr-2 h-4 w-4" />
            Connect GitHub
          </button>
        )}
      </div>
      
      <RepositoryList repositories={repositories} isLoading={isLoading} />
    </div>
  );
}
