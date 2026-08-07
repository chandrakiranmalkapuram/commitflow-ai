"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubCallbackPage = GithubCallbackPage;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const github_api_1 = require("./github.api");
const lucide_react_1 = require("lucide-react");
function GithubCallbackPage() {
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const code = searchParams.get('code');
    const hasAttempted = (0, react_1.useRef)(false);
    const mutation = (0, react_query_1.useMutation)({
        mutationFn: (authCode) => github_api_1.githubApi.handleCallback(authCode),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['github-account'] });
            navigate('/settings/github', { replace: true });
        },
    });
    (0, react_1.useEffect)(() => {
        if (code && !hasAttempted.current) {
            hasAttempted.current = true;
            mutation.mutate(code);
        }
        else if (!code && !hasAttempted.current) {
            // If there's no code, redirect back
            navigate('/settings/github', { replace: true });
        }
    }, [code, navigate, mutation]);
    if (mutation.isError) {
        return (<div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="rounded-full bg-red-50 p-4 mb-4">
          <lucide_react_1.AlertTriangle className="h-10 w-10 text-red-500"/>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failed</h2>
        <p className="text-gray-500 text-center max-w-md mb-6">
          We couldn't connect your GitHub account. {mutation.error?.message || 'An unknown error occurred.'}
        </p>
        <button onClick={() => navigate('/settings/github')} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-10 px-6">
          Return to Settings
        </button>
      </div>);
    }
    return (<div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-blue-50 animate-pulse"/>
        <div className="relative bg-white rounded-full p-4 shadow-sm border border-gray-100">
          <lucide_react_1.GitBranch className="h-12 w-12 text-gray-900"/>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <lucide_react_1.Loader2 className="h-5 w-5 animate-spin text-blue-600"/>
        Connecting to GitHub
      </h2>
      <p className="text-gray-500">
        Please wait while we securely link your account...
      </p>
    </div>);
}
