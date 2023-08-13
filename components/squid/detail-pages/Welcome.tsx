import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export type WelcomeProps = {
  title: string
  round?: string
}

const Welcome = ({ title, round }: WelcomeProps) => {
  return (
    <Flex
      direction={['column', 'column', 'column', 'row']}
      width={['100%', '100%', '100%', '100%']}
      alignItems={'start'}
    >
      <Flex
        justifyContent={'center'}
        mt={'20px'}
        alignItems={'center'}
      >
        <Text
          fontFamily={'Nunito'}
          fontStyle='normal'
          fontWeight={'700'}
          fontSize={['22px', '20px', '20px', '27px']}
          lineHeight={['27px', '27px', '33px', '33px']}
          color={'white'}
          textTransform={'capitalize'}
        >
          {/* Welcome to Squid Bet #1 */}
          {title}
        </Text>
        <Box
          ml={['5px', '12px', '12px', '12px']}
          width={'39px'}
          height={'39px'}
          background={"url('/images/svgs/slider/squid-icon.svg')"}
        />
      </Flex>
      <Flex
        mt={['5px', '5px', '5px', '20px']}
        justifyContent={'center'}
        alignItems={'center'}
        ml={['0px', '0px', '0px', '93px']}
      >
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          {/* Round 1 */}
          {round ? round : ''}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Welcome
