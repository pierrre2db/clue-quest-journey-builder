
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getQuestions, saveQuestions } from '@/utils/questionService';
import { QuestionsData, Question, QuestionOption } from '@/types/questions';
import QuestLogo from '@/components/QuestLogo';
import { Image, QrCode } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

const QuestionsAdminPage = () => {
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Charger les questions au démarrage
  useEffect(() => {
    const loadedQuestions = getQuestions();
    setQuestions(loadedQuestions);
    setLoading(false);
  }, []);

  // Ajouter une nouvelle question
  const addNewQuestion = () => {
    const newId = Object.keys(questions).length + 1;
    const newQuestion: Question = {
      questionId: newId.toString(),
      questionText: "Nouvelle question",
      options: [
        { id: 'a', text: 'Option A' },
        { id: 'b', text: 'Option B' },
        { id: 'c', text: 'Option C' },
        { id: 'd', text: 'Option D' },
      ],
      step: newId,
      imageUrl: '',
      qrCodeUrl: '',
    };

    setQuestions(prev => ({
      ...prev,
      [newId.toString()]: newQuestion
    }));
  };

  // Supprimer une question
  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = { ...questions };
    delete updatedQuestions[questionId];
    setQuestions(updatedQuestions);
  };

  // Mettre à jour le texte d'une question
  const updateQuestionText = (questionId: string, text: string) => {
    setQuestions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionText: text
      }
    }));
  };

  // Mettre à jour une option
  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        options: prev[questionId].options.map(opt => 
          opt.id === optionId ? { ...opt, text } : opt
        )
      }
    }));
  };

  // Mettre à jour l'URL de l'image
  const updateImageUrl = (questionId: string, imageUrl: string) => {
    setQuestions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        imageUrl
      }
    }));
  };

  // Mettre à jour l'URL du QR code
  const updateQrCodeUrl = (questionId: string, qrCodeUrl: string) => {
    setQuestions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        qrCodeUrl
      }
    }));
  };

  // Sauvegarder les modifications
  const saveChanges = () => {
    try {
      saveQuestions(questions);
      toast({
        title: "Sauvegarde réussie",
        description: "Les questions ont été mises à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les questions",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <QuestLogo />
      </div>
      
      <h1 className="text-2xl font-bold mb-6 text-center">Administration des Questions</h1>
      
      <div className="flex justify-end mb-4 space-x-4">
        <Button onClick={addNewQuestion} variant="outline">
          Ajouter une question
        </Button>
        <Button onClick={saveChanges} variant="default">
          Sauvegarder les modifications
        </Button>
      </div>
      
      <div className="space-y-8">
        {Object.values(questions).map((question) => (
          <div key={question.questionId} className="bg-card rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Question {question.questionId} (Étape {question.step})</h2>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteQuestion(question.questionId)}
              >
                Supprimer
              </Button>
            </div>
            
            <div className="mb-4">
              <Label htmlFor={`q-${question.questionId}`}>Texte de la question</Label>
              <Input 
                id={`q-${question.questionId}`}
                value={question.questionText}
                onChange={(e) => updateQuestionText(question.questionId, e.target.value)}
                className="mt-1"
              />
            </div>
            
            {/* Image URL section */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Image size={16} className="mr-2" />
                <Label htmlFor={`img-${question.questionId}`}>URL de l'image d'illustration</Label>
              </div>
              <Input 
                id={`img-${question.questionId}`}
                value={question.imageUrl || ''}
                onChange={(e) => updateImageUrl(question.questionId, e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
              {question.imageUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={question.imageUrl} 
                    alt="Aperçu" 
                    className="h-24 object-cover rounded" 
                  />
                </div>
              )}
            </div>
            
            {/* QR Code URL section */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <QrCode size={16} className="mr-2" />
                <Label htmlFor={`qr-${question.questionId}`}>URL du QR code</Label>
              </div>
              <Input 
                id={`qr-${question.questionId}`}
                value={question.qrCodeUrl || ''}
                onChange={(e) => updateQrCodeUrl(question.questionId, e.target.value)}
                placeholder="https://example.com/qrcode.png"
                className="mt-1"
              />
              {question.qrCodeUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={question.qrCodeUrl} 
                    alt="QR Code" 
                    className="h-24 object-cover rounded" 
                  />
                </div>
              )}
            </div>
            
            <h3 className="font-medium mb-2">Options de réponse</h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-muted rounded-full">
                    {option.id}
                  </span>
                  <Input 
                    value={option.text}
                    onChange={(e) => updateOption(question.questionId, option.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/setup')}
        >
          Retour à la configuration
        </Button>
      </div>
    </div>
  );
};

export default QuestionsAdminPage;
