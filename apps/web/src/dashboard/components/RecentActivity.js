"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentActivity = RecentActivity;
const table_1 = require("../../components/ui/table");
const badge_1 = require("../../components/ui/badge");
const skeleton_1 = require("../../components/ui/skeleton");
const react_router_dom_1 = require("react-router-dom");
function RecentActivity({ generations, isLoading }) {
    const getStatusVariant = (status) => {
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
        return (<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-8">
        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6 pt-0">
          <table_1.Table>
            <table_1.TableHeader>
              <table_1.TableRow>
                <table_1.TableHead>Repository</table_1.TableHead>
                <table_1.TableHead>Commit</table_1.TableHead>
                <table_1.TableHead>Status</table_1.TableHead>
                <table_1.TableHead className="text-right">Date</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {Array.from({ length: 3 }).map((_, i) => (<table_1.TableRow key={i}>
                  <table_1.TableCell><skeleton_1.Skeleton className="h-4 w-[120px]"/></table_1.TableCell>
                  <table_1.TableCell><skeleton_1.Skeleton className="h-4 w-[80px]"/></table_1.TableCell>
                  <table_1.TableCell><skeleton_1.Skeleton className="h-5 w-[100px] rounded-full"/></table_1.TableCell>
                  <table_1.TableCell className="text-right"><skeleton_1.Skeleton className="h-4 w-[100px] ml-auto"/></table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </div>
      </div>);
    }
    if (!generations || generations.length === 0) {
        return (<div className="rounded-xl border border-gray-200 border-dashed bg-gray-50 shadow-sm mt-8 p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
        <p className="text-gray-500 mb-4">Connect a GitHub repository to start generating AI content from your commits.</p>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gray-900 text-white hover:bg-gray-900/90 h-10 py-2 px-4">
          Connect Repository
        </button>
      </div>);
    }
    return (<div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden mt-8">
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 pt-0">
        <table_1.Table>
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead>Repository</table_1.TableHead>
              <table_1.TableHead>Commit</table_1.TableHead>
              <table_1.TableHead>Status</table_1.TableHead>
              <table_1.TableHead className="text-right">Date</table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>
            {generations.map((gen) => (<table_1.TableRow key={gen.id}>
                <table_1.TableCell className="font-medium">
                  <react_router_dom_1.Link to={`/generations/${gen.id}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    {gen.owner}/{gen.repo}
                  </react_router_dom_1.Link>
                </table_1.TableCell>
                <table_1.TableCell>
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {gen.commitSha.substring(0, 7)}
                  </span>
                </table_1.TableCell>
                <table_1.TableCell>
                  <badge_1.Badge variant={getStatusVariant(gen.status)}>
                    {gen.status.replace('_', ' ')}
                  </badge_1.Badge>
                </table_1.TableCell>
                <table_1.TableCell className="text-right text-gray-500">
                  {new Date(gen.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
                </table_1.TableCell>
              </table_1.TableRow>))}
          </table_1.TableBody>
        </table_1.Table>
      </div>
    </div>);
}
