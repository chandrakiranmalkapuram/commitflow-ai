import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { GitBranch, Loader2 } from 'lucide-react';
import type { Repository } from '../repositories.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { repositoriesApi } from '../repositories.api';

interface RepositoryListProps {
  repositories?: Repository[];
  isLoading: boolean;
}

export function RepositoryList({ repositories, isLoading }: RepositoryListProps) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => 
      repositoriesApi.toggleActive(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repository</TableHead>
              <TableHead>Default Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[160px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-5 w-[70px] rounded-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-[90px] ml-auto rounded-md" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!repositories || repositories.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 border-dashed bg-gray-50 shadow-sm mt-6 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <GitBranch className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No repositories connected</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Connect your GitHub account to select which repositories should generate automated content.</p>
        <button 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-900 text-white hover:bg-gray-900/90 h-10 py-2 px-4"
          onClick={() => alert("GitHub OAuth flow will be implemented later")}
        >
          <GitBranch className="mr-2 h-4 w-4" />
          Connect GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Repository</TableHead>
            <TableHead>Default Branch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repositories.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">{repo.owner}/{repo.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {repo.defaultBranch}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={repo.active ? 'success' : 'default'}>
                  {repo.active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => toggleMutation.mutate({ id: repo.id, active: !repo.active })}
                  disabled={toggleMutation.isPending && toggleMutation.variables?.id === repo.id}
                  className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-8 px-3"
                >
                  {toggleMutation.isPending && toggleMutation.variables?.id === repo.id && (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  )}
                  {repo.active ? 'Deactivate' : 'Activate'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
