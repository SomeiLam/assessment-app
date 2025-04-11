import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import NavigateButton from '../ui/NavigateButton'
import * as motion from 'motion/react-client'

const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
      className="max-w-2xl mx-auto sm:my-[5%]"
    >
      <Box className="flex h-[100dvh] sm:h-full flex-col justify-center items-center mb-6 p-5 md:p-10 border-2 border-dashed border-red-100 bg-red-50 sm:rounded-lg sm:shadow-md">
        <Image
          src="/welcome.png"
          alt="Welcome"
          width={500}
          height={500}
          priority
        />

        <Typography
          variant="body1"
          className="text-lg text-center text-slate-700"
        >
          Life can be overwhelming, and sometimes it&apos;s hard to tell whether
          your anxiety or stress levels are affecting your daily life. This
          assessment is designed to help you gain valuable insights into your
          mental health.
        </Typography>

        <Box className="my-5">
          <NavigateButton path="/assessment">Get Start</NavigateButton>
        </Box>
      </Box>
    </motion.div>
  )
}

export default Landing
