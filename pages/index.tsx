import {
  Box,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Carousel from '../components/Container/Carousel'
import { useChainContext } from '../utils/Context'

const Home: NextPage = () => {
  const router = useRouter();
  const { setReferral, } = useChainContext();

  useEffect(() => {
    const asPath = router.asPath;

    const pieces = asPath.split('?r=');
    console.log("pieces: ", pieces);
    if (pieces.length == 2) {
      const referral = pieces[1];
      setReferral(referral);
    }
  }, [router])

  return (
    <Box>
      <Carousel />
    </Box>
  )
}

export default Home
