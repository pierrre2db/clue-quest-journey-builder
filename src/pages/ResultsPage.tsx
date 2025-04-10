
import React, { useState, useEffect } from 'react';
import { getDatabase, exportDatabaseToCSV } from '@/services/databaseService';
import { getQuestions } from '@/utils/questionService';
import { Button } from '@/components/ui/button';
import QuestLogo from '@/components/QuestLogo';
import { useToast } from '@/components/ui/use-toast';

const ResultsPage = () => {
  const [dbData, setDbData] = useState(() => getDatabase());
  const [questions, setQuestions] = useState(() => getQuestions());
  const { toast } = useToast();

  // Rafraîchir les données lorsque la page se charge
  useEffect(() => {
    setDbData(getDatabase());
    setQuestions(getQuestions());
  }, []);

  const handleExportData = () => {
    try {
      const { usersCSV, answersCSV } = exportDatabaseToCSV();
      
      // Créer et télécharger le fichier CSV des utilisateurs
      downloadCSV(usersCSV, 'utilisateurs.csv');
      
      // Créer et télécharger le fichier CSV des réponses
      downloadCSV(answersCSV, 'reponses.csv');
      
      toast({
        title: "Export réussi",
        description: "Les données ont été exportées avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'export des données:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'export des données",
        variant: "destructive"
      });
    }
  };
  
  // Fonction utilitaire pour télécharger un fichier CSV
  const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculer des statistiques sur les réponses
  const stats = Object.entries(questions).map(([questionId, questionData]) => {
    const answers = dbData.answers.filter(a => a.questionId === questionId);
    const totalResponses = answers.length;
    
    // Calculer les réponses par option
    const optionCounts: Record<string, number> = {};
    questionData.options.forEach(opt => {
      optionCounts[opt.id] = answers.filter(a => a.selectedOption === opt.id).length;
    });
    
    return {
      questionId,
      questionText: questionData.questionText,
      totalResponses,
      optionCounts,
      options: questionData.options
    };
  });
  
  // Nombre total d'utilisateurs et de réponses
  const totalUsers = Object.keys(dbData.users).length;
  const totalAnswers = dbData.answers.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <QuestLogo />
      </div>
      
      <div className="bg-card rounded-lg shadow p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Tableau de bord des résultats</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Utilisateurs</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Réponses</h2>
            <p className="text-3xl font-bold">{totalAnswers}</p>
          </div>
        </div>
        
        <Button onClick={handleExportData} className="mb-6">
          Exporter les données (CSV)
        </Button>
      </div>
      
      <div className="space-y-8">
        {stats.map(stat => (
          <div key={stat.questionId} className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{stat.questionText}</h2>
            <p className="text-muted-foreground mb-4">
              Total des réponses: {stat.totalResponses}
            </p>
            
            <div className="space-y-4">
              {stat.options.map(option => {
                const count = stat.optionCounts[option.id] || 0;
                const percentage = stat.totalResponses 
                  ? Math.round((count / stat.totalResponses) * 100) 
                  : 0;
                
                return (
                  <div key={option.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="font-medium">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
