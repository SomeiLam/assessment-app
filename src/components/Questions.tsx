'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, IconButton, Typography } from '@mui/material'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircleOutline,
} from '@mui/icons-material'
import Button from './ui/Button'
import AssessmentButton from './ui/AssessmentButton'
import Link from 'next/link'
import { color } from '@/constants/colors'
import AssessmentInput from './ui/AssessmentInput'

interface QuestionsProps {
  questions: { id: string; question: string; options: string[] }[]
  prefix?: string
  customColor?: 'purple' | 'blue'
  finishText?: 'Finish' | 'Next'
  onSubmit: (answers: { [key: number]: string }) => void
}

const Questions: React.FC<QuestionsProps> = ({
  questions,
  prefix,
  customColor = 'purple',
  finishText = 'Finish',
  onSubmit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const selectedAnswer = answers[currentQuestionIndex] || null

  const handleAnswerChange = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }))
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) goToNextQuestion()
    }, 1000)
  }

  const navigateQuestions = (direction: 'next' | 'prev') => {
    const nextIndex =
      direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1

    if (isAnimating || nextIndex < 0 || nextIndex >= questions.length) {
      return
    }

    setIsAnimating(true)
    setCurrentQuestionIndex(nextIndex)

    const animationDuration = 1000
    setTimeout(() => {
      setIsAnimating(false)
    }, animationDuration)
  }

  const goToNextQuestion = () => navigateQuestions('next')
  const goToPreviousQuestion = () => navigateQuestions('prev')

  const isFinished =
    currentQuestionIndex === questions?.length - 1 &&
    answers[questions?.length - 1]
  console.log(answers[currentQuestionIndex])
  return (
    <Box className="max-w-2xl mx-auto py-10 px-5 md:p-10">
      {/* Navigation Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '20px 0',
          position: 'relative', // Keep nav controls stable
          zIndex: 2, // Ensure nav is above questions during transition
        }}
      >
        <IconButton
          onClick={goToPreviousQuestion}
          disabled={isAnimating || currentQuestionIndex === 0}
          sx={{
            color: color[customColor].text,
            opacity: currentQuestionIndex === 0 ? 0.5 : 1, // Visual cue for disabled
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: color[customColor].text, fontWeight: 600 }}
        >
          {currentQuestionIndex + 1} / {questions?.length}
        </Typography>
        <Box>
          <IconButton
            onClick={goToNextQuestion}
            disabled={
              currentQuestionIndex === questions?.length - 1 ||
              !answers[currentQuestionIndex] ||
              isAnimating
            } // Disable if animating
            sx={{
              color: color[customColor].text,
              opacity: currentQuestionIndex === questions?.length - 1 ? 0.5 : 1, // Visual cue for disabled
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Prefix Text */}
      <Typography
        sx={{
          marginBottom: '25px',
          textAlign: 'center',
          color: '#555', // Example color
          typography: {
            sm: 'h6',
            xs: 'subtitle1',
          },
        }}
      >
        {prefix}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          minHeight: '550px',
        }}
      >
        {questions?.map((q, index) => {
          // Determine position based on index relative to currentQuestionIndex
          let transform = 'translateX(0)'
          if (index < currentQuestionIndex) {
            transform = 'translateX(-100%)' // Position previous questions to the left
          } else if (index > currentQuestionIndex) {
            transform = 'scale(.7)' // Show next questions by scaling up
          }
          const isCurrent = currentQuestionIndex === index
          return (
            <Box
              key={q.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '0 20px',
                opacity: isCurrent ? 1 : 0,
                transform: transform,
                transition:
                  'transform 1.5s ease-in-out, opacity 1s ease-in-out, scale 1.5s ease-in-out',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
            >
              {/* Question Text */}
              <Typography
                // variant="h5"
                sx={{
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontWeight: 'medium',
                  color: '#3f1e4b',
                  typography: {
                    sm: 'h5',
                    xs: 'h6',
                  },
                }}
              >
                {q.question}
              </Typography>

              {/* Answer Options */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  marginTop: '10px',
                  marginBottom: '30px',
                }}
              >
                {q.options.length > 0 ? (
                  q.options.map((option) => (
                    <AssessmentButton
                      key={`${q.id}-${option}`}
                      onClick={() => handleAnswerChange(option)}
                      variant="contained"
                      endIcon={<CheckCircleOutline />}
                      disableRipple
                      data-value={option} // For reliable selection in focus logic
                      data-is-answer-option="true" // For easier selection in focus logic
                      tabIndex={isCurrent ? 0 : -1} // Only focusable if active
                      selected={!isAnimating && selectedAnswer === option}
                      option={option}
                      customColor={customColor}
                    />
                  ))
                ) : (
                  <AssessmentInput
                    customColor={customColor}
                    value={answers[currentQuestionIndex] || ''}
                    onChange={(e) =>
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [currentQuestionIndex]: e.target.value,
                      }))
                    }
                    handleNext={
                      answers[currentQuestionIndex]
                        ? goToNextQuestion
                        : undefined
                    }
                  />
                )}
              </Box>
              {isFinished && (
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button
                    onClick={() => onSubmit(answers)}
                    disabled={!selectedAnswer || isAnimating}
                    sx={{
                      opacity: !isFinished || isAnimating ? 0 : 1,
                      transition:
                        'background-color 0.5s ease-in-out, opacity 0.5s ease-in-out',
                      transform: transform,
                    }}
                    customColor={customColor}
                  >
                    {finishText}
                  </Button>
                </Box>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Questions
