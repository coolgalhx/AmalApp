import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface TranslatedTextProps {
  children: string;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { translate } = useTranslation();

  return (
    <Component className={className}>
      {translate(children)}
    </Component>
  );
};