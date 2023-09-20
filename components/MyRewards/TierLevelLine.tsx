/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { tiers } from '../../utils/config'

type TierLevelLineProps = {
  currentRewardTierLevel: number
}

const TierLevelLine = ({
  currentRewardTierLevel,
}: TierLevelLineProps) => {
  const tierLabels = [
    {
      level: 0,
      cashback: 'Cashback',
      limit: 'Tier Level',
      reward: 0,
    },
    ...tiers,
  ]

  const scroll = useRef<any>()
  const [scrollX, setscrollX] = useState<number>(0) // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

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
          pl={'15px'}
        >
          {
            tierLabels.map((item, index) => (
              <Box
                key={index}
              >
                <Flex
                  textAlign={'left'}
                  position='relative'
                  mb='15px'
                >
                  <Text
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'17px'}
                    lineHeight={'23px'}
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    borderBottom={'2px solid white'}
                    pb='20px'
                    mb='5px'
                    width={'180px'}
                    borderColor={index + 1 <= currentRewardTierLevel ? '#E18933' : 'white'}
                    border={index == tierLabels.length - 1 ? 'none' : 'flex'}
                  >
                    {
                      index == 0 ? item.limit.toString() + " " + currentRewardTierLevel.toString()
                        :
                        item.limit.toString() + " UTBETS"
                    }
                  </Text>
                  <Flex
                    position={'absolute'}
                    width='40px'
                    height={'40px'}
                    borderRadius='50%'
                    left={'-16px'}
                    background={index == currentRewardTierLevel ?
                      'radial-gradient(50% 50% at 50% 50%, rgba(225, 137, 51, 0.4) 0%, \
                      rgba(225, 136, 51, 0.4) 0.01%, rgba(190, 59, 49, 0) 100%)'
                      : 'transparent'}
                    top={'24px'}
                  >
                    <Flex
                      position={'absolute'}
                      width='10px'
                      height={'10px'}
                      left={'16px'}
                      top={'15px'}
                      borderRadius='50%'
                      background={index <= currentRewardTierLevel ? '#E18933' : 'white'}
                    />
                  </Flex>
                </Flex>
                <Flex
                  textAlign={'left'}
                  position='relative'
                >
                  <Text
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'17px'}
                    lineHeight={'23px'}
                    textTransform={'capitalize'}
                    cursor={'pointer'}
                    pb='15px'
                    mb='5px'
                    width={'180px'}
                  >
                    {
                      index == 0 ? item.cashback.toString()
                        :
                        item.cashback.toString() + "%"
                    }
                  </Text>
                </Flex>
              </Box>
            ))
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TierLevelLine
