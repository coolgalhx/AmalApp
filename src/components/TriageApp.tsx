import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Phone, FileText, ArrowLeft, Bot, Wifi, WifiOff, Volume2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { LightweightChat } from './LightweightChat';
import { SymptomChecker } from './SymptomChecker';

import { TalkToDoctor } from './TalkToDoctor';
import { EnhancedOfflineLibrary } from './EnhancedOfflineLibrary';

// Temporarily comment out to fix React initialization issue
// import { useTextToSpeech } from '@/hooks/useTextToSpeech';
// import { useOfflineAssessment } from '@/hooks/useOfflineAssessment';
// import { useDoubleClick } from '@/hooks/useDoubleClick';

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
  const [state, setState] = React.useState<TriageState>({
    step: 'chat-intro',
    symptoms: [],
    progress: 0
  });
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  // Temporarily comment out to fix React initialization issue
  // const { isOffline: hookIsOffline } = useOfflineAssessment();

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPageText = () => {
    switch (state.step) {
      case 'chat-intro':
        return 'Welcome to Hope AI Triage. Choose how you would like to get medical guidance. AI-Powered Assessment with image analysis and AI chat, or Manual Assessment with step-by-step triage and offline medical library.';
      case 'primary-cause':
        return `${state.useAI ? 'AI Assessment' : 'Manual Assessment'}. What is the primary cause? Select the main reason for seeking help. Options are: Injury, Burn, Trauma, or Infection.`;
      case 'recommendations':
        return `Assessment Complete. ${state.severity} priority condition. Based on your symptoms, here are our recommendations. You can talk to a doctor or access the medical library.`;
      default:
        return 'Hope Triage application. Use the interface to navigate through your medical assessment.';
    }
  };

  // Temporarily comment out to fix React initialization issue
  // const handleDoubleClick = useDoubleClick(
  //   () => speak(getPageText()),
  //   () => stop()
  // );

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
          <div className="space-y-6">
             <div className="text-center">
              <img 
                src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
                alt="Hope Logo" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Welcome to Hope AI Triage</h2>
              <p className="text-muted-foreground mb-6">
                Choose how you'd like to get medical guidance
              </p>
            </div>
            
            <div className="space-y-4">

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Manual Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Step-by-step triage with offline medical library
                      </p>
                      <Badge variant="outline" className="mr-2">Step by Step</Badge>
                      <Badge variant="outline">Offline Ready</Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={startManualTriage} className="w-full mt-4">
                    Start Manual Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'primary-cause':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                {state.useAI ? 'AI Assessment' : 'Manual Assessment'}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">What is the primary cause?</h2>
              <p className="text-muted-foreground">Select the main reason for seeking help</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {primaryCauses.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="outline"
                  className="h-24 flex-col gap-2 text-base font-medium"
                  onClick={() => handlePrimaryCauseSelect(id)}
                >
                  <Icon className="h-6 w-6" />
                  {label}
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
          <div className="space-y-6">
            <div className="text-center">
              <Badge className={`${getSeverityColor(state.severity)} text-background mb-4`}>
                {state.severity?.toUpperCase()} PRIORITY
              </Badge>
              <h2 className="text-2xl font-bold mb-2">Assessment Complete</h2>
              <p className="text-muted-foreground">Based on your symptoms, here are our recommendations</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.severity === 'emergency' && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="font-semibold text-destructive">🚨 EMERGENCY: Seek immediate medical attention</p>
                  </div>
                )}
                
                {state.severity === 'high' && (
                  <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                    <p className="font-semibold text-warning">⚠️ HIGH PRIORITY: Medical attention needed within 2 hours</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p>• Monitor symptoms closely</p>
                  <p>• Apply basic first aid if trained</p>
                  <p>• Keep patient comfortable and hydrated</p>
                  {state.primaryCause === 'burn' && <p>• Cool the burn area with clean water</p>}
                  {state.primaryCause === 'trauma' && <p>• Do not move patient unless necessary</p>}
                  {state.primaryCause === 'infection' && <p>• Keep affected area clean and dry</p>}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Button
                onClick={navigateToDoctor}
                className="w-full"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to a Doctor
              </Button>
              
              <Button
                variant="outline"
                onClick={navigateToLibrary}
                className="w-full"
              >
                <FileText className="h-5 w-5 mr-2" />
                Access Medical Library
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
        <div className="text-center mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <img 
              src="/lovable-uploads/956ef608-57d9-4264-a562-d9fd9f259607.png" 
              alt="Hope Logo" 
              className="w-24 h-24"
            />
            <div className="flex-1"></div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Hope Triage</h1>
          <p className="text-muted-foreground">
            Answer the questions below to assess your condition
          </p>
        </div>

        <div className="mb-6">
          {/* Temporarily replace Progress component to fix React initialization issue */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${state.progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Progress: {state.progress}%
          </p>
        </div>

        {state.step !== 'chat-intro' && state.step !== 'primary-cause' && (
          <Button
            variant="ghost"
            onClick={goBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        <div className="space-y-6">
          {renderContent()}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-orange-600" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Online' : 'Offline'} Mode
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {isOnline 
              ? 'AI assessment, image analysis, and chat support available'
              : 'Manual assessment and offline medical library available'
            }
          </p>
        </div>
      </div>
    </div>
  );
}