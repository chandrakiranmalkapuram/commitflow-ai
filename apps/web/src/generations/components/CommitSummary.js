"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitSummary = CommitSummary;
const card_1 = require("../../components/ui/card");
const badge_1 = require("../../components/ui/badge");
const lucide_react_1 = require("lucide-react");
function CommitSummary({ generation }) {
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
    return (<card_1.Card>
      <card_1.CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <card_1.CardTitle className="text-xl">Generation Pipeline</card_1.CardTitle>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <lucide_react_1.GitBranch className="h-4 w-4"/>
              {generation.owner}/{generation.repo}
            </div>
            <div className="flex items-center gap-1.5">
              <lucide_react_1.GitCommit className="h-4 w-4"/>
              <span className="font-mono">{generation.commitSha.substring(0, 7)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <lucide_react_1.Clock className="h-4 w-4"/>
              {new Date(generation.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <badge_1.Badge variant={getStatusVariant(generation.status)} className="text-sm px-3 py-1">
          {generation.status.replace('_', ' ')}
        </badge_1.Badge>
      </card_1.CardHeader>
    </card_1.Card>);
}
