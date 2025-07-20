import * as React from "react";
import { useTranslation } from "@/contexts/TranslationContext";

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface TextToSpeechButtonProps {
  text: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text }) => {
  const { isArabic, translate } = useTranslation();
  const toSpeak = isArabic ? translate(text) : text;
  const voice = isArabic ? "Arabic Female" : "UK English Female";

  // Optional: Load responsiveVoice if not already loaded (for SPA environments)
  React.useEffect(() => {
    if (!window.responsiveVoice) {
      const script = document.createElement("script");
      script.src = "https://code.responsivevoice.org/responsivevoice.js?key=undefined";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const speak = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(toSpeak, voice);
    } else {
      alert("Voice engine not loaded yet.");
    }
  };

  return (
    <button 
      className='text-sm m-2 mt-0 mb-0 p-1 hover:bg-gray-100 rounded-sm transition-colors' 
      onClick={speak} 
      aria-label="Read text aloud"
      style={{ minWidth: '24px', minHeight: '24px' }}
    >
      🔊
    </button>
  );
};

export default TextToSpeechButton;
