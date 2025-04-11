import React from 'react'
import {
  Box,
  TextField as MuiTextField,
  OutlinedTextFieldProps,
} from '@mui/material'
import { color } from '@/constants/colors'
import Button from './Button'

interface AssessmentInputProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  customColor?: 'purple' | 'blue'
  handleNext?: () => void
  buttonText?: 'Finish' | 'Next'
}

const AssessmentInput: React.FC<AssessmentInputProps> = ({
  customColor = 'purple',
  handleNext,
  buttonText = 'Next',
  ...props
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (handleNext) {
          handleNext()
        }
      }}
    >
      <MuiTextField
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: {
            sm: '15px 20px',
            xs: '10px 20px',
          },
          width: '100%',
          '& .MuiOutlinedInput-root': {
            backgroundColor: color[customColor].backgroundLight,
            borderRadius: '16px',
            '& fieldset': {
              border: `1px solid ${color[customColor].hover}`,
              borderColor: `${color[customColor].hover} !important`,
              borderRadius: '16px',
            },
            '&:hover fieldset': {
              border: `2px solid ${color[customColor].hover}`,
            },
          },
        }}
        {...props}
      />
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          type="button"
          onClick={handleNext ? handleNext : undefined}
          disabled={!handleNext}
          sx={{
            opacity: !handleNext ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
          customColor={customColor}
        >
          {buttonText}
        </Button>
      </Box>
    </form>
  )
}

export default AssessmentInput
