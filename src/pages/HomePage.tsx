
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import QuestLogo from '@/components/QuestLogo';
import { isUserRegistered } from '@/utils/localStorage';

const HomePage = () => {
  const navigate = useNavigate();
  const userRegistered = isUserRegistered();

  const handleStart = () => {
    if (userRegistered) {
      navigate('/scan');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <div className="quest-card mt-4 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Bienvenue au Jeu de Piste
        </h1>
        
        <p className="quest-text mb-8">
          Découvrez notre école de manière ludique et interactive. 
          Parcourez les différents stands, scannez les QR codes et 
          répondez aux questions pour avancer dans votre parcours !
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start space-x-4 text-left">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium">Inscrivez-vous</h3>
              <p className="text-sm text-muted-foreground">Renseignez rapidement vos coordonnées</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 text-left">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium">Scannez les QR codes</h3>
              <p className="text-sm text-muted-foreground">Sur chaque stand de l'événement</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 text-left">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium">Répondez aux questions</h3>
              <p className="text-sm text-muted-foreground">Pour découvrir nos formations</p>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleStart}
          className="quest-button"
        >
          {userRegistered ? 'Continuer mon parcours' : 'Démarrer le parcours'}
        </Button>
      </div>
      
      <footer className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} - Journées Portes Ouvertes</p>
      </footer>
    </div>
  );
};

export default HomePage;
