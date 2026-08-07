"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiUnderstandingSection = AiUnderstandingSection;
const card_1 = require("../../components/ui/card");
const badge_1 = require("../../components/ui/badge");
const lucide_react_1 = require("lucide-react");
function AiUnderstandingSection({ understanding }) {
    if (!understanding)
        return null;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-lg flex items-center gap-2">
          <lucide_react_1.BrainCircuit className="h-5 w-5 text-gray-500"/>
          AI Understanding
        </card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{understanding.featureName}</h3>
            <badge_1.Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
              {understanding.category}
            </badge_1.Badge>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Complexity</span>
            <badge_1.Badge variant={understanding.complexity === 'High' ? 'destructive' : 'default'} className="mt-1">
              {understanding.complexity}
            </badge_1.Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <lucide_react_1.Target className="h-4 w-4 text-gray-500"/>
              Business Summary
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-md">
              {understanding.businessSummary}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <lucide_react_1.Code className="h-4 w-4 text-gray-500"/>
              Technical Summary
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-md">
              {understanding.technicalSummary}
            </p>
          </div>
        </div>

        {understanding.technologiesUsed && understanding.technologiesUsed.length > 0 && (<div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {understanding.technologiesUsed.map(tech => (<badge_1.Badge key={tech} variant="outline">
                  {tech}
                </badge_1.Badge>))}
            </div>
          </div>)}

        {understanding.doNotMentionPublicly && understanding.doNotMentionPublicly.length > 0 && (<div className="bg-red-50 border border-red-100 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-red-800 flex items-center gap-2 mb-2">
              <lucide_react_1.AlertTriangle className="h-4 w-4"/>
              Confidentiality Notice
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {understanding.doNotMentionPublicly.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
}
