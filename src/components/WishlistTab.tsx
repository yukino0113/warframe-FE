import { useState, useEffect } from "react";
import { WishlistItem } from "./WishlistItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookmarkPlus, Share2, Save, Filter } from "lucide-react";
import { mockPrimeParts, mockFarmLocations, PrimePart, FarmLocation } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export const WishlistTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [primeParts, setPrimeParts] = useState<PrimePart[]>([]);
  const [farmLocations, setFarmLocations] = useState<FarmLocation[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setPrimeParts(mockPrimeParts);
      setFarmLocations(mockFarmLocations);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const filteredItems = primeParts.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.setName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "vaulted" && item.isVaulted) ||
                         (filter === "available" && !item.isVaulted) ||
                         (filter === "selected" && checkedItems.has(item.id));
    
    const matchesRarity = rarityFilter === "all" || item.rarity === rarityFilter;
    
    return matchesSearch && matchesFilter && matchesRarity;
  });

  const handleItemToggle = (itemId: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const handleSaveWishlist = async () => {
    if (checkedItems.size === 0) {
      toast({
        title: "Empty Wishlist",
        description: "Please select at least one item to save.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call to save wishlist
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Wishlist Saved",
        description: `Successfully saved ${checkedItems.size} items to your wishlist.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRelevantFarmLocations = () => {
    const selectedParts = primeParts.filter(part => checkedItems.has(part.id));
    const relicsNeeded = new Set<string>();
    
    selectedParts.forEach(part => {
      part.relics.forEach(relic => relicsNeeded.add(relic));
    });
    
    return farmLocations.filter(location => 
      Array.from(relicsNeeded).some(relic => 
        relic.toLowerCase().includes(location.mission.toLowerCase())
      )
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading prime parts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search prime parts, sets, or types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input/50 border-border/50 focus:border-accent focus:ring-accent/20"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="vaulted">Vaulted</SelectItem>
                  <SelectItem value="selected">Selected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={rarityFilter} onValueChange={setRarityFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarity</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Uncommon">Uncommon</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="warframe" size="sm" onClick={handleSaveWishlist}>
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Selected: {checkedItems.size} items</span>
            <span>•</span>
            <span>Showing: {filteredItems.length} of {primeParts.length} parts</span>
            <span>•</span>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
              Vaulted items
            </Badge>
          </div>
        </div>
      </Card>

      {/* Items grid */}
      <div className="grid gap-3">
        {filteredItems.map((item) => (
          <WishlistItem
            key={item.id}
            name={item.name}
            type={item.type}
            setName={item.setName}
            rarity={item.rarity}
            ducats={item.ducats}
            relics={item.relics}
            isVaulted={item.isVaulted}
            isChecked={checkedItems.has(item.id)}
            onToggle={(checked) => handleItemToggle(item.id, checked)}
          />
        ))}
      </div>

      {/* Efficient Farm Locations */}
      {checkedItems.size > 0 && (
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-accent" />
              Efficient Farm Locations
            </h2>
            <p className="text-muted-foreground mb-4">
              Best locations to farm relics for your selected items
            </p>
            
            {getRelevantFarmLocations().length > 0 ? (
              <div className="grid gap-3">
                {getRelevantFarmLocations().map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium">{location.mission}, {location.planet}</p>
                      <p className="text-sm text-muted-foreground">
                        {location.type} • {location.level} • {location.dropChance}% drop rate
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          Efficiency: {location.efficiency}/10
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{location.averageTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>Select items with available relics to see farming locations</p>
              </div>
            )}
          </div>
        </Card>
      )}

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