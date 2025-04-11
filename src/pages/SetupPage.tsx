
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { resetQuestData } from '@/utils/localStorage';
import { resetQuestions, downloadQuestionsCSV } from '@/utils/questionService';
import { resetDatabase } from '@/services/databaseService';
import { useToast } from '@/components/ui/use-toast';

const SetupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResetApp = () => {
    // Réinitialiser les données de l'application
    resetQuestData();
    resetQuestions();
    resetDatabase();
    
    toast({
      title: "Application réinitialisée",
      description: "Toutes les données ont été effacées",
    });
    
    navigate('/index');
  };

  const handleExportQuestions = () => {
    downloadQuestionsCSV();
    
    toast({
      title: "Export réussi",
      description: "Les questions ont été exportées au format CSV",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Configuration</h1>
      
      <div className="space-y-8">
        {/* Section des actions */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Actions</h2>
          
          <div className="space-y-4">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => navigate('/results')}
            >
              Voir les résultats et statistiques
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => navigate('/admin/questions')}
            >
              Gérer les questions
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={handleExportQuestions}
            >
              Exporter les questions (CSV)
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleResetApp}
            >
              Réinitialiser l'application
            </Button>
          </div>
        </div>
        
        {/* Section des paramètres */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Paramètres</h2>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/mode-selection')}
            >
              Changer le mode d'application
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;
