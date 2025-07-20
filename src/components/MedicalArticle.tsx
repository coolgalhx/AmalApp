import * as React from "react";
import { ArrowLeft, Share2, Eye, MessageCircle, Facebook, Twitter, Linkedin, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useDoubleClick } from "@/hooks/useDoubleClick";

interface MedicalArticleProps {
  onBack: () => void;
}

export const MedicalArticle = ({ onBack }: MedicalArticleProps) => {
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const getArticleText = () => {
    return `Medical Article: How to Treat Wound and Further Steps due to Severity. 25.9k views, 657 comments. By Dr. Kevin Gilbert, August 3, 2021. Article content: Identify the degree of the burn. Donec at elit a enim tincidunt ullamcorper in sed quam. In tempus, massa quis sagittis viverra, sapien tellus mollis libero, nec ullamcorper purus quam et tortor.`;
  };

  const handleDoubleClick = useDoubleClick(
    () => speak(getArticleText()),
    () => stop()
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDoubleClick}
            className={isSpeaking ? 'bg-primary/20 text-primary' : ''}
            aria-label={isSpeaking ? "Double-click to stop reading" : "Click to read article aloud, double-click to stop"}
            title={isSpeaking ? "Double-click to stop" : "Click to read aloud, double-click to stop"}
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Article Title */}
        <h1 className="text-lg font-semibold leading-tight">
          How to Treat Wound and Further Steps due to Severity
        </h1>
        
        {/* Metrics */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-primary" />
            <span>25.9k</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>657 Comments</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Wounds
          </Badge>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">KG</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">Dr. Kevin Gilbert</p>
            <p className="text-xs text-muted-foreground">Aug 3, 2021 • 5 mins read</p>
          </div>
        </div>

        {/* Comments Section Header */}
        <div className="pt-2">
          <h2 className="font-semibold text-base">657 Comments</h2>
        </div>

        {/* Article Content */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Identify the degree of the burn</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Donec at elit a enim tincidunt ullamcorper in sed quam. In tempus, massa quis sagittis viverra, sapien tellus mollis libero, nec ullamcorper purus quam et tortor.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Donec at elit a enim tincidunt ullamcorper in sed quam. In tempus, massa quis sagittis viverra, sapien tellus mollis libero, nec ullamcorper purus quam et tortor.
          </p>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            Donec at elit a enim tincidunt ullamcorper in sed quam. In tempus, massa quis sagittis viverra, sapien tellus mollis libero, nec ullamcorper purus quam et tortor.
          </p>
        </div>

        {/* Share Section */}
        <div className="pt-4">
          <p className="text-sm font-medium mb-3">Share:</p>
          <div className="flex gap-3">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
              <Linkedin className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};