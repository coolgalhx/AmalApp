import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock } from 'lucide-react';

interface InternalPhoneCallButtonProps {
  onClick: () => void;
}

export function InternalPhoneCallButton({ onClick }: InternalPhoneCallButtonProps) {
  return (
    <Card 
      className="cursor-pointer transition-all border-2 hover:border-primary/50 border-primary bg-primary/5"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Internal Phone Call</h4>
              <p className="text-sm text-muted-foreground">Direct call to local on-call doctor (Partner Network)</p>
            </div>
          </div>
          <Badge variant="default" className="text-xs">
            Recommended
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-3 w-3" />
              <span className="font-medium">Response</span>
            </div>
            <p className="text-muted-foreground">Immediate</p>
          </div>
          
          <div>
            <div className="font-medium mb-1">Cost</div>
            <p className="text-muted-foreground">Free</p>
          </div>
          
          <div>
            <div className="font-medium mb-1">Coverage</div>
            <p className="text-muted-foreground">24/7 Available</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}