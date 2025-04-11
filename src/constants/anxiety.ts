const options = [
  'Very often',
  'Fairly Often',
  'Sometimes',
  'Almost never',
  'Never',
]

const anxiety = {
  prefix:
    'Over the last two weeks, how often have you been bothered by any of the following problems?',
  questions: [
    {
      id: '1',
      question: 'Feeling nervous, anxious or on edge.',
      options: options,
    },
    {
      id: '2',
      question: 'Not being able to stop or control worrying.',
      options: options,
    },
    {
      id: '3',
      question: 'Worrying too much about different things.',
      options: options,
    },
    {
      id: '4',
      question: 'Trouble relaxing.',
      options: options,
    },
    {
      id: '5',
      question: 'Being so restless that it’s hard to sit still.',
      options: options,
    },
    {
      id: '6',
      question: 'Becoming easily annoyed or irritable.',
      options: options,
    },
    {
      id: '7',
      question: 'Feeling afraid as if something awful might happen.',
      options: options,
    },
  ],
}

export { anxiety }
