import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const MyPredictionsComponent = () => {
  const router = useRouter()
  return (
    <Box>
      <Flex gap={'18px'}>
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          cursor={'pointer'}
          onClick={() => router.push('/sbc')}
          zIndex={1}
        >
          SBC Menu
        </Text>
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
          color={'white'}
          textTransform={'capitalize'}
        >
          |
        </Text>
        <Text
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          cursor={'pointer'}
          onClick={() => router.push('/my-profile/my-nfts')}
        >
          My NFTs
        </Text>
      </Flex>
    </Box>
  )
}

export default MyPredictionsComponent
