
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import QuestLogo from '@/components/QuestLogo';
import { setAppMode, getAppMode } from '@/utils/localStorage';

const ModeSelectionPage = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode: 'dev' | 'run') => {
    setAppMode(mode);
    navigate('/');
  };

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <div className="quest-card max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Sélection du mode</h2>
        
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Mode Développement</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Utilise des QR codes simulés pour tester l'application sans scanner de vrais QR codes.
            </p>
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600"
              onClick={() => handleModeSelection('dev')}
            >
              Mode Dev
            </Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Mode Production</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Utilise de vrais QR codes pour un usage en conditions réelles.
            </p>
            <Button 
              className="w-full"
              onClick={() => handleModeSelection('run')}
            >
              Mode Run
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;
