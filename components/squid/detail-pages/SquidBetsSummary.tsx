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
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { roundProperties, RoundResultInSBC, secondsInHalfHour } from '../../../utils/config'
import { useChainContext } from '../../../utils/Context'
import { bettorDecisionOnRound, isWinner } from '../../../utils/interact/sc/squid-competition'
import PredictionsModal from '../../modal/PredictionsModal'

type SquidBetsSummaryProps = {
  eventID: number
  currentLevel: number
  totalPlayers: number
  currentPlayers: number
  currentToken?: string
  roundBetAmount: number
  yesPoolAmount: number
  noPoolAmount: number
  registerID: number
  roundResult: RoundResultInSBC
  currentSelectedLevel: number
  accessLevel: number
  startTime: Date,
}

const SquidBetsSummary = ({
  eventID,
  currentLevel,
  currentToken,
  totalPlayers,
  currentPlayers,
  roundBetAmount,
  yesPoolAmount,
  noPoolAmount,
  registerID,
  roundResult,
  currentSelectedLevel,
  accessLevel,
  startTime,
}: SquidBetsSummaryProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const { isNativeToken } = useChainContext();
  const [roundResultText, setRoundResultText] = useState('Pending');
  const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onClose: onCloseSecond,
  } = useDisclosure();
  const {
    isOpen: isOpenThird,
    onOpen: onOpenThird,
    onClose: onCloseThird,
  } = useDisclosure();
  const scroll = useRef<any>();
  const [scrollX, setScrollX] = useState<number>(0); // For detecting start scroll postion
  const [scrollEnd, setScrollEnd] = useState<boolean>(false); // For detecting end of scrolling
  const [slug, setSlug] = useState('');
  const [passedPreviousRound, setPassedPreviousRound] = useState(false);
  const [currentRoundPlayerResult, setCurrentRoundPlayerResult] = useState(RoundResultInSBC.Indeterminate);

  useEffect(() => {
    const path = router.asPath;
    const slug = path.split('/');

    if (slug.length >= 4) {
      setSlug(slug[3]);
    }
  }, [router])

  

  useEffect(() => {
    const initBettorDecisions = async () => {
      const res = await bettorDecisionOnRound(
        eventID,
        currentSelectedLevel,
        address,
        chain?.id ?? 0,
        isNativeToken
      );
      setCurrentRoundPlayerResult(res as any);
    }
    if (chain?.id && address)  initBettorDecisions()
  }, [
    chain?.id,
    address,
    isNativeToken,
  ]);

  useEffect(() => {
    if (roundResult == RoundResultInSBC.Indeterminate) {
      setRoundResultText('Pending');
    } else {
      if (roundResult == currentRoundPlayerResult) {
        setRoundResultText('Won');
      } else {
        setRoundResultText('Lost');
      }
    }
  }, [roundResult, currentRoundPlayerResult])

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

  const squidBetHistoryHeader = {
    isHeader: true,
    side: "side",
    betAmount: "prediction amount",
    round: "round",
    playersRemaining: "Players Remaining",
    playerStatus: "Player Status",
    accessRounds: "Access Round "
  };

  const squidBetHistory = [
    squidBetHistoryHeader,
    {
      isHeader: false,
      side: currentRoundPlayerResult,
      betAmount: roundBetAmount,
      round: "",
      playersRemaining: `${currentPlayers} / ${totalPlayers}`,
      playerStatus: roundResultText,
    },
  ];



  useEffect(() => {
    if (currentSelectedLevel < 2) return;

    const getWinner = async () => {
      const res = await isWinner(
        address as any,
        eventID,
        currentSelectedLevel - 1,
        chain?.id??0,
        isNativeToken
      );

      setPassedPreviousRound(res as boolean)
    }

    if (chain?.id && address)
      getWinner();
    
    
  }, [
    chain?.id,
    address,
    isNativeToken,
    currentSelectedLevel,
    eventID,
  ]);


  return (
    <Flex
      direction='column'
      mb={'70px'}
      mr='5'
    >
      {
        currentRoundPlayerResult != RoundResultInSBC.Indeterminate && (
          <>
            <Flex
              direction='column'
            >
              <Flex
                display={['flex', 'flex', 'flex', 'none']}
                position='relative'
                width={'100%'}
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
                      right={['-26px', '-10px', '-30px', '0px']}
                      mt={'33px'}
                      zIndex={100}
                      fontSize={'44px'}
                      color={'#FFB11C'}
                      onClick={() => slide(50)}
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

                {
                  scrollX !== 0 && (
                    <Box
                      _hover={{
                        cursor: 'pointer',
                        transform: 'scale(1.2)',
                      }}
                      id="prevBtn"
                      position={'absolute'}
                      left={'-22px'}
                      mt={'33px'}
                      zIndex={100}
                      fontSize={'44px'}
                      color={'#FFB11C'}
                      onClick={() => slide(-50)}
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
            </Flex>

            <Text
              textAlign='left'
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'20px'}
              lineHeight={'27px'}
              color={'white'}
              textTransform={'capitalize'}
              pl='16px'
            >
              Bets Summary
            </Text>

            {/* table */}
            <Flex
              direction='column'
              ref={scroll}
              overflowX='scroll'
              width={['calc(100vw - 130px)', 'calc(100vw - 130px)', 'calc(100vw - 200px)']}
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                  background: 'transparent',
                  width: '0',
                  height: '0',
                },
                'scrollbar-color': 'transparent transparent',
              }}
              onScroll={scrollCheck}
            >
              <Flex
                display={['flex', 'flex', 'flex', 'flex']}
                direction={'column'}
                width='max-content'
              >
                <Flex
                  mt={'20px'}
                  direction={'column'}
                >
                  <Flex
                    borderBottom={'2px solid #FC541C'}
                    width='100%'
                  />
                  <Table
                    mt={'20px'}
                    gap='2'
                  >
                    <Tbody>
                      {
                        squidBetHistory.map((item, index) => (
                          <Tr
                            key={index}
                            fontFamily={'Nunito'}
                            fontWeight={'700'}
                            fontSize={'17px'}
                            lineHeight={'23px'}
                            color={'white'}
                            textTransform={'capitalize'}
                            textAlign='center'
                            justifyContent={'center'}
                          >
                            <Td
                              borderColor='transparent'
                            >
                              {
                                item.isHeader ? item.side :
                                  item.side == RoundResultInSBC.Yes ? 'Yes' : 'No'
                              }
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
                              {
                                item.isHeader ? item.round : `${currentSelectedLevel} / 5`
                              }
                            </Td>
                            <Td
                              ml={'110px'}
                              borderColor='transparent'
                            >
                              {
                                item.isHeader ? item.playersRemaining : item.playersRemaining
                              }
                            </Td>

                            <Td
                              ml={'80px'}
                              borderColor='transparent'
                            >
                              {
                                item.isHeader ? item.playerStatus : roundResultText
                              }
                            </Td>

                            <Td
                              ml={'80px'}
                              borderColor='transparent'
                            >
                              {
                                item.isHeader && (
                                  <Flex
                                    borderRadius='34px'
                                    py='11px'
                                    px='25px'
                                    border={'none'}
                                    justifyContent={'center'}
                                  >
                                    {
                                      (roundProperties as any)[slug]?.accessButtonText
                                    }
                                  </Flex>
                                )
                              }
                              {
                                !item.isHeader && (
                                  <Button
                                    borderRadius='34px'
                                    py='11px'
                                    px='25px'
                                    border={'1px solid #FC541C'}
                                    //@ts-ignore
                                    onClick={() => router.push(`/sbc/${eventID}` + roundProperties[slug].accessButtonUrl)}
                                    cursor='pointer'
                                    color={'white'}
                                    justifyContent={'center'}
                                    background={'unset'}
                                    _hover={{
                                      background: '#FC541C',
                                    }}
                                    isDisabled={roundResultText != "Won" || currentSelectedLevel >= accessLevel}
                                  >
                                    {
                                      (roundProperties as any)[slug]?.accessButtonText
                                    }
                                  </Button>
                                )
                              }
                            </Td>
                          </Tr>
                        ))
                      }
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
            </Flex>
          </>
        )
      }

      { /* buttons(desktop) */}
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
          isDisabled={
            (currentSelectedLevel == 1 ? registerID == 0 : !passedPreviousRound)
            || (currentRoundPlayerResult != RoundResultInSBC.Indeterminate)
            || (startTime.getTime() < new Date().getTime() + secondsInHalfHour * 1000)
          }
        >
          Predict Now
        </Button>
      </Flex>

      {/* buttons(mobile) */}
      <Flex
        ml={'-10px'}
        mt={'20px'}
        mb={'20px'}
        display={['flex', 'flex', 'flex', 'none']}
        direction={['column', 'row']}
        justifyContent={['start', 'center', 'center', 'start']}
        alignItems={['center']}
        gap={'10px'}
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
          mt={['20px', '0']}
          isDisabled={
            (currentSelectedLevel == 1 ? registerID == 0 : !passedPreviousRound)
            || (currentRoundPlayerResult != RoundResultInSBC.Indeterminate)
            || (startTime.getTime() < new Date().getTime() + secondsInHalfHour * 1000)
          }
        >
          Predict Now
        </Button>

        <PredictionsModal
          isOpenSecond={isOpenSecond}
          onCloseSecond={onCloseSecond}
          isOpenThird={isOpenThird}
          onOpenThird={onOpenThird}
          onCloseThird={onCloseThird}
          type={'sbc'}
          roundBetAmount={roundBetAmount} // for sbc
          yesPoolAmount={yesPoolAmount} // for sbc
          noPoolAmount={noPoolAmount} // for sbc
          registerID={registerID} // for sbc
          currentPlayers={currentPlayers} // for sbc
        />
      </Flex>
    </Flex>
  )
}

export default SquidBetsSummary
