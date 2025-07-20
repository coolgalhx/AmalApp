import * as React from "react";
import { Send, Mic, Camera, Paperclip, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  urgency?: "emergency" | "urgent" | "routine";
  triageData?: TriageData;
}

interface TriageData {
  currentStep: number;
  responses: Record<string, string>;
  urgencyLevel: "emergency" | "urgent" | "routine" | null;
  recommendations: string[];
}

interface TriageQuestion {
  id: string;
  question: string;
  type: "yes_no" | "multiple_choice" | "text";
  options?: string[];
  emergencyTriggers?: string[];
  urgentTriggers?: string[];
}

const triageQuestions: TriageQuestion[] = [
  {
    id: "breathing",
    question: "Are you having trouble breathing or experiencing severe shortness of breath?",
    type: "yes_no",
    emergencyTriggers: ["yes"]
  },
  {
    id: "consciousness",
    question: "Are you experiencing confusion, loss of consciousness, or severe disorientation?",
    type: "yes_no",
    emergencyTriggers: ["yes"]
  },
  {
    id: "chest_pain",
    question: "Are you experiencing severe chest pain, especially crushing or squeezing sensation?",
    type: "yes_no",
    emergencyTriggers: ["yes"]
  },
  {
    id: "bleeding",
    question: "Are you experiencing severe bleeding that won't stop?",
    type: "yes_no",
    emergencyTriggers: ["yes"]
  },
  {
    id: "pain_level",
    question: "How would you rate your pain level?",
    type: "multiple_choice",
    options: ["No pain (0)", "Mild pain (1-3)", "Moderate pain (4-6)", "Severe pain (7-8)", "Worst pain ever (9-10)"],
    emergencyTriggers: ["Worst pain ever (9-10)"],
    urgentTriggers: ["Severe pain (7-8)"]
  },
  {
    id: "fever",
    question: "Do you have a fever? If yes, what's your temperature?",
    type: "multiple_choice",
    options: ["No fever", "Low fever (99-101°F)", "Moderate fever (101-103°F)", "High fever (over 103°F)"],
    urgentTriggers: ["High fever (over 103°F)"]
  },
  {
    id: "duration",
    question: "How long have you been experiencing these symptoms?",
    type: "multiple_choice",
    options: ["Less than 1 day", "1-3 days", "4-7 days", "More than 1 week"],
    urgentTriggers: ["More than 1 week"]
  }
];

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hello! I'm here to help assess your medical concerns. I'll ask you a few questions to understand your symptoms better and determine the appropriate level of care needed.\n\nWhat symptoms are you experiencing today?",
    sender: "ai",
    timestamp: new Date()
  }
];

