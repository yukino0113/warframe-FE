import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PrimeSet } from "@/data/mockData";

interface WishlistSetItemProps {
  set: PrimeSet;
  selectedParts: Set<string>;
  onPartToggle: (partId: string, checked: boolean) => void;
  onToggleMany: (partIds: string[], checked: boolean) => void;
}

export const WishlistSetItem = ({ set, selectedParts, onPartToggle, onToggleMany }: WishlistSetItemProps) => {
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
    const partIds = set.parts.map(p => p.id);
    if (allPartsSelected) {
      // Deselect all parts in one batched update
      onToggleMany(partIds, false);
    } else {
      // Select all parts in one batched update
      onToggleMany(partIds, true);
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
      <div className="p-4">
        {/* Set name */}
        <div className="flex items-center justify-between mb-2">
          <h3 className={cn(
            "font-semibold text-lg transition-colors flex items-center gap-2",
            selectedPartsInSet.length > 0 ? "text-accent" : "text-foreground",
            set.isVaulted && "text-destructive"
          )}>
            <span className="text-xl">{getTypeIcon(set.type)}</span>
            {set.name}
          </h3>
          
          <div className="flex items-center gap-2">
            {/* Vaulted icon */}
            {set.isVaulted && (
              <Badge variant="destructive" className="text-xs">
                VAULTED
              </Badge>
            )}
          </div>
        </div>

        {/* Type / Select parts count */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground">{set.type}</div>
            <div className="text-xs text-muted-foreground mt-1">{selectedPartsInSet.length}/{set.parts.length} parts selected</div>
          </div>
          
          {/* Select all */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs h-7"
          >
            {allPartsSelected ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
        
        {/* Parts */}
        <div className="flex flex-wrap gap-2 justify-start">
          {set.parts.map((part) => {
            // Auto-adjust font size based on text length
            const getTextSizeClass = (text: string) => {
              if (text.length > 20) return "text-xs";
              if (text.length > 15) return "text-xs";
              return "text-sm";
            };

            return (
              <div
                key={part.id}
                className={cn(
                  "px-2 py-2 rounded-md border transition-all cursor-pointer flex-shrink-0",
                  selectedParts.has(part.id)
                    ? "bg-accent/10 border-accent/30"
                    : "bg-card/50 border-border/30 hover:border-accent/20"
                )}
                onClick={() => onPartToggle(part.id, !selectedParts.has(part.id))}
              >
                <p className={cn(
                  "font-medium text-center whitespace-nowrap",
                  getTextSizeClass(part.name),
                  selectedParts.has(part.id) ? "text-accent" : "text-foreground"
                )}>
                  {part.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};