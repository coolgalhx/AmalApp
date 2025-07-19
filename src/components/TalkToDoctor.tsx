import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Video, MessageSquare, Clock, MapPin, AlertTriangle, ArrowLeft, Users } from 'lucide-react';
import { PrimaryCause, Severity } from './TriageApp';

interface TalkToDoctorProps {
  primaryCause: PrimaryCause;
  severity: Severity;
  onBack: () => void;
}

export function TalkToDoctor({ primaryCause, severity, onBack }: TalkToDoctorProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'low': return 'bg-secondary';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      case 'emergency': return 'bg-destructive animate-pulse';
      default: return 'bg-muted';
    }
  };

  const getWaitTime = () => {
    switch (severity) {
      case 'emergency': return 'Immediate';
      case 'high': return '5-15 min';
      case 'medium': return '15-30 min';
      case 'low': return '30-60 min';
      default: return '30-60 min';
    }
  };

  const escalationOptions = [
    {
      id: 'internal-call',
      title: 'Internal Phone Call',
      description: 'Direct call to local on-call doctor (Partner Network)',
      descriptionAr: 'اتصال مباشر بطبيب محلي (شبكة الشركاء)',
      icon: Phone,
      waitTime: 'Immediate',
      cost: 'Free',
      availability: '24/7 Available',
      recommended: severity === 'emergency' || severity === 'high',
      phoneNumber: '+1-555-123-4567', // Dummy test number
      action: 'call'
    },
    {
      id: 'whatsapp-global',
      title: 'WhatsApp Global Doctor',
      description: 'Chat with remote doctor via WhatsApp',
      descriptionAr: 'محادثة مع طبيب عن بُعد عبر واتساب',
      icon: MessageSquare,
      waitTime: '5-15 min',
      cost: 'Low cost',
      availability: 'International coverage',
      recommended: severity === 'medium' || severity === 'low',
      whatsappNumber: '+1234567890', // Dummy WhatsApp number
      action: 'whatsapp'
    },
    {
      id: 'group-doctors',
      title: 'Ask Group of Doctors',
      description: 'Get multiple opinions from our medical community',
      descriptionAr: 'احصل على آراء متعددة من مجتمعنا الطبي',
      icon: Users,
      waitTime: '10-30 min',
      cost: 'Community rate',
      availability: 'Active community',
      recommended: severity === 'medium',
      groupLink: 'https://chat.whatsapp.com/BQcD9VA2lQ73VeHjixClHl', // Dummy WhatsApp group link
      action: 'group'
    }
  ];

  const consultationOptions = [
    {
      id: 'emergency',
      title: 'Emergency Services',
      description: 'Call 911 for immediate emergency care',
      icon: Phone,
      waitTime: 'Immediate',
      cost: 'Emergency rate',
      availability: 'Always available',
      recommended: severity === 'emergency'
    },
    {
      id: 'urgent-care',
      title: 'Urgent Care Center',
      description: 'Visit nearest urgent care facility',
      icon: MapPin,
      waitTime: '30-90 min',
      cost: 'Standard urgent care',
      availability: 'Most locations 8am-10pm',
      recommended: severity === 'high'
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine Consultation',
      description: 'Video call with licensed physician',
      icon: Video,
      waitTime: getWaitTime(),
      cost: '$49-89',
      availability: 'Available now',
      recommended: severity === 'medium' || severity === 'low'
    },
    {
      id: 'chat',
      title: 'Medical Chat Support',
      description: 'Text-based consultation with medical professional',
      icon: MessageSquare,
      waitTime: '5-10 min',
      cost: '$25-45',
      availability: 'Available now',
      recommended: severity === 'low'
    }
  ];

  const handleEscalationSelect = (option: any) => {
    setSelectedOption(option.id);
    
    switch (option.action) {
      case 'call':
        // Open native phone dialer
        window.location.href = `tel:${option.phoneNumber}`;
        break;
      case 'whatsapp':
        // Open WhatsApp chat
        window.open(`https://wa.me/${option.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20need%20medical%20assistance%20regarding%20${primaryCause}`, '_blank');
        break;
      case 'group':
        // Open group chat
        window.open(option.groupLink, '_blank');
        break;
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Simulate action based on selection
    switch (optionId) {
      case 'emergency':
        // In real app, this would initiate emergency call
        alert('In a real emergency, this would connect you to 911 services.');
        break;
      case 'urgent-care':
        // In real app, this would show nearby locations
        alert('In a real app, this would show nearby urgent care locations.');
        break;
      case 'telemedicine':
        // In real app, this would start video consultation flow
        alert('In a real app, this would connect you to a telemedicine platform.');
        break;
      case 'chat':
        // In real app, this would start chat consultation
        alert('In a real app, this would start a medical chat consultation.');
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className={`${getSeverityColor(severity)} text-background mb-4`}>
          {severity.toUpperCase()} PRIORITY
        </Badge>
        <h2 className="text-2xl font-bold mb-2">Consult a Medical Professional</h2>
        <p className="text-muted-foreground">
          Based on your {primaryCause} assessment, here are your consultation options
        </p>
      </div>

      {severity === 'emergency' && (
        <Card className="border-destructive">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <h3 className="font-bold text-lg text-destructive">Emergency Situation Detected</h3>
                <p className="text-sm text-muted-foreground">
                  Your symptoms indicate a potential emergency requiring immediate medical attention.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => handleOptionSelect('emergency')}
              className="w-full bg-destructive hover:bg-destructive/90"
              size="lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Emergency Services (911)
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Doctor Escalation Options */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Talk to a Doctor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get immediate professional medical support through multiple channels
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {escalationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all border-2 hover:border-primary/50 ${
                  option.recommended ? 'border-primary bg-primary/5' : 'border-border'
                } ${selectedOption === option.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleEscalationSelect(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                    {option.recommended && (
                      <Badge variant="default" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Response</span>
                      </div>
                      <p className="text-muted-foreground">{option.waitTime}</p>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Cost</div>
                      <p className="text-muted-foreground">{option.cost}</p>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Coverage</div>
                      <p className="text-muted-foreground">{option.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {consultationOptions
          .filter(option => severity !== 'emergency' || option.id === 'emergency')
          .map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all ${
                  option.recommended ? 'border-primary bg-primary/5' : ''
                } ${selectedOption === option.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <span>{option.title}</span>
                    </div>
                    {option.recommended && (
                      <Badge variant="default" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Wait Time</span>
                      </div>
                      <p className="text-muted-foreground">{option.waitTime}</p>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Cost</div>
                      <p className="text-muted-foreground">{option.cost}</p>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1">Availability</div>
                      <p className="text-muted-foreground">{option.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What to Prepare</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Medical History</p>
              <p className="text-sm text-muted-foreground">
                Current medications, allergies, and relevant medical conditions
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Symptom Details</p>
              <p className="text-sm text-muted-foreground">
                When symptoms started, what triggers them, and severity level
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Insurance Information</p>
              <p className="text-sm text-muted-foreground">
                Insurance card and identification ready
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="font-medium text-sm">Disclaimer</span>
        </div>
        <p className="text-sm text-muted-foreground">
          This assessment is for informational purposes only and does not replace professional medical advice. 
          Always consult with healthcare professionals for proper diagnosis and treatment.
        </p>
      </div>

      <Button variant="outline" onClick={onBack} className="w-full">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Recommendations
      </Button>
    </div>
  );
}