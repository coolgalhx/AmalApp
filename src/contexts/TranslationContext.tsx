import React from 'react';

interface TranslationContextType {
  isArabic: boolean;
  toggleLanguage: () => void;
  translate: (text: string) => string;
}

const TranslationContext = React.createContext<TranslationContextType | undefined>(undefined);

// Basic translation dictionary for common medical terms and UI elements
const translations: Record<string, string> = {
  // Navigation
  'Home': 'الرئيسية',
  'Search': 'البحث',
  'Chat': 'الدردشة',
  'Library': 'المكتبة',
  'Profile': 'الملف الشخصي',
  'Back': 'رجوع',
  'Continue': 'متابعة',
  'Next': 'التالي',
  'Previous': 'السابق',
  'Submit': 'إرسال',
  'Cancel': 'إلغاء',
  'Close': 'إغلاق',
  'Save': 'حفظ',
  'Edit': 'تعديل',
  'Delete': 'حذف',
  
  // Medical terms
  'Emergency': 'طوارئ',
  'Urgent': 'عاجل',
  'Doctor': 'طبيب',
  'Nurse': 'ممرض',
  'Hospital': 'مستشفى',
  'Symptoms': 'الأعراض',
  'Pain': 'ألم',
  'Fever': 'حمى',
  'Headache': 'صداع',
  'Injury': 'إصابة',
  'Burn': 'حرق',
  'Trauma': 'صدمة',
  'Infection': 'عدوى',
  'Bleeding': 'نزيف',
  'Swelling': 'تورم',
  'Bruising': 'كدمات',
  'Treatment': 'علاج',
  'Medication': 'دواء',
  'Diagnosis': 'تشخيص',
  'Appointment': 'موعد',
  
  // Common phrases
  'How are you feeling?': 'كيف تشعر؟',
  'What are your symptoms?': 'ما هي أعراضك؟',
  'When did this start?': 'متى بدأ هذا؟',
  'Rate your pain': 'قيم درجة الألم',
  'Call emergency': 'اتصل بالطوارئ',
  'Seek immediate help': 'اطلب المساعدة فورا',
  'Schedule appointment': 'حدد موعد',
  'Talk to doctor': 'تحدث مع طبيب',
  'Medical history': 'التاريخ الطبي',
  'Current medications': 'الأدوية الحالية',
  'Allergies': 'الحساسية',
  'Blood pressure': 'ضغط الدم',
  'Heart rate': 'معدل ضربات القلب',
  'Temperature': 'درجة الحرارة',
  
  // App specific
  'Live Alerts': 'التنبيهات المباشرة',
  'Medical Library': 'المكتبة الطبية',
  'Symptom Checker': 'فحص الأعراض',
  'Triage Assistant': 'مساعد الفرز',
  'Emergency Contact': 'جهة اتصال الطوارئ',
  'Health Records': 'السجلات الصحية',
  'Breaking News': 'أخبار عاجلة',
  'Medical Articles': 'مقالات طبية',
  'First Aid': 'الإسعافات الأولية',
  'Health Tips': 'نصائح صحية',
  'Sign In': 'تسجيل الدخول',
  'Create Account': 'إنشاء حساب',
  'Welcome': 'مرحبا',
  'Get Started': 'ابدأ',
  
  // Time and dates
  'Today': 'اليوم',
  'Yesterday': 'أمس',
  'Tomorrow': 'غدا',
  'This week': 'هذا الأسبوع',
  'Last week': 'الأسبوع الماضي',
  'This month': 'هذا الشهر',
  'Morning': 'صباح',
  'Afternoon': 'بعد الظهر',
  'Evening': 'مساء',
  'Night': 'ليل',
  
  // Status and severity
  'Low': 'منخفض',
  'Medium': 'متوسط',
  'High': 'عالي',
  'Critical': 'حرج',
  'Stable': 'مستقر',
  'Improving': 'يتحسن',
  'Worsening': 'يزداد سوءا',
  'Normal': 'طبيعي',
  'Abnormal': 'غير طبيعي',
  
  // Actions
  'Call Now': 'اتصل الآن',
  'Read More': 'اقرأ المزيد',
  'View Details': 'عرض التفاصيل',
  'Share': 'مشاركة',
  'Like': 'إعجاب',
  'Comment': 'تعليق',
  'Report': 'تبليغ',
  'Help': 'مساعدة',
  'Support': 'دعم',
  'Contact Us': 'اتصل بنا',
  'FAQ': 'الأسئلة الشائعة',
  'Privacy Policy': 'سياسة الخصوصية',
  'Terms of Service': 'شروط الخدمة',
  
  // Additional translations
  'Hope': 'الأمل',
  'Email': 'البريد الإلكتروني',
  'Continue with Google': 'متابعة مع جوجل',
  'Continue with Apple': 'متابعة مع آبل',
  'By clicking continue, you agree to our': 'بالنقر على متابعة، فإنك توافق على',
  'and': 'و',
  'Or continue with': 'أو تابع مع',
  'Google': 'جوجل',
  'Apple': 'آبل',
  'Enter your email to sign up for this app as a Patient': 'أدخل بريدك الإلكتروني للتسجيل في هذا التطبيق كمريض',
  'Welcome to Hope. Create an account. Enter your email to sign up for this app as a Patient. Email input field. Continue button. Continue with Google button. Continue with Apple button. By clicking continue, you agree to our Terms of Service and Privacy Policy.': 'مرحبا بك في الأمل. أنشئ حساب. أدخل بريدك الإلكتروني للتسجيل في هذا التطبيق كمريض. حقل البريد الإلكتروني. زر المتابعة. زر المتابعة مع جوجل. زر المتابعة مع آبل. بالنقر على متابعة، فإنك توافق على شروط الخدمة وسياسة الخصوصية.',
  
  // More medical and UI terms
  'Breaking': 'عاجل',
  'News': 'أخبار',
  'Medical': 'طبي',
  'Article': 'مقال',
  'Articles': 'مقالات',
  'View': 'عرض',
  'Views': 'مشاهدات',
  'Comments': 'تعليقات',
  'Likes': 'إعجابات',
  'Share Article': 'مشاركة المقال',
  'Author': 'الكاتب',
  'Category': 'الفئة',
  'Read Time': 'وقت القراءة',
  'mins read': 'دقائق قراءة',
  'Published': 'نُشر',
  'Updated': 'مُحدث',
  'from': 'من',
  'feed': 'التغذية',
  'Breaking news': 'أخبار عاجلة',
  'likes': 'إعجابات',
  'comments': 'تعليقات',
  'LIVE BREAKING NEWS': 'أخبار عاجلة مباشرة',
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isArabic, setIsArabic] = React.useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    // Update document direction for RTL support
    document.documentElement.dir = !isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = !isArabic ? 'ar' : 'en';
  };

  const translate = (text: string): string => {
    if (!isArabic) return text;
    
    // First try exact match
    if (translations[text]) {
      return translations[text];
    }
    
    // Try to find partial matches for longer sentences
    let translatedText = text;
    Object.entries(translations).forEach(([english, arabic]) => {
      if (text.includes(english)) {
        translatedText = translatedText.replace(english, arabic);
      }
    });
    
    return translatedText;
  };

  return (
    <TranslationContext.Provider value={{ isArabic, toggleLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = React.useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};