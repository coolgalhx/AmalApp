import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import { TranslatedText } from "@/components/TranslatedText";

export const SignIn = () => {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <TranslatedText>Sign In</TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText>Access your medical profile</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <TranslatedText>Email</TranslatedText>
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                <TranslatedText>Password</TranslatedText>
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
              />
            </div>
            <Button className="w-full">
              <TranslatedText>Sign In</TranslatedText>
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                <TranslatedText>Or</TranslatedText>
              </span>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Guest functionality placeholder
              console.log("Continue as guest");
            }}
          >
            <TranslatedText>Continue as Guest</TranslatedText>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};