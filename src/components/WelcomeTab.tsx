import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ListCheck, 
  Map, 
  Share2, 
  BookmarkPlus, 
  Zap,
  AlertTriangle,
  ExternalLink 
} from "lucide-react";

export const WelcomeTab = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-hero border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center animate-glow">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome to the Warframe Reliquary
              </h1>
              <p className="text-muted-foreground mt-1">
                Prime wishlist, relic planning, and fissure tracking tool
              </p>
            </div>
          </div>
          
          <p className="text-foreground/90 mb-6 max-w-2xl">
            To get started, check a couple items on the <strong>Wishlist</strong> tab, 
            then go to the <strong>Reliquary</strong> tab to see all the relevant information. 
            Saving your wishlist is not necessary, but provides extra functionality.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="warframe" size="lg">
              <ListCheck className="w-5 h-5" />
              Start Building Wishlist
            </Button>
            <Button variant="outline" size="lg">
              <Map className="w-5 h-5" />
              View Reliquary
            </Button>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Wishlist Tracking */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center">
                <ListCheck className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Wishlist Tracking</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Check any item on the Wishlist page to mark as wanted</p>
              <p>• Save your wishlist to gain extra functionality</p>
              <p>• <span className="text-destructive font-medium">Vaulted items will be listed in red</span></p>
            </div>
          </div>
        </Card>

        {/* Relic Planning */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                <Map className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Relic Planning</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Relics containing wishlisted items shown on Reliquary page</p>
              <p>• Starmap location groups that reward these relics are listed</p>
              <p>• <span className="text-primary font-medium">Groups highlighted in gold have active fissures</span></p>
            </div>
          </div>
        </Card>

        {/* Wishlist Saving */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center">
                <BookmarkPlus className="w-4 h-4 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Wishlist Saving</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Generate two keys when saving your wishlist</p>
              <p>• <strong>Private key:</strong> Bookmark for safekeeping</p>
              <p>• <strong>Public key:</strong> Share with friends</p>
            </div>
          </div>
        </Card>

        {/* Wishlist Sharing */}
        <Card className="bg-gradient-card border-border/30">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Wishlist Sharing</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Share your public key with squad members</p>
              <p>• View shared wishlists from others</p>
              <p>• Coordinate relic runs efficiently</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notices */}
      <div className="space-y-4">
        <Card className="bg-destructive/10 border-destructive/30">
          <div className="p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-destructive font-medium mb-1">Notice:</p>
              <p className="text-destructive/90">
                Currently most, but not all railjack relic sources are shown. Working on the rest.
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-accent/10 border-accent/30">
          <div className="p-4 flex gap-3">
            <ExternalLink className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-accent font-medium mb-1">Data Source:</p>
              <p className="text-accent/90">
                This site reads from{" "}
                <a 
                  href="https://warframe.com/droptables" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-accent"
                >
                  DE's published drop tables
                </a>
                . If an item is missing, please verify it's listed there first.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Rotation Info */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Relic System and Rotations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">How it works:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Upper section shows what relics contain which items</p>
                <p>• Lower section shows drop tables for obtaining relics</p>
                <p>• This is not connected to opening relics, only obtaining them</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Rotations are rewarded like so:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">A</Badge>
                  <span className="text-muted-foreground">5/10 minutes, 5/10 waves, Excavator 1/2, Vault/Cache 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">B</Badge>
                  <span className="text-muted-foreground">15 minutes, 15 waves, Excavator 3, Vault/Cache 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">C</Badge>
                  <span className="text-muted-foreground">20 minutes, 20 waves, Excavator 4, Vault/Cache 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};