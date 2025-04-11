'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, IconButton, Typography } from '@mui/material'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircleOutline,
  HomeRounded,
} from '@mui/icons-material'
import Button from './ui/Button'
import AssessmentButton from './ui/AssessmentButton'
import { color } from '@/constants/colors'

interface MultipleChoiceProps {
  questions: { id: string; question: string; options: string[] }[]
  prefix?: string
  customColor?: 'purple' | 'blue'
  onSubmit: (answers: { [key: number]: string }) => void
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  questions,
  prefix,
  customColor = 'purple',
  onSubmit,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const selectedAnswer = answers[currentQuestionIndex] || null

  const handleBack = () => router.push('/assessment')

  const handleAnswerChange = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }))
  }

  const navigateQuestions = (direction: 'next' | 'prev') => {
    const nextIndex =
      direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1

    // Basic boundary checks
    if (isAnimating || nextIndex < 0 || nextIndex >= questions.length) {
      return
    }

    setIsAnimating(true)
    setCurrentQuestionIndex(nextIndex)

    const animationDuration = 500
    setTimeout(() => {
      setIsAnimating(false)
    }, animationDuration)
  }

  const goToNextQuestion = () => navigateQuestions('next')
  const goToPreviousQuestion = () => navigateQuestions('prev')

  // Determine if the next button should be enabled
  const isNextDisabled =
    !selectedAnswer || currentQuestionIndex === questions?.length - 1
  const isNextButtonVisible = currentQuestionIndex < questions?.length - 1 // Hide on last question

  return (
    <Box className="max-w-2xl mx-auto py-10 px-5 md:p-10">
      {/* Navigation Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          position: 'relative', // Keep nav controls stable
          zIndex: 2, // Ensure nav is above questions during transition
        }}
      >
        <IconButton
          onClick={
            currentQuestionIndex === 0 ? handleBack : goToPreviousQuestion
          }
          disabled={isAnimating} // Disable if animating
          sx={{
            color: color[customColor].text,
            opacity: currentQuestionIndex === 0 ? 0.5 : 1, // Visual cue for disabled
          }}
        >
          {currentQuestionIndex === 0 ? (
            <HomeRounded fontSize="large" />
          ) : (
            <ChevronLeft fontSize="large" />
          )}
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: color[customColor].text, fontWeight: 600 }}
        >
          {' '}
          {/* Adjusted variant for better fit */}
          {currentQuestionIndex + 1} / {questions?.length}
        </Typography>
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

      {/* Prefix Text */}
      <Typography
        variant="h6" // Adjusted variant
        sx={{
          marginBottom: '25px',
          textAlign: 'center',
          color: '#555', // Example color
        }}
      >
        {prefix}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          minHeight: '520px',
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
                  'transform 1s ease-in-out, opacity 1s ease-in-out, scale 1.5s ease-in-out',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
            >
              {/* Question Text */}
              <Typography
                variant="h5"
                sx={{
                  marginBottom: '25px',
                  textAlign: 'center',
                  fontWeight: 'medium',
                  color: '#3f1e4b',
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
                {q.options.map((option) => (
                  <AssessmentButton
                    key={`${q.id}-${option}`}
                    onClick={() => handleAnswerChange(option)}
                    variant="contained"
                    endIcon={<CheckCircleOutline />}
                    disableRipple
                    data-value={option} // For reliable selection in focus logic
                    data-is-answer-option="true" // For easier selection in focus logic
                    tabIndex={isCurrent ? 0 : -1} // Only focusable if active
                    selected={selectedAnswer === option}
                    option={option}
                    customColor={customColor}
                  />
                ))}
              </Box>
            </Box>
          )
        })}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          {/* Next Button Area (only shown if not the last question) */}
          {isNextButtonVisible && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                onClick={goToNextQuestion}
                disabled={isNextDisabled || isAnimating}
                sx={{
                  backgroundColor: !selectedAnswer
                    ? '#e7e4e9'
                    : color[customColor].background,
                  color: !selectedAnswer ? '#ccc3cf' : '#ffffff',
                  cursor:
                    isNextDisabled || isAnimating ? 'not-allowed' : 'pointer',
                  opacity: isAnimating ? 0.7 : 1, // Slight fade while animating
                  transition: 'background-color 0.3s ease, opacity 0.3s ease',
                }}
                customColor={customColor}
              >
                Next
              </Button>
            </div>
          )}
          {currentQuestionIndex === questions?.length - 1 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                onClick={() => onSubmit(answers)}
                disabled={!selectedAnswer || isAnimating}
                sx={{
                  backgroundColor: !selectedAnswer
                    ? '#e7e4e9'
                    : color[customColor].background,
                  color: !selectedAnswer ? '#ccc3cf' : '#ffffff',
                  cursor:
                    !selectedAnswer || isAnimating ? 'not-allowed' : 'pointer',
                  opacity: isAnimating ? 0.7 : 1,
                  transition: 'background-color 0.3s ease, opacity 0.3s ease',
                }}
                customColor={customColor}
              >
                Finish
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MultipleChoice
