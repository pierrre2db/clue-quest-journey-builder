
import { User, Answer, LocalDatabase } from '@/types/database';

// Clés pour le localStorage
const DB_KEY = 'quest_database';

// Structure initiale de la base de données
const initialDatabase: LocalDatabase = {
  users: {},
  answers: [],
};

// Obtenir la base de données complète
export const getDatabase = (): LocalDatabase => {
  const dbJson = localStorage.getItem(DB_KEY);
  if (!dbJson) {
    // Initialiser la base de données si elle n'existe pas
    localStorage.setItem(DB_KEY, JSON.stringify(initialDatabase));
    return initialDatabase;
  }
  return JSON.parse(dbJson);
};

// Sauvegarder la base de données
export const saveDatabase = (db: LocalDatabase): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// GESTION DES UTILISATEURS

// Sauvegarder un utilisateur
export const saveUserToDb = (userData: Omit<User, 'registrationDate'>): User => {
  const db = getDatabase();
  
  // Créer un nouvel utilisateur avec la date d'inscription
  const newUser: User = {
    ...userData,
    registrationDate: new Date().toISOString(),
  };
  
  // Ajouter l'utilisateur à la base de données
  db.users[userData.id] = newUser;
  
  // Sauvegarder la base de données mise à jour
  saveDatabase(db);
  
  return newUser;
};

// Récupérer un utilisateur par ID
export const getUserById = (userId: string): User | null => {
  const db = getDatabase();
  return db.users[userId] || null;
};

// GESTION DES RÉPONSES

// Sauvegarder une réponse
export const saveAnswer = (answerData: Omit<Answer, 'id' | 'timestamp'>): Answer => {
  const db = getDatabase();
  
  // Créer une nouvelle réponse avec ID et timestamp
  const newAnswer: Answer = {
    id: `answer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...answerData,
    timestamp: new Date().toISOString(),
  };
  
  // Ajouter la réponse à la base de données
  db.answers.push(newAnswer);
  
  // Sauvegarder la base de données mise à jour
  saveDatabase(db);
  
  return newAnswer;
};

// Récupérer toutes les réponses d'un utilisateur
export const getUserAnswers = (userId: string): Answer[] => {
  const db = getDatabase();
  return db.answers.filter(answer => answer.userId === userId);
};

// Récupérer toutes les réponses à une question
export const getQuestionAnswers = (questionId: string): Answer[] => {
  const db = getDatabase();
  return db.answers.filter(answer => answer.questionId === questionId);
};

// EXPORTATION DES DONNÉES

// Exporter toutes les données en format CSV
export const exportDatabaseToCSV = (): { usersCSV: string; answersCSV: string } => {
  const db = getDatabase();
  
  // CSV pour les utilisateurs
  let usersCSV = "ID,Prénom,Nom,Email,Téléphone,Date d'inscription\n";
  Object.values(db.users).forEach(user => {
    usersCSV += `"${user.id}","${user.firstName}","${user.lastName}","${user.email}","${user.phone}","${user.registrationDate}"\n`;
  });
  
  // CSV pour les réponses
  let answersCSV = "ID,UtilisateurID,QuestionID,Réponse,Horodatage\n";
  db.answers.forEach(answer => {
    answersCSV += `"${answer.id}","${answer.userId}","${answer.questionId}","${answer.selectedOption}","${answer.timestamp}"\n`;
  });
  
  return { usersCSV, answersCSV };
};

// Supprimer toutes les données
export const resetDatabase = (): void => {
  saveDatabase(initialDatabase);
};
