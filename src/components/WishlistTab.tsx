import { useState, useEffect } from "react";
import { WishlistSetItem } from "./WishlistSetItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Share2, Save, Eye, EyeOff } from "lucide-react";
import { PrimeSet } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { getPrimeSetsSession, saveDropSearchResult } from "@/state/sessionStore";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export const WishlistTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());
  const [primeSets, setPrimeSets] = useState<PrimeSet[]>([]);
  const [showVaulted, setShowVaulted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const sets = await getPrimeSetsSession();
        setPrimeSets(sets);
        if (sets.length === 0) {
          toast({
            title: 'No Data',
            description: 'Could not fetch prime sets from API. Please try again later.',
            variant: 'default',
          });
        }
      } catch (e) {
        console.error(e);
        setPrimeSets([]);
        toast({
          title: 'Prime Status Unavailable',
          description: 'Could not fetch prime status. Please try again later.',
          variant: 'default',
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const filteredSets = primeSets.filter(set => {
    const matchesSearch = set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVaulted = showVaulted || !set.isVaulted;
    const matchesType = typeFilter === 'All' || set.type === typeFilter;
    return matchesSearch && matchesVaulted && matchesType;
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
        title: "Empty Selection",
        description: "Please select at least one part to search drops.",
        variant: "destructive",
      });
      return;
    }

    // Build numeric id array from selected parts' apiId
    const allPartsById = new Map<string, { apiId?: number }>();
    primeSets.forEach(set => set.parts.forEach(p => allPartsById.set(p.id, { apiId: p.apiId })));
    const ids = Array.from(selectedParts)
      .map(pid => allPartsById.get(pid)?.apiId)
      .filter((n): n is number => typeof n === 'number');

    if (ids.length === 0) {
      toast({
        title: "No Valid IDs",
        description: "Selected parts do not have API ids. Try after data has loaded from the API.",
        variant: "destructive",
      });
      return;
    }

    try {
      const apiBase = (import.meta as ImportMeta).env?.VITE_API_BASE || '';
      const baseUrl = apiBase ? `${apiBase.replace(/\/$/, '')}/drop/search` : '/api/drop/search';
      const isAbsolute = /^https?:\/\//i.test(baseUrl);
      const isGhPages = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
      const useProxy = isGhPages && isAbsolute;
      const dropUrl = useProxy ? `https://cors.isomorphic-git.org/${baseUrl}` : baseUrl;

      const res = await fetch(dropUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: Array.from(new Set(ids)) }),
      });
      if (!res.ok) throw new Error(`Drop search error: ${res.status}`);
      const result = await res.json();
      saveDropSearchResult(result);
      toast({
        title: "Drop Search Ready",
        description: "Open the Reliquary tab to see the results.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Drop Search Failed",
        description: "Unable to fetch drop locations. Please try again later.",
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
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="w-44">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="Warframe">Warframe</SelectItem>
                    <SelectItem value="Primary Weapon">Primary</SelectItem>
                    <SelectItem value="Secondary Weapon">Secondary</SelectItem>
                    <SelectItem value="Melee Weapon">Melee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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