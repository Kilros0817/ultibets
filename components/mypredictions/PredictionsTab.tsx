import {
  Box,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef } from 'react'
import { dolllarImage, myNFTsImage, referralImage, starImage, storyTellingImage } from '../../utils/assets'
import { useChainContext } from '../../utils/Context'

type PredictionsTabProps = {
  width?: string[]
}

const PredictionsTab = ({
  width
}: PredictionsTabProps) => {
  const router = useRouter()
  const [pathName, setPathName] = useState('');
  const scroll = useRef<any>()
  const [scrollX, setScrollX] = useState<number>(0) // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

  const {
    setCategoryInPM,
  } = useChainContext();

  const slide = (shift: any) => {
    scroll.current.scrollLeft += shift
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
    ) {
      setScrollEnd(true)
    } else {
      setScrollEnd(false)
    }
  }

  const scrollCheck = () => {
    setScrollX(scroll.current.scrollLeft)
    if (
      Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
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
      mr={['0', '30px']}
      className='prediction-tabs-component'
      width={width}
      zIndex={'2'}
    >
      <Flex
        display='flex'
        position='relative'
        width={'100%'}
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
                // animation={animation}
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
                // animation={animation}
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
        overflowX='scroll'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
            background: 'transparent',
            width: '0',
            height: '0',
          },
        }}
        onScroll={scrollCheck}
      >
        <Flex
          gap={'18px'}
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'17px'}
          lineHeight={'23px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          cursor={'pointer'}
          width='max-content'
          zIndex={1}
        >

          <Image
            src={starImage}
          />
          <Text
            color={pathName.includes('/leaderboard') ? '#E18833' : 'white'}
            onClick={() => router.push(`/my-profile/leaderboard`)}
          >
            Leaderboard
          </Text>

          <Text
          >
            |
          </Text>
          <Image
            src={storyTellingImage}
          />
          <Text
            color={pathName.includes('/my-predictions') ? '#E18833' : 'white'}
            onClick={() => router.push(`/my-profile/my-predictions`)}
          >
            My Predictions
          </Text>

          <Text
          >
            |
          </Text>
          <Image
            src={referralImage}
          />
          <Text
            color={pathName.includes('/my-referrals') ? '#E18833' : 'white'}
            onClick={() => router.push(`/my-profile/my-referrals`)}
          >
            My Referrals
          </Text>

          <Text
          >
            |
          </Text>
          <Image
            src={dolllarImage}
          />
          <Text
            color={pathName.includes('/my-rewards') ? '#E18833' : 'white'}
            onClick={() => router.push(`/my-profile/my-rewards`)}
          >
            my rewards
          </Text>

          <Text
          >
            |
          </Text>
          <Image
            src={myNFTsImage}
          />
          <Text
            color={pathName.includes('/my-nfts') ? '#E18833' : 'white'}
            onClick={() => {setCategoryInPM(0); router.push(`/my-profile/my-nfts`)}}
          >
            My NFTs
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PredictionsTab
