import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

interface AssessmentCardProps {
  imageSrc: string
  imageAlt: string
  description: string
  action: React.ReactNode
  path: string
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  imageSrc,
  imageAlt,
  description,
  action,
  path,
}) => {
  return (
    <Link
      href={path}
      className="lg:h-[630px] border-2 border-dashed border-indigo-100 bg-indigo-50 sm:rounded-lg sm:shadow-md cursor-pointer hover:scale-105 transform transition duration-1000"
    >
      <Box className="flex flex-col justify-center items-center p-5 md:p-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          priority
        />

        <Typography
          variant="body1"
          className="text-lg text-center text-slate-700"
        >
          {description}
        </Typography>

        <Box className="my-5">{action}</Box>
      </Box>
    </Link>
  )
}

export default AssessmentCard
