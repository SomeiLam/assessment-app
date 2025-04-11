import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link
        className="absolute top-0 p-2 sm:px-5 text-[#657ead] hover:text-[#4b5cb8] z-30"
        href="/"
      >
        Back
      </Link>
      <Box
        sx={{
          margin: '0 auto',
          width: '100%',
          position: 'absolute',
          top: '5%',
          msTransform: 'translateY(-5%)',
          transform: 'translateY(-5%)',
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