export const MedicalChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [currentTriage, setCurrentTriage] = useState<TriageData | null>(null);
  const [isTriageActive, setIsTriageActive] = useState(false);

  const determineUrgency = (responses: Record<string, string>): "emergency" | "urgent" | "routine" => {
    // Check for emergency triggers
    for (const question of triageQuestions) {
      const response = responses[question.id];
      if (response && question.emergencyTriggers?.includes(response)) {
        return "emergency";
      }
    }

    // Check for urgent triggers
    for (const question of triageQuestions) {
      const response = responses[question.id];
      if (response && question.urgentTriggers?.includes(response)) {
        return "urgent";
      }
    }

    return "routine";
  };

  const getRecommendations = (urgency: "emergency" | "urgent" | "routine"): string[] => {
    switch (urgency) {
      case "emergency":
        return [
          "🚨 SEEK IMMEDIATE EMERGENCY CARE",
          "Call 911 or go to the nearest emergency room immediately",
          "Do not drive yourself if possible",
          "This requires immediate medical attention"
        ];
      case "urgent":
        return [
          "⚠️ URGENT MEDICAL ATTENTION NEEDED",
          "Contact your healthcare provider immediately",
          "If unavailable, visit an urgent care center",
          "Do not wait - seek care within the next few hours"
        ];
      case "routine":
        return [
          "✅ ROUTINE CARE RECOMMENDED",
          "Schedule an appointment with your healthcare provider",
          "Monitor your symptoms and rest",
          "Stay hydrated and follow general wellness practices"
        ];
    }
  };

  const startTriage = () => {
    setIsTriageActive(true);
    setCurrentTriage({
      currentStep: 0,
      responses: {},
      urgencyLevel: null,
      recommendations: []
    });

    const firstQuestion = triageQuestions[0];
    const triageMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `I'll now ask you some important questions to assess your condition.\n\n${firstQuestion.question}`,
      sender: "ai",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, triageMessage]);
  };

  const handleTriageResponse = (response: string) => {
    if (!currentTriage) return;

    const currentQuestion = triageQuestions[currentTriage.currentStep];
    const updatedResponses = {
      ...currentTriage.responses,
      [currentQuestion.id]: response
    };

    const nextStep = currentTriage.currentStep + 1;

    if (nextStep < triageQuestions.length) {
      // Continue with next question
      const nextQuestion = triageQuestions[nextStep];
      const updatedTriage = {
        ...currentTriage,
        currentStep: nextStep,
        responses: updatedResponses
      };
      setCurrentTriage(updatedTriage);

      setTimeout(() => {
        const questionMessage: ChatMessage = {
          id: Date.now().toString(),
          text: nextQuestion.question,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, questionMessage]);
      }, 1000);
    } else {
      // Triage complete - determine urgency and provide recommendations
      const urgency = determineUrgency(updatedResponses);
      const recommendations = getRecommendations(urgency);
      
      setCurrentTriage({
        ...currentTriage,
        responses: updatedResponses,
        urgencyLevel: urgency,
        recommendations
      });
      setIsTriageActive(false);

      setTimeout(() => {
        const finalMessage: ChatMessage = {
          id: Date.now().toString(),
          text: `Based on your responses, here's my assessment:\n\n${recommendations.join('\n\n')}`,
          sender: "ai",
          timestamp: new Date(),
          urgency,
          triageData: {
            ...currentTriage,
            responses: updatedResponses,
            urgencyLevel: urgency,
            recommendations
          }
        };
        setMessages(prev => [...prev, finalMessage]);
      }, 1000);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      
      if (isTriageActive) {
        handleTriageResponse(inputMessage);
      } else if (!currentTriage) {
        // Start triage after initial symptom description
        setTimeout(() => {
          const response: ChatMessage = {
            id: Date.now().toString(),
            text: "Thank you for describing your symptoms. I'd like to ask you some questions to better understand your condition and determine the appropriate level of care.",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, response]);
          
          setTimeout(() => {
            startTriage();
          }, 1000);
        }, 1000);
      }
      
      setInputMessage("");
    }
  };

  const getUrgencyIcon = (urgency: "emergency" | "urgent" | "routine") => {
    switch (urgency) {
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />;
      case "urgent":
        return <Clock className="w-4 h-4" />;
      case "routine":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: "emergency" | "urgent" | "routine") => {
    switch (urgency) {
      case "emergency":
        return "bg-red-500 text-white";
      case "urgent":
        return "bg-orange-500 text-white";
      case "routine":
        return "bg-green-500 text-white";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-medical animate-fade-in">
      {/* Header */}
      <div className="flex items-center p-4 bg-gradient-card shadow-soft border-b">
        <Avatar className="w-10 h-10 mr-3 shadow-medium">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Amal</h2>
          <p className="text-sm text-muted-foreground">Create an account</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl shadow-soft ${
                message.sender === "user"
                  ? "bg-gradient-primary text-chat-bubble-foreground ml-4 shadow-colored"
                  : "bg-gradient-card text-foreground mr-4 border hover-glow"
              }`}
            >
              {message.urgency && (
                <div className="mb-2">
                  <Badge className={`${getUrgencyColor(message.urgency)} flex items-center gap-1`}>
                    {getUrgencyIcon(message.urgency)}
                    {message.urgency.toUpperCase()}
                  </Badge>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {/* Suggested Questions */}
        <div className="space-y-2 pt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Frequently asked questions:
          </div>
          <div className="space-y-2">
            <Card className="medical-card cursor-pointer animate-scale-in">
              <div className="p-3">
                <p className="text-sm">Are hospitals still operating?</p>
              </div>
            </Card>
            <Card className="medical-card cursor-pointer animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="p-3">
                <p className="text-sm">How can I treat a wound?</p>
              </div>
            </Card>
            <Card className="medical-card cursor-pointer animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="p-3">
                <p className="text-sm">What if I can't get medication?</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-gradient-card shadow-strong border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message..."
              className="pr-12 bg-white/50 border-0 shadow-soft hover-glow"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover-glow">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover-glow">
            <Mic className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover-glow">
            <Camera className="w-4 h-4" />
          </Button>
          <Button onClick={sendMessage} size="sm" className="h-8 w-8 p-0 bg-gradient-primary shadow-colored hover-glow">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};