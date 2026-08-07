"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationDetailPage = GenerationDetailPage;
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const generations_api_1 = require("./generations.api");
const AuthProvider_1 = require("../auth/AuthProvider");
const lucide_react_1 = require("lucide-react");
const CommitSummary_1 = require("./components/CommitSummary");
const GitAnalysisSection_1 = require("./components/GitAnalysisSection");
const AiUnderstandingSection_1 = require("./components/AiUnderstandingSection");
const GeneratedContentSection_1 = require("./components/GeneratedContentSection");
const ImagePromptSection_1 = require("./components/ImagePromptSection");
function GenerationDetailPage() {
    const { id } = (0, react_router_dom_1.useParams)();
    const { user } = (0, AuthProvider_1.useAuth)();
    const organizationId = user?.organizationId || 'org_test_123';
    const { data: generation, isLoading, isError } = (0, react_query_1.useQuery)({
        queryKey: ['generation', id, organizationId],
        queryFn: () => generations_api_1.generationsApi.get(id, organizationId),
        enabled: !!id,
    });
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <lucide_react_1.Loader2 className="h-8 w-8 animate-spin text-gray-400"/>
          <span className="text-gray-500 font-medium">Loading generation details...</span>
        </div>
      </div>);
    }
    if (isError || !generation) {
        return (<div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load generation</h3>
        <p className="text-gray-500 max-w-md text-center mb-6">There was an error communicating with the server or the generation doesn't exist.</p>
        <react_router_dom_1.Link to="/dashboard" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 h-10 px-4">
          <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
          Back to Dashboard
        </react_router_dom_1.Link>
      </div>);
    }
    return (<div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <react_router_dom_1.Link to="/dashboard" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 text-gray-600 h-10 w-10" aria-label="Back to dashboard">
          <lucide_react_1.ArrowLeft className="h-4 w-4"/>
        </react_router_dom_1.Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Review</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and approve the generated content for this commit.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <CommitSummary_1.CommitSummary generation={generation}/>
        
        <GeneratedContentSection_1.GeneratedContentSection contents={generation.generatedContent} generationId={generation.id}/>
        
        <ImagePromptSection_1.ImagePromptSection prompt={generation.imagePrompt} image={generation.generatedImage}/>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <AiUnderstandingSection_1.AiUnderstandingSection understanding={generation.aiUnderstanding}/>
          <GitAnalysisSection_1.GitAnalysisSection analysis={generation.gitAnalysis}/>
        </div>
      </div>
    </div>);
}
