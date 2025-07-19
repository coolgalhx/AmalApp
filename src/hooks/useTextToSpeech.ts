import React from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

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
      alert("Text-to-speech is not supported in your browser.");
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