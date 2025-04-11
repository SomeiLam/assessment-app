import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { color } from '@/constants/colors'

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode
  sx?: React.CSSProperties
  customColor?: 'purple' | 'blue'
}

const Button: React.FC<ButtonProps> = ({
  children,
  sx,
  customColor = 'purple',
  ...props
}) => {
  return (
    <MuiButton
      sx={{
        minWidth: '120px',
        padding: '12px 25px',
        backgroundColor: color[customColor].background,
        color: '#ffffff',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 600,
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
        '&:hover': {
          backgroundColor: color[customColor].btnHover,
        },
        '&:active': {
          opacity: 0.8,
        },
        '&:disabled': {
          backgroundColor: '#e0e0e0',
          color: '#a0a0a0',
          cursor: 'not-allowed',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button
