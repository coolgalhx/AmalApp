import { ArrowLeft, Share2, Heart, MessageCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MedicalArticleProps {
  onBack: () => void;
}

export const MedicalArticle = ({ onBack }: MedicalArticleProps) => {
  return (
    <div className="min-h-screen bg-medical-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Medical Article</h1>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Article Header */}
        <div className="space-y-3">
          <h1 className="text-xl font-bold leading-tight">
            How to Treat Wound and Further Steps due to Severity
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>25.1k</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>657 Comments</span>
            </div>
            <Badge variant="outline">Wounds</Badge>
          </div>
        </div>

        {/* Author */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">KG</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Dr. Kevin Gilbert</p>
                <p className="text-sm text-muted-foreground">Aug 3, 2017 • 8 min read</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-3">Identify the degree of the burn</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Eligendi, morbi augue augibus veniam, eapat bibvn labss tere. Sic curabitur purus quasi ut lorem turpis 
                lorem augue elit. Dui ultricies parturient sed dignissim ut suscipit sed. Curabitur mauris venenatis in in 
                lorem augue elit tellus viverra a. Dolor sit adip a sium veaibulum sit sed quam ut viverra adipicunt.
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Donec at elit et enim tristissut ulllamcorper in vel ipsum. In tempus, risus gravida mattis ornare, 
                elit magna cursus venilti tellus mornai, eget volutpat purus quam vitae suscipit. Mauris venenatis in in 
                lorem augue elit tellus viterra. Dolor sit a dig adispum veaibulum sit sed quam ut viverra adipiscint.
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Eligendi, morbi augue augibus veniam, eapat bibvn labss tere. Sic curabitur purus quasi ut lorem turpis 
                lorem augue elit. Dui ultricies parturient sed dignissim ut suscipit sed. Curabitur mauris venenatis in in 
                lorem augue elit tellus viverra a.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Social Actions */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">25.1k</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">94 Comments</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="space-y-3">
          <h3 className="font-semibold">Related Articles</h3>
          
          <Card className="border-0 shadow-sm cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">Wounds</Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3" />
                  <span>25.1k</span>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-1">
                Prim vulus suscipit mo. Mauris diam libris mos pourture as viverra tes molestieAre.
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>25.1k views</span>
                <span>•</span>
                <span>94 Comments</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">Wounds</Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Eye className="w-3 h-3" />
                  <span>25.1k</span>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-1">
                Prim vulus suscipit mo. Mauris diam libris mos pourture as viverra tes molestieAre.
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>25.1k views</span>
                <span>•</span>
                <span>94 Comments</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          VIEW ALL
        </Button>
      </div>
    </div>
  );
};