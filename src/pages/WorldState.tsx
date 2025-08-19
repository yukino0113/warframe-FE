import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, Sword, Shield, Star, Users } from "lucide-react";
import { mockWorldState, WorldStateData } from "@/data/mockData";

export const WorldState = () => {
  const [worldState, setWorldState] = useState<WorldStateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchWorldState = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWorldState(mockWorldState);
      setLoading(false);
    };

    fetchWorldState();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Lith': return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
      case 'Meso': return 'bg-green-600/20 text-green-400 border-green-600/30';
      case 'Neo': return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      case 'Axi': return 'bg-red-600/20 text-red-400 border-red-600/30';
      case 'Requiem': return 'bg-purple-600/20 text-purple-400 border-purple-600/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFactionColor = (faction: string) => {
    switch (faction.toLowerCase()) {
      case 'grineer': return 'text-red-400';
      case 'corpus': return 'text-blue-400';
      case 'infested': return 'text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading world state...</p>
        </div>
      </div>
    );
  }

  if (!worldState) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load world state data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Warframe World State
        </h1>
        <p className="text-muted-foreground">Live game data and active missions</p>
      </div>

      {/* Void Fissures */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Void Fissures</h2>
          </div>
          <div className="grid gap-3">
            {worldState.fissures.map((fissure) => (
              <div key={fissure.id} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <Badge className={getTierColor(fissure.tier)}>
                    {fissure.tier}
                  </Badge>
                  {fissure.isStorm && <Badge variant="destructive" className="text-xs">STORM</Badge>}
                  {fissure.isHard && <Badge variant="outline" className="text-xs">STEEL PATH</Badge>}
                  <div>
                    <p className="font-medium">{fissure.node}</p>
                    <p className="text-sm text-muted-foreground">{fissure.missionType} • {fissure.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {fissure.timeLeft}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Invasions */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sword className="w-5 h-5 text-destructive" />
            <h2 className="text-xl font-semibold">Invasions</h2>
          </div>
          <div className="grid gap-3">
            {worldState.invasions.map((invasion) => (
              <div key={invasion.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{invasion.node}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {invasion.eta}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${getFactionColor(invasion.attacker)}`}>
                    {invasion.attacker}: {invasion.attackerReward}
                  </span>
                  <span className={`text-sm ${getFactionColor(invasion.defender)}`}>
                    {invasion.defender}: {invasion.defenderReward}
                  </span>
                </div>
                <Progress value={invasion.completion} className="h-2" />
                <p className="text-xs text-center text-muted-foreground mt-2">{invasion.completion}% Complete</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Alerts</h2>
            </div>
            <div className="space-y-3">
              {worldState.alerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{alert.node}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {alert.timeLeft}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{alert.missionType} • {alert.level}</p>
                  <Badge variant="outline" className="text-xs">{alert.reward}</Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Baro Ki'Teer */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Baro Ki'Teer</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{worldState.baro.location}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Leaves in</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {worldState.baro.timeLeft}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Featured Items:</p>
                {worldState.baro.inventory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-card/30 rounded">
                    <span className="text-sm">{item.name}</span>
                    <div className="text-xs text-muted-foreground">
                      {item.ducats} <span className="text-primary">◊</span> + {item.credits.toLocaleString()} cr
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sorties */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Daily Sortie</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">{worldState.sorties.boss}</p>
              <p className={`text-sm ${getFactionColor(worldState.sorties.faction)}`}>
                {worldState.sorties.faction}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {worldState.sorties.timeLeft}
            </div>
          </div>
          <div className="space-y-2">
            {worldState.sorties.missions.map((mission, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50">
                <div>
                  <p className="font-medium">{mission.node}</p>
                  <p className="text-sm text-muted-foreground">{mission.type}</p>
                </div>
                <Badge variant="outline" className="text-xs">{mission.modifier}</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Nightwave Challenges */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Nightwave: {worldState.nightwave.season}</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {worldState.nightwave.timeLeft}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Daily Challenges</h3>
              <div className="space-y-2">
                {worldState.nightwave.challenges.daily.map((challenge, index) => (
                  <div key={index} className={`p-2 rounded border ${challenge.completed ? 'bg-green-600/10 border-green-600/30' : 'bg-card/50 border-border/50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{challenge.name}</span>
                      <span className="text-xs text-primary">{challenge.standing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Weekly Challenges</h3>
              <div className="space-y-2">
                {worldState.nightwave.challenges.weekly.map((challenge, index) => (
                  <div key={index} className={`p-2 rounded border ${challenge.completed ? 'bg-green-600/10 border-green-600/30' : 'bg-card/50 border-border/50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{challenge.name}</span>
                      <span className="text-xs text-primary">{challenge.standing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};