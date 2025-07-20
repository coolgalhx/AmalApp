
import * as React from 'react';
import { useState, createContext, useContext } from 'react';

interface TranslationContextType {
  isArabic: boolean;
  toggleLanguage: () => void;
  translate: (text: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Enhanced translation dictionary with additional UI elements and medical terms
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
  'Settings': 'الإعدادات',
  'Menu': 'القائمة',
  'Options': 'الخيارات',
  'Select': 'اختيار',
  'Choose': 'اختر',
  'Done': 'تم',
  'Finish': 'انتهاء',
  'Complete': 'إكمال',
  'Start': 'بدء',
  'Stop': 'توقف',
  'Pause': 'إيقاف مؤقت',
  'Resume': 'استئناف',
  'Reset': 'إعادة تعيين',
  'Clear': 'مسح',
  'Add': 'إضافة',
  'Remove': 'إزالة',
  'Update': 'تحديث',
  'Refresh': 'تحديث',
  'Load': 'تحميل',
  'Loading': 'جاري التحميل',
  'Please wait': 'يرجى الانتظار',
  'Try again': 'حاول مرة أخرى',
  'Retry': 'إعادة المحاولة',
  'Error': 'خطأ',
  'Success': 'نجح',
  'Warning': 'تحذير',
  'Info': 'معلومات',
  'Notice': 'إشعار',
  'Alert': 'تنبيه',
  'Confirm': 'تأكيد',
  'Yes': 'نعم',
  'No': 'لا',
  'OK': 'موافق',
  'Apply': 'تطبيق',
  
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
  'Severe': 'شديد',
  'Mild': 'خفيف',
  'Moderate': 'متوسط',
  'Chronic': 'مزمن',
  'Acute': 'حاد',
  'Recovery': 'شفاء',
  'Rehabilitation': 'إعادة تأهيل',
  'Surgery': 'جراحة',
  'Prescription': 'وصفة طبية',
  'Dosage': 'الجرعة',
  'Side effects': 'الآثار الجانبية',
  'Follow-up': 'متابعة',
  'Consultation': 'استشارة',
  'Examination': 'فحص',
  'Test': 'اختبار',
  'Results': 'النتائج',
  'Report': 'تقرير',
  'Medical history': 'التاريخ الطبي',
  'Family history': 'التاريخ العائلي',
  'Allergies': 'الحساسية',
  'Medications': 'الأدوية',
  'Current medications': 'الأدوية الحالية',
  'Blood pressure': 'ضغط الدم',
  'Heart rate': 'معدل ضربات القلب',
  'Temperature': 'درجة الحرارة',
  'Weight': 'الوزن',
  'Height': 'الطول',
  'Age': 'العمر',
  'Gender': 'الجنس',
  'Male': 'ذكر',
  'Female': 'أنثى',
  'Date of birth': 'تاريخ الميلاد',
  'Contact information': 'معلومات الاتصال',
  'Phone number': 'رقم الهاتف',
  'Address': 'العنوان',
  'Insurance': 'التأمين',
  
  // Common phrases
  'How are you feeling?': 'كيف تشعر؟',
  'What are your symptoms?': 'ما هي أعراضك؟',
  'When did this start?': 'متى بدأ هذا؟',
  'Rate your pain': 'قيم درجة الألم',
  'Call emergency': 'اتصل بالطوارئ',
  'Seek immediate help': 'اطلب المساعدة فورا',
  'Schedule appointment': 'حدد موعد',
  'Talk to doctor': 'تحدث مع طبيب',
  'How long have you had this?': 'منذ متى وأنت تعاني من هذا؟',
  'Does it hurt when you touch it?': 'هل يؤلم عند لمسه؟',
  'Have you taken any medication?': 'هل تناولت أي دواء؟',
  'Do you have any allergies?': 'هل لديك أي حساسية؟',
  'Please describe your pain': 'يرجى وصف الألم',
  'On a scale of 1 to 10': 'على مقياس من ١ إلى ١٠',
  'Is this getting worse?': 'هل هذا يزداد سوءا؟',
  'Is this getting better?': 'هل هذا يتحسن؟',
  'Have you experienced this before?': 'هل عانيت من هذا من قبل؟',
  'Are you taking any medications?': 'هل تتناول أي أدوية؟',
  'Please provide more details': 'يرجى تقديم المزيد من التفاصيل',
  'Thank you for the information': 'شكرا لك على المعلومات',
  'We recommend that you': 'نوصي بأن',
  'Please follow these steps': 'يرجى اتباع هذه الخطوات',
  'If symptoms worsen': 'إذا ازدادت الأعراض سوءا',
  'Contact your doctor': 'اتصل بطبيبك',
  'Go to emergency room': 'اذهب إلى غرفة الطوارئ',
  'Monitor your condition': 'راقب حالتك',
  'Rest and hydrate': 'راحة وشرب السوائل',
  'Apply ice or heat': 'ضع ثلج أو حرارة',
  'Take over-the-counter pain relief': 'تناول مسكن للألم بدون وصفة',
  'Avoid strenuous activity': 'تجنب النشاط المجهد',
  
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
  'Hope Triage': 'فرز الأمل',
  'Welcome to Hope AI Triage': 'مرحبا بك في فرز الأمل بالذكاء الاصطناعي',
  'Choose how you would like to get medical guidance': 'اختر كيف تريد الحصول على الإرشاد الطبي',
  'AI-Powered Assessment': 'تقييم بالذكاء الاصطناعي',
  'Manual Assessment': 'تقييم يدوي',
  'Step-by-step triage': 'فرز خطوة بخطوة',
  'Offline Ready': 'جاهز للعمل بدون إنترنت',
  'Start AI Assessment': 'بدء التقييم بالذكاء الاصطناعي',
  'Start Manual Assessment': 'بدء التقييم اليدوي',
  'What is the primary cause?': 'ما هو السبب الرئيسي؟',
  'Select the main reason for seeking help': 'اختر السبب الرئيسي لطلب المساعدة',
  'Assessment Complete': 'اكتمل التقييم',
  'Based on your symptoms, here are our recommendations': 'بناء على أعراضك، إليك توصياتنا',
  'Recommended Actions': 'الإجراءات الموصى بها',
  'Talk to a Doctor': 'تحدث مع طبيب',
  'Access Medical Library': 'الوصول إلى المكتبة الطبية',
  'Answer the questions below to assess your condition': 'أجب على الأسئلة أدناه لتقييم حالتك',
  'Progress': 'التقدم',
  'Online Mode': 'وضع الاتصال',
  'Offline Mode': 'وضع عدم الاتصال',
  'AI assessment, image analysis, and chat support available': 'التقييم بالذكاء الاصطناعي وتحليل الصور ودعم الدردشة متاح',
  'Manual assessment and offline medical library available': 'التقييم اليدوي والمكتبة الطبية بدون إنترنت متاحة',
  
  // Time and dates
  'Today': 'اليوم',
  'Yesterday': 'أمس',
  'Tomorrow': 'غدا',
  'This week': 'هذا الأسبوع',
  'Last week': 'الأسبوع الماضي',
  'This month': 'هذا الشهر',
  'Last month': 'الشهر الماضي',
  'This year': 'هذا العام',
  'Last year': 'العام الماضي',
  'Morning': 'صباح',
  'Afternoon': 'بعد الظهر',
  'Evening': 'مساء',
  'Night': 'ليل',
  'Now': 'الآن',
  'Later': 'لاحقا',
  'Soon': 'قريبا',
  'Recently': 'مؤخرا',
  'Always': 'دائما',
  'Never': 'أبدا',
  'Sometimes': 'أحيانا',
  'Often': 'غالبا',
  'Rarely': 'نادرا',
  
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
  'Good': 'جيد',
  'Fair': 'مقبول',
  'Poor': 'ضعيف',
  'Excellent': 'ممتاز',
  'Satisfactory': 'مرضي',
  'Unsatisfactory': 'غير مرضي',
  
  // Priority levels
  'LOW PRIORITY': 'أولوية منخفضة',
  'MEDIUM PRIORITY': 'أولوية متوسطة', 
  'HIGH PRIORITY': 'أولوية عالية',
  'EMERGENCY PRIORITY': 'أولوية طوارئ',
  
  // Actions
  'Call Now': 'اتصل الآن',
  'Read More': 'اقرأ المزيد',
  'View Details': 'عرض التفاصيل',
  'Share': 'مشاركة',
  'Like': 'إعجاب',
  'Comment': 'تعليق',
  'Report Issue': 'تبليغ عن مشكلة',
  'Help': 'مساعدة',
  'Support': 'دعم',
  'Contact Us': 'اتصل بنا',
  'FAQ': 'الأسئلة الشائعة',
  'Privacy Policy': 'سياسة الخصوصية',
  'Terms of Service': 'شروط الخدمة',
  'Send': 'إرسال',
  'Receive': 'استقبال',
  'Download': 'تحميل',
  'Upload': 'رفع',
  'Import': 'استيراد',
  'Export': 'تصدير',
  'Print': 'طباعة',
  'Copy': 'نسخ',
  'Paste': 'لصق',
  'Cut': 'قص',
  'Undo': 'تراجع',
  'Redo': 'إعادة',
  
  // Additional translations
  'Hope': 'الأمل',
  'Email': 'البريد الإلكتروني',
  'Continue with Google': 'متابعة مع جوجل',
  'Continue with Apple': 'متابعة مع آبل',
  'Continue as Guest': 'متابعة كضيف',
  'By clicking continue, you agree to our': 'بالنقر على متابعة، فإنك توافق على',
  'and': 'و',
  'Or continue with': 'أو تابع مع',
  'Google': 'جوجل',
  'Apple': 'آبل',
  'Enter your email to sign up for this app as a Patient': 'أدخل بريدك الإلكتروني للتسجيل في هذا التطبيق كمريض',
  'Please enter your email': 'يرجى إدخال بريدك الإلكتروني',
  'Check your email for the login link!': 'تحقق من بريدك الإلكتروني للحصول على رابط تسجيل الدخول!',
  'An unexpected error occurred': 'حدث خطأ غير متوقع',
  'Loading...': 'جاري التحميل...',
  
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
  
  // Switch language text
  'Switch to English': 'التبديل إلى الإنجليزية',
  'Switch to Arabic': 'تبديل إلى العربية',
  'Language': 'اللغة',
  'Change Language': 'تغيير اللغة',
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    // Update document direction for RTL support
    document.documentElement.dir = !isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = !isArabic ? 'ar' : 'en';
    
    // Add/remove RTL class for better styling control
    if (!isArabic) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
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
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
