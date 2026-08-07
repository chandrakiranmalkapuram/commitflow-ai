"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubSettingsPage = GithubSettingsPage;
const react_query_1 = require("@tanstack/react-query");
const github_api_1 = require("./github.api");
const GithubConnectionCard_1 = require("./components/GithubConnectionCard");
const AvailableRepositories_1 = require("./components/AvailableRepositories");
function GithubSettingsPage() {
    const { data: account, isLoading, isError } = (0, react_query_1.useQuery)({
        queryKey: ['github-account'],
        queryFn: github_api_1.githubApi.getAccount,
        retry: false, // Don't retry if it returns 404 (not connected)
    });
    const isConnected = !!account && !isError;
    return (<div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">GitHub Integration</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your GitHub account connection and permissions.
        </p>
      </div>

      <GithubConnectionCard_1.GithubConnectionCard account={account} isLoading={isLoading}/>

      <AvailableRepositories_1.AvailableRepositories isConnected={isConnected}/>
    </div>);
}
