import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, Eye } from 'lucide-react';
import { PrimaryCause } from './TriageApp';

interface ImageUploadProps {
  primaryCause: PrimaryCause;
  onImageCapture: (image: File, analysis?: string) => void;
  onBack: () => void;
}

export function ImageUpload({ primaryCause, onImageCapture, onBack }: ImageUploadProps) {
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${primaryCause}-photo.jpg`, { type: 'image/jpeg' });
            setCapturedImage(file);
            setImagePreview(canvas.toDataURL());
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCapturedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = `Preliminary analysis shows signs consistent with ${primaryCause}. Proceeding to chat assessment for detailed evaluation.`;
    
    setIsAnalyzing(false);
    onImageCapture(capturedImage, mockAnalysis);
  };

  const getCauseSpecificInstructions = () => {
    switch (primaryCause) {
      case 'burn':
        return 'Take a clear photo of the burn area. Include surrounding healthy skin for size reference.';
      case 'injury':
        return 'Capture the injured area clearly. Show any swelling, discoloration, or wounds.';
      case 'trauma':
        return 'Photo the affected area if visible. Include multiple angles if possible.';
      case 'infection':
        return 'Take a clear photo showing any redness, swelling, or discharge.';
      default:
        return 'Take a clear photo of the affected area.';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image Upload</h2>
        <p className="text-muted-foreground mb-4">
          {getCauseSpecificInstructions()}
        </p>
      </div>

      {!capturedImage && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Take Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isCameraActive ? (
                <Button onClick={startCamera} className="w-full">
                  <Camera className="h-5 w-5 mr-2" />
                  Open Camera
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={capturePhoto} className="flex-1">
                      <Camera className="h-5 w-5 mr-2" />
                      Capture
                    </Button>
                    <Button variant="outline" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose from Gallery
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {capturedImage && imagePreview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Image Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src={imagePreview}
              alt="Captured condition"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex gap-2">
              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze & Continue'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapturedImage(null);
                  setImagePreview(null);
                }}
              >
                Retake
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}