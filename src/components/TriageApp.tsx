
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Phone, FileText, ArrowLeft, Bot, Wifi, WifiOff, Volume2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { LightweightChat } from './LightweightChat';
import { SymptomChecker } from './SymptomChecker';
import { TalkToDoctor } from './TalkToDoctor';
import { EnhancedOfflineLibrary } from './EnhancedOfflineLibrary';
import { TranslatedText } from './TranslatedText';
import { useTranslation } from '@/contexts/TranslationContext';
import TextToSpeechButton from "./TextToSpeechButton";
import SpeakableText from "./SpeakableText";

export type TriageStep = 'chat-intro' | 'primary-cause' | 'image-upload' | 'lightweight-chat' | 'botpress-chat' | 'symptoms' | 'recommendations' | 'doctor' | 'library';
export type PrimaryCause = 'injury' | 'burn' | 'trauma' | 'infection';
export type Severity = 'low' | 'medium' | 'high' | 'emergency';

interface TriageState {
  step: TriageStep;
  primaryCause?: PrimaryCause;
  symptoms: string[];
  severity?: Severity;
  progress: number;
  capturedImage?: File;
  useAI?: boolean;
}

export function TriageApp() {
  const { isArabic, translate } = useTranslation();
  const [state, setState] = React.useState<TriageState>({
    step: 'chat-intro',
    symptoms: [],
    progress: 0
  });
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.info('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.warn('Service Worker registration failed:', error);
        });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const startAITriage = () => {
    setState({ ...state, step: 'primary-cause', progress: 10, useAI: true });
  };

  const startManualTriage = () => {
    setState({ ...state, step: 'primary-cause', progress: 10, useAI: false });
  };

  const primaryCauses = [
    { id: 'injury' as const, label: 'Injury', icon: AlertTriangle },
    { id: 'burn' as const, label: 'Burn', icon: AlertTriangle },
    { id: 'trauma' as const, label: 'Trauma', icon: Heart },
    { id: 'infection' as const, label: 'Infection', icon: AlertTriangle }
  ];

  const handlePrimaryCauseSelect = (cause: PrimaryCause) => {
    if (state.useAI) {
      setState({
        ...state,
        primaryCause: cause,
        step: 'image-upload',
        progress: 30
      });
    } else {
      setState({
        ...state,
        primaryCause: cause,
        step: 'symptoms',
        progress: 40
      });
    }
  };

  const handleImageCapture = (image: File) => {
    setState({
      ...state,
      capturedImage: image,
      step: 'botpress-chat',
      progress: 50
    });
  };

  const handleBotpressChatComplete = (symptoms: string[], severity: Severity) => {
    setState({
      ...state,
      symptoms,
      severity,
      step: 'recommendations',
      progress: 80
    });
  };

  const handleChatComplete = (symptoms: string[], severity: Severity) => {
    setState({
      ...state,
      symptoms,
      severity,
      step: 'recommendations',
      progress: 80
    });
  };

  const handleSymptomsComplete = (symptoms: string[], severity: Severity) => {
    setState({
      ...state,
      symptoms,
      severity,
      step: 'recommendations',
      progress: 80
    });
  };

  const navigateToDoctor = () => {
    setState({ ...state, step: 'doctor', progress: 100 });
  };

  const navigateToLibrary = () => {
    setState({ ...state, step: 'library', progress: 100 });
  };

  const goBack = () => {
    switch (state.step) {
      case 'image-upload':
        setState({ ...state, step: 'primary-cause', progress: 10 });
        break;
      case 'lightweight-chat':
        setState({ ...state, step: state.useAI ? 'image-upload' : 'primary-cause', progress: state.useAI ? 30 : 10 });
        break;
      case 'botpress-chat':
        setState({ ...state, step: 'image-upload', progress: 30 });
        break;
      case 'symptoms':
        setState({ ...state, step: 'primary-cause', progress: 10 });
        break;
      case 'recommendations':
        if (state.useAI) {
          setState({ ...state, step: 'botpress-chat', progress: 50 });
        } else {
          setState({ ...state, step: 'symptoms', progress: 40 });
        }
        break;
      case 'doctor':
      case 'library':
        setState({ ...state, step: 'recommendations', progress: 80 });
        break;
    }
  };

  const getSeverityColor = (severity?: Severity) => {
    switch (severity) {
      case 'low': return 'bg-secondary';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      case 'emergency': return 'bg-destructive animate-pulse';
      default: return 'bg-muted';
    }
  };

  const renderContent = () => {
    switch (state.step) {
      case 'chat-intro':
        return (
          <div className={`space-y-6 ${isArabic ? 'rtl:text-right' : ''}`}>
             <div className={`text-center ${isArabic ? 'rtl:text-right' : ''}`}>
              <img 
                src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
                alt="Hope Logo" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">
                <SpeakableText text="Welcome to Hope AI Triage" as="span" />
              </h2>
              <p className="text-muted-foreground mb-6">
                <SpeakableText text="Choose how you would like to get medical guidance" as="span" />
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className={isArabic ? 'card-rtl' : ''}>
                <CardContent className="p-6">
                  <div className={`flex items-start gap-4 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        <SpeakableText text="AI Chat Assessment" as="span" />
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        <SpeakableText text="Intelligent chat-based triage with AI support" as="span" />
                      </p>
                      <div className={`flex gap-2 ${isArabic ? 'rtl:flex-row-reverse rtl:justify-end' : ''}`}>
                        <Badge variant="outline">
                          <SpeakableText text="AI Powered" as="span" />
                        </Badge>
                        <Badge variant="outline">
                          <SpeakableText text="Interactive" as="span" />
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={startAITriage} 
                    className={`w-full mt-4 ${isArabic ? 'rtl:btn-reverse' : ''}`}
                  >
                    <SpeakableText text="Start AI Assessment" as="span" />
                  </Button>
                </CardContent>
              </Card>

              <Card className={isArabic ? 'card-rtl' : ''}>
                <CardContent className="p-6">
                  <div className={`flex items-start gap-4 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        <SpeakableText text="Manual Assessment" as="span" />
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        <SpeakableText text="Step-by-step triage with offline medical library" as="span" />
                      </p>
                      <div className={`flex gap-2 ${isArabic ? 'rtl:flex-row-reverse rtl:justify-end' : ''}`}>
                        <Badge variant="outline">
                          <SpeakableText text="Step by Step" as="span" />
                        </Badge>
                        <Badge variant="outline">
                          <SpeakableText text="Offline Ready" as="span" />
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={startManualTriage} 
                    className={`w-full mt-4 ${isArabic ? 'rtl:btn-reverse' : ''}`}
                  >
                    <SpeakableText text="Start Manual Assessment" as="span" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'primary-cause':
        return (
          <div className={`space-y-6 ${isArabic ? 'rtl:text-right' : ''}`}>
            <div className={`text-center ${isArabic ? 'rtl:text-right' : ''}`}>
              <Badge variant="outline" className="mb-4">
                <SpeakableText text={state.useAI ? 'AI Assessment' : 'Manual Assessment'} as="span" />
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                <SpeakableText text="What is the primary cause?" as="span" />
              </h2>
              <p className="text-muted-foreground">
                <SpeakableText text="Select the main reason for seeking help" as="span" />
              </p>
            </div>
            
            <div className={`triage-buttons ${isArabic ? 'rtl:grid-flow-col-dense' : ''}`}>
              {primaryCauses.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="outline"
                  className={`triage-button h-24 flex-col gap-2 text-base font-medium ${isArabic ? 'rtl:btn-reverse' : ''}`}
                  onClick={() => handlePrimaryCauseSelect(id)}
                >
                  <Icon className="h-6 w-6" />
                  <SpeakableText text={label} as="span" />
                </Button>
              ))}
            </div>
          </div>
        );

      case 'image-upload':
        return (
          <ImageUpload
            primaryCause={state.primaryCause!}
            onImageCapture={handleImageCapture}
            onBack={goBack}
          />
        );

      case 'lightweight-chat':
        return (
          <LightweightChat
            primaryCause={state.primaryCause!}
            onTriageComplete={handleChatComplete}
            onBack={goBack}
          />
        );

      case 'botpress-chat':
        return (
          <div className={`space-y-6 ${isArabic ? 'rtl:text-right' : ''}`}>
            <div className={`text-center ${isArabic ? 'rtl:text-right' : ''}`}>
              <Badge variant="outline" className="mb-4">
                <Bot className="h-4 w-4 mr-1" />
                <SpeakableText text="AI Chat Assessment" as="span" />
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                <SpeakableText text="Chat with AI Assistant" as="span" />
              </h2>
              <p className="text-muted-foreground mb-6">
                <SpeakableText text="Describe your symptoms to our AI assistant for personalized guidance" as="span" />
              </p>
            </div>
            
            <Card className={isArabic ? 'card-rtl' : ''}>
              <CardContent className="p-0">
                <iframe
                  src="https://cdn.botpress.cloud/webchat/v3.1/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/16/14/20250716144448-063MB12B.json"
                  width="100%"
                  height="600px"
                  style={{ border: 'none', borderRadius: '12px' }}
                  title="AI Medical Assistant Chat"
                />
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={goBack}
                className={`flex-1 ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rtl:ml-2 rtl:mr-0 rtl:rotate-180' : 'mr-2'}`} />
                <SpeakableText text="Back" as="span" />
              </Button>
              
              <Button
                onClick={() => handleBotpressChatComplete([], 'medium')}
                className={`flex-1 ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <SpeakableText text="Continue to Results" as="span" />
              </Button>
            </div>
          </div>
        );

      case 'symptoms':
        return (
          <SymptomChecker
            primaryCause={state.primaryCause!}
            onComplete={handleSymptomsComplete}
            onBack={goBack}
          />
        );

      case 'recommendations':
        return (
          <div className={`space-y-6 ${isArabic ? 'rtl:text-right' : ''}`}>
            <div className={`text-center ${isArabic ? 'rtl:text-right' : ''}`}>
              <Badge className={`${getSeverityColor(state.severity)} text-background mb-4`}>
                <TranslatedText>{state.severity?.toUpperCase() + ' PRIORITY'}</TranslatedText>
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                <SpeakableText text="Assessment Complete" as="span" />
              </h2>
              <p className="text-muted-foreground">
                <SpeakableText text="Based on your symptoms, here are our recommendations" as="span" />
              </p>
            </div>

            <Card className={isArabic ? 'card-rtl' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
                  <Heart className="h-5 w-5 text-primary" />
                  <SpeakableText text="Recommended Actions" as="span" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.severity === 'emergency' && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="font-semibold text-destructive">
                      🚨 <SpeakableText text="EMERGENCY: Seek immediate medical attention" as="span" />
                    </p>
                  </div>
                )}
                
                {state.severity === 'high' && (
                  <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                    <p className="font-semibold text-warning">
                      ⚠️ <SpeakableText text="HIGH PRIORITY: Medical attention needed within 2 hours" as="span" />
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <p>• <SpeakableText text="Monitor symptoms closely" as="span" /></p>
                  <p>• <SpeakableText text="Apply basic first aid if trained" as="span" /></p>
                  <p>• <SpeakableText text="Keep patient comfortable and hydrated" as="span" /></p>
                  {state.primaryCause === 'burn' && <p>• <SpeakableText text="Cool the burn area with clean water" as="span" /></p>}
                  {state.primaryCause === 'trauma' && <p>• <SpeakableText text="Do not move patient unless necessary" as="span" /></p>}
                  {state.primaryCause === 'infection' && <p>• <SpeakableText text="Keep affected area clean and dry" as="span" /></p>}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={navigateToDoctor}
                className={`w-full ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <Phone className={`h-5 w-5 ${isArabic ? 'rtl:ml-2 rtl:mr-0' : 'mr-2'}`} />
                <SpeakableText text="Talk to a Doctor" as="span" />
              </Button>
              
              <Button
                variant="outline"
                onClick={navigateToLibrary}
                className={`w-full ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <FileText className={`h-5 w-5 ${isArabic ? 'rtl:ml-2 rtl:mr-0' : 'mr-2'}`} />
                <SpeakableText text="Access Medical Library" as="span" />
              </Button>
            </div>
          </div>
        );

      case 'doctor':
        return <TalkToDoctor primaryCause={state.primaryCause!} severity={state.severity!} onBack={goBack} />;

      case 'library':
        return <EnhancedOfflineLibrary primaryCause={state.primaryCause!} onBack={goBack} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className={`text-center mb-6 ${isArabic ? 'rtl:text-right' : ''}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <img 
              src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
              alt="Hope Logo" 
              className="w-24 h-24"
            />
            <div className="flex-1"></div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <SpeakableText text="Hope Triage" as="span" />
          </h1>
          <p className="text-muted-foreground">
            <SpeakableText text="Answer the questions below to assess your condition" as="span" />
          </p>
        </div>

        <div className="mb-6 progress-container">
          <div className="w-full bg-muted rounded-full h-2 progress-bar">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${state.progress}%` }}
            />
          </div>
          <p className={`text-sm text-muted-foreground text-center mt-2 ${isArabic ? 'rtl:text-right' : ''}`}>
            <SpeakableText text="Progress" as="span" />: {state.progress}%
          </p>
        </div>

        {state.step !== 'chat-intro' && state.step !== 'primary-cause' && (
          <Button
            variant="ghost"
            onClick={goBack}
            className={`mb-4 ${isArabic ? 'rtl:btn-reverse rtl:ml-auto rtl:mr-0' : ''}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rtl:ml-2 rtl:mr-0 rtl:rotate-180' : 'mr-2'}`} />
            <SpeakableText text="Back" as="span" />
          </Button>
        )}

        <div className="space-y-6">
          {renderContent()}
        </div>

        <div className={`mt-8 p-4 bg-muted rounded-lg ${isArabic ? 'card-rtl' : ''}`}>
          <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-orange-600" />
            )}
            <span className="text-sm font-medium">
              <SpeakableText text={isOnline ? 'Online Mode' : 'Offline Mode'} as="span" />
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            <SpeakableText text={isOnline 
                ? 'AI assessment, image analysis, and chat support available'
                : 'Manual assessment and offline medical library available'
              } as="span" />
          </p>
        </div>
      </div>
    </div>
  );
}
