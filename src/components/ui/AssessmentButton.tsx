import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { color } from '@/constants/colors'

interface AssessmentButtonProps extends MuiButtonProps {
  selected: boolean
  option: string
  customColor?: 'purple' | 'blue'
}

const AssessmentButton: React.FC<AssessmentButtonProps> = ({
  selected,
  option,
  customColor = 'purple',
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 20px',
        width: '100%',
        color: color[customColor].text,
        backgroundColor: selected
          ? color[customColor].selected
          : color[customColor].backgroundLight,
        borderRadius: '16px',
        textAlign: 'left',
        fontSize: '1rem',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        textTransform: 'none',
        boxShadow: 'none',
        transition: 'background-color 0.5s ease',
        opacity: '.8',
        '&.Mui-focusVisible': {
          border: `2px solid ${color[customColor].backgroundLight}`,
        },
        '&:hover': {
          backgroundColor: selected
            ? color[customColor].selected
            : color[customColor].hover,
          boxShadow: 'none',
        },
        '& .MuiButton-endIcon': {
          opacity: selected ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        },
        '& .MuiButton-endIcon svg': {
          fontSize: '25px',
          color: color[customColor].iconColor,
          opacity: selected ? 1 : 0,
          transform: selected ? 'translateX(0)' : 'translateX(10px)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        },
      }}
    >
      {option}
    </MuiButton>
  )
}

export default AssessmentButton
