
import { QuestionsData } from "@/types/questions";

// Base de données de questions par défaut
const defaultQuestionsData: QuestionsData = {
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

const STORAGE_KEY = 'questApp_questions';
const TOTAL_STEPS_KEY = 'questApp_totalSteps';
const DEFAULT_TOTAL_STEPS = 5; // 4 questions + 1 étape finale

// Obtenir les questions depuis le localStorage ou utiliser les valeurs par défaut
export const getQuestions = (): QuestionsData => {
  const storedQuestions = localStorage.getItem(STORAGE_KEY);
  return storedQuestions ? JSON.parse(storedQuestions) : defaultQuestionsData;
};

// Sauvegarder les questions dans le localStorage
export const saveQuestions = (questions: QuestionsData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
};

// Réinitialiser les questions aux valeurs par défaut
export const resetQuestions = (): void => {
  saveQuestions(defaultQuestionsData);
};

// Obtenir le nombre total d'étapes
export const getTotalSteps = (): number => {
  const storedTotalSteps = localStorage.getItem(TOTAL_STEPS_KEY);
  return storedTotalSteps ? parseInt(storedTotalSteps, 10) : DEFAULT_TOTAL_STEPS;
};

// Définir le nombre total d'étapes
export const setTotalSteps = (steps: number): void => {
  localStorage.setItem(TOTAL_STEPS_KEY, steps.toString());
};

// Exporter les données au format CSV
export const exportQuestionsToCSV = (): string => {
  const questions = getQuestions();
  let csvContent = "QuestionID,Question,OptionA,OptionB,OptionC,OptionD,Étape\n";
  
  Object.values(questions).forEach(question => {
    const options = question.options.map(opt => opt.text).join('","');
    csvContent += `"${question.questionId}","${question.questionText}","${options}","${question.step}"\n`;
  });
  
  return csvContent;
};

// Créer un lien de téléchargement pour le CSV
export const downloadQuestionsCSV = (): void => {
  const csv = exportQuestionsToCSV();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'questions_qcm.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
