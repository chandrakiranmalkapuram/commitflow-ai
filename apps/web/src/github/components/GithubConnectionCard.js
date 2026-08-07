"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubConnectionCard = GithubConnectionCard;
const card_1 = require("../../components/ui/card");
const badge_1 = require("../../components/ui/badge");
const lucide_react_1 = require("lucide-react");
function GithubConnectionCard({ account, isLoading }) {
    const handleConnect = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUri = `${window.location.origin}/settings/github/callback`;
        const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
        window.location.href = oauthUrl;
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-xl flex items-center gap-2">
          <lucide_react_1.GitBranch className="h-5 w-5"/>
          GitHub Connection
        </card_1.CardTitle>
        <p className="text-sm text-gray-500">
          Connect your GitHub account to allow CommitFlow to analyze commits and manage repositories.
        </p>
      </card_1.CardHeader>
      <card_1.CardContent>
        {isLoading ? (<div className="animate-pulse flex items-center gap-4 border border-gray-100 rounded-lg p-4 bg-gray-50">
            <div className="h-12 w-12 bg-gray-200 rounded-full"/>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"/>
              <div className="h-3 w-32 bg-gray-200 rounded"/>
            </div>
          </div>) : account ? (<div className="flex items-center justify-between border border-green-100 rounded-lg p-4 bg-green-50/30">
            <div className="flex items-center gap-4">
              {account.avatarUrl ? (<img src={account.avatarUrl} alt={account.username} className="h-12 w-12 rounded-full border border-gray-200"/>) : (<div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <lucide_react_1.GitBranch className="h-6 w-6 text-gray-400"/>
                </div>)}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{account.username}</h4>
                  <badge_1.Badge variant="success" className="text-[10px] h-5 px-1.5 flex items-center gap-1">
                    <lucide_react_1.CheckCircle2 className="h-3 w-3"/>
                    Connected
                  </badge_1.Badge>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">Connected on {new Date(account.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 h-9 px-4" disabled title="Disconnecting is not supported in this preview">
              <lucide_react_1.Unplug className="mr-2 h-4 w-4"/>
              Disconnect
            </button>
          </div>) : (<div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50/50">
            <div className="rounded-full bg-white p-3 mb-4 shadow-sm border border-gray-100">
              <lucide_react_1.GitBranch className="h-8 w-8 text-gray-400"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Account Connected</h3>
            <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
              You need to connect a GitHub account to start tracking repositories and generating release content.
            </p>
            <button onClick={handleConnect} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-10 px-6 shadow-sm">
              <lucide_react_1.GitBranch className="mr-2 h-4 w-4"/>
              Connect GitHub
            </button>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Requires OAuth App configuration (VITE_GITHUB_CLIENT_ID).
            </p>
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
}
