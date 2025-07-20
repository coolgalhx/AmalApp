import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Check, ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { PrimaryCause } from './TriageApp';
import { useOfflineAssessment } from '@/hooks/useOfflineAssessment';

interface OfflineSymptomCheckerProps {
  primaryCause: PrimaryCause;
  onComplete: (symptoms: string[], severity: 'low' | 'medium' | 'high' | 'emergency') => void;
  onBack: () => void;
}

export function OfflineSymptomChecker({ primaryCause, onComplete, onBack }: OfflineSymptomCheckerProps) {
  const { isOffline, getSymptomsForCause, assessSeverity, saveAssessment } = useOfflineAssessment();
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fallback data for offline functionality
  const availableSymptoms = ['pain', 'swelling', 'bleeding', 'bruising', 'difficulty moving'];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Implement assessment logic directly to fix triage priority issue
  const localAssessSeverity = (primaryCause: string, symptoms: string[]): 'low' | 'medium' | 'high' | 'emergency' => {
    // Emergency keywords that trigger immediate emergency classification
    const emergencyKeywords = ['unconscious', 'severe bleeding', 'difficulty breathing', 'chest pain', 'severe burns', 'head trauma'];
    const highKeywords = ['bleeding', 'severe pain', 'fever', 'infection signs'];
    const mediumKeywords = ['pain', 'swelling', 'redness'];

    const symptomText = symptoms.join(' ').toLowerCase();

    if (emergencyKeywords.some(keyword => symptomText.includes(keyword))) {
      return 'emergency';
    }

    if (primaryCause === 'trauma' && symptoms.length > 2) {
      return 'high';
    }

    if (highKeywords.some(keyword => symptomText.includes(keyword))) {
      return 'high';
    }

    if (mediumKeywords.some(keyword => symptomText.includes(keyword))) {
      return 'medium';
    }

    return 'low';
  };

  const handleComplete = () => {
    // Get checked symptoms from the checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedSymptoms: string[] = [];
    
    checkboxes.forEach((checkbox) => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      if (label) {
        selectedSymptoms.push(label.textContent || '');
      }
    });

    // Get additional notes from textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const additionalNotes = textarea?.value || '';
    
    if (additionalNotes.trim()) {
      selectedSymptoms.push(additionalNotes.trim());
    }

    // Use proper assessment logic instead of hardcoded 'low'
    const severity = localAssessSeverity(primaryCause, selectedSymptoms);
    onComplete(selectedSymptoms.length > 0 ? selectedSymptoms : ['basic assessment'], severity);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {isOffline ? (
            <WifiOff className="h-5 w-5 text-orange-600" />
          ) : (
            <Wifi className="h-5 w-5 text-green-600" />
          )}
          <Badge variant={isOffline ? "destructive" : "secondary"}>
            {isOffline ? 'Offline Mode' : 'Online Mode'}
          </Badge>
        </div>
        <h2 className="text-2xl font-bold mb-2">Symptom Assessment</h2>
        <p className="text-muted-foreground">
          Select the symptoms you're experiencing for <strong>{primaryCause}</strong>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            Common Symptoms for {primaryCause}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableSymptoms.length > 0 ? (
            <div className="grid gap-3">
              {availableSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-3">
                  <Checkbox
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <label
                    htmlFor={symptom}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                  >
                    {symptom}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No symptoms data available for {primaryCause}. Please describe your symptoms below.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe any additional symptoms, when they started, severity, or other relevant information..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Temporarily comment out selected symptoms display */}
      {/* {selectedSymptoms.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Selected Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <Badge key={symptom} variant="secondary">
                  {symptom}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="font-medium text-sm">Emergency Warning</span>
        </div>
        <p className="text-sm text-muted-foreground">
          If you're experiencing severe symptoms such as difficulty breathing, severe bleeding, 
          chest pain, or loss of consciousness, call emergency services (911) immediately.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleComplete} 
          // disabled={selectedSymptoms.length === 0 || isSubmitting}
          className="flex-1"
        >
          Complete Assessment
        </Button>
      </div>

      {isOffline && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-sm text-orange-800">Offline Mode Active</span>
          </div>
          <p className="text-sm text-orange-700">
            Your assessment will be saved locally and synced when you reconnect to the internet.
            All medical guidance is available offline for your safety.
          </p>
        </div>
      )}
    </div>
  );
}