"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedContentSection = GeneratedContentSection;
const card_1 = require("../../components/ui/card");
const badge_1 = require("../../components/ui/badge");
const lucide_react_1 = require("lucide-react");
const react_query_1 = require("@tanstack/react-query");
const generations_api_1 = require("../generations.api");
function GeneratedContentSection({ contents, generationId }) {
    const queryClient = (0, react_query_1.useQueryClient)();
    const approveMutation = (0, react_query_1.useMutation)({
        mutationFn: (contentId) => generations_api_1.generationsApi.approveContent(contentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generation', generationId] });
        },
    });
    const rejectMutation = (0, react_query_1.useMutation)({
        mutationFn: (contentId) => generations_api_1.generationsApi.rejectContent(contentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generation', generationId] });
        },
    });
    if (!contents || contents.length === 0)
        return null;
    return (<div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <lucide_react_1.PenTool className="h-5 w-5 text-gray-500"/>
        Generated Content
      </h3>
      
      {contents.map((content) => (<card_1.Card key={content.id} className={content.status === 'APPROVED' ? 'border-green-200' : ''}>
          <card_1.CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 border-b pb-4">
            <div className="flex items-center gap-3">
              <card_1.CardTitle className="text-base capitalize">{content.platform}</card_1.CardTitle>
              <badge_1.Badge variant="outline" className="text-xs bg-white">{content.tone} Tone</badge_1.Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <badge_1.Badge variant={content.status === 'APPROVED' || content.status === 'PUBLISHED' ? 'success' :
                content.status === 'REJECTED' ? 'destructive' :
                    'warning'}>
                {content.status.replace('_', ' ')}
              </badge_1.Badge>
              
              {content.status === 'PENDING_APPROVAL' && (<div className="flex items-center gap-2 ml-2">
                  <button onClick={() => rejectMutation.mutate(content.id)} disabled={rejectMutation.isPending || approveMutation.isPending} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 h-8 px-3">
                    {rejectMutation.isPending && rejectMutation.variables === content.id ? (<lucide_react_1.Loader2 className="mr-1 h-3 w-3 animate-spin"/>) : (<lucide_react_1.X className="mr-1 h-3 w-3"/>)}
                    Reject
                  </button>
                  <button onClick={() => approveMutation.mutate(content.id)} disabled={rejectMutation.isPending || approveMutation.isPending} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-8 px-3">
                    {approveMutation.isPending && approveMutation.variables === content.id ? (<lucide_react_1.Loader2 className="mr-1 h-3 w-3 animate-spin"/>) : (<lucide_react_1.Check className="mr-1 h-3 w-3"/>)}
                    Approve
                  </button>
                </div>)}
            </div>
          </card_1.CardHeader>
          <card_1.CardContent className="pt-6">
            <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
              {content.text}
            </div>
          </card_1.CardContent>
        </card_1.Card>))}
    </div>);
}
