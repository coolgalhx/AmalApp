import { Search, TrendingUp, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  rating: number;
  views: string;
}

const trendingArticles: Article[] = [
  {
    id: "1",
    title: "How to Treat Wounds and Further Steps due to Severity",
    excerpt: "Complete guide on wound care and treatment protocols",
    category: "Wounds",
    readTime: "5 min read",
    rating: 4.8,
    views: "2.1k"
  },
  {
    id: "2", 
    title: "Emergency Response Protocols for Severe Injuries",
    excerpt: "Step-by-step emergency care procedures",
    category: "Emergency",
    readTime: "8 min read", 
    rating: 4.9,
    views: "3.2k"
  }
];

const categories = [
  { name: "All", count: 245 },
  { name: "Wounds", count: 67 },
  { name: "Burns", count: 34 },
  { name: "Infections", count: 89 }
];

export const MedicalLibrary = () => {
  return (
    <div className="p-4 bg-gradient-medical min-h-screen animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Medical Library</h1>
        <p className="text-muted-foreground">
          Browse a dedicated library of articles written by doctors for your medical symptoms. Enter keywords to get started.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search medical articles..."
          className="pl-10 bg-gradient-card shadow-soft border-border/50 hover-glow"
        />
      </div>

      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-card shadow-soft">
          <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground hover-glow">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Articles
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground hover-glow">
            <Star className="w-4 h-4 mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground hover-glow">
            <Clock className="w-4 h-4 mr-2" />
            Burns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge key={category.name} variant="secondary" className="medical-badge cursor-pointer hover:bg-gradient-primary hover:text-primary-foreground hover-glow">
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          {trendingArticles.map((article, index) => (
            <Card key={article.id} className="medical-card cursor-pointer animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs medical-badge">
                    {article.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{article.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-base mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readTime}</span>
                  <span>{article.views} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="favorites">
          <div className="text-center py-8 animate-fade-in">
            <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No favorite articles yet</p>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="text-center py-8 animate-fade-in">
            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No recent articles</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};