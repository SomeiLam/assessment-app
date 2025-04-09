import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ANXIETY from '@/constants/anxiety'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircleOutline,
} from '@mui/icons-material'

const Home = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const currentQuestion = ANXIETY.questions[currentQuestionIndex]

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer)
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < ANXIETY.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null) // Reset selection for the next question
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(
        answers[ANXIETY.questions[currentQuestionIndex - 1].id] || null
      ) // Restore previous selection
    }
  }

  return (
    <Box className="max-w-2xl mx-auto p-20">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <IconButton
          onClick={goToPreviousQuestion}
          sx={{
            color: '#3f1e4b',
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <Typography variant="h5" sx={{ color: '#3f1e4b', fontWeight: 600 }}>
          {currentQuestionIndex + 1} / {ANXIETY.questions.length}
        </Typography>
        <IconButton
          onClick={goToPreviousQuestion}
          sx={{
            color: '#3f1e4b',
          }}
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </Box>
      <Typography
        variant="h5"
        sx={{
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        {ANXIETY.prefix}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginBottom: '15px',
          textAlign: 'center',
        }}
      >
        {currentQuestion.question}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      >
        {ANXIETY.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerChange(option)}
            component="label"
            variant="contained"
            endIcon={<CheckCircleOutline />}
            disableTouchRipple
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: '10px 0',
              padding: '15px 20px',
              width: '100%',
              color: '#3f1e4b',
              backgroundColor:
                selectedAnswer === option ? '#eed0f9' : '#f2eef3',
              borderRadius: '25px',
              textAlign: 'left',
              fontSize: '18px',
              fontWeight: selectedAnswer === option ? 600 : 500,
              cursor: 'pointer',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'background-color 0.5s ease-in-out',
              '&:hover': {
                boxShadow: '0px 0px 30px 0px rgba(209,209,209,1)',
              },
              '& .MuiButton-icon': {
                '& svg': {
                  fontSize: '25px',
                  color: '#cb72eb',
                  opacity: selectedAnswer === option ? 1 : 0,
                  transform:
                    selectedAnswer === option
                      ? 'translateX(0)'
                      : 'translateX(10px)',
                  transition:
                    'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                },
              },
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={goToNextQuestion}
          disabled={!selectedAnswer}
          style={{
            width: '100px',
            padding: '10px 20px',
            backgroundColor: selectedAnswer ? '#cdb3e6' : '#e7e4e9',
            color: selectedAnswer ? '#8d5aa0' : '#ccc3cf',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '18px',
            marginTop: '20px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Next
        </Button>
      </div>
    </Box>
  )
}

export default Home
