import React from "react";
import { Search, Eye, MessageCircle, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";

interface Article {
  id: string;
  title: string;
  category: string;
  views: string;
  comments: string;
  author: string;
  date: string;
  readTime: string;
}

const searchResults: Article[] = [
  {
    id: "1",
    title: "How to Treat Wounds and Further Steps due to Severity",
    category: "Wounds",
    views: "16.1k",
    comments: "193",
    author: "Dr. Kevin Gilbert",
    date: "Aug 1, 2021",
    readTime: "3 mins read"
  },
  {
    id: "2",
    title: "How to Treat Wound and Further Steps due to Severity",
    category: "Wounds",
    views: "27.3k",
    comments: "817",
    author: "Dr. Kevin Gilbert",
    date: "Aug 1, 2021",
    readTime: "3 mins read"
  },
  {
    id: "3",
    title: "How to Treat Wounds and Further Steps due to Severity",
    category: "Wounds",
    views: "26.3k",
    comments: "867",
    author: "Dr. Kevin Gilbert",
    date: "Aug 1, 2021",
    readTime: "3 mins read"
  }
];

export const MedicalLibrary = () => {
  const getPageText = () => {
    const articlesText = searchResults.map(article => 
      `${article.title} by ${article.author}, ${article.category} category. ${article.views} views, ${article.comments} comments. ${article.readTime}.`
    ).join(' ');
    
    return `Medical Library. Results for Treat Wounds. ${articlesText}`;
  };

  return (
    <div className="p-4 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Results for: Treat Wounds</h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          value="Treat Wounds"
          className="pl-10 bg-muted/50 border-border rounded-lg"
        />
      </div>

      {/* Top Results Header */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Top Results</h2>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {searchResults.map((article) => (
          <div key={article.id} className="bg-card rounded-lg border border-border/50 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-base leading-tight flex-1">
                {article.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{article.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{article.comments} Comments</span>
              </div>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {article.category}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};