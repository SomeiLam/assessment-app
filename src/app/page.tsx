import Landing from '@/components/Landing/Landing'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box
      role="main"
      sx={{
        margin: '0 auto',
        width: '100%',
        position: 'absolute',
        top: '30%',
        msTransform: 'translateY(-30%)',
        transform: 'translateY(-30%)',
      }}
    >
      <Landing />
    </Box>
  )
}
