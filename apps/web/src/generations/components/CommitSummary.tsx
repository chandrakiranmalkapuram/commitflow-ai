import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { GitCommit, Clock, GitBranch } from 'lucide-react';
import type { GenerationDetail } from '../generations.types';

export function CommitSummary({ generation }: { generation: GenerationDetail }) {
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Generation Pipeline</CardTitle>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" />
              {generation.owner}/{generation.repo}
            </div>
            <div className="flex items-center gap-1.5">
              <GitCommit className="h-4 w-4" />
              <span className="font-mono">{generation.commitSha.substring(0, 7)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {new Date(generation.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <Badge variant={getStatusVariant(generation.status)} className="text-sm px-3 py-1">
          {generation.status.replace('_', ' ')}
        </Badge>
      </CardHeader>
    </Card>
  );
}
