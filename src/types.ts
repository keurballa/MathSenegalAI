export type GradeLevel = '6e' | '5e' | '4e' | '3e' | 'Seconde' | 'Première' | 'Terminale';

export interface CurriculumChapter {
  id: string;
  title: string;
  grade: GradeLevel;
}

export interface MathSolution {
  problem: string;
  steps: string[];
  finalAnswer: string;
  explanation: string;
  methods?: string[];
  commonErrors?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  category: "Activités Numériques" | "Activités Géométriques" | "Statistiques" | "Travaux Géométriques" | "Algèbre" | "Analyse" | "Géométrie" | "Probabilités";
  objectives?: string[];
  summary?: string;
  keyFormulas?: string[];
}

export interface LevelCurriculum {
  id: GradeLevel;
  name: string;
  chapters: Chapter[];
}

export interface GeneratedExercise {
  id: string;
  problem: string;
  difficulty: 'easy' | 'medium' | 'hard';
  chapter: string;
  hint: string;
  solution: MathSolution;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'teacher';
  grade?: GradeLevel;
  points: number;
  badges: string[];
}
