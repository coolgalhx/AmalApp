import * as React from 'react';
import { useToast } from "./use-toast";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleSpeechStart = () => setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      speechSynthesis.addEventListener('voiceschanged', handleSpeechEnd);
    }

    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.removeEventListener('voiceschanged', handleSpeechEnd);
      }
    };
  }, []);

  const speak = React.useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech functionality.",
        variant: "destructive"
      });
    }
  }, []);

  const stop = React.useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleClick = React.useCallback((text: string, clickCount: number) => {
    if (clickCount === 2) {
      // Double click - stop speech
      stop();
    } else {
      // Single click - start/restart speech
      speak(text);
    }
  }, [speak, stop]);

  return { speak, stop, isSpeaking, handleClick };
};