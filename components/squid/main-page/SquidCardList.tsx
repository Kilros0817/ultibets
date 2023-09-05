import { Flex, Grid } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useContractEvent, useNetwork, } from 'wagmi';
import SquidCard from './SquidCard'
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, contractAddressesInSBC, delayTimeFromSubgraph, EventStateInSBC, mumbaiChainId, newChainAttrs, polygonChainId } from '../../../utils/config';
import { getSBCEvents } from '../../../utils/interact/thegraph/getSBCEventData';
import { nativeTokenBetsAbiInSBC, ultibetsTokenBetsAbiInSBC } from '../../../utils/assets';
import { formatEther } from 'viem';

const SquidCardList = () => {
  const { isNativeToken } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [eventList, setEventList] = useState<any[]>([]);
  const [sbcContract, setSbcContract] = useState<any>();
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [width, setWidth] = useState(0);
  const [chainId, setChainId] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainId(chainId);
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setSbcContract({
      address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC
    })
  }, [chain, isNativeToken]);

  const fetchDataFromSubgraph5 = (delayTime?: number) => {
    if (chainId == undefined) return;
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const sbeEvents = await getSBCEvents(isNativeToken, chainId);
        if (sbeEvents?.isSuccess) {
          setEventList(sbeEvents?.eventData);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    fetchDataFromSubgraph5(100);
  }, [
    isNativeToken,
    chainId,
  ])

  useEffect(() => {
    fetchDataFromSubgraph5(6000);
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
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RefundCanceledRound',
    listener() {
      setShouldRender(!shouldRender);
    },
  });

  return (
    <>
      {
        isLoading && (
          <Flex
            className="loading-container"
            justifyContent={'center'}
            mt={'100px'}
            alignItems={'center'}

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
        !isLoading && (
          < Grid
            gridTemplateColumns={[
              'repeat(1, 1fr)', //~ 480px
              'repeat(1, 1fr)', // ~ 768px
              width < 900 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', // ~ 992px
              'repeat(2, 1fr)', // ~ 1280px
              width < 1860 ? 'repeat(3, 1fr)'
                : 'repeat(4, 1fr)',
            ]}
            gap={['30px', '30px', '40px', '40px', width < 1860 ? '40px' : '75px']}
            p={['15px', '20px', '20px']}
          >
            {
              eventList?.map((item, index) => (
                <SquidCard
                  key={index}
                  eventID={Number(item.eventID)}
                  description={item.description}
                  registerDeadline={Number(item.registerDeadline)}
                  currentLevel={Number(item.currentLevel)}
                  totalAmount={parseFloat(formatEther(item.totalAmount))}
                  state={Number(item.state)}
                  currentToken={isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS"}
                  rounds={item.rounds}
                  voteStartTime={Number(item.voteStartTime)}
                  votingResult={Number(item.votingResult)}
                  shouldRender={shouldRender}
                />
              ))
            }
          </Grid>
        )
      }
    </>
  )
}

export default SquidCardList
