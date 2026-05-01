import { GradeLevel } from "./types";

import { LevelCurriculum } from "./types";

export const CURRICULUM: { Moyen: LevelCurriculum[]; Secondaire: LevelCurriculum[] } = {
  "Moyen": [
    { 
      id: "6e", 
      name: "6ème", 
      chapters: [
        { id: "6e-an1", title: "Nombres décimaux arithmétiques", category: "Activités Numériques", objectives: ["Connaître les ensembles entiers naturels", "Numération de position", "Écriture en lettres"] },
        { id: "6e-an2", title: "Addition et Soustraction", category: "Activités Numériques", objectives: ["Calculer la somme et différence", "Ordre de grandeur"] },
        { id: "6e-ag1", title: "Introduction à la Géométrie", category: "Activités Géométriques", objectives: ["Solides usuels", "Points alignés", "Droites et segments"] },
        { id: "6e-ag2", title: "Le Cercle", category: "Activités Géométriques", objectives: ["Corde, diamètre, arc", "Circonférence", "Intérieur/Extérieur"] },
        { id: "6e-an5", title: "Division décimale", category: "Activités Numériques", objectives: ["Quotient exact et approché", "Écriture fractionnaire"] },
        { id: "6e-an7", title: "Proportionnalité", category: "Activités Numériques", objectives: ["Tableau de proportionnalité", "Pourcentage", "Échelle"] },
        { id: "6e-ag5", title: "Aires", category: "Activités Géométriques", objectives: ["Rectangle, Carré, Triangle", "Trapèze, Disque"] }
      ]
    },
    { 
      id: "5e", 
      name: "5ème", 
      chapters: [
        { id: "5e-an1", title: "Puissance dans D", category: "Activités Numériques", objectives: ["Définition et notation", "Propriétés des puissances"] },
        { id: "5e-an2", title: "Multiples et Diviseurs", category: "Activités Numériques", objectives: ["Critères de divisibilité", "Nombres premiers", "PPMC et PGDC"] },
        { id: "5e-ag1", title: "Symétrie Centrale", category: "Activités Géométriques", objectives: ["Symétrique d'un point/figure", "Centre de symétrie"] },
        { id: "5e-an3", title: "Fractions", category: "Activités Numériques", objectives: ["Simplification", "Comparaison", "Opérations"] },
        { id: "5e-ag3", title: "Parallélogrammes", category: "Activités Géométriques", objectives: ["Propriétés et reconnaissances", "Aire"] },
        { id: "5e-an5", title: "Equations et Inéquations dans ID", category: "Activités Numériques", objectives: ["Résolution a+x=b", "Résolution ax=b"] }
      ]
    },
    { 
      id: "4e", 
      name: "4ème", 
      chapters: [
        { id: "4e-an1", title: "Nombres Rationnels", category: "Activités Numériques", objectives: ["Ensemble Q", "Opérations", "Valeur absolue"] },
        { id: "4e-an2", title: "Calcul Algébrique", category: "Activités Numériques", objectives: ["Développement", "Réduction", "Égalités usuelles", "Factorisation"] },
        { id: "4e-ag2", title: "Droites des Milieux", category: "Activités Géométriques", objectives: ["Théorèmes des milieux dans un triangle", "Trapèze"] },
        { id: "4e-an3", title: "Équations à une inconnue", category: "Activités Numériques", objectives: ["Mise en équation", "Résolution ax+b=0"] },
        { id: "4e-ag4", title: "Triangle Rectangle", category: "Activités Géométriques", objectives: ["Théorème de Pythagore", "Relations métriques"] },
        { id: "4e-an5", title: "Applications Linéaires", category: "Activités Numériques", objectives: ["Notation f(x)=ax", "Représentation graphique"] }
      ]
    },
    { 
      id: "3e", 
      name: "3ème", 
      chapters: [
        { id: "3e-an1", title: "Racine Carrée", category: "Activités Numériques", objectives: ["Définition et propriétés", "Rendre rationnel le dénominateur", "Valeur absolue"] },
        { id: "3e-ag1", title: "Théorèmes de Thalès", category: "Activités Géométriques", objectives: ["Théorème direct et réciproque", "Agrandissement/Réduction"] },
        { id: "3e-an2", title: "Applications Affines", category: "Activités Numériques", objectives: ["Fonction f(x)=ax+b", "Représentation graphique", "Variations"] },
        { id: "3e-ag2", title: "Relations Trigonométriques", category: "Activités Géométriques", objectives: ["Cosinus, Sinus, Tangente", "Angles remarquables"] },
        { id: "3e-an3", title: "Systèmes d'équations", category: "Activités Numériques", objectives: ["Substitution", "Addition", "Méthode graphique"] },
        { id: "3e-s1", title: "Statistiques", category: "Statistiques", objectives: ["Classement", "Moyenne, Mode, Médiane", "Histogrammes"] }
      ]
    }
  ],
  "Secondaire": [
    { 
      id: "Seconde", 
      name: "Seconde S", 
      chapters: [
        { id: "2s-an1", title: "Ensembles de nombres", category: "Analyse" },
        { id: "2s-an2", title: "Fonctions numériques", category: "Analyse" },
        { id: "2s-g1", title: "Vecteurs du plan", category: "Géométrie" }
      ]
    },
    { 
      id: "Première", 
      name: "Première S1/S2", 
      chapters: [
        { id: "1s-an1", title: "Limites et Continuité", category: "Analyse" },
        { id: "1s-an2", title: "Dérivabilité", category: "Analyse" },
        { id: "1s-p1", title: "Dénombrement", category: "Probabilités" }
      ]
    },
    { 
      id: "Terminale", 
      name: "Terminale S1/S2", 
      chapters: [
        { id: "ts-an1", title: "Nombres complexes", category: "Analyse" },
        { id: "ts-an2", title: "Logarithmes", category: "Analyse" },
        { id: "ts-an3", title: "Intégration", category: "Analyse" },
        { id: "ts-g1", title: "Géométrie dans l'espace", category: "Géométrie" }
      ]
    }
  ]
};

export const BADGES = [
  { id: "debutant", name: "Jeune Mathématicien", icon: "🌱" },
  { id: "expert", name: "Maître du Calcul", icon: "🔥" },
  { id: "genie", name: "L'As de Dakar", icon: "🏆" }
];
