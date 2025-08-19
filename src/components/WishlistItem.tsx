import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface WishlistItemProps {
  name: string;
  type: string;
  isVaulted?: boolean;
  isChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const WishlistItem = ({
  name,
  type,
  isVaulted = false,
  isChecked = false,
  onToggle,
}: WishlistItemProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(newChecked);
  };

  return (
    <Card 
      className={`
        bg-gradient-card border transition-all duration-300 hover:scale-[1.02] cursor-pointer group
        ${checked ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-border/30 hover:border-accent/50'}
        ${isVaulted ? 'border-destructive/30 bg-destructive/5' : ''}
      `}
      onClick={handleToggle}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                ${checked 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/30' 
                  : 'border-muted-foreground/50 group-hover:border-accent/70'
                }
              `}
            >
              {checked && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <div>
              <h3 className={`font-semibold ${isVaulted ? 'text-destructive' : 'text-foreground'}`}>
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          </div>
        </div>
        
        {isVaulted && (
          <div className="flex items-center gap-2 text-destructive">
            <X className="w-4 h-4" />
            <span className="text-xs font-medium">VAULTED</span>
          </div>
        )}
      </div>
    </Card>
  );
};