import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import '@fontsource/inter'
import { CSSProperties } from 'react'
import CarouselLink from './CarouselLink'
import { useRouter } from 'next/router'

const SquidCarousel = () => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrowStyles: any = {
    position: 'absolute',
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    zIndex: 2,
  }

  const indicatorStyles: CSSProperties = {
    background: '#fff',
    display: 'inline-block',
    margin: '0 8px',
    borderRadius: '50%',
    width: '13px',
    height: '13px',
  }

  const carouselItems = [
    {
      betId: 1,
    },
    {
      betId: 2,
      background: '/images/svgs/sbc-carousel-background/2.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/2-small.svg',
      backgroundPosition: 'center'
    },
    {
      betId: 3,
      background: '/images/svgs/sbc-carousel-background/3.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/3-small.svg',
      backgroundPosition: 'center',
    },
    {
      betId: 4,
      background: '/images/svgs/sbc-carousel-background/4.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/4-small.svg',
      backgroundPosition: 'left',
    },
    {
      betId: 5,
      background: '/images/svgs/sbc-carousel-background/5.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/5-small.svg',
      backgroundPosition: 'center',
    },
    {
      betId: 6,
      background: '/images/svgs/sbc-carousel-background/6.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/6-small.svg',
      backgroundPosition: 'center',
    },
    {
      betId: 7,
      background: '/images/svgs/sbc-carousel-background/7.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/7-small.svg',

      backgroundPosition: 'left',
    },
    {
      betId: 8,
      background: '/images/svgs/sbc-carousel-background/8.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/8-small.svg',
      backgroundPosition: 'left',
    },
    {
      betId: 9,
      background: '/images/svgs/sbc-carousel-background/9.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/9-small.svg',
      backgroundPosition: 'left',
    },
    {
      betId: 10,
      background: '/images/svgs/sbc-carousel-background/10.svg',
      backgroundSmall: '/images/svgs/sbc-carousel-background/10-small.svg',
      backgroundPosition: 'center',
    },
  ]

  return (
    <div
      style={{ width: '100vw' }}
    >
      <Carousel
        transitionTime={600}
        interval={10000}
        showStatus={false}
        autoPlay
        showArrows
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: '#E18933' }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            )
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          )
        }}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <Icon
              as={AiOutlineLeft}
              onClick={onClickHandler}
              style={{ ...arrowStyles, left: 10 }}
            />
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <Icon
              name="chevron-right"
              onClick={onClickHandler}
              style={{ ...arrowStyles, right: 10 }}
              as={AiOutlineRight}
            />
          )
        }
        showThumbs={false}
        infiniteLoop={true}
        className='squid-competition-banner-carousel'
      >
        {
          carouselItems.map((item, index) => (
            < Flex
              key={index}
              px={['40px', '40px', '90px', '90px']}
              id={`home-carousel-${item.betId}`}
              height={'300px'}
              width={'100%'}
              justifyContent={
                [
                  'center',
                  'space-between',
                  'space-between',
                ]}
              alignItems={'center'}
              boxShadow="inset 0px 4px 60px 5px #000000"
              position={['relative', 'unset']}
              backgroundImage={[
                item.background ? item.backgroundSmall : 'none',
                item.background ? item.backgroundSmall : 'none',
                item.background ? item.background : 'none',
              ]}
              backgroundPosition={item.backgroundPosition}
              backgroundSize='cover'
            >
              <Flex
                direction={'column'}
              >
                <Flex
                  direction={['column', 'column', 'column', 'row', 'row']}
                  fontStyle={'normal'}
                  fontWeight={700}
                  textAlign={'start'}
                  width={['unset', '306px', 'unset', 'unset']}
                  lineHeight={'48px'}
                  fontSize={['35px', '35px', '35px', '40px']}
                  mb={['44px', '44px', '44px', '44px', '49px']}
                >
                  <Text
                    mr='10px'
                  >
                    Squid Bet
                  </Text>

                  <Flex>
                    <Text
                    >
                      Competition #{item.betId}
                    </Text>

                    <Flex
                      ml={'10px'}
                      width={'39px'}
                      height={'39px'}
                      background={"url('/images/svgs/slider/squid-icon.svg')"}
                    />
                  </Flex>

                </Flex>
                <Flex
                  border={'1px solid #FFFFFF'}
                  borderRadius={'45px'}
                  _hover={{
                    background: '#FC541C',
                  }}
                  onClick={() => {
                    router.push(`/sbc/${item.betId}/register`)
                  }}
                  fontFamily={'Nunito'}
                  fontStyle={'normal'}
                  fontWeight={700}
                  fontSize={['16px', '16px', '16px', '22px']}
                  lineHeight={'30px'}
                  textTransform={'capitalize'}
                  px={['26px', '26px', '26px', '40px']}
                  py={['8px', '8px', '8px', '12px']}
                  width={'fit-content'}
                >
                  register now{' '}
                </Flex>
              </Flex>

              <Flex
                position={['absolute', 'unset']}
                bottom={['0px', 'unset']}
                right={['40px', 'unset']}
              >
                <Image
                  src="/images/svgs/slider/squid-1.svg"
                  alt="squid"
                  width={['127px', '170px', '200px', '272px']}
                  height={['127px', '170px', '200px', '272px']}
                />
              </Flex>
            </Flex>
          ))
        }
      </Carousel>
    </div >
  )
}

export default SquidCarousel
