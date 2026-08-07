"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableRepositories = AvailableRepositories;
const card_1 = require("../../components/ui/card");
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
function AvailableRepositories({ isConnected }) {
    if (!isConnected)
        return null;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-xl flex items-center gap-2">
          <lucide_react_1.GitBranch className="h-5 w-5"/>
          Tracked Repositories
        </card_1.CardTitle>
        <p className="text-sm text-gray-500">
          Repositories that CommitFlow has access to.
        </p>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center">
          <lucide_react_1.GitBranch className="h-8 w-8 text-gray-400 mx-auto mb-3"/>
          <h3 className="text-base font-medium text-gray-900 mb-1">Manage repositories from the dashboard</h3>
          <p className="text-sm text-gray-500 mb-4">
            You can view and manage which repositories are tracked on the Repositories page.
          </p>
          <react_router_dom_1.Link to="/repositories" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-100 h-9 px-4">
            Go to Repositories
          </react_router_dom_1.Link>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
