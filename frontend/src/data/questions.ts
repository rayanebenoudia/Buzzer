export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    question: "A velo, quel equipement est obligatoire pour etre visible la nuit ou lorsque la visibilite est insuffisante ?",
    options: ["Un gilet jaune", "Un eclairage et des dispositifs reflechissants", "Une lampe sur le casque uniquement", "Une sonnette uniquement"],
    correctAnswer: 1
  },
  {
    question: "Quelle position met-on generalement a une personne inconsciente qui respire normalement ?",
    options: ["Position assise", "Position debout", "Position laterale de securite", "Position allongee sur le ventre"],
    correctAnswer: 2
  },
  {
    question: "Quelle epice est souvent consideree comme l'une des plus cheres au monde ?",
    options: ["Cumin", "Safran", "Paprika", "Cannelle"],
    correctAnswer: 1
  },
  {
    question: "Quel plat est consommer principalement pendant le Ramadan ?",
    options: ["Lablabi", "Brik", "Ojja", "Couscous"],
    correctAnswer: 1
  },
  {
    question: "Quelle fete marque le Nouvel An amazigh ?",
    options: ["Yennayer", "Achoura", "Mawlid", "Aid el-Fitr"],
    correctAnswer: 0
  },
  {
    question: "Dans quelle tradition retrouve-t-on des cavaliers realisant des demonstrations synchronisees a cheval ?",
    options: ["Le henne", "La fantasia", "Le Sboua", "Le Yennayer"],
    correctAnswer: 1
  },
  {
    question: "Quel est le seul metal liquide a temperature ambiante ?",
    options: ["Fer", "Mercure", "Argent", "Aluminium"],
    correctAnswer: 1
  },
  {
    question: "Quel est le plus grand ocean de la planete ?",
    options: ["Atlantique", "Indien", "Pacifique", "Arctique"],
    correctAnswer: 2
  },
  {
    question: "Combien de deputes siegent a l'Assemblee nationale francaise ?",
    options: ["348", "577", "620", "705"],
    correctAnswer: 1
  },
  {
    question: "Quel pays est le siege principal des institutions de l'Union europeenne ?",
    options: ["France", "Allemagne", "Belgique", "Suisse"],
    correctAnswer: 2
  }
];
