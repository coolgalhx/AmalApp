import * as React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

export const BotpressChat = () => {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
          {translate("Medical Assistant")}
        </h1>
        
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v3.1/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/16/14/20250716144448-063MB12B.json"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Medical Assistant Chat"
          />
        </div>
      </div>
    </div>
  );
};