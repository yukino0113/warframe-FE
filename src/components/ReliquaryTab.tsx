import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  AlertCircle 
} from "lucide-react";

export const ReliquaryTab = () => {
  // Mock data for demonstration
  const relicsData = [
    {
      name: "Lith V8",
      type: "Lith",
      items: ["Mag Prime Neuroptics", "Soma Prime Stock"],
      rarity: ["Common", "Uncommon"],
    },
    {
      name: "Meso N11",
      type: "Meso", 
      items: ["Volt Prime Systems", "Paris Prime Grip"],
      rarity: ["Rare", "Common"],
    },
    {
      name: "Neo S14",
      type: "Neo",
      items: ["Ember Prime Blueprint", "Nikana Prime Blade"],
      rarity: ["Uncommon", "Rare"],
    },
    {
      name: "Axi R3",
      type: "Axi",
      items: ["Rhino Prime Blueprint", "Scindo Prime Handle"],
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
      era: "Axi",
      isActive: true,
      timeLeft: "2h 45m",
    },
    {
      name: "Helene (Saturn)",
      type: "Defense",
      era: "Meso",
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

      {/* Enhanced mock data display */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Active Reliquary
            </h3>
            <p className="text-muted-foreground mb-4">
              Currently tracking relics and optimal farming locations
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                <span className="text-sm">Tracked Items:</span>
                <Badge variant="outline">23 Parts</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                <span className="text-sm">Active Relics:</span>
                <Badge variant="outline">8 Relics</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                <span className="text-sm">Efficiency Score:</span>
                <Badge className="bg-primary/20 text-primary">8.5/10</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">12 Available Fissures</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">3 Vaulted Relics Needed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Average Farm Time: 15min</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Relics Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Relevant Relics
        </h3>
        <div className="grid gap-4">
          {relicsData.map((relic) => (
            <Card key={relic.name} className="bg-gradient-card border-border/30">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getRelicTypeColor(relic.type)}>
                      {relic.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {relic.type} Era
                    </span>
                  </div>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
                
                <div className="space-y-2">
                  {relic.items.map((item, index) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-sm">{item}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRarityColor(relic.rarity[index])}`}
                      >
                        {relic.rarity[index]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Fissure Locations */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          Fissure Locations
        </h3>
        <div className="grid gap-4">
          {fissureLocations.map((location) => (
            <Card 
              key={location.name} 
              className={`
                bg-gradient-card border-border/30 transition-all duration-300
                ${location.isActive ? 'border-primary/50 shadow-lg shadow-primary/20' : ''}
              `}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge className={getRelicTypeColor(location.era)}>
                      {location.era}
                    </Badge>
                    <span className="font-medium">{location.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {location.type}
                    </Badge>
                  </div>
                  
                  {location.isActive && (
                    <div className="flex items-center gap-2 text-primary">
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span className="text-sm font-medium">ACTIVE</span>
                    </div>
                  )}
                </div>
                
                {location.isActive && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Time remaining: {location.timeLeft}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};