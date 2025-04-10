
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '@/components/QuestionCard';
import QuestLogo from '@/components/QuestLogo';
import { getUser } from '@/utils/localStorage';

// Base de données de questions pour le MVP
const questionsData = {
  '1': {
    questionId: '1',
    questionText: 'Quelle formation en développement web proposons-nous ?',
    options: [
      { id: 'a', text: 'Formation courte de 3 mois en PHP' },
      { id: 'b', text: 'Bachelor Développeur Web Full Stack sur 3 ans' },
      { id: 'c', text: 'Master en Développement Front-end uniquement' },
      { id: 'd', text: 'Formation 100% à distance sans accompagnement' },
    ],
    step: 1,
  },
  '2': {
    questionId: '2',
    questionText: 'Combien d\'heures de stage sont incluses dans notre cursus Marketing Digital ?',
    options: [
      { id: 'a', text: 'Aucun stage n\'est obligatoire' },
      { id: 'b', text: '2 mois en fin de formation' },
      { id: 'c', text: '6 mois répartis sur l\'ensemble du cursus' },
      { id: 'd', text: 'Un an en alternance entreprise/école' },
    ],
    step: 2,
  },
  '3': {
    questionId: '3',
    questionText: 'Quel est le taux d\'insertion professionnelle de nos diplômés ?',
    options: [
      { id: 'a', text: 'Moins de 50%' },
      { id: 'b', text: 'Entre 50% et 70%' },
      { id: 'c', text: 'Entre 70% et 85%' },
      { id: 'd', text: 'Plus de 85% dans les 6 mois' },
    ],
    step: 3,
  },
  '4': {
    questionId: '4',
    questionText: 'Quels équipements sont mis à disposition des étudiants ?',
    options: [
      { id: 'a', text: 'Ordinateurs Mac avec suite logicielle complète' },
      { id: 'b', text: 'Salles de classe standard sans équipement spécifique' },
      { id: 'c', text: 'Laboratoires de recherche réservés aux Masters' },
      { id: 'd', text: 'Studio photo et vidéo professionnel' },
    ],
    step: 4,
  },
};

const TOTAL_STEPS = 5; // 4 questions + 1 étape finale

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getUser();
  
  useEffect(() => {
    // Si l'utilisateur n'est pas inscrit, rediriger vers la page d'inscription
    if (!user) {
      navigate('/register');
      return;
    }
    
    // Si l'ID de question n'existe pas, rediriger vers la page de scan
    if (!id || !questionsData[id as keyof typeof questionsData]) {
      navigate('/scan');
    }
  }, [id, navigate, user]);
  
  if (!id || !questionsData[id as keyof typeof questionsData]) {
    return null;
  }
  
  const questionData = questionsData[id as keyof typeof questionsData];

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
      />
      
      <div className="mt-auto pt-6 text-center">
        <button 
          onClick={() => navigate('/scan')}
          className="text-sm text-primary underline"
        >
          Revenir au scan
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
