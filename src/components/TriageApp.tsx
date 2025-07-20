
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

export type TriageStep = 'chat-intro' | 'primary-cause' | 'image-upload' | 'lightweight-chat' | 'symptoms' | 'recommendations' | 'doctor' | 'library';
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
      step: 'lightweight-chat',
      progress: 50
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
      case 'symptoms':
        setState({ ...state, step: 'primary-cause', progress: 10 });
        break;
      case 'recommendations':
        if (state.useAI) {
          setState({ ...state, step: 'lightweight-chat', progress: 50 });
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
                <TranslatedText>Welcome to Hope AI Triage</TranslatedText>
              </h2>
              <p className="text-muted-foreground mb-6">
                <TranslatedText>Choose how you would like to get medical guidance</TranslatedText>
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className={isArabic ? 'card-rtl' : ''}>
                <CardContent className="p-6">
                  <div className={`flex items-start gap-4 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        <TranslatedText>Manual Assessment</TranslatedText>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        <TranslatedText>Step-by-step triage with offline medical library</TranslatedText>
                      </p>
                      <div className={`flex gap-2 ${isArabic ? 'rtl:flex-row-reverse rtl:justify-end' : ''}`}>
                        <Badge variant="outline">
                          <TranslatedText>Step by Step</TranslatedText>
                        </Badge>
                        <Badge variant="outline">
                          <TranslatedText>Offline Ready</TranslatedText>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={startManualTriage} 
                    className={`w-full mt-4 ${isArabic ? 'rtl:btn-reverse' : ''}`}
                  >
                    <TranslatedText>Start Manual Assessment</TranslatedText>
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
                <TranslatedText>{state.useAI ? 'AI Assessment' : 'Manual Assessment'}</TranslatedText>
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                <TranslatedText>What is the primary cause?</TranslatedText>
              </h2>
              <p className="text-muted-foreground">
                <TranslatedText>Select the main reason for seeking help</TranslatedText>
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
                  <TranslatedText>{label}</TranslatedText>
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
                <TranslatedText>{`${state.severity?.toUpperCase()} PRIORITY`}</TranslatedText>
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                <TranslatedText>Assessment Complete</TranslatedText>
              </h2>
              <p className="text-muted-foreground">
                <TranslatedText>Based on your symptoms, here are our recommendations</TranslatedText>
              </p>
            </div>

            <Card className={isArabic ? 'card-rtl' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isArabic ? 'rtl:flex-row-reverse' : ''}`}>
                  <Heart className="h-5 w-5 text-primary" />
                  <TranslatedText>Recommended Actions</TranslatedText>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.severity === 'emergency' && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="font-semibold text-destructive">
                      🚨 <TranslatedText>EMERGENCY: Seek immediate medical attention</TranslatedText>
                    </p>
                  </div>
                )}
                
                {state.severity === 'high' && (
                  <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                    <p className="font-semibold text-warning">
                      ⚠️ <TranslatedText>HIGH PRIORITY: Medical attention needed within 2 hours</TranslatedText>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <p>• <TranslatedText>Monitor symptoms closely</TranslatedText></p>
                  <p>• <TranslatedText>Apply basic first aid if trained</TranslatedText></p>
                  <p>• <TranslatedText>Keep patient comfortable and hydrated</TranslatedText></p>
                  {state.primaryCause === 'burn' && <p>• <TranslatedText>Cool the burn area with clean water</TranslatedText></p>}
                  {state.primaryCause === 'trauma' && <p>• <TranslatedText>Do not move patient unless necessary</TranslatedText></p>}
                  {state.primaryCause === 'infection' && <p>• <TranslatedText>Keep affected area clean and dry</TranslatedText></p>}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={navigateToDoctor}
                className={`w-full ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <Phone className={`h-5 w-5 ${isArabic ? 'rtl:ml-2 rtl:mr-0' : 'mr-2'}`} />
                <TranslatedText>Talk to a Doctor</TranslatedText>
              </Button>
              
              <Button
                variant="outline"
                onClick={navigateToLibrary}
                className={`w-full ${isArabic ? 'rtl:btn-reverse' : ''}`}
              >
                <FileText className={`h-5 w-5 ${isArabic ? 'rtl:ml-2 rtl:mr-0' : 'mr-2'}`} />
                <TranslatedText>Access Medical Library</TranslatedText>
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
            <TranslatedText>Hope Triage</TranslatedText>
          </h1>
          <p className="text-muted-foreground">
            <TranslatedText>Answer the questions below to assess your condition</TranslatedText>
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
            <TranslatedText>Progress</TranslatedText>: {state.progress}%
          </p>
        </div>

        {state.step !== 'chat-intro' && state.step !== 'primary-cause' && (
          <Button
            variant="ghost"
            onClick={goBack}
            className={`mb-4 ${isArabic ? 'rtl:btn-reverse rtl:ml-auto rtl:mr-0' : ''}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isArabic ? 'rtl:ml-2 rtl:mr-0 rtl:rotate-180' : 'mr-2'}`} />
            <TranslatedText>Back</TranslatedText>
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
              <TranslatedText>{isOnline ? 'Online Mode' : 'Offline Mode'}</TranslatedText>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            <TranslatedText>
              {isOnline 
                ? 'AI assessment, image analysis, and chat support available'
                : 'Manual assessment and offline medical library available'
              }
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
}
