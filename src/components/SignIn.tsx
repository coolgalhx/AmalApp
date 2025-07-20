import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TextToSpeech } from "@/components/TextToSpeech";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/TranslationContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const SignIn = () => {
  const { translate } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const pageText = translate("Welcome to Hope. Create an account. Enter your email to sign up for this app as a Patient. Email input field. Continue button. Continue with Google button. Continue with Apple button. By clicking continue, you agree to our Terms of Service and Privacy Policy.");

  const handleSignIn = async () => {
    if (!email) {
      toast({
        title: translate("Error"),
        description: translate("Please enter your email"),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });

      if (error) {
        toast({
          title: translate("Error"),
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: translate("Success"),
          description: translate("Check your email for the login link!"),
        });
      }
    } catch (error) {
      toast({
        title: translate("Error"),
        description: translate("An unexpected error occurred"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medical-bg flex items-center justify-center p-4">
      {/* Language Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <img 
              src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
              alt="Hope Logo" 
              className="w-20 h-20"
            />
            <div className="flex-1"></div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {translate("Hope")}
          </CardTitle>
          <p className="text-muted-foreground">
            {translate("Create Account")}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {translate("Enter your email to sign up for this app as a Patient")}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder={translate("Email")}
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? translate("Loading...") : translate("Continue")}
          </Button>
          
          <Button variant="outline" className="w-full">
            {translate("Continue as Guest")}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            {translate("By clicking continue, you agree to our")} <span className="underline">{translate("Terms of Service")}</span> {translate("and")} <span className="underline">{translate("Privacy Policy")}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};