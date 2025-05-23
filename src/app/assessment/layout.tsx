import { Box } from '@mui/material'
import Link from 'next/link'
import { headers } from 'next/headers'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname')

  return (
    <>
      <Link
        className="absolute top-0 p-2 sm:px-5 text-[#657ead] hover:text-[#4b5cb8] z-30"
        href={
          pathname?.includes('stress') || pathname?.includes('anxiety')
            ? '/assessment'
            : '/'
        }
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
