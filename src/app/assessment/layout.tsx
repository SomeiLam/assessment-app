import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link
        className="absolute top-0 left-0 p-5 text-[#657ead] hover:font-semibold"
        href="/"
      >
        Back to Home
      </Link>
      <Box
        sx={{
          margin: '0 auto',
          width: '100%',
          position: 'absolute',
          '@media (min-width: 1024px)': {
            top: '30%',
            msTransform: 'translateY(-30%)',
            transform: 'translateY(-30%)',
          },
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default layout
