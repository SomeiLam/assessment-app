'use client'
import Image from 'next/image'
import React from 'react'
import { Box, Typography } from '@mui/material'
import * as motion from 'motion/react-client'
import '../../styles/loading.css'

const Redirect = () => {
  return (
    <Box className="bg-[#fef2f3] p-20 h-[100vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Box className="relative animate-pulse w-full h-[80vh] flex flex-col items-center justify-center gap-10">
          <Box className="">
            <Typography variant="h5" className="mb-4">
              Thank you. Please wait...
            </Typography>
          </Box>
          <Image
            src="/star.png"
            alt="Star waiting"
            width={250}
            height={250}
            priority
          />
        </Box>
      </motion.div>
    </Box>
  )
}

export default Redirect
