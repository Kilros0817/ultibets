/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { roundProperties, sbcAccessLevel2RoundUrls, VotingResultInSBC } from '../../../utils/config'

type RoundLineProps = {
  eventID: number
  currentSelectedLevel: number
  accessLevel: number // should check access possibility
  category: number // 0: native, 1: utbets, 2: warrior
  totalRound: number
  winnersNumber: number
  votingResult: VotingResultInSBC
}

const RoundLine = ({
  eventID,
  currentSelectedLevel,
  accessLevel,
  category,
  totalRound,
  winnersNumber,
  votingResult,
}: RoundLineProps) => {
  const router = useRouter();
  const scroll = useRef<any>()
  const [scrollX, setscrollX] = useState<number>(0) // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

  useEffect(() => {
    if (
      winnersNumber == 1 &&
      votingResult == VotingResultInSBC.Indeterminate &&
      totalRound < currentSelectedLevel &&
      !router.asPath.includes(sbcAccessLevel2RoundUrls[7])
    ) {
      router.push(`/sbc/${eventID}/${sbcAccessLevel2RoundUrls[7]}`)
    } else if (currentSelectedLevel > accessLevel) {
      router.push(`/sbc/${eventID}/${(sbcAccessLevel2RoundUrls as any)[accessLevel]}`)
    }
  }, [
    currentSelectedLevel,
    accessLevel,
    winnersNumber,
    totalRound,
    votingResult,
  ])

  const slide = (shift: any) => {
    scroll.current.scrollLeft += shift
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  const scrollCheck = () => {
    setscrollX(scroll.current.scrollLeft)
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
      scroll.current.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  useEffect(() => {
    if (
      scroll.current &&
      scroll?.current?.scrollWidth === scroll?.current?.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
    return () => { }
  }, [scroll?.current?.scrollWidth, scroll?.current?.offsetWidth])

  return (
    <Flex
      direction={'column'}
      mt='34px'
      mb='30px'
      width={'100%'}
    >
      <Flex
        display='flex'
        position='relative'
        width={'100%'}
        className='left-right'
      >
        {/* right arrow */}
        {
          !scrollEnd && (
            <Box
              id="nextBtn"
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              position={'absolute'}
              right='-25px'
              mt={'33px'}
              zIndex={100}
              fontSize={'44px'}
              color={'#FFB11C'}
              onClick={() => slide(50)}
              height='30px'
              width={'30px'}
              top='-37px'
            >
              <Image
                width={'30px'}
                height={'30px'}
                borderRadius={'50%'}
                src="/images/svgs/icon/right.svg"
                alt="right-arrow"
              />
            </Box>
          )
        }

        {/* left arrow */}
        {
          scrollX !== 0 && (
            <Box
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              id="prevBtn"
              position={'absolute'}
              left={'-30px'}
              top='-37px'
              mt={'33px'}
              zIndex={100}
              fontSize={'44px'}
              color={'#FFB11C'}
              onClick={() => slide(-50)}
              width='30px'
            >
              <Image
                width={'30px'}
                height={'30px'}
                borderRadius={'50%'}
                src="/images/svgs/icon/left.svg"
                alt="left-arrow"
              />
            </Box>
          )
        }
      </Flex>

      <Flex
        direction='column'
        ref={scroll}
        overflowX={'scroll'}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
            background: 'transparent',
            width: '0',
            height: '0',
          },
          'scrollbarWidth': 'thin',
          'scrollbarColor': 'transparent transparent',
        }}
        onScroll={scrollCheck}
      >
        <Flex
          width='max-content'
          position='relative'
        >
          {
            Object.values(roundProperties).map((item, index) => (
              <Flex
                textAlign={'center'}
                key={index}
                position='relative'
              >
                <Text
                  fontFamily={'Nunito'}
                  fontWeight={'700'}
                  fontSize={'17px'}
                  lineHeight={'23px'}
                  color={item.id <= currentSelectedLevel ? '#E18933' : 'white'}
                  textTransform={'capitalize'}
                  onClick={() => router.push(
                    `/sbc/${eventID}` + item.href
                  )}
                  cursor={'pointer'}
                  borderBottom={'2px solid white'}
                  pb='15px'
                  mb='5px'
                  width={'180px'}
                  borderColor={item.id <= currentSelectedLevel ? '#E18933' : 'white'}
                >
                  {item.title}
                </Text>
                <Flex
                  position={'absolute'}
                  width='8px'
                  height={'8px'}
                  borderRadius='50%'
                  background={item.id <= currentSelectedLevel ? '#E18933' : 'white'}
                  top='34px'
                >
                </Flex>
              </Flex>

            ))
          }
          <Flex
            position={'absolute'}
            width='8px'
            height={'8px'}
            borderRadius='50%'
            background={8 <= currentSelectedLevel ? '#E18933' : 'white'}
            top='34px'
            right={'0px'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RoundLine
