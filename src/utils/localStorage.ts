
// Utilitaires pour gérer les données dans le localStorage

// Sauvegarder un utilisateur
export const saveUser = (userData: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  localStorage.setItem('quest_user', JSON.stringify(userData));
};

// Récupérer les informations utilisateur
export const getUser = () => {
  const userData = localStorage.getItem('quest_user');
  if (!userData) return null;
  return JSON.parse(userData);
};

// Vérifier si l'utilisateur est déjà inscrit
export const isUserRegistered = () => {
  return !!localStorage.getItem('quest_user');
};

// Sauvegarder la progression
export const saveProgress = (questionId: string, answer: string) => {
  const progress = getProgress();
  progress[questionId] = answer;
  localStorage.setItem('quest_progress', JSON.stringify(progress));
};

// Obtenir toute la progression
export const getProgress = () => {
  const progress = localStorage.getItem('quest_progress');
  if (!progress) return {};
  return JSON.parse(progress);
};

// Générer un ID utilisateur unique
export const generateUserId = (firstName: string, lastName: string) => {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}${randomNum}`;
};

// Réinitialiser toutes les données
export const resetQuestData = () => {
  localStorage.removeItem('quest_user');
  localStorage.removeItem('quest_progress');
};
