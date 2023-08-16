db = db.getSiblingDB('languagetestdb');
db.multiples.insertMany([
  {
    sentence:
      'My sister is very ____, she always wakes up early in the morning.',
    weight: 2,
    options: [
      { option: 'punctual', isCorrect: true },
      { option: 'prompt', isCorrect: false },
      { option: 'late', isCorrect: false },
      { option: 'lazy', isCorrect: false },
      { option: 'rude', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'The students _____ to school every day.',
    weight: 2,
    options: [
      { option: 'walk', isCorrect: true },
      { option: 'drove', isCorrect: false },
      { option: 'ride', isCorrect: false },
      { option: 'ran', isCorrect: false },
      { option: 'fly', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'My grandmother is _____ years old.',
    weight: 3,
    options: [
      { option: 'seventy', isCorrect: false },
      { option: 'thirty', isCorrect: false },
      { option: 'fifty', isCorrect: false },
      { option: 'twenty', isCorrect: false },
      { option: 'ninety', isCorrect: true },
    ],
    topic: '',
  },
  {
    sentence: 'The teacher asked the students to _____ the homework by Friday.',
    weight: 3,
    options: [
      { option: 'submit', isCorrect: true },
      { option: 'cancel', isCorrect: false },
      { option: 'postpone', isCorrect: false },
      { option: 'ignore', isCorrect: false },
      { option: 'exaggerate', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'Yesterday, my friend and I _____ a movie.',
    weight: 4,
    options: [
      { option: 'watched', isCorrect: true },
      { option: 'read', isCorrect: false },
      { option: 'cooked', isCorrect: false },
      { option: 'played', isCorrect: false },
      { option: 'danced', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'The athlete broke the world record _____ the 100m race.',
    weight: 4,
    options: [
      { option: 'during', isCorrect: true },
      { option: 'after', isCorrect: false },
      { option: 'before', isCorrect: false },
      { option: 'within', isCorrect: false },
      { option: 'beyond', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      'If you want to improve your English skills, you should _____ as much as possible.',
    weight: 5,
    options: [
      { option: 'read', isCorrect: false },
      { option: 'write', isCorrect: false },
      { option: 'speak', isCorrect: true },
      { option: 'sing', isCorrect: false },
      { option: 'draw', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: '_____ is the study of the origin and history of words.',
    weight: 5,
    options: [
      { option: 'Etymology', isCorrect: true },
      { option: 'Geology', isCorrect: false },
      { option: 'Anthropology', isCorrect: false },
      { option: 'Zoology', isCorrect: false },
      { option: 'Botany', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      'The _____ of a triangle is equal to the sum of the lengths of its three sides.',
    weight: 6,
    options: [
      { option: 'area', isCorrect: false },
      { option: 'perimeter', isCorrect: true },
      { option: 'volume', isCorrect: false },
      { option: 'diameter', isCorrect: false },
      { option: 'circumference', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'The chemical symbol for gold is _____.',
    weight: 6,
    options: [
      { option: 'Ag', isCorrect: false },
      { option: 'Au', isCorrect: true },
      { option: 'Cu', isCorrect: false },
      { option: 'Fe', isCorrect: false },
      { option: 'Na', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      'The _____ of a species is the process of its gradual extinction due to environmental factors.',
    weight: 7,
    options: [
      { option: 'evolution', isCorrect: false },
      { option: 'adaptation', isCorrect: false },
      { option: 'mutation', isCorrect: false },
      { option: 'extinction', isCorrect: true },
      { option: 'immigration', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      "The _____ is a complex organ responsible for regulating and coordinating many of the body's functions.",
    weight: 7,
    options: [
      { option: 'brain', isCorrect: true },
      { option: 'liver', isCorrect: false },
      { option: 'kidney', isCorrect: false },
      { option: 'spleen', isCorrect: false },
      { option: 'lung', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence: 'The _____ is the largest moon of Saturn.',
    weight: 8,
    options: [
      { option: 'Europa', isCorrect: false },
      { option: 'Ganymede', isCorrect: false },
      { option: 'Titan', isCorrect: true },
      { option: 'Phobos', isCorrect: false },
      { option: 'Deimos', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      'The _____ is a novel by James Joyce that is widely considered a masterpiece of modernist literature.',
    weight: 9,
    options: [
      { option: 'Ulysses', isCorrect: true },
      { option: 'War and Peace', isCorrect: false },
      { option: 'Crime and Punishment', isCorrect: false },
      { option: 'The Great Gatsby', isCorrect: false },
      { option: 'To Kill a Mockingbird', isCorrect: false },
    ],
    topic: '',
  },
  {
    sentence:
      'The _____ is a mathematical problem that has remained unsolved for over 100 years.',
    weight: 10,
    options: [
      { option: "Fermat's Last Theorem", isCorrect: true },
      { option: 'Pythagorean Theorem', isCorrect: false },
      { option: 'Binomial Theorem', isCorrect: false },
      { option: 'Central Limit Theorem', isCorrect: false },
      { option: 'Fundamental Theorem of Calculus', isCorrect: false },
    ],
    topic: '',
  },
]);

db.fillblanks.insertMany([
  {
    sentence:
      "I'm going to make a sandwich for lunch. Do you want _____ on yours?",
    weight: 2,
    topic: '',
    answer: 'mayonnaise',
  },
  {
    sentence: 'The dog is _____ in the yard.',
    weight: 2,
    topic: '',
    answer: 'playing',
  },
  {
    sentence: 'I _____ up at 6 am every morning to go for a run.',
    weight: 2,
    topic: '',
    answer: 'wake',
  },
  {
    sentence: 'Can you _____ me the salt, please?',
    weight: 3,
    topic: '',
    answer: 'pass',
  },
  {
    sentence: 'The _____ of the Earth is approximately 24,901 miles.',
    weight: 3,
    topic: '',
    answer: 'circumference',
  },
  {
    sentence: "I'm sorry, but I can't _____ your request.",
    weight: 4,
    topic: '',
    answer: 'fulfill',
  },
  {
    sentence:
      'The _____ of the situation was that we had to find a new supplier.',
    weight: 4,
    topic: '',
    answer: 'reality',
  },
  {
    sentence:
      'My grandfather _____ to America from Italy in the early 20th century.',
    weight: 5,
    topic: '',
    answer: 'immigrated',
  },
  {
    sentence:
      'The new restaurant in town is getting great reviews for its _____ food.',
    weight: 5,
    topic: '',
    answer: 'authentic',
  },
  {
    sentence:
      '_____ is a common mental health disorder characterized by excessive fear or worry.',
    weight: 6,
    topic: '',
    answer: 'Anxiety',
  },
  {
    sentence:
      'The _____ of the company has been steadily increasing over the past few years.',
    weight: 6,
    topic: '',
    answer: 'productivity',
  },
  {
    sentence:
      'The _____ of the novel was so engaging that I read it in one sitting.',
    weight: 7,
    topic: '',
    answer: 'narrative',
  },
  {
    sentence:
      'The _____ of the building was carefully planned to maximize natural light.',
    weight: 7,
    topic: '',
    answer: 'architecture',
  },
  {
    sentence:
      'The _____ of the experiment was to determine the effects of temperature on plant growth.',
    weight: 8,
    topic: '',
    answer: 'objective',
  },
  {
    sentence:
      'The _____ of the disease is unknown, and there is currently no cure.',
    weight: 9,
    topic: '',
    answer: 'etiology',
  },
]);
db.videos.insertMany([
  {
    video: 'https://www.youtube.com/watch?v=HYWiIWpcCIM',
    weight: 1,
    questions: [
      { question: 'The author claims that free will exists', answer: false },
      { question: 'Since says that free will does not exist', answer: true },
      { question: 'Most people don’t believe in free will', answer: false },
      { question: 'Physics contradicts to free will', answer: false },
    ],
  },
  {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: false },
      { question: 'It’s better to run in the rain', answer: true },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  },
  {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: false },
      { question: 'It’s better to run in the rain', answer: true },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  },
]);

db.questions.insertMany([
  {
    question: 'Can you describe your ideal job?',
  },
  {
    question:
      'What do you think is the biggest challenge facing the world today?',
  },
  {
    question:
      'What is a personal accomplishment that you are proud of and why?',
  },
  {
    question:
      'What do you think is the most important quality for a leader to have?',
  },
]);
