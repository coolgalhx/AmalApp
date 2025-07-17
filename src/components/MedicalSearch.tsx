import { ArrowLeft, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  views: string;
  comments: number;
  readTime: string;
}

const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "How to Treat Wounds and Further Steps due to Severity",
    excerpt: "Complete guide on wound care and treatment protocols",
    category: "Wounds",
    views: "23.1k",
    comments: 667,
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "How to Treat Wound and Further Steps due to Severity",
    excerpt: "Detailed wound management techniques and follow-up care",
    category: "Wounds", 
    views: "23.1k",
    comments: 667,
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "How to Treat Wound and Further Steps due to Severity",
    excerpt: "Advanced wound healing protocols for severe cases",
    category: "Wounds",
    views: "23.1k", 
    comments: 667,
    readTime: "10 min read"
  }
];

interface MedicalSearchProps {
  onBack: () => void;
  searchQuery?: string;
}

export const MedicalSearch = ({ onBack, searchQuery = "Treat Wounds" }: MedicalSearchProps) => {
  return (
    <div className="min-h-screen bg-medical-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Medical Library Search</h1>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            defaultValue={searchQuery}
            placeholder="Search medical articles..."
            className="pl-10 bg-white border-border"
          />
        </div>

        {/* Search Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Results for: {searchQuery}</h2>
        </div>

        {/* Top Results */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Top Results</h3>
          
          {searchResults.map((result) => (
            <Card key={result.id} className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {result.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{result.views}</span>
                    <span>{result.comments} Comments</span>
                    <Badge variant="secondary" className="text-xs">
                      {result.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {result.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {result.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{result.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>Dr. Kevin Gilbert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Integration */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-foreground font-semibold">SC</span>
            </div>
            <span className="text-sm font-medium">Chat with Amal</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-foreground font-semibold">M</span>
            </div>
            <span className="text-sm font-medium">Medical Library Search</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-semibold">MA</span>
            </div>
            <span className="text-sm font-medium">Medical Articles</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-semibold">NP</span>
            </div>
            <span className="text-sm font-medium">New Project</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-semibold">R</span>
            </div>
            <span className="text-sm font-medium">Random</span>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-3 pt-4">
          <h3 className="font-semibold">Frequently Asked Questions</h3>
          
          <div className="space-y-2">
            <Card className="border-0 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <p className="text-sm">Are hospitals still operating?</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <p className="text-sm">How can I treat a wound?</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <p className="text-sm">What if I can't get medication?</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-3 pt-6">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-orange-500 text-white">HG</AvatarFallback>
          </Avatar>
          <span className="font-medium">H G</span>
        </div>
      </div>
    </div>
  );
};