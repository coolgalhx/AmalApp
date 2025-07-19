import React, { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const speak = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser doesn't support text-to-speech functionality.",
        variant: "destructive"
      });
      return;
    }

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    speechSynthesis.speak(utterance);
  }, [text, isPlaying]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={speak}
      className={`p-2 ${className}`}
      aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
    >
      {isPlaying ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
};