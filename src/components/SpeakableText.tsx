import React from "react";
import TextToSpeechButton from "./TextToSpeechButton";
import { useTranslation } from "@/contexts/TranslationContext";

interface SpeakableTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements; 
  className?: string;
}

const SpeakableText: React.FC<SpeakableTextProps> = ({ text, as: Tag = "span", className }) => {
  const { translate } = useTranslation();
  const translatedText = translate(text);
  return (
    <Tag className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      {translatedText}
      <TextToSpeechButton text={text} />
    </Tag>
  );
};

export default SpeakableText; 