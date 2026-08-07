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
import { Link } from 'react-router-dom';
import type { Generation } from '../dashboard.types';

interface RecentActivityProps {
  generations?: Generation[];
  isLoading: boolean;
}

export function RecentActivity({ generations, isLoading }: RecentActivityProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'PUBLISHED':
        return 'success';
      case 'FAILED':
      case 'REJECTED':
        return 'destructive';
      case 'PENDING_APPROVAL':
      case 'PROCESSING':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-8">
        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-[100px] rounded-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (!generations || generations.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 border-dashed bg-gray-50 shadow-sm mt-8 p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
        <p className="text-gray-500 mb-4">Connect a GitHub repository to start generating AI content from your commits.</p>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-900 text-white hover:bg-gray-900/90 h-10 py-2 px-4">
          Connect Repository
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-8">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repository</TableHead>
              <TableHead>Commit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generations.map((gen) => (
              <TableRow key={gen.id}>
                <TableCell className="font-medium">
                  <Link to={`/generations/${gen.id}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    {gen.owner}/{gen.repo}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {gen.commitSha.substring(0, 7)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(gen.status)}>
                    {gen.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-gray-500">
                  {new Date(gen.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
