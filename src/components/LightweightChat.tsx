import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, AlertTriangle, Clock } from 'lucide-react';
import { PrimaryCause, Severity } from './TriageApp';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface LightweightChatProps {
  primaryCause: PrimaryCause;
  onTriageComplete: (symptoms: string[], severity: Severity) => void;
  onBack: () => void;
}

export function LightweightChat({ primaryCause, onTriageComplete, onBack }: LightweightChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [responses, setResponses] = React.useState<string[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const questions = {
    injury: [
      "Can you describe when the injury occurred?",
      "On a scale of 1-10, how would you rate your pain?",
      "Is there any visible bleeding or swelling?",
      "Are you able to move the injured area normally?"
    ],
    burn: [
      "How did the burn occur and when?",
      "How large is the affected area?",
      "Is there blistering or open wounds?",
      "Are you experiencing severe pain?"
    ],
    trauma: [
      "Can you describe what happened?",
      "Are you experiencing any dizziness or nausea?",
      "Do you have any difficulty breathing?",
      "Is there any loss of consciousness?"
    ],
    infection: [
      "When did you first notice symptoms?",
      "Is there any fever, redness, or warmth?",
      "Is there any discharge or unusual odor?",
      "Have symptoms been getting worse?"
    ]
  };

  React.useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: `I'm here to help assess your ${primaryCause}. I'll ask you a few quick questions to understand your condition better. Let's start:`,
      isBot: true,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    setTimeout(() => {
      askNextQuestion();
    }, 1000);
  }, [primaryCause]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const askNextQuestion = () => {
    const currentQuestions = questions[primaryCause];
    if (questionIndex < currentQuestions.length) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(currentQuestions[questionIndex], true);
        setIsTyping(false);
      }, 1000);
    } else {
      completeAssessment();
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, false);
    setResponses(prev => [...prev, inputValue]);
    setInputValue('');

    setTimeout(() => {
      if (questionIndex < questions[primaryCause].length - 1) {
        setQuestionIndex(prev => prev + 1);
        askNextQuestion();
      } else {
        completeAssessment();
      }
    }, 500);
  };

  const completeAssessment = () => {
    setIsTyping(true);
    setTimeout(() => {
      const severity = assessSeverity();
      const symptoms = extractSymptoms();
      
      addMessage(
        `Based on your responses, I'm assessing this as ${severity.toUpperCase()} priority. Let me provide you with specific recommendations.`,
        true
      );
      setIsTyping(false);
      
      setTimeout(() => {
        onTriageComplete(symptoms, severity);
      }, 2000);
    }, 1500);
  };

  const assessSeverity = (): Severity => {
    const responseText = responses.join(' ').toLowerCase();
    
    // Emergency indicators
    if (responseText.includes('unconscious') || 
        responseText.includes('difficulty breathing') ||
        responseText.includes('severe pain') ||
        responseText.includes('10') ||
        responseText.includes('bleeding heavily')) {
      return 'emergency';
    }
    
    // High priority indicators
    if (responseText.includes('getting worse') ||
        responseText.includes('fever') ||
        responseText.includes('8') || responseText.includes('9') ||
        responseText.includes('swelling') ||
        responseText.includes('blistering')) {
      return 'high';
    }
    
    // Medium priority indicators
    if (responseText.includes('pain') ||
        responseText.includes('redness') ||
        responseText.includes('discharge') ||
        responseText.includes('5') || responseText.includes('6') || responseText.includes('7')) {
      return 'medium';
    }
    
    return 'low';
  };

  const extractSymptoms = (): string[] => {
    const symptoms: string[] = [];
    const responseText = responses.join(' ').toLowerCase();
    
    if (responseText.includes('pain')) symptoms.push('pain');
    if (responseText.includes('swelling')) symptoms.push('swelling');
    if (responseText.includes('bleeding')) symptoms.push('bleeding');
    if (responseText.includes('fever')) symptoms.push('fever');
    if (responseText.includes('redness')) symptoms.push('redness');
    if (responseText.includes('discharge')) symptoms.push('discharge');
    if (responseText.includes('nausea')) symptoms.push('nausea');
    if (responseText.includes('dizziness')) symptoms.push('dizziness');
    
    return symptoms.length > 0 ? symptoms : [primaryCause];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">AI Assessment Chat</h2>
        <Badge variant="outline" className="mb-4">
          Question {Math.min(questionIndex + 1, questions[primaryCause].length)} of {questions[primaryCause].length}
        </Badge>
      </div>

      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Medical Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-muted text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.isBot ? (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {questionIndex < questions[primaryCause].length && !isTyping && (
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your response..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="font-medium text-sm">Emergency Notice</span>
        </div>
        <p className="text-sm text-muted-foreground">
          If this is a life-threatening emergency, please call emergency services immediately.
        </p>
      </div>
    </div>
  );
}