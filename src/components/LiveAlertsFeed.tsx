import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";
import SpeakableText from "./SpeakableText";

interface NewsItem {
  id: string;
  source: string;
  time: string;
  title: string;
  image?: string;
  likes: number;
  comments: number;
  isBreaking?: boolean;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    source: "BBC News",
    time: "3 min ago",
    title: "CITIZENS WARNED OF NEW FLU OUTBREAK IN GAZA",
    image: "/lovable-uploads/a11133e5-3419-492d-b52c-1a2e525c0472.png",
    likes: 0,
    comments: 18,
    isBreaking: true
  },
  {
    id: "2", 
    source: "Alpha in Local Updates",
    time: "5 hours ago",
    title: "We have found a Medical facility accepting new patients at this location",
    likes: 0,
    comments: 0
  }
];

export const LiveAlertsFeed = () => {
  const { translate } = useTranslation();
  
  const getPageText = React.useMemo(() => {
    const newsText = mockNews.map(item => 
      `${item.isBreaking ? translate('Breaking news') : translate('News')}: ${translate(item.title)} ${translate('from')} ${item.source}, ${item.time}. ${item.likes} ${translate('likes')}, ${item.comments} ${translate('comments')}.`
    ).join(' ');
    return `${translate('Live Alerts')} ${translate('feed')}. ${newsText}`;
  }, [translate]);

  return (
    <div className="space-y-4 p-4 bg-gradient-medical min-h-screen animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <SpeakableText text={translate("Live Alerts") || "Live Alerts"} as="h1" />
      </div>
      
      {mockNews.map((item, index) => (
        <Card key={item.id} className="medical-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                {item.source.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      <SpeakableText text={item.source} as="span" />
                    </span>
                    <span className="text-muted-foreground text-xs">
                      <SpeakableText text={item.time} as="span" />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="hover-glow">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {item.isBreaking && (
                  <Badge className="bg-gradient-primary medical-badge text-white shadow-colored animate-scale-in">
                    <SpeakableText text={translate("LIVE BREAKING NEWS") || "LIVE BREAKING NEWS"} as="span" />
                  </Badge>
                )}
                
                <SpeakableText text={item.title} as="p" />
                
                {item.image && (
                  <img src={item.image} alt={item.title} className="rounded-lg w-full h-32 object-cover mt-2" />
                )}
                
                <div className="flex items-center space-x-4 pt-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground hover-glow">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{item.likes} {translate("likes")}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground hover-glow">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{item.comments} {translate("comments")}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover-glow">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};