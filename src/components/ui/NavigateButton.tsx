import { color } from '@/constants/colors'
import Button from './Button'
import Link from 'next/link'

const NavigateButton = ({
  path,
  customColor = 'purple',
  children,
}: {
  path: string
  customColor?: 'purple' | 'blue'
  children: React.ReactNode
}) => {
  return (
    <Link
      href={path}
      className={`
        min-w-[120px] 
        py-[12px] px-[25px] 
        bg-[${color[customColor].background}] 
        text-white 
        border-none 
        rounded-[25px] 
        cursor-pointer 
        text-base 
        font-semibold 
        transition-all duration-300 
        hover:bg-[${color[customColor].btnHover}] 
        active:opacity-80 
        disabled:bg-[#e0e0e0] 
        disabled:text-[#a0a0a0] 
        disabled:cursor-not-allowed
      `}
    >
      <Button component="span" customColor={customColor}>
        {children}
      </Button>
    </Link>
  )
}

export default NavigateButton
