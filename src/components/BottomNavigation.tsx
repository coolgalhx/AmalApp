import React from "react";
import { Home, Search, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const { translate } = useTranslation();
  
  const navItems = [
    { id: "alerts", icon: Home, label: translate("Home") },
    { id: "library", icon: Search, label: translate("Library") }, 
    { id: "chat", icon: MessageCircle, label: translate("Chat") },
    { id: "profile", icon: User, label: translate("Profile") }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};