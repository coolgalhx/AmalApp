import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Volume2 } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useDoubleClick } from "@/hooks/useDoubleClick";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const pageText = `Welcome to Hope. Create an account. Enter your email to sign up for this app as a Patient. Email input field. Continue button. Continue with Google button. Continue with Apple button. By clicking continue, you agree to our Terms of Service and Privacy Policy.`;

  const handleDoubleClick = useDoubleClick(
    () => speak(pageText),
    () => stop()
  );

  return (
    <div className="min-h-screen bg-medical-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <img 
              src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
              alt="Hope Logo" 
              className="w-20 h-20"
            />
            <div className="flex-1 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDoubleClick}
                className={`text-muted-foreground hover:text-foreground ${isSpeaking ? 'bg-primary/20 text-primary' : ''}`}
                aria-label={isSpeaking ? "Double-click to stop reading" : "Click to read page content aloud, double-click to stop"}
                title={isSpeaking ? "Double-click to stop" : "Click to read aloud, double-click to stop"}
              >
                <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Hope</CardTitle>
          <p className="text-muted-foreground">Create an account</p>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email to sign up for this app as a Patient.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="amal@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Continue
          </Button>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </Button>
            
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.03 2.68 4.04 2.73 4.06-.03.07-.42 1.44-1.43 2.81z"/>
                <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Continue with Apple</span>
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            By clicking continue, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};