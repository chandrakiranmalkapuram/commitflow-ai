import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { PenTool, Check, X, Loader2, Send } from 'lucide-react';
import type { GeneratedContent } from '../generations.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generationsApi } from '../generations.api';

export function GeneratedContentSection({ contents, generationId }: { contents?: GeneratedContent[], generationId: string }) {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (contentId: string) => generationsApi.approveContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation', generationId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (contentId: string) => generationsApi.rejectContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation', generationId] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: (contentId: string) => generationsApi.publishContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generation', generationId] });
    },
    onError: (error: any) => {
      alert(`Publish failed: ${error.response?.data?.error || error.message}`);
    }
  });

  if (!contents || contents.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <PenTool className="h-5 w-5 text-gray-500" />
        Generated Content
      </h3>
      
      {contents.map((content) => (
        <Card key={content.id} className={content.status === 'APPROVED' ? 'border-green-200' : ''}>
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 border-b pb-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base capitalize">{content.platform}</CardTitle>
              <Badge variant="outline" className="text-xs bg-white">{content.tone} Tone</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant={
                content.status === 'APPROVED' || content.status === 'PUBLISHED' ? 'success' :
                content.status === 'REJECTED' ? 'destructive' :
                'warning'
              }>
                {content.status.replace('_', ' ')}
              </Badge>
              
              {content.status === 'PENDING_APPROVAL' && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => rejectMutation.mutate(content.id)}
                    disabled={rejectMutation.isPending || approveMutation.isPending}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-8 px-3"
                  >
                    {rejectMutation.isPending && rejectMutation.variables === content.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <X className="mr-1 h-3 w-3" />
                    )}
                    Reject
                  </button>
                  <button
                    onClick={() => approveMutation.mutate(content.id)}
                    disabled={rejectMutation.isPending || approveMutation.isPending}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-8 px-3"
                  >
                    {approveMutation.isPending && approveMutation.variables === content.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <Check className="mr-1 h-3 w-3" />
                    )}
                    Approve
                  </button>
                </div>
              )}

              {(content.status === 'APPROVED' || content.status === 'FAILED') && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => publishMutation.mutate(content.id)}
                    disabled={publishMutation.isPending}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-8 px-3"
                  >
                    {publishMutation.isPending && publishMutation.variables === content.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <Send className="mr-1 h-3 w-3" />
                    )}
                    {content.status === 'FAILED' ? 'Retry Publish' : 'Publish to LinkedIn'}
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {content.text}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
