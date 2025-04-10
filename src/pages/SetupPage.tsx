
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import PasswordDialog from '@/components/PasswordDialog';
import { 
  getQuestions, 
  saveQuestions, 
  resetQuestions, 
  getTotalSteps,
  setTotalSteps,
  downloadQuestionsCSV
} from '@/utils/questionService';
import { QuestionsData, Question, QuestionOption } from '@/types/questions';
import { FileDown, FilePlus, Save, Trash2, ArrowLeft } from 'lucide-react';

const SetupPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(true);
  const [questions, setQuestions] = useState<QuestionsData>({});
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalSteps, setTotalStepsState] = useState(getTotalSteps());
  const navigate = useNavigate();

  // Charger les questions
  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  // Authentification réussie
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowPasswordDialog(false);
  };

  // Mettre à jour le nombre total d'étapes
  const handleTotalStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setTotalStepsState(value);
      setTotalSteps(value);
    }
  };

  // Éditer une question
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({...question});
    setIsEditing(true);
  };

  // Créer une nouvelle question
  const handleNewQuestion = () => {
    const questionIds = Object.keys(questions);
    const newId = questionIds.length > 0 
      ? (Math.max(...questionIds.map(id => parseInt(id, 10))) + 1).toString() 
      : '1';
    
    setEditingQuestion({
      questionId: newId,
      questionText: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' },
      ],
      step: questionIds.length + 1
    });
    setIsEditing(true);
  };

  // Supprimer une question
  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = {...questions};
    delete updatedQuestions[questionId];
    
    // Réindexer les étapes
    let step = 1;
    const reindexedQuestions = Object.values(updatedQuestions)
      .sort((a, b) => parseInt(a.questionId, 10) - parseInt(b.questionId, 10))
      .reduce((acc, question) => {
        acc[question.questionId] = {...question, step};
        step++;
        return acc;
      }, {} as QuestionsData);
      
    setQuestions(reindexedQuestions);
    saveQuestions(reindexedQuestions);
  };

  // Mettre à jour le texte d'une question
  const handleQuestionTextChange = (value: string) => {
    if (editingQuestion) {
      setEditingQuestion({...editingQuestion, questionText: value});
    }
  };

  // Mettre à jour une option
  const handleOptionChange = (optionId: string, value: string) => {
    if (editingQuestion) {
      const updatedOptions = editingQuestion.options.map(option => 
        option.id === optionId ? {...option, text: value} : option
      );
      setEditingQuestion({...editingQuestion, options: updatedOptions});
    }
  };

  // Sauvegarder les modifications d'une question
  const handleSaveQuestion = () => {
    if (editingQuestion) {
      const updatedQuestions = {
        ...questions,
        [editingQuestion.questionId]: editingQuestion
      };
      setQuestions(updatedQuestions);
      saveQuestions(updatedQuestions);
      setIsEditing(false);
      setEditingQuestion(null);
    }
  };

  // Naviguer vers l'accueil
  const handleGoHome = () => {
    navigate('/');
  };

  // Réinitialiser les questions par défaut
  const handleResetQuestions = () => {
    resetQuestions();
    setQuestions(getQuestions());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated ? (
        <PasswordDialog
          open={showPasswordDialog}
          onOpenChange={setShowPasswordDialog}
          onSuccess={handleAuthSuccess}
          correctPassword="2105"
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleGoHome}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
            <h1 className="text-2xl font-bold">Configuration du Jeu de Piste</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadQuestionsCSV}
              >
                <FileDown className="mr-2 h-4 w-4" />
                Exporter CSV
              </Button>
            </div>
          </div>

          <div className="mb-6 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-4">
              <div>
                <label htmlFor="totalSteps" className="block text-sm font-medium mb-1">
                  Nombre total d'étapes :
                </label>
                <Input
                  id="totalSteps"
                  type="number"
                  value={totalSteps}
                  onChange={handleTotalStepsChange}
                  min="1"
                  className="w-24"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                (Incluant l'étape finale, actuellement {Object.keys(questions).length} questions + 1)
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-between">
            <Button
              variant="default"
              onClick={handleNewQuestion}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Nouvelle question
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Réinitialiser
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Confirmation</h4>
                    <p className="text-sm text-muted-foreground">
                      Êtes-vous sûr de vouloir réinitialiser toutes les questions aux valeurs par défaut ?
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      onClick={handleResetQuestions}
                    >
                      Confirmer
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead className="w-16">Étape</TableHead>
                <TableHead>Question</TableHead>
                <TableHead className="w-36">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(questions)
                .sort((a, b) => a.step - b.step)
                .map(question => (
                  <TableRow key={question.questionId}>
                    <TableCell>{question.questionId}</TableCell>
                    <TableCell>{question.step}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{question.questionText}</div>
                        <div className="text-sm text-muted-foreground">
                          {question.options.map(option => (
                            <div key={option.id}>
                              {option.id}: {option.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditQuestion(question)}
                        >
                          Éditer
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.questionId)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Sheet
            open={isEditing}
            onOpenChange={(open) => {
              if (!open) setIsEditing(false);
            }}
          >
            <SheetContent className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>
                  {editingQuestion?.questionId 
                    ? `Modifier la question ${editingQuestion.questionId}` 
                    : 'Nouvelle question'}
                </SheetTitle>
                <SheetDescription>
                  Remplissez tous les champs pour la question et les options.
                </SheetDescription>
              </SheetHeader>

              {editingQuestion && (
                <div className="py-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Étape
                    </label>
                    <Input
                      value={editingQuestion.step}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          setEditingQuestion({...editingQuestion, step: value});
                        }
                      }}
                      type="number"
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Question
                    </label>
                    <Textarea
                      value={editingQuestion.questionText}
                      onChange={(e) => handleQuestionTextChange(e.target.value)}
                      placeholder="Texte de la question"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium mb-1 block">
                      Options
                    </label>
                    {editingQuestion.options.map(option => (
                      <div key={option.id} className="flex items-center gap-2">
                        <div className="w-8">{option.id}:</div>
                        <Input
                          value={option.text}
                          onChange={(e) => handleOptionChange(option.id, e.target.value)}
                          placeholder={`Option ${option.id}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <SheetFooter className="mt-4">
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSaveQuestion}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default SetupPage;
