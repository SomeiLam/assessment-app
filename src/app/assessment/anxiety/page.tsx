'use client'
import MultipleChoice from '@/components/MultipleChoice'
import { anxiety } from '@/constants/anxiety'
import * as motion from 'motion/react-client'
import { useRouter } from 'next/navigation'

const AnxiteyPage = () => {
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
      <MultipleChoice
        questions={anxiety.questions}
        prefix={anxiety.prefix}
        customColor="blue"
        onSubmit={handleSutmiit}
      />
    </motion.div>
  )
}

export default AnxiteyPage
