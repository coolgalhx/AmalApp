import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import { AlertTriangle, CheckCircle } from 'lucide-react';
import { PrimaryCause, Severity } from './TriageApp';

interface Symptom {
  id: string;
  label: string;
  severity: number; // 1-5 scale
  category: 'primary' | 'secondary' | 'emergency';
}

interface SymptomCheckerProps {
  primaryCause: PrimaryCause;
  onComplete: (symptoms: string[], severity: Severity) => void;
  onBack: () => void;
}

export function SymptomChecker({ primaryCause, onComplete, onBack }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>([]);
  const [currentStep, setCurrentStep] = React.useState(0);

  const symptomSets = {
    injury: [
      { id: 'pain', label: 'Pain at injury site', severity: 2, category: 'primary' as const },
      { id: 'swelling', label: 'Swelling or inflammation', severity: 2, category: 'primary' as const },
      { id: 'bleeding', label: 'Bleeding (minor)', severity: 3, category: 'primary' as const },
      { id: 'heavy-bleeding', label: 'Heavy bleeding', severity: 5, category: 'emergency' as const },
      { id: 'bruising', label: 'Bruising or discoloration', severity: 1, category: 'secondary' as const },
      { id: 'limited-movement', label: 'Limited movement', severity: 3, category: 'primary' as const },
      { id: 'deformity', label: 'Visible deformity', severity: 4, category: 'emergency' as const },
      { id: 'numbness', label: 'Numbness or tingling', severity: 3, category: 'primary' as const },
    ],
    burn: [
      { id: 'redness', label: 'Redness of skin', severity: 1, category: 'primary' as const },
      { id: 'blistering', label: 'Blistering', severity: 3, category: 'primary' as const },
      { id: 'severe-pain', label: 'Severe pain', severity: 4, category: 'emergency' as const },
      { id: 'white-charred', label: 'White or charred skin', severity: 5, category: 'emergency' as const },
      { id: 'large-area', label: 'Burn covers large area', severity: 4, category: 'emergency' as const },
      { id: 'infection-signs', label: 'Signs of infection', severity: 3, category: 'primary' as const },
    ],
    trauma: [
      { id: 'consciousness', label: 'Loss of consciousness', severity: 5, category: 'emergency' as const },
      { id: 'confusion', label: 'Confusion or disorientation', severity: 4, category: 'emergency' as const },
      { id: 'nausea', label: 'Nausea or vomiting', severity: 3, category: 'primary' as const },
      { id: 'headache', label: 'Severe headache', severity: 3, category: 'primary' as const },
      { id: 'breathing-difficulty', label: 'Difficulty breathing', severity: 5, category: 'emergency' as const },
      { id: 'chest-pain', label: 'Chest pain', severity: 4, category: 'emergency' as const },
      { id: 'back-pain', label: 'Back or neck pain', severity: 3, category: 'primary' as const },
    ],
    infection: [
      { id: 'fever', label: 'Fever', severity: 3, category: 'primary' as const },
      { id: 'redness-warmth', label: 'Redness and warmth', severity: 2, category: 'primary' as const },
      { id: 'discharge', label: 'Pus or discharge', severity: 3, category: 'primary' as const },
      { id: 'red-streaks', label: 'Red streaks from wound', severity: 4, category: 'emergency' as const },
      { id: 'high-fever', label: 'High fever (>101°F)', severity: 4, category: 'emergency' as const },
      { id: 'chills', label: 'Chills or shaking', severity: 3, category: 'primary' as const },
      { id: 'swollen-glands', label: 'Swollen lymph glands', severity: 2, category: 'secondary' as const },
    ]
  };

  const steps = [
    'Emergency Symptoms',
    'Primary Symptoms', 
    'Secondary Symptoms'
  ];

  const getCurrentSymptoms = () => {
    const allSymptoms = symptomSets[primaryCause];
    switch (currentStep) {
      case 0:
        return allSymptoms.filter(s => s.category === 'emergency');
      case 1:
        return allSymptoms.filter(s => s.category === 'primary');
      case 2:
        return allSymptoms.filter(s => s.category === 'secondary');
      default:
        return [];
    }
  };

  const handleSymptomToggle = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms(prev => [...prev, symptomId]);
    } else {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
    }
  };

  const calculateSeverity = (): Severity => {
    const selectedSymptomsData = symptomSets[primaryCause].filter(
      s => selectedSymptoms.includes(s.id)
    );

    // Check for emergency symptoms
    const hasEmergency = selectedSymptomsData.some(s => s.category === 'emergency');
    if (hasEmergency) return 'emergency';

    // Calculate average severity
    const totalSeverity = selectedSymptomsData.reduce((sum, s) => sum + s.severity, 0);
    const avgSeverity = selectedSymptomsData.length > 0 ? totalSeverity / selectedSymptomsData.length : 0;

    if (avgSeverity >= 3.5) return 'high';
    if (avgSeverity >= 2.5) return 'medium';
    return 'low';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const severity = calculateSeverity();
      onComplete(selectedSymptoms, severity);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const currentSymptoms = React.useMemo(() => getCurrentSymptoms(), [primaryCause, currentStep]);
  const progress = React.useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Symptom Assessment</h2>
        <Badge variant="outline" className="mb-4">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {Math.round(progress)}% Complete
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentStep === 0 ? (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
            {steps[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-destructive">
                ⚠️ Check any emergency symptoms you're experiencing
              </p>
            </div>
          )}

          {currentSymptoms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No {steps[currentStep].toLowerCase()} symptoms to check for {primaryCause}.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentSymptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom.id}
                    checked={selectedSymptoms.includes(symptom.id)}
                    onCheckedChange={(checked) => 
                      handleSymptomToggle(symptom.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={symptom.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                  >
                    {symptom.label}
                  </label>
                  {symptom.category === 'emergency' && (
                    <Badge variant="destructive" className="text-xs">
                      Emergency
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedSymptoms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptomId) => {
                const symptom = symptomSets[primaryCause].find(s => s.id === symptomId);
                return (
                  <Badge
                    key={symptomId}
                    variant={symptom?.category === 'emergency' ? 'destructive' : 'secondary'}
                  >
                    {symptom?.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          {currentStep === 0 ? 'Back to Causes' : 'Previous'}
        </Button>
        <Button 
          onClick={handleNext} 
          className="flex-1"
          disabled={currentStep === 0 && selectedSymptoms.length === 0}
        >
          {currentStep < steps.length - 1 ? 'Next Step' : 'Complete Assessment'}
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="font-medium text-sm">Important</span>
        </div>
        <p className="text-sm text-muted-foreground">
          If you're experiencing severe symptoms or this is an emergency, 
          please seek immediate medical attention or call emergency services.
        </p>
      </div>
    </div>
  );
}