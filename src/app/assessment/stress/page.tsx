'use client'
import Questions from '@/components/Questions'
import { stress } from '@/constants/stress'
import * as motion from 'motion/react-client'
import { useRouter } from 'next/navigation'

const StressPage = () => {
  const router = useRouter()

  const handleSutmiit = (data: { [key: number]: string }) => {
    console.log(data)
    router.push('/result')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1 }}
    >
      <Questions
        onSubmit={handleSutmiit}
        questions={stress.questions}
        prefix={stress.prefix}
      />
    </motion.div>
  )
}

export default StressPage
