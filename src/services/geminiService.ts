import { GoogleGenAI } from "@google/genai";
import { MathSolution, GradeLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const geminiService = {
  /**
   * Resout un probleme mathematique a partir d'un texte ou d'une image.
   * Aligne la reponse sur le programme senegalais.
   */
  async solveMathProblem(
    input: string | { mimeType: string; data: string },
    grade: GradeLevel
  ): Promise<MathSolution> {
    const prompt = `Tu es un professeur de mathématiques expert du système éducatif sénégalais.
Ton objectif est de résoudre cet exercice pour un élève en classe de ${grade}.

DIRECTIVES :
1. Analyse l'énoncé (texte ou image).
2. Fournis une résolution étape par étape claire et détaillée.
3. Utilise un langage simple, pédagogique et encourageant (Style "Prof Sénégalais").
4. Identifie les erreurs fréquentes que les élèves commettent souvent sur ce type de problème.
5. Inclus le rappel de cours nécessaire avant la solution.
6. Si plusieurs méthodes d'enseignement sont utilisées au Sénégal pour ce chapitre, présente-les.

Réponds au format JSON suivant :
{
  "problem": "énoncé extrait",
  "steps": ["étape 1", "étape 2", ...],
  "finalAnswer": "résultat final",
  "explanation": "explication globale pédagogique",
  "commonErrors": ["erreur 1", "erreur 2", ...]
}`;

    const parts = typeof input === 'string' 
      ? [{ text: input }, { text: prompt }]
      : [{ inlineData: input }, { text: prompt }];

    const result = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
      },
    });

    try {
      const responseText = result.text || '{}';
      return JSON.parse(responseText.trim());
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      throw new Error("Désolé, je n'ai pas pu analyser cet exercice. Réessaye avec une image plus claire.");
    }
  },

  /**
   * Génère un exercice personnalisé basé sur un chapitre et une difficulté.
   */
  async generateExercise(
    grade: GradeLevel,
    chapter: string,
    difficulty: 'easy' | 'medium' | 'hard'
  ): Promise<import("../types").GeneratedExercise> {
    const prompt = `Tu es un concepteur de sujets d'examens pour le système éducatif sénégalais.
Génère un exercice de mathématiques pour un élève de ${grade} sur le chapitre "${chapter}".

CONTRAINTES :
1. Difficulté : ${difficulty} (easy = application directe du cours, medium = réflexion modérée, hard = exercice type concours/brevet/bac).
2. L'énoncé doit être réaliste et conforme au programme sénégalais.
3. Inclus un indice (hint) discret pour aider l'élève s'il bloque.
4. Fournis la solution complète étape par étape.

Réponds au format JSON suivant :
{
  "id": "unique_id",
  "problem": "énoncé de l'exercice",
  "difficulty": "${difficulty}",
  "chapter": "${chapter}",
  "hint": "un petit indice pédagogique",
  "solution": {
    "problem": "énoncé répété",
    "steps": ["étape 1", "étape 2", ...],
    "finalAnswer": "résultat",
    "explanation": "explication globale",
    "commonErrors": ["erreur 1", ...]
  }
}`;

    const result = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: { parts: [{ text: prompt }] },
      config: {
        responseMimeType: "application/json",
      },
    });

    try {
      const responseText = result.text || '{}';
      return JSON.parse(responseText.trim());
    } catch (e) {
      console.error("Failed to parse exercise generation", e);
      throw new Error("Impossible de générer l'exercice pour le moment.");
    }
  }
};
