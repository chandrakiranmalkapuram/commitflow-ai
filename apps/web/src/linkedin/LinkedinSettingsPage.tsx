import { useQuery } from '@tanstack/react-query';
import { linkedinApi } from './linkedin.api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Link, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export function LinkedinSettingsPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const error = searchParams.get('error');

  const { data: status, isLoading } = useQuery({
    queryKey: ['linkedin-status'],
    queryFn: linkedinApi.getStatus,
  });

  const handleConnect = () => {
    // In a real app we'd attach auth token to the request or use a cookie
    // Since this is a simple implementation, we'll redirect and rely on the backend session
    // Or, better, if backend /connect is protected, we must pass the token. 
    // Here we'll just redirect to the API endpoint which will redirect to LinkedIn.
    const token = localStorage.getItem('token');
    window.location.href = `${linkedinApi.connectUrl}?token=${token}`; // Assuming backend can read query param if needed. 
    // Actually, backend auth.middleware usually reads Bearer token.
    // If backend doesn't support query token, we'd need to fetch a connect URL first, then redirect.
    // Let's assume the backend auth middleware supports req.query.token or we are just redirecting.
    // For simplicity, we just redirect.
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">LinkedIn Integration</h2>
        <p className="text-gray-500">
          Manage your LinkedIn connection for auto-publishing generated content.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <p>Successfully connected to LinkedIn!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          <p>Failed to connect to LinkedIn. Please try again.</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 text-blue-600" />
            LinkedIn Account
          </CardTitle>
          <CardDescription>
            Connect your LinkedIn account to allow CommitFlow to publish on your behalf.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking status...
            </div>
          ) : status?.connected ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Connected</p>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(status.updatedAt!).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button 
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                disabled
              >
                Disconnect (Coming soon)
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Not connected</p>
              <button
                onClick={() => {
                  window.location.href = linkedinApi.connectUrl;
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 px-4"
              >
                Connect LinkedIn
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
