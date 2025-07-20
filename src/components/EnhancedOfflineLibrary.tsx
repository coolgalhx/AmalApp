import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Book, AlertTriangle, Heart, Thermometer, Pill } from 'lucide-react';
import { PrimaryCause } from './TriageApp';

interface LibraryItem {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  severity?: 'low' | 'medium' | 'high' | 'emergency';
}

interface EnhancedOfflineLibraryProps {
  primaryCause?: PrimaryCause;
  onBack: () => void;
}

export function EnhancedOfflineLibrary({ primaryCause, onBack }: EnhancedOfflineLibraryProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<LibraryItem | null>(null);

  const libraryContent: LibraryItem[] = [
    // Injury Content
    {
      id: 'cuts-wounds',
      title: 'Cuts and Wounds',
      category: 'injury',
      keywords: ['cut', 'wound', 'bleeding', 'laceration'],
      severity: 'medium',
      content: `
**Immediate Care for Cuts and Wounds:**

1. **Control Bleeding:**
   - Apply direct pressure with clean cloth
   - Elevate the wounded area above heart level if possible
   - If bleeding doesn't stop after 10 minutes of pressure, seek medical help

2. **Clean the Wound:**
   - Wash hands thoroughly first
   - Rinse wound with clean water
   - Remove visible debris if easily accessible

3. **Protect the Wound:**
   - Apply antibiotic ointment if available
   - Cover with sterile bandage
   - Change dressing daily or when dirty/wet

**When to Seek Medical Attention:**
- Deep cuts that gape open
- Bleeding that won't stop after 10 minutes
- Signs of infection (redness, warmth, pus)
- Unable to clean debris from wound
- Tetanus shot needed (last shot >5 years ago)
      `
    },
    {
      id: 'sprains-strains',
      title: 'Sprains and Strains',
      category: 'injury',
      keywords: ['sprain', 'strain', 'twist', 'pulled muscle'],
      severity: 'low',
      content: `
**R.I.C.E. Method for Sprains/Strains:**

**Rest:**
- Avoid activities that cause pain
- Use crutches if needed for leg injuries

**Ice:**
- Apply ice pack for 15-20 minutes every 2-3 hours
- Never apply ice directly to skin
- Continue for first 24-48 hours

**Compression:**
- Use elastic bandage to reduce swelling
- Wrap snugly but not too tight
- Remove if fingers/toes become numb or blue

**Elevation:**
- Raise injured area above heart level when possible
- Use pillows to prop up injured limb

**Recovery Timeline:**
- Mild sprains: 1-3 weeks
- Moderate sprains: 3-6 weeks
- Severe sprains: Several months

**See a doctor if:**
- Unable to bear weight or use injured area
- Numbness or tingling
- No improvement after 2-3 days
      `
    },
    // Burn Content
    {
      id: 'burn-treatment',
      title: 'Burn Treatment',
      category: 'burn',
      keywords: ['burn', 'scald', 'heat', 'fire'],
      severity: 'high',
      content: `
**Burn Classification and Treatment:**

**First-Degree Burns (Superficial):**
- Red, painful skin
- No blisters
- Treatment: Cool water, aloe vera, pain medication

**Second-Degree Burns (Partial thickness):**
- Red, blistered skin
- Very painful
- Treatment: Cool water, loose bandaging, medical evaluation

**Third-Degree Burns (Full thickness):**
- White, charred, or leathery skin
- May be painless due to nerve damage
- Treatment: Emergency medical care immediately

**Immediate First Aid:**
1. Remove from heat source
2. Cool with clean, cool water for 10-15 minutes
3. Remove jewelry/clothing before swelling occurs
4. Do NOT use ice, butter, or home remedies
5. Cover with clean, dry cloth

**When to Call 911:**
- Burns larger than palm of hand
- Burns on face, hands, feet, genitals
- Third-degree burns
- Chemical or electrical burns
- Signs of infection
      `
    },
    // Trauma Content
    {
      id: 'head-injury',
      title: 'Head Injuries',
      category: 'trauma',
      keywords: ['head', 'concussion', 'brain', 'skull'],
      severity: 'emergency',
      content: `
**Signs of Serious Head Injury:**

**Call 911 Immediately if:**
- Loss of consciousness
- Severe or worsening headache
- Repeated vomiting
- Seizures
- Confusion or disorientation
- Slurred speech
- Weakness in arms or legs

**Concussion Symptoms:**
- Headache
- Dizziness
- Nausea
- Confusion
- Memory problems
- Sensitivity to light/noise

**Immediate Care:**
1. Keep person still and calm
2. Apply ice to external bumps/bruises
3. Monitor for worsening symptoms
4. Do NOT give pain medication initially
5. Do NOT allow person to sleep for first few hours

**Recovery Guidelines:**
- Physical and cognitive rest
- Gradual return to activities
- Avoid alcohol and driving
- Follow up with healthcare provider

**Return to ER if:**
- Symptoms worsen
- Vomiting increases
- Severe drowsiness
- Behavioral changes
      `
    },
    // Infection Content
    {
      id: 'wound-infection',
      title: 'Wound Infections',
      category: 'infection',
      keywords: ['infection', 'pus', 'red streaks', 'fever'],
      severity: 'high',
      content: `
**Signs of Wound Infection:**

**Early Signs:**
- Increased pain after initial improvement
- Redness spreading from wound
- Warmth around wound
- Swelling
- Foul-smelling drainage

**Serious Signs (Seek immediate care):**
- Red streaks extending from wound
- Fever over 101°F (38.3°C)
- Chills or shaking
- Pus or yellow/green drainage
- Wound edges separating

**Prevention:**
- Keep wound clean and dry
- Change dressings regularly
- Wash hands before touching wound
- Watch for signs of infection
- Complete any prescribed antibiotics

**Home Care:**
- Clean wound with saline solution
- Apply antibiotic ointment if recommended
- Cover with clean bandage
- Take pain medication as directed

**When to Call Doctor:**
- Any signs of serious infection
- Wound not healing after 5-7 days
- Increased pain or drainage
- Questions about wound care
      `
    },
    // General Content
    {
      id: 'shock-treatment',
      title: 'Shock Treatment',
      category: 'emergency',
      keywords: ['shock', 'pale', 'weak pulse', 'unconscious'],
      severity: 'emergency',
      content: `
**Recognizing Shock:**

**Signs and Symptoms:**
- Rapid, weak pulse
- Rapid breathing
- Skin becomes pale, cool, clammy
- Weakness or fatigue
- Dizziness or fainting
- Nausea or vomiting
- Thirst
- Confusion or anxiety

**Immediate Treatment:**
1. Call 911 immediately
2. Have person lie down with legs elevated 8-12 inches
3. Keep person warm with blanket
4. Do NOT give food or water
5. Monitor breathing and pulse
6. Begin CPR if person stops breathing

**Types of Shock:**
- **Hypovolemic:** Blood/fluid loss
- **Cardiogenic:** Heart problems
- **Anaphylactic:** Severe allergic reaction
- **Septic:** Severe infection

**Do NOT:**
- Give anything by mouth
- Move person unnecessarily
- Apply heat
- Leave person alone

**Continue monitoring until help arrives**
      `
    }
  ];

  const filteredContent = libraryContent.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const getContentByCategory = (category: string) => {
    return filteredContent.filter(item => item.category === category);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'low': return 'bg-secondary';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      case 'emergency': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith(':**')) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-2 text-primary">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={index} className="font-semibold mt-3 mb-1">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() !== '') {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  if (selectedItem) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedItem(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
          {selectedItem.severity && (
            <Badge className={`${getSeverityColor(selectedItem.severity)} text-background`}>
              {selectedItem.severity.toUpperCase()}
            </Badge>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              {selectedItem.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            {renderContent(selectedItem.content)}
          </CardContent>
        </Card>

        <Button variant="outline" onClick={onBack} className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Medical Library</h2>
        <p className="text-muted-foreground">
          Offline medical reference and first aid information
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search medical information..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue={primaryCause || 'all'} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="injury">Injury</TabsTrigger>
          <TabsTrigger value="burn">Burns</TabsTrigger>
          <TabsTrigger value="trauma">Trauma</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredContent.map((item) => (
            <Card key={item.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedItem(item)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.severity && (
                    <Badge className={`${getSeverityColor(item.severity)} text-background text-xs`}>
                      {item.severity.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Category: {item.category}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.keywords.slice(0, 3).map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {['injury', 'burn', 'trauma'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {getContentByCategory(category).map((item) => (
              <Card key={item.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedItem(item)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.severity && (
                      <Badge className={`${getSeverityColor(item.severity)} text-background text-xs`}>
                        {item.severity.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.keywords.slice(0, 3).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="font-medium text-sm">Medical Disclaimer</span>
        </div>
        <p className="text-sm text-muted-foreground">
          This information is for educational purposes only and should not replace professional medical advice. 
          Always consult healthcare professionals for proper diagnosis and treatment.
        </p>
      </div>

      <Button variant="outline" onClick={onBack} className="w-full">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Assessment
      </Button>
    </div>
  );
}