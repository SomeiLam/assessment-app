const options = [
  'Very often',
  'Fairly Often',
  'Sometimes',
  'Almost never',
  'Never',
]

const stress = {
  prefix: 'In the last month, how often have you',
  questions: [
    {
      id: '1',
      question: 'Been upset because of something that happened unexpectedly?',
      options: options,
    },
    {
      id: '2',
      question:
        'Felt that you were unable to control the important things in your life?',
      options: options,
    },
    {
      id: '3',
      question: 'Felt nervous and “stressed”?',
      options: options,
    },
    {
      id: '4',
      question:
        'Felt confident about your ability to handle your personal problems?',
      options: options,
    },
    {
      id: '5',
      question: 'Felt that things were going your way?',
      options: options,
    },
    {
      id: '6',
      question:
        'Found that you could not cope with all the things that you had to do?',
      options: options,
    },
    {
      id: '7',
      question: 'Been able to control irritations in your life?',
      options: options,
    },
    {
      id: '8',
      question: 'Felt that you were on top of things?',
      options: options,
    },
    {
      id: '9',
      question:
        'Been angered because of things that were outside of your control?',
      options: options,
    },
    {
      id: '10',
      question:
        'Felt difficulties were piling up so high that you could not overcome them?',
      options: options,
    },
  ],
}

export { stress }
