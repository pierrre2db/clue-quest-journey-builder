
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import QuestLogo from '@/components/QuestLogo';
import ProgressIndicator from '@/components/ProgressIndicator';
import { getUser } from '@/utils/localStorage';

const FinishPage = () => {
  const navigate = useNavigate();
  const user = getUser();
  const { toast } = useToast();
  const TOTAL_STEPS = 5;

  useEffect(() => {
    // Si l'utilisateur n'est pas inscrit, rediriger vers la page d'inscription
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);

  const handleContactRequest = () => {
    toast({
      title: "Demande envoyée !",
      description: "Un conseiller vous contactera prochainement",
    });
  };

  const handleInfoSessionRegistration = () => {
    toast({
      title: "Inscription confirmée !",
      description: "Vous recevrez bientôt un email avec les détails",
    });
  };

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <div className="quest-card text-center">
        <ProgressIndicator currentStep={5} totalSteps={TOTAL_STEPS} />
        
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Félicitations !</h2>
          <p className="text-muted-foreground">
            Vous avez terminé le parcours découverte de notre école.
          </p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg mb-6 text-left">
          <h3 className="font-medium text-center mb-2">Question finale</h3>
          <p className="mb-4 text-sm text-center">
            Quelle formation vous intéresse le plus parmi celles que vous avez découvertes ?
          </p>
          
          <textarea
            className="w-full p-3 border rounded-md text-sm h-24"
            placeholder="Partagez votre intérêt..."
          ></textarea>
        </div>
        
        <div className="space-y-3 mb-2">
          <Button 
            onClick={handleContactRequest}
            className="quest-button"
          >
            Demander à être contacté
          </Button>
          
          <Button 
            onClick={handleInfoSessionRegistration}
            className="quest-button-secondary"
          >
            S'inscrire à une session d'information
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          Merci d'avoir participé, {user?.firstName} !
        </p>
      </div>
      
      <div className="mt-auto pt-6 flex justify-center">
        <Button variant="outline" onClick={() => navigate('/')}>
          Revenir à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default FinishPage;
