import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNetwork, } from 'wagmi';
import PredictionsModal from '../../modal/PredictionsModal';
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, mumbaiChainId, polygonChainId, secondsInHalfHour } from '../../../utils/config';
import { ethers } from 'ethers';

export type PredictionsSummary2Props = {
  sidePoolVolumes: string[]
  sideBetAmounts: string[]
  eventID: number
  eventStartTime: number
}

const PredictionsSummary2 = ({
  sidePoolVolumes,
  sideBetAmounts,
  eventStartTime,
}: PredictionsSummary2Props) => {
  const { isNativeToken, categoryInPM } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
  const [sidePools, setSidePools] = useState([1, 1]);
  const [sideBets, setSideBets] = useState([0.1, 0.1]);

  useEffect(() => {
     const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentChainAttrsItem[0].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);

  useEffect(() => {
    const yesSidePool = ethers.utils.formatEther(sidePoolVolumes[0]);
    const noSidePool = ethers.utils.formatEther(sidePoolVolumes[1]);
    console.log("yes side pool: ", yesSidePool);
    console.log("no side pool: ", noSidePool);
    setSidePools([
      parseFloat(yesSidePool),
      parseFloat(noSidePool),
    ]);

    const yesSideBet = ethers.utils.formatEther(sideBetAmounts[0]);
    const noSideBet = ethers.utils.formatEther(sideBetAmounts[1]);
    setSideBets([
      parseFloat(yesSideBet),
      parseFloat(noSideBet),
    ]);
  }, [sidePoolVolumes, sideBetAmounts])

  const predictionHistoryHeader = {
    isHeader: true,
    side: "side",
    betAmount: "prediction amount",
    currentSidepoolShare: "current sidepool share %",
    finalGainIfWon: "final gain if won",
  };

  const predictionHistory = useMemo(() => {
    return [
      predictionHistoryHeader,
      {
        isHeader: false,
        side: categoryInPM == 4 ? "Home" : "Yes",
        sidePool: sidePools[0],
        betAmount: sideBets[0],
        currentSidepoolShare: sidePools[0] > 0 ? parseFloat(((sideBets[0] / sidePools[0]) * 100).toFixed(1)) : 0,
        finalGainIfWon: sidePools[0] > 0 ?
          (Math.floor((sideBets[0] / sidePools[0] * (sidePools[0] + sidePools[1])) * 980) / 1000) : 0,
      },
      {
        isHeader: false,
        side: categoryInPM == 4 ? "Away" : "No",
        sidePool: sidePools[1],
        betAmount: sideBets[1],
        currentSidepoolShare: sidePools[1] > 0 ? parseFloat(((sideBets[1] / sidePools[1]) * 100).toFixed(1)) : 0,
        finalGainIfWon: sidePools[1] > 0 ?
          (Math.floor((sideBets[1] / sidePools[1] * (sidePools[0] + sidePools[1])) * 980) / 1000) : 0,
      },
    ]
  }, [sidePools, sideBets])

  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onCloseSecond,
  } = useDisclosure()

  const {
    isOpen: isOpenThird,
    onOpen: onOpenThird,
    onClose: onCloseThird,
  } = useDisclosure()

  const scroll = useRef<any>()
  const [scrollX, setScrollX] = useState<number>(0) // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

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
      direction='column'
      mb={'70px'}
      mr='5'
    >
      <Flex
        display='flex'
        position='relative'
      >
        {
          !scrollEnd && (
            <Box
              id="nextBtn"
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              position={'absolute'}
              right={['5px', '0px', '20px', '0px']}
              mt={['19px', '33px']}
              zIndex={100}
              color={'#FFB11C'}
              onClick={() => slide(50)}
            >
              <Image
                width={['20px', '30px']}
                height={['20px', '30px']}
                borderRadius={['30%', '50%']}
                src="/images/svgs/icon/right.svg"
                alt="right-arrow"
              />
            </Box>
          )
        }

        {
          scrollX !== 0 && (
            <Box
              _hover={{
                cursor: 'pointer',
                transform: 'scale(1.2)',
              }}
              id="prevBtn"
              position={'absolute'}
              left={'-12px'}
              mt={['19px', '33px']}
              zIndex={100}
              fontSize={'44px'}
              color={'#FFB11C'}
              onClick={() => slide(-50)}
            >
              <Image
                width={['20px', '30px']}
                height={['20px', '30px']}
                borderRadius={['30%', '50%']}
                // animation={animation}
                src="/images/svgs/icon/left.svg"
                alt="left-arrow"
              />
            </Box>
          )
        }
      </Flex>
      <Text
        textAlign='left'
        fontFamily={'Nunito'}
        fontWeight={['500', '700']}
        fontSize={['14px', '20px']}
        lineHeight={['18px', '27px']}
        color={'white'}
        textTransform={'capitalize'}
        pl='16px'
      >
        Predictions Summary
      </Text>

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
          display='flex'
          direction={'column'}
          width='max-content'
        >
          <Flex
            mt={['10px', '20px']}
            direction={'column'}
          >
            <Flex
              borderBottom={'2px solid #FC541C'}
              width='100%'
            />
            <Table
              mt={['10px', '20px']}
              gap={'2'}
            >
              <Tbody>
                {
                  predictionHistory.map((item, index) => (
                    <Tr
                      key={index}
                      fontFamily={'Nunito'}
                      fontWeight={['400', '700']}
                      fontSize={['10px', '17px']}
                      lineHeight={['14px', '23px']}
                      color={'white'}
                      textTransform={'capitalize'}
                    >
                      <Td
                        borderColor='transparent'
                      >
                        {item.side}
                      </Td>

                      <Td
                        borderColor='transparent'
                        ml={'0px'}
                      >
                        {item.betAmount} {item.isHeader ? '' : currentToken}
                      </Td>

                      <Td
                        ml={'60px'}
                        borderColor='transparent'
                      >
                        {item.currentSidepoolShare} {item.isHeader ? '' : '%'}
                      </Td>

                      <Td
                        ml={'80px'}
                        borderColor='transparent'
                      >
                        {item.finalGainIfWon} {item.isHeader ? '' : currentToken}
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>

            </Table>
          </Flex>

          <Flex
            display={['none', 'none', 'none', 'flex']}
            justifyContent={'start'}
            alignItems={'center'}
            gap={'20px'}
            mt={'30px'}
            mb={'30px'}
          >
            <Button
              onClick={onOpenSecond}
              height={'46px'}
              width={'155px'}
              background={'unset'}
              borderRadius={'34px'}
              border={'1px solid #FC541C'}
              _hover={{
                background: '#FC541C',
              }}
              color={'white'}
              fontSize={'20px'}
              isDisabled={eventStartTime - secondsInHalfHour < Date.now() / 1000}
            >
              Predict Now
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        ml={'-10px'}
        mt={'20px'}
        mb={'20px'}
        display={['flex', 'flex', 'flex', 'none']}
        justifyContent='start'
        alignItems={'center'}
        gap={'10px'}
      >
        <Button
          onClick={onOpenSecond}
          height={['35px', '46px']}
          width={['120px', '155px']}
          background={'unset'}
          borderRadius={'34px'}
          border={'1px solid #FC541C'}
          _hover={{
            background: '#FC541C',
          }}
          color={'white'}
          fontSize={['15px', '20px']}
        >
          Predict Now
        </Button>

        <PredictionsModal
          isOpenSecond={isOpenSecond}
          onCloseSecond={onCloseSecond}
          isOpenThird={isOpenThird}
          onOpenThird={onOpenThird}
          onCloseThird={onCloseThird}
          type={'prediction'}
          summary={predictionHistory}
        />
      </Flex>
    </Flex>
  )
}

export default PredictionsSummary2
