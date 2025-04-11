
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ProgressIndicator from './ProgressIndicator';
import { useNavigate } from 'react-router-dom';
import { saveAnswer } from '@/services/databaseService';
import { Image, QrCode } from 'lucide-react';

type QuestionOption = {
  id: string;
  text: string;
};

type QuestionCardProps = {
  questionId: string;
  questionText: string;
  options: QuestionOption[];
  currentStep: number;
  totalSteps: number;
  userId?: string;
  imageUrl?: string;
  qrCodeUrl?: string;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  questionText,
  options,
  currentStep,
  totalSteps,
  userId = 'anonymous', // Valeur par défaut pour le MVP
  imageUrl,
  qrCodeUrl
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une réponse",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Sauvegarder la réponse dans la base de données
      saveAnswer({
        userId,
        questionId,
        selectedOption
      });
      
      // Afficher un message de confirmation
      toast({
        title: "Réponse enregistrée !",
        description: "Passez à l'étape suivante du parcours",
      });
      
      // Pour le MVP, on revient à la page de scan
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/scan');
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la réponse:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre réponse",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quest-card">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      {imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Illustration" 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      <h2 className="quest-title">{questionText}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 py-3 border-b border-border last:border-0">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer py-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Button 
          type="submit" 
          className="quest-button"
          disabled={!selectedOption || isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Valider ma réponse'}
        </Button>
      </form>
      
      {qrCodeUrl && (
        <div className="mt-6 flex justify-center">
          <div className="p-4 border border-border rounded-lg">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-32 h-32"
            />
            <p className="text-xs text-center mt-2 text-muted-foreground">Scannez ce QR code</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        ID Participant: {userId}
      </div>
    </div>
  );
};

export default QuestionCard;
