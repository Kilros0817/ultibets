import {
  Flex,
  Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '@fontsource/nunito'
import '@fontsource/inter'
import { useAccount, useContractEvent, useNetwork, } from 'wagmi';
import RegisterComponent from "../../components/squid/detail-pages/register";
import RoundOne2Fivecomponent from '../../components/squid/detail-pages/round-one2five'
import FinalVoteComponent from '../../components/squid/detail-pages/final-vote'
import WinnerComponent from "../../components/squid/detail-pages/winner-page"
import Sidebar from '../../components/Sidebar'
import MyPredictionsComponent from '../../components/mypredictions/MyPredictionsComponent'
import TokenSelector from '../../components/predictions/TokenSelector'
import RoundLine from '../../components/squid/detail-pages/RoundLine'
import { useChainContext } from '../../utils/Context'
import { chainAttrs, contractAddressesInSBC, delayTimeFromSubgraph, EventStateInSBC, mumbaiChainId, newChainAttrs, polygonChainId, roundProperties } from '../../utils/config'
import { getRegisterIDOfBettor } from '../../utils/interact/sc/squid-competition'
import { getSBCEvents } from '../../utils/interact/thegraph/getSBCEventData'
import { nativeTokenBetsAbiInSBC, ultibetsTokenBetsAbiInSBC } from '../../utils/assets'
import { formatEther } from 'viem'

const SquidBetPage = () => {
  const router = useRouter();
  const [eventID, setEventID] = useState<number>(1);
  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(0);
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const { address } = useAccount();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
  const [currentEvent, setCurrentEvent] = useState<any>();
  const [sbcContract, setSbcContract] = useState<Object>();
  const [registerID, setRegisterID] = useState(0);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [chainId, setChainId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
    setChainId(chainId);
    setSbcContract({
      address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC
    })
  }, [chain, isNativeToken]);

  useEffect(() => {
    const pathName = router.asPath;
    const slug = pathName.split('/');
    if (slug && slug.length == 4) {
      const path = slug[3];
      //@ts-ignore
      setCurrentSelectedLevel(roundProperties[path].id)

      let cardId = slug[2];
      if (isNaN(parseInt(cardId))) {
        cardId = '1';
      }
      setEventID(parseInt(cardId));
    }
  }, [router])

  const fetchDataFromSubgraph4 = (delayTime?: number) => {
    if (chainId == undefined) return;
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        console.log("isNative: ", isNativeToken);

        const sbcEvents = await getSBCEvents(isNativeToken, chainId);
        if (sbcEvents?.isSuccess) {
          setCurrentEvent(sbcEvents?.eventData[0]);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    fetchDataFromSubgraph4(200);
  }, [
    isNativeToken,
    chainId,
    currentSelectedLevel,
    router,
  ])

  useEffect(() => {
    fetchDataFromSubgraph4(6000);
  }, [
    shouldRender,
  ])

  useContractEvent({
    ...sbcContract,
    eventName: 'EventCreated',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'Register',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RoundAdded',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RoundFinished',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'PredictionPlaced',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'VoteEvent',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'ReportVoteResult',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'PickEventWinner',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'WinnerClaimedPrize',
    listener() {
      setShouldRender(!shouldRender);
      router.push('/sbc');
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RoundUpdated',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RoundCanceled',
    listener() {
      setShouldRender(!shouldRender);
      router.push('/sbc');
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RefundCanceledRound',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  useEffect(() => {
      const getRegisterID = async () => {
        const id = await getRegisterIDOfBettor(eventID, chain?.id ?? 80001, isNativeToken, address ?? "" )
        setRegisterID(id as number);
      }
      if (eventID > 0 && chain?.id && address) {
        getRegisterID();
      }
  }, [
    chain?.id,
    isNativeToken,
    address,
    eventID,
    shouldRender
  ])

  return (
    <Flex
      width='100%'
    >
      <Flex
        width='90px'
        justifyContent='center'
      >
        <Sidebar />
      </Flex>
      <Flex
        direction='column'
        width='calc(100% - 90px)'
        justifyContent='start'
        px={['0', '20px']}
        mt={'30px'}
        zIndex={0}
      >
        <Flex
          direction={'column'}
          justifyContent='center'
        >

          <Flex>
            <MyPredictionsComponent />
          </Flex>

          <Flex
            className='token-selector-component-wrapper-in-prediction-markets'
            mt='39px'
          >
            <TokenSelector />
          </Flex>

          <Box
            width={'calc(100vw - 130px)'}
            className={'round-line-wrapper'}
          >
            <RoundLine
              eventID={eventID}
              currentSelectedLevel={currentSelectedLevel}
              accessLevel={
                currentEvent?.state == EventStateInSBC.ClaimPrize ? 7 :
                  (((currentEvent?.state == EventStateInSBC.PickWinner) || (currentEvent?.state == EventStateInSBC.Vote)) ? 6 :
                    currentEvent?.currentLevel)
              }
              category={currentEvent?.category}
              totalRound={currentEvent?.totalRound}
              winnersNumber={currentEvent?.winnersNumber}
              votingResult={currentEvent?.votingResult}
            />
          </Box>

          {
            isLoading && (
              <Flex
                className="loading-container"
                justifyContent={'center'}
                textAlign={'center'}
                mt={'100px'}
                alignItems={'center'}
                px={'20px'}
              >
                <section>
                  <Flex className="loader loader-1">
                    <Flex className="loader-outter" />
                    <Flex className="loader-inner" />
                  </Flex>
                </section>
              </Flex>
            )
          }

          {
            !isLoading && currentSelectedLevel == 0 &&
            <RegisterComponent
              eventID={eventID}
              totalAmount={parseFloat(formatEther(currentEvent?.totalAmount ?? 0))}
              maxPlayers={Number(currentEvent?.maxPlayers)}
              totalPlayers={Number(currentEvent?.totalPlayers)}
              registerAmount={parseFloat(formatEther(currentEvent?.registerAmount ?? 0))}
              roundBetAmount={parseFloat(formatEther(currentEvent?.roundBetAmount ?? 0))}
              orgFeePercent={currentEvent?.orgFeePercent}
              registerID={Number(registerID ?? 0)}
              currentToken={currentToken}
              currentLevel={Number(currentEvent?.currentLevel)}
              registerDeadline={currentEvent?.registerDeadline}
              shouldRender={shouldRender}
              category={currentEvent?.category}
            />
          }

          {
            !isLoading && (currentSelectedLevel >= 1 && currentSelectedLevel <= 5) &&
            <RoundOne2Fivecomponent
              eventID={eventID}
              currentSelectedLevel={currentSelectedLevel}
              description={currentEvent?.rounds[currentSelectedLevel - 1]?.description}
              currentLevel={currentEvent?.currentLevel}
              currentPlayers={currentEvent?.rounds[currentSelectedLevel - 1]?.playersOnRound}
              totalPlayers={currentEvent?.totalPlayers}
              roundBetAmount={parseFloat(formatEther(currentEvent?.roundBetAmount ?? 0))}
              registerID={Number(registerID ?? 0)}
              yesPoolAmount={parseFloat(formatEther(currentEvent?.rounds[currentSelectedLevel - 1]?.yesPoolAmount ?? 0))}
              noPoolAmount={parseFloat(formatEther(currentEvent?.rounds[currentSelectedLevel - 1]?.noPoolAmount ?? 0))}
              state={currentEvent?.rounds[currentSelectedLevel - 1]?.state}
              startTime={Number(currentEvent?.rounds[currentSelectedLevel - 1]?.startTime)}
              roundResult={currentEvent?.rounds[currentSelectedLevel - 1]?.result}
              totalAmount={parseFloat(formatEther(currentEvent?.rounds[currentSelectedLevel - 1]?.currentTotalPoolAmount ?? 0))}
              accessLevel={
                currentEvent?.state == EventStateInSBC.ClaimPrize ? 7 :
                  (((currentEvent?.state == EventStateInSBC.PickWinner) || (currentEvent?.state == EventStateInSBC.Vote)) ? 6 :
                    currentEvent?.currentLevel)
              } />
          }

          {
            !isLoading && currentSelectedLevel == 6 &&
            <FinalVoteComponent
              eventID={eventID}
              totalAmount={parseFloat(formatEther(currentEvent?.totalAmount ?? 0))}
              currentToken={currentToken}
              voteResult={currentEvent?.votingResult ?? 0}
              winnersNumber={currentEvent?.winnersNumber}
              registerID={registerID ?? 0}
            />
          }

          {
            !isLoading && currentSelectedLevel == 7 &&
            <WinnerComponent
              eventID={eventID}
              totalAmount={parseFloat(formatEther(currentEvent?.totalAmount ?? 0))}
              currentToken={currentToken}
              voteResult={currentEvent?.votingResult}
              registerID={registerID ?? 0}
              winnersNumber={currentEvent?.winnersNumber}
            />
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SquidBetPage