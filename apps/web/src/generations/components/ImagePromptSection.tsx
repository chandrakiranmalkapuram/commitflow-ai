import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ImageIcon, Wand2 } from 'lucide-react';
import type { ImagePrompt, GeneratedImage } from '../generations.types';

export function ImagePromptSection({ prompt, image }: { prompt?: ImagePrompt, image?: GeneratedImage }) {
  if (!prompt && !image) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-gray-500" />
          Generated Artwork
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {image && (
          <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm relative group">
            {image.status === 'SUCCESS' && image.imageUrl ? (
              <img 
                src={image.imageUrl} 
                alt="Generated Cover" 
                className="w-full h-auto object-cover aspect-video" 
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center bg-gray-100 text-gray-400">
                Image generation {image.status.toLowerCase()}
              </div>
            )}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge className="bg-black/60 text-white border-transparent backdrop-blur-sm">
                {image.provider} ({image.model})
              </Badge>
            </div>
          </div>
        )}

        {prompt && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-gray-500" />
              Image Prompt Data
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Visual Style</span>
                  <p className="text-sm text-gray-900 mt-1">{prompt.visualStyle}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Theme</span>
                  <p className="text-sm text-gray-900 mt-1">{prompt.theme}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Composition</span>
                  <p className="text-sm text-gray-900 mt-1">{prompt.composition}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold">Prompt</span>
                  <p className="text-sm text-gray-700 italic mt-1 bg-white p-2 border border-gray-100 rounded">"{prompt.imagePrompt}"</p>
                </div>
                {prompt.negativePrompt && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold">Negative Prompt</span>
                    <p className="text-sm text-gray-700 italic mt-1 bg-white p-2 border border-gray-100 rounded">"{prompt.negativePrompt}"</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Badge variant="outline">{prompt.aspectRatio}</Badge>
                  <Badge variant="outline">{prompt.colorPalette}</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
