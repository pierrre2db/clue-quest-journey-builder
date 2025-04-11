
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '@/components/QuestionCard';
import QuestLogo from '@/components/QuestLogo';
import NavBar from '@/components/NavBar';
import { getUser } from '@/utils/localStorage';
import { getQuestions, getTotalSteps } from '@/utils/questionService';

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getUser();
  const questionsData = getQuestions();
  const TOTAL_STEPS = getTotalSteps(); // Nombre total d'étapes, configurable
  
  useEffect(() => {
    // Si l'utilisateur n'est pas inscrit, rediriger vers la page d'inscription
    if (!user) {
      navigate('/register');
      return;
    }
    
    // Si l'ID de question n'existe pas, rediriger vers la page de scan
    if (!id || !questionsData[id]) {
      navigate('/scan');
    }
  }, [id, navigate, user, questionsData]);
  
  if (!id || !questionsData[id]) {
    return null;
  }
  
  const questionData = questionsData[id];

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <QuestionCard
        questionId={questionData.questionId}
        questionText={questionData.questionText}
        options={questionData.options}
        currentStep={questionData.step}
        totalSteps={TOTAL_STEPS}
        userId={user?.id}
        imageUrl={questionData.imageUrl}
        qrCodeUrl={questionData.qrCodeUrl}
      />
      
      <div className="mt-auto pt-6 text-center">
        <button 
          onClick={() => navigate('/scan')}
          className="text-sm text-primary underline"
        >
          Revenir au scan
        </button>
      </div>

      <NavBar />
    </div>
  );
};

export default QuestionPage;
