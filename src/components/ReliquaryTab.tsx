import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  AlertCircle,
  Search
} from "lucide-react";
import { mockPrimeSets, mockFarmLocations, PrimeSet, FarmLocation } from "@/data/mockData";

export const ReliquaryTab = () => {
  const [primeSets, setPrimeSets] = useState<PrimeSet[]>([]);
  const [farmLocations, setFarmLocations] = useState<FarmLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock selected parts - in real app this would come from wishlist context
  const [selectedParts] = useState<Set<string>>(new Set([
    'mag-prime-systems', 'soma-prime-barrel', 'lex-prime-barrel'
  ]));

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setPrimeSets(mockPrimeSets);
      setFarmLocations(mockFarmLocations);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const getRelevantFarmLocations = () => {
    const allSelectedParts = primeSets.flatMap(set => 
      set.parts.filter(part => selectedParts.has(part.id))
    );
    const relicsNeeded = new Set<string>();
    
    allSelectedParts.forEach(part => {
      part.relics.forEach(relic => relicsNeeded.add(relic));
    });
    
    return farmLocations.filter(location => 
      Array.from(relicsNeeded).some(relic => 
        relic.toLowerCase().includes(location.mission.toLowerCase())
      )
    );
  };

  // Mock data for demonstration
  const relicsData = [
    {
      name: "Lith M4",
      type: "Lith",
      items: ["Mag Prime Systems", "Mag Prime Neuroptics"],
      rarity: ["Rare", "Uncommon"],
    },
    {
      name: "Neo S7",
      type: "Neo", 
      items: ["Soma Prime Barrel", "Soma Prime Stock"],
      rarity: ["Rare", "Common"],
    },
    {
      name: "Axi S3",
      type: "Axi",
      items: ["Soma Prime Barrel", "Soma Prime Blueprint"],
      rarity: ["Rare", "Common"],
    },
  ];

  const fissureLocations = [
    {
      name: "Hepit (Void)",
      type: "Capture",
      era: "Lith",
      isActive: true,
      timeLeft: "1h 23m",
    },
    {
      name: "Ukko (Void)",
      type: "Capture", 
      era: "Neo",
      isActive: true,
      timeLeft: "2h 45m",
    },
    {
      name: "Mot (Void)",
      type: "Survival",
      era: "Axi",
      isActive: false,
      timeLeft: "",
    },
  ];

  const getRelicTypeColor = (type: string) => {
    switch (type) {
      case "Lith": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Meso": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Neo": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Axi": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-gray-400";
      case "Uncommon": return "text-green-400";
      case "Rare": return "text-yellow-400";
      default: return "text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reliquary data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Reliquary</h2>
          </div>
          <p className="text-muted-foreground">
            Relics containing your wishlisted items and where to find them
          </p>
        </div>
      </Card>

      {/* Efficient Farm Locations */}
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
              <p>Select items from wishlist to see farming locations</p>
            </div>
          )}
        </div>
      </Card>

    </div>
  );
};