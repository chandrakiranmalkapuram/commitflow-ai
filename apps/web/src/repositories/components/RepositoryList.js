"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryList = RepositoryList;
const table_1 = require("../../components/ui/table");
const badge_1 = require("../../components/ui/badge");
const skeleton_1 = require("../../components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
const react_query_1 = require("@tanstack/react-query");
const repositories_api_1 = require("../repositories.api");
function RepositoryList({ repositories, isLoading }) {
    const queryClient = (0, react_query_1.useQueryClient)();
    const toggleMutation = (0, react_query_1.useMutation)({
        mutationFn: ({ id, active }) => repositories_api_1.repositoriesApi.toggleActive(id, active),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['repositories'] });
        },
    });
    if (isLoading) {
        return (<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-6">
        <table_1.Table>
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead>Repository</table_1.TableHead>
              <table_1.TableHead>Default Branch</table_1.TableHead>
              <table_1.TableHead>Status</table_1.TableHead>
              <table_1.TableHead className="text-right">Actions</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            {Array.from({ length: 3 }).map((_, i) => (<table_1.TableRow key={i}>
                <table_1.TableCell><skeleton_1.Skeleton className="h-4 w-[160px]"/></table_1.TableCell>
                <table_1.TableCell><skeleton_1.Skeleton className="h-4 w-[80px]"/></table_1.TableCell>
                <table_1.TableCell><skeleton_1.Skeleton className="h-5 w-[70px] rounded-full"/></table_1.TableCell>
                <table_1.TableCell className="text-right"><skeleton_1.Skeleton className="h-8 w-[90px] ml-auto rounded-md"/></table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>
      </div>);
    }
    if (!repositories || repositories.length === 0) {
        return (<div className="rounded-xl border border-gray-200 border-dashed bg-gray-50 shadow-sm mt-6 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
          <lucide_react_1.GitBranch className="h-6 w-6 text-gray-600"/>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No repositories connected</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">Connect your GitHub account to select which repositories should generate automated content.</p>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-900 text-white hover:bg-gray-900/90 h-10 py-2 px-4" onClick={() => alert("GitHub OAuth flow will be implemented later")}>
          <lucide_react_1.GitBranch className="mr-2 h-4 w-4"/>
          Connect GitHub
        </button>
      </div>);
    }
    return (<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-6">
      <table_1.Table>
        <table_1.TableHeader>
          <table_1.TableRow>
            <table_1.TableHead>Repository</table_1.TableHead>
            <table_1.TableHead>Default Branch</table_1.TableHead>
            <table_1.TableHead>Status</table_1.TableHead>
            <table_1.TableHead className="text-right">Actions</table_1.TableHead>
          </table_1.TableRow>
        </table_1.TableHeader>
        <table_1.TableBody>
          {repositories.map((repo) => (<table_1.TableRow key={repo.id}>
              <table_1.TableCell>
                <div className="flex items-center gap-2">
                  <lucide_react_1.GitBranch className="h-4 w-4 text-gray-500"/>
                  <span className="font-medium text-gray-900">{repo.owner}/{repo.name}</span>
                </div>
              </table_1.TableCell>
              <table_1.TableCell>
                <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {repo.defaultBranch}
                </span>
              </table_1.TableCell>
              <table_1.TableCell>
                <badge_1.Badge variant={repo.active ? 'success' : 'default'}>
                  {repo.active ? 'Active' : 'Inactive'}
                </badge_1.Badge>
              </table_1.TableCell>
              <table_1.TableCell className="text-right">
                <button onClick={() => toggleMutation.mutate({ id: repo.id, active: !repo.active })} disabled={toggleMutation.isPending && toggleMutation.variables?.id === repo.id} className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-8 px-3">
                  {toggleMutation.isPending && toggleMutation.variables?.id === repo.id && (<lucide_react_1.Loader2 className="mr-2 h-3 w-3 animate-spin"/>)}
                  {repo.active ? 'Deactivate' : 'Activate'}
                </button>
              </table_1.TableCell>
            </table_1.TableRow>))}
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
