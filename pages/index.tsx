import {
  Box,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Carousel from '../components/Container/Carousel'

const Home: NextPage = () => {
  return (
    <Box>
      <Carousel />
    </Box>
  )
}

export default Home
