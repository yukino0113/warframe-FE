import { useState, useEffect } from "react";
import { WishlistSetItem } from "./WishlistSetItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Share2, Save, Eye, EyeOff } from "lucide-react";
import { mockPrimeSets, mockFarmLocations, PrimeSet, FarmLocation } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export const WishlistTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [primeSets, setPrimeSets] = useState<PrimeSet[]>([]);
  const [farmLocations, setFarmLocations] = useState<FarmLocation[]>([]);
  const [showVaulted, setShowVaulted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setPrimeSets(mockPrimeSets);
      setFarmLocations(mockFarmLocations);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const filteredSets = primeSets.filter(set => {
    const matchesSearch = set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVaulted = showVaulted || !set.isVaulted;
    
    return matchesSearch && matchesVaulted;
  });

  const handlePartToggle = (partId: string, checked: boolean) => {
    const newSelectedParts = new Set(selectedParts);
    if (checked) {
      newSelectedParts.add(partId);
    } else {
      newSelectedParts.delete(partId);
    }
    setSelectedParts(newSelectedParts);
  };

  const handleSaveWishlist = async () => {
    if (selectedParts.size === 0) {
      toast({
        title: "Empty Wishlist",
        description: "Please select at least one part to save.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call to save wishlist
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Wishlist Saved",
        description: `Successfully saved ${selectedParts.size} parts to your wishlist.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save wishlist. Please try again.",
        variant: "destructive",
      });
    }
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
              <Button
                variant={showVaulted ? "default" : "outline"}
                size="sm"
                onClick={() => setShowVaulted(!showVaulted)}
                className="flex items-center gap-2"
              >
                {showVaulted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {showVaulted ? "Hide Vaulted" : "Show Vaulted"}
              </Button>
              
              <Button variant="warframe" size="sm" onClick={handleSaveWishlist}>
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Selected: {selectedParts.size} parts</span>
            <span>•</span>
            <span>Showing: {filteredSets.length} of {primeSets.length} sets</span>
            <span>•</span>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 bg-destructive rounded-full mr-2"></span>
              Vaulted items
            </Badge>
          </div>
        </div>
      </Card>

      {/* Sets grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredSets.map((set) => (
          <WishlistSetItem
            key={set.id}
            set={set}
            selectedParts={selectedParts}
            onPartToggle={handlePartToggle}
          />
        ))}
      </div>

      {filteredSets.length === 0 && (
        <Card className="bg-gradient-card border-border/30">
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No sets found matching "{searchTerm}"</p>
          </div>
        </Card>
      )}
    </div>
  );
};