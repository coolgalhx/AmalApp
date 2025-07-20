import * as React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Video, MessageSquare, Clock, MapPin, AlertTriangle, ArrowLeft, Users, Stethoscope } from 'lucide-react';
import { PrimaryCause, Severity } from './TriageApp';
import { InternalPhoneCallButton } from './InternalPhoneCallButton';

interface TalkToDoctorProps {
  primaryCause: PrimaryCause;
  severity: Severity;
  onBack: () => void;
}

export function TalkToDoctor({ primaryCause, severity, onBack }: TalkToDoctorProps) {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [showDoctorList, setShowDoctorList] = React.useState(false);
  const { toast } = useToast();

  // Mock doctor data
  const localDoctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Medicine',
      phone: '0594149120',
      available: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      phone: '0595474936',
      available: true
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Family Medicine',
      phone: '0594149120',
      available: true
    },
    {
      id: '4',
      name: 'Dr. David Thompson',
      specialty: 'Emergency Medicine',
      phone: '0595474936',
      available: false
    },
    {
      id: '5',
      name: 'Dr. Lisa Wang',
      specialty: 'General Practice',
      phone: '0594149120',
      available: true
    }
  ];

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
        // Show doctor list modal instead of direct call
        setShowDoctorList(true);
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

  const handleDoctorSelect = (doctor: any) => {
    // Close modal and trigger phone call
    setShowDoctorList(false);
    window.location.href = `tel:${doctor.phone}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Simulate action based on selection
    switch (optionId) {
      case 'emergency':
        toast({
          title: "Emergency Services",
          description: "In a real emergency, this would connect you to 911 services.",
          variant: "destructive"
        });
        break;
      case 'urgent-care':
        toast({
          title: "Urgent Care",
          description: "In a real app, this would show nearby urgent care locations.",
        });
        break;
      case 'telemedicine':
        toast({
          title: "Telemedicine",
          description: "In a real app, this would connect you to a telemedicine platform.",
        });
        break;
      case 'chat':
        toast({
          title: "Medical Chat",
          description: "In a real app, this would start a medical chat consultation.",
        });
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
            if (option.id === 'internal-call') {
              return (
                <InternalPhoneCallButton 
                  key={option.id}
                  onClick={() => handleEscalationSelect(option)}
                />
              );
            }
            
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

      {/* Doctor List Modal */}
      <Dialog open={showDoctorList} onOpenChange={setShowDoctorList}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Select a Local Doctor
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Choose from our network of available on-call doctors
            </p>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            {localDoctors.map((doctor) => (
              <Card 
                key={doctor.id}
                className={`cursor-pointer transition-all border-2 hover:border-primary/50 ${
                  !doctor.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => doctor.available && handleDoctorSelect(doctor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Stethoscope className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground">{doctor.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {doctor.available ? (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Busy
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3 text-primary" />
                        <span className="text-xs text-primary">Tap to call</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span className="text-xs font-medium">Note</span>
            </div>
            <p className="text-xs text-muted-foreground">
              These are partner network doctors available for immediate consultation.
              Calling will connect you directly to the selected doctor.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}