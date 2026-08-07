import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { FolderGit2, Bot, Clock, CheckCircle } from 'lucide-react';
import type { DashboardStats } from '../dashboard.types';

interface OverviewCardsProps {
  stats?: DashboardStats;
  isLoading: boolean;
}

export function OverviewCards({ stats, isLoading }: OverviewCardsProps) {
  const cards = [
    {
      title: 'Active Repositories',
      value: stats?.repositoryCount ?? 0,
      icon: FolderGit2,
      description: 'Connected GitHub repositories',
    },
    {
      title: 'Total Generations',
      value: stats?.generationCount ?? 0,
      icon: Bot,
      description: 'AI generations run',
    },
    {
      title: 'Pending Approval',
      value: stats?.pendingApprovalCount ?? 0,
      icon: Clock,
      description: 'Content waiting for review',
    },
    {
      title: 'Published Content',
      value: stats?.publishedCount ?? 0,
      icon: CheckCircle,
      description: 'Successfully published posts',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-3 w-[120px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
