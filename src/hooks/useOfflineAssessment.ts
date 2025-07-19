import React, { useState, useEffect } from 'react';

export interface OfflineAssessmentData {
  id?: number;
  primaryCause: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'emergency';
  timestamp: string;
  notes?: string;
}

export interface OfflineMedicalData {
  primaryCauses: string[];
  symptoms: Record<string, string[]>;
  recommendations: Record<string, {
    title: string;
    description: string;
    actions: string[];
  }>;
}

export function useOfflineAssessment() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineMedicalData | null>(null);
  const [assessments, setAssessments] = useState<OfflineAssessmentData[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Trigger sync when coming back online
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SYNC_ASSESSMENTS' });
      }
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline medical data
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = async () => {
    try {
      const response = await fetch('/api/offline-data');
      const data = await response.json();
      setOfflineData(data);
    } catch (error) {
      console.error('Failed to load offline data:', error);
      // Fallback data if service worker isn't available
      setOfflineData({
        primaryCauses: ['injury', 'burn', 'trauma', 'infection'],
        symptoms: {
          injury: ['pain', 'swelling', 'bleeding', 'bruising', 'difficulty moving'],
          burn: ['pain', 'redness', 'blisters', 'peeling skin', 'fever'],
          trauma: ['headache', 'dizziness', 'confusion', 'nausea', 'loss of consciousness'],
          infection: ['fever', 'redness', 'swelling', 'pus', 'red streaks']
        },
        recommendations: {
          low: {
            title: 'Low Priority',
            description: 'Monitor symptoms and use home care methods',
            actions: ['Rest', 'Over-the-counter pain relief', 'Monitor for changes', 'Consult doctor if worsens']
          },
          medium: {
            title: 'Medium Priority',
            description: 'Consider medical consultation within 24-48 hours',
            actions: ['Apply first aid', 'Monitor symptoms closely', 'Schedule doctor visit', 'Call if symptoms worsen']
          },
          high: {
            title: 'High Priority',
            description: 'Seek medical attention promptly',
            actions: ['Seek urgent care', 'Apply immediate first aid', 'Call doctor immediately', 'Go to emergency room if severe']
          },
          emergency: {
            title: 'Emergency',
            description: 'Call emergency services immediately',
            actions: ['Call 911 now', 'Apply emergency first aid', 'Do not wait', 'Get to hospital immediately']
          }
        }
      });
    }
  };

  const saveAssessment = async (assessment: Omit<OfflineAssessmentData, 'id' | 'timestamp'>) => {
    const assessmentData: OfflineAssessmentData = {
      ...assessment,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        const savedAssessment = { ...assessmentData, id: result.id };
        setAssessments(prev => [...prev, savedAssessment]);
        return savedAssessment;
      }
    } catch (error) {
      console.error('Failed to save assessment:', error);
      // Fallback to local storage if service worker fails
      const id = Date.now();
      const savedAssessment = { ...assessmentData, id };
      const stored = localStorage.getItem('offline-assessments');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = [...existing, savedAssessment];
      localStorage.setItem('offline-assessments', JSON.stringify(updated));
      setAssessments(prev => [...prev, savedAssessment]);
      return savedAssessment;
    }
  };

  const getSymptomsForCause = (cause: string): string[] => {
    return offlineData?.symptoms[cause] || [];
  };

  const getRecommendations = (severity: string) => {
    return offlineData?.recommendations[severity] || {
      title: 'Unknown',
      description: 'Please consult a medical professional',
      actions: ['Seek medical advice']
    };
  };

  const assessSeverity = (primaryCause: string, symptoms: string[]): 'low' | 'medium' | 'high' | 'emergency' => {
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

  return {
    isOffline,
    offlineData,
    assessments,
    saveAssessment,
    getSymptomsForCause,
    getRecommendations,
    assessSeverity
  };
}