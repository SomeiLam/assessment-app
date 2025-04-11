'use client'
import { createTheme } from '@mui/material/styles'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
})

export default theme
