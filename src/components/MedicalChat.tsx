import { useState } from "react";
import { Send, Mic, Camera, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hello, How can I help you today?",
    sender: "ai",
    timestamp: new Date()
  },
  {
    id: "2", 
    text: "Hello",
    sender: "user",
    timestamp: new Date()
  },
  {
    id: "3",
    text: "I feel feverish and my body aches.",
    sender: "user", 
    timestamp: new Date()
  },
  {
    id: "4",
    text: "Thank you for letting me know. In order to help you better, I'm going to ask you a few further questions.\n\nIs that okay?",
    sender: "ai",
    timestamp: new Date()
  },
  {
    id: "5",
    text: "Yes",
    sender: "user",
    timestamp: new Date()
  },
  {
    id: "6",
    text: "Are you able to breathe properly?",
    sender: "ai",
    timestamp: new Date()
  },
  {
    id: "7",
    text: "Yes",
    sender: "user",
    timestamp: new Date()
  }
];

export const MedicalChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for the information. Based on your symptoms, I recommend monitoring your temperature and staying hydrated. If symptoms worsen, please consult a healthcare professional.",
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-medical-bg">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Amal</h2>
          <p className="text-sm text-muted-foreground">Create an account</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-chat-bubble text-chat-bubble-foreground ml-4"
                  : "bg-white text-foreground mr-4 border"
              }`}
            >
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
            <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <p className="text-sm">Are hospitals still operating?</p>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <p className="text-sm">How can I treat a wound?</p>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors">
              <p className="text-sm">What if I can't get medication?</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message..."
              className="pr-12 bg-muted/30 border-0"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Mic className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Camera className="w-4 h-4" />
          </Button>
          <Button onClick={sendMessage} size="sm" className="h-8 w-8 p-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};