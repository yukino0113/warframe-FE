import { useState } from "react";
import { TabNavigation } from "@/components/TabNavigation";
import { WishlistTab } from "@/components/WishlistTab";
import { ReliquaryTab } from "@/components/ReliquaryTab";
import { WelcomeTab } from "@/components/WelcomeTab";
import { WorldState } from "@/pages/WorldState";

const Index = () => {
  const [activeTab, setActiveTab] = useState("welcome");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "wishlist":
        return <WishlistTab />;
      case "reliquary":
        return <ReliquaryTab />;
      case "worldstate":
        return <WorldState />;
      case "welcome":
      default:
        return <WelcomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Index;
