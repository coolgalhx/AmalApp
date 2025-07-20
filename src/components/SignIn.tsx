import * as React from "react";
import { Button } from "@/components/ui/button";
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