"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = DashboardPage;
const react_query_1 = require("@tanstack/react-query");
const dashboard_api_1 = require("./dashboard.api");
const OverviewCards_1 = require("./components/OverviewCards");
const RecentActivity_1 = require("./components/RecentActivity");
const AuthProvider_1 = require("../auth/AuthProvider");
function DashboardPage() {
    const { user } = (0, AuthProvider_1.useAuth)();
    // Use organizationId from user, fallback for testing
    const organizationId = user?.organizationId || 'org_test_123';
    const { data: stats, isLoading: isStatsLoading, isError: isStatsError } = (0, react_query_1.useQuery)({
        queryKey: ['dashboardStats', organizationId],
        queryFn: () => dashboard_api_1.dashboardApi.getStats(organizationId),
    });
    const { data: generations, isLoading: isGenerationsLoading, isError: isGenerationsError } = (0, react_query_1.useQuery)({
        queryKey: ['recentGenerations', organizationId],
        queryFn: () => dashboard_api_1.dashboardApi.getRecentGenerations(organizationId),
    });
    const isLoading = isStatsLoading || isGenerationsLoading;
    const isError = isStatsError || isGenerationsError;
    if (isError) {
        return (<div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load dashboard</h3>
        <p className="text-gray-500 max-w-md text-center">There was an error communicating with the server. Please try again later or check your connection.</p>
      </div>);
    }
    return (<div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your repository automation and content generation.
        </p>
      </div>
      
      <OverviewCards_1.OverviewCards stats={stats} isLoading={isLoading}/>
      
      <RecentActivity_1.RecentActivity generations={generations} isLoading={isLoading}/>
    </div>);
}
