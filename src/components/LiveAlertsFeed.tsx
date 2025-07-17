import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="space-y-4 p-4 bg-medical-bg min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Live Alerts Feed</h1>
      </div>
      
      {mockNews.map((item) => (
        <Card key={item.id} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {item.source.split(' ').map(word => word[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{item.source}</span>
                    <span className="text-muted-foreground text-xs">{item.time}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                {item.isBreaking && (
                  <Badge className="bg-news-badge text-white text-xs font-bold">
                    LIVE BREAKING NEWS
                  </Badge>
                )}
                
                <p className="text-sm font-medium leading-relaxed">
                  {item.title}
                </p>
                
                {item.image && (
                  <div className="mt-3">
                    <img 
                      src={item.image} 
                      alt="News" 
                      className="w-full rounded-lg max-h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-4 pt-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{item.likes} likes</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{item.comments} comments</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
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