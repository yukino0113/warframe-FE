import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Package, Search, Star, Shield, Zap } from "lucide-react";
import { getDropSearchResult } from "@/state/sessionStore";

interface DropSearchResult {
  area_score: {
    [areaName: string]: {
      score: number;
      A?: { score: number; relic_list: string[] };
      B?: { score: number; relic_list: string[] };
      C?: { score: number; relic_list: string[] };
    };
  };
  relic_score: {
    [relicName: string]: {
      score: number;
      item_list: string[];
    };
  };
}

interface AreaResult {
  name: string;
  score: number;
  rotations: {
    rotation: 'A' | 'B' | 'C';
    score: number;
    relics: string[];
  }[];
  hasFissure?: boolean; // Will be used when API is ready
}

export const ReliquaryTab = () => {
  const result = getDropSearchResult() as DropSearchResult | null;

  const parseResults = (data: DropSearchResult): AreaResult[] => {
    const areas: AreaResult[] = [];
    
    Object.entries(data.area_score).forEach(([areaName, areaData]) => {
      const rotations: AreaResult['rotations'] = [];
      
      // Check for rotations A, B, C
      ['A', 'B', 'C'].forEach((rot) => {
        const rotData = areaData[rot as 'A' | 'B' | 'C'];
        if (rotData && rotData.relic_list.length > 0) {
          rotations.push({
            rotation: rot as 'A' | 'B' | 'C',
            score: rotData.score,
            relics: rotData.relic_list
          });
        }
      });

      // If no rotations found, this might be a non-rotation area
      if (rotations.length === 0 && areaData.score > 0) {
        rotations.push({
          rotation: 'A', // Default for non-rotation areas
          score: areaData.score,
          relics: [] // Will need to be populated if data structure differs
        });
      }

      if (rotations.length > 0) {
        areas.push({
          name: areaName,
          score: areaData.score,
          rotations,
          hasFissure: false // TODO: Will be set based on fissure API
        });
      }
    });

    // Sort by score descending
    return areas.sort((a, b) => b.score - a.score);
  };

  const getAreaType = (areaName: string): string => {
    if (areaName.toLowerCase().includes('survival')) return 'Survival';
    if (areaName.toLowerCase().includes('defense')) return 'Defense';
    if (areaName.toLowerCase().includes('interception')) return 'Interception';
    if (areaName.toLowerCase().includes('excavation')) return 'Excavation';
    if (areaName.toLowerCase().includes('capture')) return 'Capture';
    if (areaName.toLowerCase().includes('exterminate')) return 'Exterminate';
    if (areaName.toLowerCase().includes('rescue')) return 'Rescue';
    if (areaName.toLowerCase().includes('spy')) return 'Spy';
    if (areaName.toLowerCase().includes('sabotage')) return 'Sabotage';
    return 'Mission';
  };

  const getRelicParts = (relicName: string): string[] => {
    if (!result?.relic_score[relicName]) {
      return [];
    }
    return result.relic_score[relicName].item_list || [];
  };

  const cleanRelicName = (relicName: string): string => {
    return relicName.replace(/\s+Relic$/, '');
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Reliquary</h2>
            </div>
            <p className="text-muted-foreground">
              Optimized drop locations for your wishlisted parts, sorted by effectiveness.
            </p>
          </div>
        </Card>

        {/* Explanation */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3">How Scores Work</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Area Score:</strong> Sum of all drop rates in the area across all rotations</p>
              <p>• <strong>Rotation Score:</strong> Sum of all drop rates in that specific rotation</p>
            </div>
          </div>
        </Card>

        {/* Drop Search Results */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-accent" />
              Drop Locations
            </h2>
            
            {!result ? (
              <p className="text-muted-foreground">No results yet. Go to Wishlist and tap Save to search drops.</p>
            ) : (
              <div className="space-y-4">
                {parseResults(result).map((area, idx) => (
                  <div 
                    key={area.name}
                    className={`rounded-lg border transition-all duration-300 ${
                      area.hasFissure 
                        ? 'border-yellow-400/50 bg-yellow-400/5 shadow-[0_0_20px_hsl(45_100%_65%_/_0.2)]' 
                        : 'border-border/30 bg-card/50'
                    }`}
                  >
                    <div className="p-4">
                      {/* Area Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary" />
                            <h3 className="text-lg font-semibold">{area.name}</h3>
                          </div>
                          {area.hasFissure && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10">
                              <Zap className="w-3 h-3 mr-1" />
                              Active Fissure
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-accent">
                            {getAreaType(area.name)}
                          </Badge>
                          <Badge variant="outline" className="text-primary">
                            Score: {area.score.toFixed(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Rotations */}
                      <div className="space-y-2">
                        {area.rotations.map((rotation) => (
                          <div 
                            key={`${area.name}-${rotation.rotation}`}
                            className="flex items-center justify-between p-3 rounded-md bg-muted/20 border border-border/20"
                          >
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="font-mono">
                                {rotation.rotation}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Score: {rotation.score.toFixed(1)}
                              </span>
                            </div>
                            
                            {/* Relics */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {rotation.relics.map((relic) => (
                                <Tooltip key={relic}>
                                  <TooltipTrigger asChild>
                                     <Badge 
                                       variant="secondary" 
                                       className="cursor-help hover:bg-accent/20 transition-colors"
                                     >
                                       <Shield className="w-3 h-3 mr-1" />
                                       {cleanRelicName(relic)}
                                     </Badge>
                                   </TooltipTrigger>
                                   <TooltipContent>
                                     <div className="p-2">
                                       <p className="font-semibold mb-1">{cleanRelicName(relic)}</p>
                                       <p className="text-xs text-muted-foreground mb-1">Parts contained:</p>
                                       <ul className="text-xs space-y-1">
                                         {getRelicParts(relic).map((part) => (
                                          <li key={part} className="flex items-center gap-1">
                                            <div className="w-1 h-1 rounded-full bg-accent" />
                                            {part}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {parseResults(result).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No viable drop locations found for your selected parts.
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};