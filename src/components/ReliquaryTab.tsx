import { Card } from "@/components/ui/card";
import { Package, Search } from "lucide-react";
import { getDropSearchResult } from "@/state/sessionStore";

export const ReliquaryTab = () => {
  // No mock data or fake selections; this tab shows results from the real /drop/search only.

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
            Results for your wishlisted parts. Generate results from the Wishlist tab.
          </p>
        </div>
      </Card>

      {/* Drop Search Results */}
      <Card className="bg-gradient-card border-border/30">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-accent" />
            Drop Search Results
          </h2>
          {(() => {
            const result = getDropSearchResult();
            if (!result) {
              return (
                <p className="text-muted-foreground">No results yet. Go to Wishlist and tap Save to search drops.</p>
              );
            }
            return (
              <div className="rounded-md border border-border/30 bg-card/50 p-4 overflow-auto">
                <pre className="text-xs whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
              </div>
            );
          })()}
        </div>
      </Card>
    </div>
  );
};