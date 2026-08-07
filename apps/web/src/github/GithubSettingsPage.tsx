import { useQuery } from '@tanstack/react-query';
import { githubApi } from './github.api';
import { GithubConnectionCard } from './components/GithubConnectionCard';
import { AvailableRepositories } from './components/AvailableRepositories';

export function GithubSettingsPage() {
  const { data: account, isLoading, isError } = useQuery({
    queryKey: ['github-account'],
    queryFn: githubApi.getAccount,
    retry: false, // Don't retry if it returns 404 (not connected)
  });

  const isConnected = !!account && !isError;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">GitHub Integration</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your GitHub account connection and permissions.
        </p>
      </div>

      <GithubConnectionCard 
        account={account} 
        isLoading={isLoading} 
      />

      <AvailableRepositories isConnected={isConnected} />
    </div>
  );
}
