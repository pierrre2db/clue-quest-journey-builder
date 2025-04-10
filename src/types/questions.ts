
export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  questionId: string;
  questionText: string;
  options: QuestionOption[];
  step: number;
}

export type QuestionsData = Record<string, Question>;
