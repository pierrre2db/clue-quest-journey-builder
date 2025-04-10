
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import QuestLogo from '@/components/QuestLogo';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <div className="quest-card text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">Page introuvable</h2>
        
        <p className="text-muted-foreground mb-6">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <Button 
          onClick={() => navigate('/')}
          className="quest-button"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
