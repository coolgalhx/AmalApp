import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';


const translations = {
  en: {
    title: '🚨What to do if you are trapped under rubble?',
    steps: [
      'Stay calm and take deep breaths.',
      'Look around for a small object, such as a stone or piece of debris.',
      'Tap repeatedly on nearby walls, pipes, or surfaces.',
      'Sound can travel through rubble more effectively than shouting.',
      'Use repeated or rhythmic tapping to increase the chances of being heard by rescuers or neighbors.',
      // 'Call someone if you have signal and can access a phone to increase the chances of being heard by rescuers or neighbors.'
    ],
    trappedButton: 'I’m Trapped',
    close: 'Close',
    switchLang: 'العربية',
    trappedTitle: 'Emergency Survival Steps',
    trappedEmphasis: 'Follow these steps to maximize your chances of rescue:',
    record: 'Record Audio Message',
    stop: 'Stop Recording',
    recording: 'Recording...',
    call: 'Call for help 📞'
  },
  ar: {
    title: '🚨ماذا تفعل إذا كنت محاصرًا تحت الأنقاض؟',
    steps: [
      'حافظ على هدوئك وتنفس بعمق.',
      'ابحث عن جسم صغير مثل حجر أو قطعة من الأنقاض.',
      'قم بالنقر المتكرر على الجدران أو الأنابيب أو الأسطح القريبة.',
      'ينتقل الصوت عبر الأنقاض بشكل أفضل من الصراخ.',
      'استخدم النقر المتكرر أو الإيقاعي لزيادة فرص سماعك من قبل المنقذين أو الجيران.',
      // 'اتصل بشخص ما إذا كان لديك إشارة ويمكنك الوصول إلى هاتف لزيادة فرص سماعك من قبل المنقذين أو الجيران.'
    ],
    trappedButton: 'أنا محاصر',
    close: 'إغلاق',
    switchLang: 'English',
    trappedTitle: 'خطوات النجاة الطارئة',
    trappedEmphasis: 'اتبع هذه الخطوات لزيادة فرص إنقاذك:',
    record: 'تسجيل رسالة صوتية',
    stop: 'إيقاف التسجيل',
    recording: '...يتم التسجيل',
    call: ' 📞  اتصل لطلب المساعدة',
  }
};


export const EmergencyAlert: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [trapped, setTrapped] = useState(false);

  const t = translations[lang];
  const redirectToCall = () => {
    window.location.href = "tel:";
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent  className={`max-w-md w-full bg-white text-black rounded-xl p-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
         onInteractOutside={(e) => e.preventDefault()} // Prevent closing when clicking outside
         onEscapeKeyDown={(e) => e.preventDefault()}
      > 
        <div className={`flex items-start justify-between mb-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Title */}
          <div className="flex-1 min-w-0">
            <DialogHeader>
              <DialogTitle className={`text-xl font-bold break-words ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {trapped ? t.trappedTitle : t.title}
              </DialogTitle>
            </DialogHeader>
          </div>
          {/* Actions: language + close */}
          <div className="flex flex-row gap-2 items-center ml-2" style={{ minWidth: 'fit-content' }}>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-blue-600 px-3 py-1 rounded-md border border-gray-300 bg-white text-xs font-semibold shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary max-h-7"
              aria-label={t.switchLang}
            >
              {t.switchLang}
            </button>
            <div
              className="h-8 w-4 p-0 "
            >
            </div>
          </div>
        </div>
        <div className={`space-y-3 mb-4`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {trapped ? (
            <>
              <div className="text-lg font-semibold text-red-600 animate-pulse mb-2">{t.trappedEmphasis}</div>
              <ul className="list-disc list-inside space-y-1">
                {t.steps.map((step, i) => (
                  <li key={i} className="text-base font-medium">{step}</li>
                ))}
              </ul>
              {/* <AudioRecorder lang={lang} /> */}
            </>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {t.steps.map((step, i) => (
                <li key={i} className="text-base font-medium">{step}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {trapped && (
            <Button
              onClick={redirectToCall}
              variant="destructive"
              className="w-full animate-pulse bg-green-700 hover:bg-green-800 text-white"
            >
              {t.call}
            </Button>
          )}
          {!trapped && (
            <Button
              onClick={() => setTrapped(true)}
              variant="destructive"
              className="w-full animate-pulse bg-red-600 hover:bg-red-700 text-white"
            >
              {t.trappedButton}
            </Button>
          )}
          <Button
            onClick={() => setOpen(false)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {t.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 