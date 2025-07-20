
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  variant = 'outline',
  size = 'sm'
}) => {
  const { isArabic, toggleLanguage, translate } = useTranslation();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={`
        language-toggle
        flex items-center gap-2 
        ${isArabic ? 'rtl:btn-reverse' : ''} 
        ${className}
      `}
      title={isArabic ? translate('Switch to English') : translate('Switch to Arabic')}
    >
      {size === 'icon' ? (
        <Globe className="h-4 w-4" />
      ) : (
        <>
          <Languages className={`h-4 w-4 ${isArabic ? 'rtl:ml-2 rtl:mr-0' : ''}`} />
          <span className="text-xs font-medium">
            {isArabic ? 'EN' : 'عربي'}
          </span>
        </>
      )}
    </Button>
  );
};
