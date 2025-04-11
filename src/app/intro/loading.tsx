'use client'
import Image from 'next/image'
import React from 'react'
import { Typography } from '@mui/material'
import '../../styles/loading.css'

const Loading = () => {
  return (
    <div className="image-container">
      <Image
        src="/star.png"
        alt="Stat"
        className="animate-pulse"
        width={300}
        height={300}
        priority
      />
      <div className="loading-container">
        <Typography variant="h4" className="mb-4">
          Thank you. Going to the Assessment page...
        </Typography>
      </div>
    </div>
  )
}

export default Loading
