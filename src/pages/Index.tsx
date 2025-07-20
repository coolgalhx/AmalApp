import * as React from "react";
import { LiveAlertsFeed } from "@/components/LiveAlertsFeed";
import { EnhancedOfflineLibrary } from "@/components/EnhancedOfflineLibrary";
import { MedicalLibrary } from "@/components/MedicalLibrary";
import { TriageApp } from "@/components/TriageApp";
import { BotpressChat } from "@/components/BotpressChat";
import { SignIn } from "@/components/SignIn";
import { MedicalArticle } from "@/components/MedicalArticle";
import { MedicalSearch } from "@/components/MedicalSearch";
import { BottomNavigation } from "@/components/BottomNavigation";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  const [activeTab, setActiveTab] = React.useState("alerts");
  const [currentView, setCurrentView] = React.useState<"main" | "signin" | "article" | "search">("main");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "profile") {
      setCurrentView("signin");
    } else {
      setCurrentView("main");
    }
  };

  const handleBackToMain = () => {
    setCurrentView("main");
  };

  // Show sign in screen
  if (currentView === "signin") {
    return <SignIn />;
  }

  // Show article view
  if (currentView === "article") {
    return <MedicalArticle onBack={handleBackToMain} />;
  }

  // Show search view
  if (currentView === "search") {
    return <MedicalSearch onBack={handleBackToMain} />;
  }

  // Main app content
  const renderMainContent = () => {
    switch (activeTab) {
      case "alerts":
        return <LiveAlertsFeed />;
      case "library":
        return <EnhancedOfflineLibrary primaryCause="injury" onBack={() => {}} />;
      case "chat":
        return <TriageApp />;
      case "botpress":
        return <BotpressChat />;
      default:
        return <LiveAlertsFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-medical-bg pb-16 relative">
      {/* Language Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      {renderMainContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;