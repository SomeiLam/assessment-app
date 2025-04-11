import React from 'react'
import * as motion from 'motion/react-client'
import Button from '../../components/ui/Button'
import AssessmentCard from '@/components/Assessment/AssessmentCard'

const AssessmentPagae = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="h-full max-w-5xl m-10 mt-15 lg:mx-auto lg:my-[5%] grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        <AssessmentCard
          imageSrc="/anxiety.png"
          imageAlt="Anxiety"
          description="Understand how anxious you might be feeling and whether it's
            interfering with your well-being."
          path="/assessment/anxiety"
          action={<Button customColor="blue">Let&apos;s begin</Button>}
        />
        <AssessmentCard
          imageSrc="/stress.png"
          imageAlt="Stress"
          description="Discover how stress is affecting your life and learn effective strategies to manage it."
          path="/assessment/stress"
          action={<Button>Let&apos;s begin</Button>}
        />
      </motion.div>
    </>
  )
}

export default AssessmentPagae
