import { useState } from "react";
import { LiveAlertsFeed } from "@/components/LiveAlertsFeed";
import { MedicalLibrary } from "@/components/MedicalLibrary";
import { TriageApp } from "@/components/TriageApp";
import { SignIn } from "@/components/SignIn";
import { MedicalArticle } from "@/components/MedicalArticle";
import { MedicalSearch } from "@/components/MedicalSearch";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [currentView, setCurrentView] = useState<"main" | "signin" | "article" | "search">("main");

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
        return <MedicalLibrary />;
      case "chat":
        return <TriageApp />;
      default:
        return <LiveAlertsFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-medical-bg pb-16">
      {renderMainContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
