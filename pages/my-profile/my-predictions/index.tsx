import { Box, Flex, Grid, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAccount, useContractEvent, useNetwork, } from 'wagmi';
import PredictionsTab from '../../../components/mypredictions/PredictionsTab'
import MyPredictionsStats from '../../../components/mypredictions/MyPredictionsStats'
import Sidebar from '../../../components/Sidebar'
import TokenSelector from '../../../components/predictions/TokenSelector'
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, contractAddressesInDailyBets, delayTimeFromSubgraph, mumbaiChainId, newChainAttrs, polygonChainId, } from '../../../utils/config';
import TimeLine from '../../../components/mypredictions/TimeLine'
import { getDateAndTimeIntervalsAccordingToUserTimeZone } from '../../../utils/interact/utility';
import { MyPredictionsStatsType } from '../../../utils/types';
import { getUserBetDataInPM } from '../../../utils/interact/thegraph/getUserBetDataInPM';
import { nativeTokenDailyBetsAbiInPM, ultibetsTokenDailyBetsAbiInPM } from '../../../utils/assets';
import { ethers } from 'ethers';

const MyPredictions = () => {
  const { address, } = useAccount();
  const [mypredictionsData, setMypredictionsData] = useState<MyPredictionsStatsType[]>([]);
  const { isNativeToken, myPredictionDataSelectedDate, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [contract, setContract] = useState<any>();
  const [width, setWidth] = useState(0);
  const [chainId, setChainId] = useState<number>();
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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
    setContract({
      address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM
    })
  }, [chain, isNativeToken]);

  const fetchDataFromSubgraph2 = (delayTime?: number) => {
    if (chainId == undefined) return;
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const bettorPredictions = await getUserBetDataInPM(
          (address ?? '0x').toLowerCase(),
          isNativeToken,
          chainId,
        );
        if (bettorPredictions?.isSuccess) {
          const t = myPredictionDataSelectedDate;
          const dayTimestamps = getDateAndTimeIntervalsAccordingToUserTimeZone(t);
          let predictions = bettorPredictions.returnedData?.
            filter((item: any) => (item.betTime >= dayTimestamps.startTimestamp) && (item.betTime < dayTimestamps.endTimeStamp));

          console.log("user bet history: ", predictions);
          setMypredictionsData(predictions);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    console.log("user bet history: ", "before");
    fetchDataFromSubgraph2(200);
  }, [
    isNativeToken,
    chainId,
    address,
    myPredictionDataSelectedDate,
  ])

  useEffect(() => {
    console.log("user bet history: ", "before");
    fetchDataFromSubgraph2();
  }, [shouldRender])

  useContractEvent({
    ...contract,
    eventName: 'PlacePrediction',
    listener(bettor: any, eventID: any, decision: any, amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract,
    eventName: 'CancelEvent',
    listener(eventID: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract,
    eventName: 'ReportResult',
    listener(eventID: any, result: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract,
    eventName: 'ClaimPrize',
    listener(bettor: any, eventID: any, result: any, amount: any) {
      if (bettor?.toLowerCase() == address?.toLowerCase()) {
        setShouldRender(!shouldRender);
      }
    },
  });

  useContractEvent({
    ...contract,
    eventName: 'ClaimCancelBet',
    listener(bettor: any, eventID: any, predict: any) {
      if ((bettor as string)?.toLowerCase() == address?.toLowerCase()) {
        setShouldRender(!shouldRender);
      }
    },
  });

  return (
    <Flex
      className='mypredictions-page-wrapper'
      width={'100%'}
    >

      <Flex
        width='90px'
        justifyContent='center'
      >
        <Sidebar />
      </Flex>

      <Box
        my='30px'
        px='20px'
        width={['calc(100% - 90px)', 'calc(100% - 90px)', 'calc(100% - 90px)', 'calc(100% - 90px)', '1200px']}
        className='my-predictions-wrapper'
        zIndex={0}
      >
        <PredictionsTab />
        <Box
          mt={['10px', '20px', '40px', '30px']}
        >
          <TimeLine
          />
        </Box>
        <Flex
          className='token-selector-component-wrapper-in-mypredictions-page'
          my='46px'
        >
          <TokenSelector />
        </Flex>

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
          !isLoading && (
            <Grid
              // 2 columns and 2 rows  template
              templateColumns={[
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                'repeat(1, 1fr)',
                width <= 1300 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
              ]}
              gap={['20px', '20px', '10px', '41px']}
              mt={['10px', '20px', '30px', '35px']}
            >
              {
                mypredictionsData?.map((item, index) => {
                  const sidePools = item.event.sidePools;
                  let volumes = sidePools?.map(item => item.amount);
                  const totalVolume = volumes.reduce((sum, item1) => sum + parseFloat(ethers.utils.formatEther(item1)), 0);
                  const sidePoolVolume = (sidePools?.filter((item1) => item1.sideValue == item.prediction))[0];
                  const odds = Math.round(parseFloat(ethers.utils.formatEther(sidePoolVolume.amount)) / totalVolume * 1000);
                  console.log("odds: ", odds);

                  const percentOfSidePool = Math.round(parseFloat(ethers.utils.formatEther(item?.amount)) / parseFloat(ethers.utils.formatEther(sidePoolVolume.amount)) * 1000);

                  return (
                    <Flex
                      key={index}
                      justifyContent={[
                        'unset',
                        'center',
                        'center',
                        width <= 1300 ? 'center' : 'unset'
                      ]}
                    >
                      <MyPredictionsStats
                        eventID={Number(item?.event?.eventID)}
                        description={item?.event?.description}
                        betType={item?.event?.betType}
                        betTime={Number(item.betTime)}
                        betAmount={parseFloat(ethers.utils.formatEther(item.amount))}
                        paidAmount={parseFloat(ethers.utils.formatEther(item.paidAmount))}
                        odds={odds / 10} // returns 0 - 1000 from sc
                        percentOfSidePool={percentOfSidePool / 10} // returns 0 - 1000 from sc
                        status={item?.event?.status}
                        prediction={item.prediction}
                        result={item?.event?.result}
                        currentToken={currentToken}
                      />
                    </Flex>
                  )
                })
              }
            </Grid>
          )
        }
      </Box>
    </Flex >

  )
}

export default MyPredictions
