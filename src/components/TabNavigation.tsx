import { Button } from "@/components/ui/button";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "wishlist", label: "WISHLIST" },
  { id: "reliquary", label: "RELIQUARY" },
  { id: "worldstate", label: "WORLD STATE" },
  { id: "welcome", label: "WELCOME" },
];

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex space-x-1 border-b border-border/50 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="tab"
          onClick={() => onTabChange(tab.id)}
          data-state={activeTab === tab.id ? "active" : "inactive"}
          className="font-bold tracking-wide"
        >
          {tab.label}
        </Button>
      ))}
    </nav>
  );
};