import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PrimeSet } from "@/data/mockData";

interface WishlistSetItemProps {
  set: PrimeSet;
  selectedParts: Set<string>;
  onPartToggle: (partId: string, checked: boolean) => void;
}

export const WishlistSetItem = ({ set, selectedParts, onPartToggle }: WishlistSetItemProps) => {
  const selectedPartsInSet = set.parts.filter(part => selectedParts.has(part.id));
  const allPartsSelected = selectedPartsInSet.length === set.parts.length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Warframe': return '⚡';
      case 'Primary Weapon': return '🔫';
      case 'Secondary Weapon': return '🔸';
      case 'Melee Weapon': return '⚔️';
      default: return '📦';
    }
  };

  const handleSelectAll = () => {
    if (allPartsSelected) {
      // Deselect all parts
      set.parts.forEach(part => onPartToggle(part.id, false));
    } else {
      // Select all parts
      set.parts.forEach(part => onPartToggle(part.id, true));
    }
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-300 border-border/30 h-full",
        "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
        selectedPartsInSet.length > 0
          ? "bg-gradient-to-r from-accent/10 to-primary/5 border-accent/50" 
          : "bg-gradient-card",
        set.isVaulted && "border-l-4 border-l-destructive"
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{getTypeIcon(set.type)}</span>
              <h3 className={cn(
                "font-semibold text-xl transition-colors",
                selectedPartsInSet.length > 0 ? "text-accent" : "text-foreground",
                set.isVaulted && "text-destructive"
              )}>
                {set.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{set.type}</span>
              <span>•</span>
              <span>{selectedPartsInSet.length}/{set.parts.length} parts selected</span>
              {set.isVaulted && (
                <>
                  <span>•</span>
                  <Badge variant="destructive" className="text-xs">
                    VAULTED
                  </Badge>
                </>
              )}
            </div>
          </div>
          
          {selectedPartsInSet.length > 0 && (
            <div className={cn(
              "w-8 h-8 rounded-full border-2 bg-accent border-accent shadow-glow flex items-center justify-center shrink-0"
            )}>
              <div className="w-4 h-4 bg-accent-foreground rounded-full" />
            </div>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs"
          >
            {allPartsSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        
        <div className="space-y-3">
          {set.parts.map((part) => (
            <div
              key={part.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                selectedParts.has(part.id)
                  ? "bg-accent/10 border-accent/30"
                  : "bg-card/50 border-border/30 hover:border-accent/20"
              )}
              onClick={() => onPartToggle(part.id, !selectedParts.has(part.id))}
            >
              <div className="flex-1">
                <p className="font-medium">{part.name}</p>
                {part.relics.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Relics: {part.relics.slice(0, 2).join(', ')}
                    {part.relics.length > 2 && ` +${part.relics.length - 2} more`}
                  </p>
                )}
              </div>
              
              <div className={cn(
                "w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center shrink-0",
                selectedParts.has(part.id)
                  ? "bg-accent border-accent" 
                  : "border-border hover:border-accent/50"
              )}>
                {selectedParts.has(part.id) && (
                  <div className="w-3 h-3 bg-accent-foreground rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};