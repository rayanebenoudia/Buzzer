export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Securite routiere - Velo et premiers secours',
    question: 'A velo, quel equipement est obligatoire pour etre visible la nuit ou lorsque la visibilite est insuffisante ?',
    options: ['Un gilet rouge', 'Un eclairage et des dispositifs reflechissants', 'Une lampe sur le casque uniquement', 'Une sonnette uniquement'],
    correctAnswerIndex: 1,
    explanation: 'Un eclairage et des dispositifs reflechissants'
  },
  {
    id: 2,
    category: 'Securite routiere - Velo et premiers secours',
    question: 'Quelle position met-on generalement a une personne inconsciente qui respire normalement ?',
    options: ['Position assise', 'Position debout', 'Position laterale de securite', 'Position allongee sur le ventre'],
    correctAnswerIndex: 2,
    explanation: 'Position laterale de securite'
  },
  {
    id: 3,
    category: 'Nourriture - Algerie et Tunisie',
    question: 'Quelle epice est souvent consideree comme l\\'une des plus cheres au monde ?',
    options: ['Cumin', 'Safran', 'Paprika', 'Cannelle'],
    correctAnswerIndex: 1,
    explanation: 'Safran'
  },
  {
    id: 4,
    category: 'Nourriture - Algerie et Tunisie',
    question: 'Quel plat tunisien est celebre pour etre servi avec un oeuf dans une feuille de brick ?',
    options: ['Lablabi', 'Brik', 'Ojja', 'Couscous'],
    correctAnswerIndex: 1,
    explanation: 'Brik'
  },
  {
    id: 5,
    category: 'Traditions - Algerie et Tunisie',
    question: 'Quelle fete marque le Nouvel An amazigh ?',
    options: ['Yennayer', 'Achoura', 'Mawlid', 'Aid el-Fitr'],
    correctAnswerIndex: 0,
    explanation: 'Yennayer'
  },
  {
    id: 6,
    category: 'Traditions - Algerie et Tunisie',
    question: 'Dans quelle tradition retrouve-t-on des cavaliers realisant des demonstrations synchronisees a cheval ?',
    options: ['Le henne', 'La fantasia', 'Le Sboua', 'Le Yennayer'],
    correctAnswerIndex: 1,
    explanation: 'La fantasia'
  },
  {
    id: 7,
    category: 'Culture generale - Tres difficile',
    question: 'Quel est le seul metal liquide a temperature ambiante ?',
    options: ['Fer', 'Mercure', 'Argent', 'Aluminium'],
    correctAnswerIndex: 1,
    explanation: 'Mercure'
  },
  {
    id: 8,
    category: 'Culture generale - Tres difficile',
    question: 'Quel est le plus grand ocean de la planete ?',
    options: ['Atlantique', 'Indien', 'Pacifique', 'Arctique'],
    correctAnswerIndex: 2,
    explanation: 'Pacifique'
  },
  {
    id: 9,
    category: 'Culture politique - Tres difficile',
    question: 'Combien de deputes siegent a l\\'Assemblee nationale francaise ?',
    options: ['348', '577', '620', '705'],
    correctAnswerIndex: 1,
    explanation: '577'
  },
  {
    id: 10,
    category: 'Culture politique - Tres difficile',
    question: 'Quel pays est le siege principal des institutions de l\\'Union europeenne ?',
    options: ['France', 'Allemagne', 'Belgique', 'Suisse'],
    correctAnswerIndex: 2,
    explanation: 'Belgique'
  }
];