import React, { useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircleOutline,
} from '@mui/icons-material'
import ANXIETY from '@/constants/anxiety'

const MultipleChoice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Store answers in an object or array if you need to persist them per question
  const [answers, setAnswers] = useState<{ [key: number]: string | null }>({})
  const [isAnimating, setIsAnimating] = useState(false)
  // Track the *previous* index to determine animation direction cleanly if needed,
  // but the simpler approach below doesn't require it for the slide itself.
  // const [previousIndex, setPreviousIndex] = useState(0);

  const selectedAnswer = answers[currentQuestionIndex] || null

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
    if (isAnimating || nextIndex < 0 || nextIndex >= ANXIETY.questions.length) {
      return
    }

    // Set animating flag
    setIsAnimating(true)
    // setPreviousIndex(currentQuestionIndex); // Store previous index if needed elsewhere

    // Update the index *immediately* - this triggers the CSS transition
    setCurrentQuestionIndex(nextIndex)

    // Use a timer matching the CSS transition duration to reset the animating flag
    // This prevents clicks during the animation.
    const animationDuration = 500 // Should match CSS transition duration
    setTimeout(() => {
      setIsAnimating(false)
    }, animationDuration)
  }

  const goToNextQuestion = () => navigateQuestions('next')
  const goToPreviousQuestion = () => navigateQuestions('prev')

  // Determine if the next button should be enabled
  const isNextDisabled =
    !selectedAnswer || currentQuestionIndex === ANXIETY.questions.length - 1
  const isNextButtonVisible =
    currentQuestionIndex < ANXIETY.questions.length - 1 // Hide on last question

  return (
    // Added overflow: hidden to the container to clip outgoing questions
    <Box className="max-w-2xl mx-auto p-5 md:p-10">
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
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0 || isAnimating} // Disable if animating
          sx={{
            color: '#3f1e4b',
            opacity: currentQuestionIndex === 0 ? 0.5 : 1, // Visual cue for disabled
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#3f1e4b', fontWeight: 600 }}>
          {' '}
          {/* Adjusted variant for better fit */}
          {currentQuestionIndex + 1} / {ANXIETY.questions.length}
        </Typography>
        <IconButton
          onClick={goToNextQuestion}
          disabled={
            currentQuestionIndex === ANXIETY.questions.length - 1 || isAnimating
          } // Disable if animating
          sx={{
            color: '#3f1e4b',
            opacity:
              currentQuestionIndex === ANXIETY.questions.length - 1 ? 0.5 : 1, // Visual cue for disabled
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
        {ANXIETY.prefix}
      </Typography>

      {/* Questions Container - Relative positioning needed for absolute children */}
      {/* Added minHeight to prevent collapse during transition */}
      <Box sx={{ position: 'relative', minHeight: '520px' }}>
        {ANXIETY.questions.map((q, index) => {
          // Determine position based on index relative to currentQuestionIndex
          let transform = 'translateX(0)'
          if (index < currentQuestionIndex) {
            transform = 'translateX(-100%)' // Position previous questions to the left
          } else if (index > currentQuestionIndex) {
            transform = 'translateX(100%)' // Position next questions to the right
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
                // Control visibility and position purely with opacity and transform
                opacity: isCurrent ? 1 : 0, // Target opacity
                transform: transform, // Target position
                transition:
                  'transform 1.5s ease-in-out, opacity 0.8s ease-in-out',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }} // Only focusable if active
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
                {ANXIETY.options.map((option, optionIndex) => (
                  <Button
                    key={optionIndex}
                    onClick={() => handleAnswerChange(option)}
                    variant="contained"
                    endIcon={<CheckCircleOutline />}
                    disableRipple
                    data-value={option} // For reliable selection in focus logic
                    data-is-answer-option="true" // For easier selection in focus logic
                    tabIndex={isCurrent ? 0 : -1} // Only focusable if active
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '15px 20px',
                      width: '100%',
                      color: '#3f1e4b',
                      backgroundColor:
                        selectedAnswer === option ? '#eed0f9' : '#f2eef3',
                      borderRadius: '12px', // Adjusted border radius
                      textAlign: 'left',
                      fontSize: '1rem', // Use rem units
                      fontWeight: selectedAnswer === option ? 600 : 400, // Adjusted weights
                      cursor: 'pointer',
                      textTransform: 'none',
                      boxShadow: 'none',
                      transition: 'background-color 0.5s ease', // Smooth transitions
                      '&.Mui-focusVisible': {
                        border: '2px solid #b47be9',
                      },
                      '&:hover': {
                        backgroundColor:
                          selectedAnswer !== option ? '#e8e0ea' : '#eed0f9', // Subtle hover
                        boxShadow: 'none', // Keep shadow consistent or add subtle hover shadow if desired
                      },
                      '& .MuiButton-endIcon': {
                        // Target icon container
                        opacity: selectedAnswer === option ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                      },
                      '& .MuiButton-endIcon svg': {
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
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </Box>
          )
        })}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          {/* Add any footer content here */}
          {/* Next Button Area (only shown if not the last question) */}
          {isNextButtonVisible && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                onClick={goToNextQuestion}
                disabled={isNextDisabled || isAnimating} // Also disable while animating
                style={{
                  minWidth: '120px', // Ensure button has good size
                  padding: '12px 25px', // Adjust padding
                  backgroundColor: !selectedAnswer ? '#e7e4e9' : '#b47be9',
                  color: !selectedAnswer ? '#ccc3cf' : '#ffffff',
                  border: 'none',
                  borderRadius: '25px', // Rounded corners
                  cursor:
                    isNextDisabled || isAnimating ? 'not-allowed' : 'pointer', // Indicate disabled state
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  opacity: isAnimating ? 0.7 : 1, // Slight fade while animating
                  transition: 'background-color 0.3s ease, opacity 0.3s ease', // Smooth transitions
                }}
              >
                Next
              </Button>
            </div>
          )}
          {/* You might want a "Submit" or "Finish" button on the last question */}
          {currentQuestionIndex === ANXIETY.questions.length - 1 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                // onClick={handleSubmit} // Add your submit logic here
                disabled={!selectedAnswer || isAnimating}
                style={{
                  minWidth: '120px',
                  padding: '12px 25px',
                  backgroundColor: !selectedAnswer ? '#e7e4e9' : '#b47be9', // Example Finish color
                  color: !selectedAnswer ? '#ccc3cf' : '#ffffff',
                  border: 'none',
                  borderRadius: '25px',
                  cursor:
                    !selectedAnswer || isAnimating ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  opacity: isAnimating ? 0.7 : 1,
                  transition: 'background-color 0.3s ease, opacity 0.3s ease',
                }}
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
