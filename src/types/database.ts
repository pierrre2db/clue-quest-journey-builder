
// Types pour la base de données locale (localStorage)

// Structure de l'utilisateur
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registrationDate: string;
}

// Structure d'une réponse à une question
export interface Answer {
  id: string;
  userId: string;
  questionId: string;
  selectedOption: string;
  timestamp: string;
}

// Structure de la base de données complète
export interface LocalDatabase {
  users: Record<string, User>;
  answers: Answer[];
}
