import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { FileCode2, Files, Plus, Minus } from 'lucide-react';
import type { GitAnalysis } from '../generations.types';

export function GitAnalysisSection({ analysis }: { analysis?: GitAnalysis }) {
  if (!analysis) return null;

  const { metrics, languages } = analysis;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-gray-500" />
          Git Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Files className="h-4 w-4" /> Files Changed
            </div>
            <div className="text-2xl font-semibold text-gray-900">{metrics.totalFilesChanged || 0}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-700 mb-1">
              <Plus className="h-4 w-4" /> Additions
            </div>
            <div className="text-2xl font-semibold text-green-800">+{metrics.totalAdditions || 0}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-red-700 mb-1">
              <Minus className="h-4 w-4" /> Deletions
            </div>
            <div className="text-2xl font-semibold text-red-800">-{metrics.totalDeletions || 0}</div>
          </div>
        </div>

        {languages && languages.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Languages Detected</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <Badge key={lang} variant="outline" className="bg-gray-50">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
