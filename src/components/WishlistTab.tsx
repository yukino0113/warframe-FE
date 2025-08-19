import { useState } from "react";
import { WishlistItem } from "./WishlistItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, BookmarkPlus, Share2 } from "lucide-react";

const primeItems = [
  { name: "Excalibur Prime", type: "Warframe", isVaulted: true },
  { name: "Mag Prime", type: "Warframe", isVaulted: false },
  { name: "Volt Prime", type: "Warframe", isVaulted: false },
  { name: "Ash Prime", type: "Warframe", isVaulted: true },
  { name: "Ember Prime", type: "Warframe", isVaulted: false },
  { name: "Frost Prime", type: "Warframe", isVaulted: true },
  { name: "Rhino Prime", type: "Warframe", isVaulted: false },
  { name: "Loki Prime", type: "Warframe", isVaulted: true },
  { name: "Nyx Prime", type: "Warframe", isVaulted: false },
  { name: "Nova Prime", type: "Warframe", isVaulted: false },
  { name: "Valkyr Prime", type: "Warframe", isVaulted: true },
  { name: "Saryn Prime", type: "Warframe", isVaulted: false },
  { name: "Braton Prime", type: "Primary Weapon", isVaulted: true },
  { name: "Soma Prime", type: "Primary Weapon", isVaulted: false },
  { name: "Paris Prime", type: "Primary Weapon", isVaulted: false },
  { name: "Lex Prime", type: "Secondary Weapon", isVaulted: true },
  { name: "Kunai Prime", type: "Secondary Weapon", isVaulted: false },
  { name: "Bo Prime", type: "Melee Weapon", isVaulted: true },
  { name: "Nikana Prime", type: "Melee Weapon", isVaulted: false },
  { name: "Scindo Prime", type: "Melee Weapon", isVaulted: false },
];

export const WishlistTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const filteredItems = primeItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemToggle = (itemName: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemName);
    } else {
      newCheckedItems.delete(itemName);
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search prime items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input/50 border-border/50 focus:border-accent focus:ring-accent/20"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="warframe" size="sm">
                <BookmarkPlus className="w-4 h-4" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>Selected: {checkedItems.size} items</span>
            <span>•</span>
            <span>Vaulted items shown in red</span>
          </div>
        </div>
      </Card>

      {/* Items grid */}
      <div className="grid gap-3">
        {filteredItems.map((item) => (
          <WishlistItem
            key={item.name}
            name={item.name}
            type={item.type}
            isVaulted={item.isVaulted}
            isChecked={checkedItems.has(item.name)}
            onToggle={(checked) => handleItemToggle(item.name, checked)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-gradient-card border-border/30">
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No items found matching "{searchTerm}"</p>
          </div>
        </Card>
      )}
    </div>
  );
};