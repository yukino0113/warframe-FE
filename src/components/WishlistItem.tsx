import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WishlistItemProps {
  name: string;
  type: string;
  setName: string;
  rarity: 'Common' | 'Uncommon' | 'Rare';
  ducats: number;
  relics: string[];
  isVaulted?: boolean;
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

export const WishlistItem = ({ 
  name, 
  type, 
  setName, 
  rarity, 
  ducats, 
  relics, 
  isVaulted = false, 
  isChecked, 
  onToggle 
}: WishlistItemProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle(newChecked);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
      case 'Uncommon': return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      case 'Rare': return 'bg-purple-600/20 text-purple-400 border-purple-600/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 border-border/30",
        "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
        checked 
          ? "bg-gradient-to-r from-accent/10 to-primary/5 border-accent/50" 
          : "bg-gradient-card",
        isVaulted && "border-l-4 border-l-destructive"
      )}
      onClick={handleToggle}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-medium transition-colors",
                checked ? "text-accent" : "text-foreground",
                isVaulted && "text-destructive"
              )}>
                {name}
              </h3>
              <Badge className={getRarityColor(rarity)}>
                {rarity}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">{setName} • {type}</p>
            
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="text-primary">◊</span>
                {ducats} Ducats
              </span>
              {relics.length > 0 && (
                <span>
                  Relics: {relics.slice(0, 2).join(', ')}
                  {relics.length > 2 && ` +${relics.length - 2} more`}
                </span>
              )}
            </div>
            
            {isVaulted && (
              <Badge variant="destructive" className="text-xs mt-2">
                VAULTED
              </Badge>
            )}
          </div>
          
          <div className={cn(
            "w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center shrink-0",
            checked 
              ? "bg-accent border-accent shadow-glow" 
              : "border-border group-hover:border-accent/50"
          )}>
            {checked && (
              <div className="w-3 h-3 bg-accent-foreground rounded-full" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};