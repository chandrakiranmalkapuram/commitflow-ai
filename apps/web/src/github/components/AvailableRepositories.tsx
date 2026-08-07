import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AvailableRepositories({ isConnected }: { isConnected: boolean }) {
  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Tracked Repositories
        </CardTitle>
        <p className="text-sm text-gray-500">
          Repositories that CommitFlow has access to.
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center">
          <GitBranch className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">Manage repositories from the dashboard</h3>
          <p className="text-sm text-gray-500 mb-4">
            You can view and manage which repositories are tracked on the Repositories page.
          </p>
          <Link
            to="/repositories"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-100 h-9 px-4"
          >
            Go to Repositories
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
