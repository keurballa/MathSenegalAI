import { GradeLevel } from "./types";

import { LevelCurriculum } from "./types";

export const CURRICULUM: { Moyen: LevelCurriculum[]; Secondaire: LevelCurriculum[] } = {
  "Moyen": [
    { 
      id: "6e", 
      name: "6ème", 
      chapters: [
        // Activités Numériques
        { id: "6e-an1", title: "Nombres décimaux arithmétiques", category: "Activités Numériques", objectives: ["Ensembles IN et D", "Vocabulaire (chiffre, nombre, unité)", "Écritures en lettres", "Numération de position"] },
        { id: "6e-an2", title: "Opérations (Addition, Soustraction, Multiplication, Division)", category: "Activités Numériques", objectives: ["Somme et différence", "Produit et quotient exact/approché", "Propriétés des opérations", "Ordre de grandeur"] },
        { id: "6e-an3", title: "Rangement", category: "Activités Numériques", objectives: ["Comparaison de décimaux", "Ordre croissant et décroissant", "Graduation d'une demi-droite", "Encadrement"] },
        { id: "6e-an4", title: "Organisation des calculs", category: "Activités Numériques", objectives: ["Règles de priorité", "Parenthèses", "Schémas de calcul", "Calcul mental"] },
        { id: "6e-an5", title: "Proportionnalité", category: "Activités Numériques", objectives: ["Tableau de proportionnalité", "Échelle", "Pourcentage", "Vitesse moyenne"] },
        { id: "6e-an6", title: "Nombres décimaux relatifs", category: "Activités Numériques", objectives: ["Signe et notation", "Valeur absolue", "Opposé d'un nombre", "Addition et soustraction de relatifs"] },
        { id: "6e-an7", title: "Repérage sur la droite et le plan", category: "Activités Numériques", objectives: ["Abscisse d'un point", "Repère orthonormal", "Coordonnées (abscisse, ordonnée)"] },
        
        // Activités Géométriques
        { id: "6e-ag1", title: "Introduction à la Géométrie", category: "Activités Géométriques", objectives: ["Solides usuels (pavé, cube, cylindre)", "Point, Droite, Segment", "Points alignés"] },
        { id: "6e-ag2", title: "Cercle", category: "Activités Géométriques", objectives: ["Vocabulaire (corde, diamètre, arc)", "Périmètre (2πr)", "Position point/cercle"] },
        { id: "6e-ag3", title: "Droites Perpendiculaires et Parallèles", category: "Activités Géométriques", objectives: ["Médiatrice d'un segment", "Construction à la règle et au compas", "Propriétés du parallélisme"] },
        { id: "6e-ag4", title: "Angles", category: "Activités Géométriques", objectives: ["Mesure au rapporteur", "Angles particuliers (aigu, obtus, plat)", "Bissectrice"] },
        { id: "6e-ag5", title: "Symétrie Orthogonale", category: "Activités Géométriques", objectives: ["Figures symétriques", "Axe de symétrie", "Conservation des distances et angles"] },
        { id: "6e-ag6", title: "Triangles et Quadrilatères", category: "Activités Géométriques", objectives: ["Somme des angles", "Triangles particuliers", "Rectangle, Losange, Carré"] },
        { id: "6e-ag7", title: "Aires", category: "Activités Géométriques", objectives: ["Unités de surface", "Formules d'aire usuelles", "Aire du disque"] }
      ]
    },
    { 
      id: "5e", 
      name: "5ème", 
      chapters: [
        // Activités Numériques
        { id: "5e-an1", title: "Puissances dans D", category: "Activités Numériques", objectives: ["Définition et notation", "Propriétés des puissances"] },
        { id: "5e-an2", title: "Multiples et Diviseurs", category: "Activités Numériques", objectives: ["Critères de divisibilité", "Nombres premiers", "PPMC et PGDC"] },
        { id: "5e-an3", title: "Fractions", category: "Activités Numériques", objectives: ["Simplification", "Comparaison", "Opérations"] },
        { id: "5e-an4", title: "Proportionnalité", category: "Activités Numériques", objectives: ["Tableau de proportionnalité", "Pourcentage", "Échelle", "Vitesse moyenne"] },
        { id: "5e-an5", title: "Nombres décimaux relatifs", category: "Activités Numériques", objectives: ["Somme et différence", "Produit et quotient", "Règles des signes", "Somme algébrique"] },
        { id: "5e-an6", title: "Représentation graphique d'un tableau de correspondance", category: "Activités Numériques", objectives: ["Placer des points", "Repère orthogonal", "Lecture de coordonnées"] },

        // Activités Géométriques
        { id: "5e-ag1", title: "Symétrie Centrale", category: "Activités Géométriques", objectives: ["Symétrique d'un point/figure", "Centre de symétrie", "Conservation des distances"] },
        { id: "5e-ag2", title: "Angles", category: "Activités Géométriques", objectives: ["Angles opposés par le sommet", "Angles alternes-internes", "Angles correspondants"] },
        { id: "5e-ag3", title: "Parallélogrammes", category: "Activités Géométriques", objectives: ["Propriétés des diagonales", "Propriétés des côtés", "Aires"] },
        { id: "5e-ag4", title: "Triangles", category: "Activités Géométriques", objectives: ["Somme des angles", "Médiatrices et hauteurs", "Triangles particuliers"] },
        { id: "5e-ag5", title: "Quadrilatères particuliers (Trapèze, Rectangle, Losange, Carré)", category: "Activités Géométriques", objectives: ["Propriétés et reconnaissances", "Aires des quadrilatères"] },
        { id: "5e-ag6", title: "Géométrie dans l'espace", category: "Activités Géométriques", objectives: ["Prisme droit", "Cylindre droit", "Calculs de volumes"] }
      ]
    },
    { 
      id: "4e", 
      name: "4ème", 
      chapters: [
        // Activités Numériques
        { id: "4e-an1", title: "Nombres Rationnels (Ensemble Q)", category: "Activités Numériques", objectives: ["Ensemble Q", "Opérations", "Valeur absolue", "Comparaison"] },
        { id: "4e-an2", title: "Calcul Algébrique", category: "Activités Numériques", objectives: ["Développement", "Réduction", "Égalités usuelles", "Factorisation"] },
        { id: "4e-an3", title: "Équations à une inconnue", category: "Activités Numériques", objectives: ["Mise en équation", "Résolution ax+b=0", "Problèmes"] },
        { id: "4e-an4", title: "Inéquations et systèmes de deux inéquations à une inconnue", category: "Activités Numériques", objectives: ["Signe et inégalités", "Intervalle de solutions", "Représentation graphique"] },
        { id: "4e-an5", title: "Applications Linéaires", category: "Activités Numériques", objectives: ["Notation f(x)=ax", "Représentation graphique", "Proportionnalité"] },
        { id: "4e-an6", title: "Statistique", category: "Activités Numériques", objectives: ["Tableau des effectifs", "Mode", "Moyenne", "Diagrammes"] },

        // Activités Géométriques
        { id: "4e-ag1", title: "Distance", category: "Activités Géométriques", objectives: ["Positions de deux cercles", "Médiatrice", "Distance point/droite", "Cercle/Droite"] },
        { id: "4e-ag2", title: "Droites des Milieux", category: "Activités Géométriques", objectives: ["Théorèmes des milieux", "Parallèles équidistantes", "Trapèze"] },
        { id: "4e-ag3", title: "Droites remarquables dans un triangle", category: "Activités Géométriques", objectives: ["Bissectrices", "Médianes", "Médiatrices et Hauteurs", "Cercle inscrit/circonscrit"] },
        { id: "4e-ag4", title: "Triangle Rectangle (Théorème de Pythagore)", category: "Activités Géométriques", objectives: ["Théorème direct", "Réciproque", "Relations métriques"] },
        { id: "4e-ag5", title: "Translations et vecteurs", category: "Activités Géométriques", objectives: ["Vecteur", "Image par translation", "Vecteurs égaux"] },
        { id: "4e-ag6", title: "Projection orthogonale dans le plan", category: "Activités Géométriques", objectives: ["Projeté d'un point", "Projeté d'un segment", "Conservation du milieu"] },
        { id: "4e-ag7", title: "Rotations et polygones réguliers", category: "Activités Géométriques", objectives: ["Image par rotation", "Polygones réguliers", "Cercle inscrit/circonscrit"] },
        { id: "4e-ag8", title: "Géométrie dans l'Espace", category: "Activités Géométriques", objectives: ["Droites orthogonales", "Positions relatives", "Volume du pavé/cube/cylindre"] }
      ]
    },
    { 
      id: "3e", 
      name: "3ème", 
      chapters: [
        // Activités Numériques
        { id: "3e-an1", title: "Racine Carrée", category: "Activités Numériques", objectives: ["Définition et propriétés", "Rendre rationnel le dénominateur", "Valeur absolue d'un réel", "Comparaison de réels avec radicaux"] },
        { id: "3e-an2", title: "Applications Affines", category: "Activités Numériques", objectives: ["Fonction f(x)=ax+b", "Représentation graphique", "Variations", "Applications affines par intervalles"] },
        { id: "3e-an3", title: "Équations et Inéquations à une inconnue", category: "Activités Numériques", objectives: ["Équations avec valeur absolue", "Équations type ax² + b = 0", "Inéquations produit (ax+b)(cx+d) ≤ 0"] },
        { id: "3e-an4", title: "Systèmes d'équations à deux inconnues", category: "Activités Numériques", objectives: ["Résolution par substitution", "Résolution par addition/combinaison", "Résolution graphique"] },
        { id: "3e-an5", title: "Inéquations et Systèmes à deux inconnues", category: "Activités Numériques", objectives: ["Résolution graphique d'inéquations", "Régionnement du plan"] },
        { id: "3e-s1", title: "Statistiques", category: "Activités Numériques", objectives: ["Moyenne, Mode et Médiane", "Histogrammes et diagrammes", "Fréquences cumulées"] },
        
        // Activités Géométriques
        { id: "3e-ag1", title: "Théorème de Thalès", category: "Activités Géométriques", objectives: ["Théorème direct et réciproque", "Agrandissement et réduction", "Partage d'un segment"] },
        { id: "3e-ag2", title: "Relations Trigonométriques", category: "Activités Géométriques", objectives: ["Cosinus, Sinus et Tangente", "Angles remarquables", "Triangle rectangle"] },
        { id: "3e-ag3", title: "Angle Inscrit", category: "Activités Géométriques", objectives: ["Angle au centre et inscrit associé", "Propriétés des angles inscrits", "Longueur d'un arc"] },
        { id: "3e-ag4", title: "Vecteurs", category: "Activités Géométriques", objectives: ["Somme vectorielle", "Relation de Chasles", "Coordonnées de vecteurs"] },
        { id: "3e-ag5", title: "Transformations du Plan", category: "Activités Géométriques", objectives: ["Symétries orthogonales successives", "Symétries centrales successives", "Isométries"] },
        { id: "3e-ag6", title: "Repérage dans le Plan", category: "Activités Géométriques", objectives: ["Équation générale d'une droite", "Équation réduite", "Positions relatives de deux droites"] },
        { id: "3e-ag7", title: "Géométrie dans l'Espace", category: "Activités Géométriques", objectives: ["Pyramide et Cône de révolution", "Calculs d'aires et de volumes", "Section par un plan parallèle"] }
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
