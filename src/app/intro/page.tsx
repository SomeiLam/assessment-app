'use client'
import React, { useState } from 'react'
import * as motion from 'motion/react-client'
import Questions from '@/components/Questions'
import { intro } from '@/constants/intro'
import { useRouter } from 'next/navigation'
import Redirect from '@/components/Intro/Redirect'

const Page = () => {
  const [showIntro, setShowIntro] = useState(false)
  const router = useRouter()

  const handleSutmiit = (data: { [key: number]: string }) => {
    console.log(data)
    setShowIntro(true)
    setTimeout(() => {
      router.push('/assessment')
    }, 2000)
  }

  if (showIntro) {
    return <Redirect />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
      className="h-full max-w-5xl mx-auto"
    >
      <Questions
        questions={intro.questions}
        prefix=""
        onSubmit={handleSutmiit}
        finishText="Next"
      />
    </motion.div>
  )
}

export default Page
