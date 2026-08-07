"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitAnalysisSection = GitAnalysisSection;
const card_1 = require("../../components/ui/card");
const badge_1 = require("../../components/ui/badge");
const lucide_react_1 = require("lucide-react");
function GitAnalysisSection({ analysis }) {
    if (!analysis)
        return null;
    const { metrics, languages } = analysis;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-lg flex items-center gap-2">
          <lucide_react_1.FileCode2 className="h-5 w-5 text-gray-500"/>
          Git Analysis
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <lucide_react_1.Files className="h-4 w-4"/> Files Changed
            </div>
            <div className="text-2xl font-semibold text-gray-900">{metrics.totalFilesChanged || 0}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
              <lucide_react_1.Plus className="h-4 w-4"/> Additions
            </div>
            <div className="text-2xl font-semibold text-green-800">+{metrics.totalAdditions || 0}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
              <lucide_react_1.Minus className="h-4 w-4"/> Deletions
            </div>
            <div className="text-2xl font-semibold text-red-800">-{metrics.totalDeletions || 0}</div>
          </div>
        </div>

        {languages && languages.length > 0 && (<div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Languages Detected</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (<badge_1.Badge key={lang} variant="outline" className="bg-gray-50">
                  {lang}
                </badge_1.Badge>))}
            </div>
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
}
