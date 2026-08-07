"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewCards = OverviewCards;
const card_1 = require("../../components/ui/card");
const skeleton_1 = require("../../components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
function OverviewCards({ stats, isLoading }) {
    const cards = [
        {
            title: 'Active Repositories',
            value: stats?.repositoryCount ?? 0,
            icon: lucide_react_1.FolderGit2,
            description: 'Connected GitHub repositories',
        },
        {
            title: 'Total Generations',
            value: stats?.generationCount ?? 0,
            icon: lucide_react_1.Bot,
            description: 'AI generations run',
        },
        {
            title: 'Pending Approval',
            value: stats?.pendingApprovalCount ?? 0,
            icon: lucide_react_1.Clock,
            description: 'Content waiting for review',
        },
        {
            title: 'Published Content',
            value: stats?.publishedCount ?? 0,
            icon: lucide_react_1.CheckCircle,
            description: 'Successfully published posts',
        },
    ];
    if (isLoading) {
        return (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (<card_1.Card key={i}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <skeleton_1.Skeleton className="h-4 w-[100px]"/>
              <skeleton_1.Skeleton className="h-4 w-4"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <skeleton_1.Skeleton className="h-8 w-[60px]"/>
              <skeleton_1.Skeleton className="h-3 w-[120px] mt-2"/>
            </card_1.CardContent>
          </card_1.Card>))}
      </div>);
    }
    return (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
            const Icon = card.icon;
            return (<card_1.Card key={i}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </card_1.CardTitle>
              <Icon className="h-4 w-4 text-gray-400"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </card_1.CardContent>
          </card_1.Card>);
        })}
    </div>);
}
