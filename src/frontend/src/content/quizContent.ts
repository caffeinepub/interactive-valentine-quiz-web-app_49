export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: 'When did we meet?',
        options: [
            '14th Feb 2024',
            '13th Dec 2024',
            '1st Jan 2024',
            'You were born knowing me'
        ],
        correctAnswer: '13th Dec 2024'
    },
    {
        id: 2,
        question: 'Where was our first date?',
        options: [
            'A cafe',
            'A movie theatre',
            'A mall',
            'In my dreams'
        ],
        correctAnswer: 'A mall'
    },
    {
        id: 3,
        question: 'What was my first gift to you?',
        options: [
            'Chocolate',
            'Teddy',
            'Handmade gifts',
            'My heart'
        ],
        correctAnswer: 'Handmade gifts'
    },
    {
        id: 4,
        question: 'What do you like about me the most?',
        options: [
            'My looks',
            'My brain',
            'My humour',
            'Everything'
        ],
        correctAnswer: 'Everything'
    },
    {
        id: 5,
        question: 'When did you propose me to be your girlfriend?',
        options: [
            '14th Feb',
            '27th March',
            '1st July',
            'Every day since we met'
        ],
        correctAnswer: '27th March'
    }
];
