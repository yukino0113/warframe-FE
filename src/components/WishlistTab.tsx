import { useState, useEffect } from "react";
import { WishlistSetItem } from "./WishlistSetItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Share2, Save, Eye, EyeOff } from "lucide-react";
import { mockPrimeSets, mockFarmLocations, PrimeSet, FarmLocation } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

// Type for external prime status API
type PrimeStatusItem = {
  warframe_set: string;
  status: '0' | '1';
  type: string;
  parts: { parts: string; id: number }[];
};

export const WishlistTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [primeSets, setPrimeSets] = useState<PrimeSet[]>([]);
  const [farmLocations, setFarmLocations] = useState<FarmLocation[]>([]);
  const [showVaulted, setShowVaulted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch prime status from external API (use dev proxy by default)
        const statusUrl = import.meta.env.VITE_STATUS_URL || '/api/prime/status';
        const res = await fetch(statusUrl, { method: 'GET' });
        if (!res.ok) throw new Error(`Status API error: ${res.status}`);
        const data: PrimeStatusItem[] = await res.json();

        // Build PrimeSet[] from real data
        const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

        const realPrimeSets: PrimeSet[] = data
          // Only include sets that actually have a Prime with parts
          .filter(item => item.status === '1' && Array.isArray(item.parts) && item.parts.length > 0)
          .map((item) => {
            const baseName = item.warframe_set.trim();
            const setName = /prime$/i.test(baseName) ? baseName : `${baseName} Prime`;
            const setId = slugify(setName);
            // Map API type to our union where possible
            const rawType = (item.type || '').trim();
            const typeMap: Record<string, PrimeSet['type']> = {
              'Warframe': 'Warframe',
              'Primary': 'Primary Weapon',
              'Primary Weapon': 'Primary Weapon',
              'Secondary': 'Secondary Weapon',
              'Secondary Weapon': 'Secondary Weapon',
              'Melee': 'Melee Weapon',
              'Melee Weapon': 'Melee Weapon',
            };
            const mappedType = typeMap[rawType] || 'Warframe';

            const parts = item.parts.map((p: PrimeStatusItem['parts'][number]) => {
              const partName = p.parts || '';
              const partIdNum = p.id;
              const partId = `${setId}-${slugify(partName || String(partIdNum))}`;
              return {
                id: partId,
                name: partName || String(partIdNum),
                setName,
                type: mappedType,
                rarity: 'Common',
                isVaulted: false,
                ducats: 0,
                relics: [],
              };
            });

            const setObj: PrimeSet = {
              id: setId,
              name: setName,
              type: mappedType,
              isVaulted: false,
              parts,
              masteryRank: 0,
              image: undefined,
            };
            return setObj;
          });

        if (realPrimeSets.length > 0) {
          // Merge in any vaulted sets from mock data that aren't present in real API list
          const normalize = (s: string) => s.trim().toLowerCase();
          const realNames = new Set(realPrimeSets.map(s => normalize(s.name)));
          const vaultedMocks = mockPrimeSets.filter(s => s.isVaulted && !realNames.has(normalize(s.name)));
          const merged = [...realPrimeSets, ...vaultedMocks];
          setPrimeSets(merged);
        } else {
          // Fallback to local mock if API returns nothing usable
          setPrimeSets(mockPrimeSets);
        }

        // Set other local data
        setFarmLocations(mockFarmLocations);
      } catch (e) {
        // Non-fatal: fall back to mock data only
        console.error(e);
        setPrimeSets(mockPrimeSets);
        setFarmLocations(mockFarmLocations);
        toast({
          title: 'Prime Status Unavailable',
          description: 'Could not fetch prime status. Showing local data only.',
          variant: 'default',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const filteredSets = primeSets.filter(set => {
    const matchesSearch = set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVaulted = showVaulted || !set.isVaulted;
    return matchesSearch && matchesVaulted;
  });

  const handlePartToggle = (partId: string, checked: boolean) => {
    setSelectedParts((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(partId);
      } else {
        next.delete(partId);
      }
      return next;
    });
  };

  const handleToggleMany = (partIds: string[], checked: boolean) => {
    setSelectedParts((prev) => {
      const next = new Set(prev);
      if (checked) {
        partIds.forEach(id => next.add(id));
      } else {
        partIds.forEach(id => next.delete(id));
      }
      return next;
    });
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

  const handleSelectAllParts = () => {
    const allParts = new Set<string>();
    filteredSets.forEach(set => {
      set.parts.forEach(part => allParts.add(part.id));
    });
    setSelectedParts(allParts);
  };

  const handleDeselectAllParts = () => {
    setSelectedParts(new Set());
  };

  const allPartsSelected = filteredSets.every(set => 
    set.parts.every(part => selectedParts.has(part.id))
  ) && filteredSets.length > 0;


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
                variant={allPartsSelected ? "default" : "outline"}
                size="sm"
                onClick={allPartsSelected ? handleDeselectAllParts : handleSelectAllParts}
                className="flex items-center gap-2"
              >
                {allPartsSelected ? "Deselect All" : "Select All"}
              </Button>
              
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
      <div className="grid grid-cols-4 gap-3">
        {filteredSets.map((set) => (
          <WishlistSetItem
            key={set.id}
            set={set}
            selectedParts={selectedParts}
            onPartToggle={handlePartToggle}
            onToggleMany={handleToggleMany}
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