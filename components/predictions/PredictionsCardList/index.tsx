import { Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useContractEvent, useNetwork } from 'wagmi';
import { ethers, } from 'ethers';
import PredictionCard from './PredictionsCard';
import { useChainContext } from '../../../utils/Context';
import {
  chainAttrs,
  contractAddressesInDailyBets,
  delayTimeFromSubgraph,
  EventResultInPM,
  EventStatusInPM,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  secondsInHalfHour,
  sidebarItems,
  subCategoriesInPredictionMarkets,
} from '../../../utils/config';
import { getDailyEventData } from '../../../utils/interact/thegraph/getDailyEventData';
import { getDateAndTimeIntervalsAccordingToUserTimeZone } from '../../../utils/interact/utility';
import { nativeTokenDailyBetsAbiInPM, ultibetsTokenDailyBetsAbiInPM } from '../../../utils/assets';

type PredictionsCardListProps = {
  sortByIndex: number,
}

const PredictionsCardList = ({
  sortByIndex,
}: PredictionsCardListProps) => {
  const { chain, } = useNetwork();
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [eventList, setEventList] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const {
    isNativeToken,
    predictionMarketSelectedDate,
    categoryInPM,
    subCategoryInPM,
  } = useChainContext();
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<any>();
  const [chainId, setChainId] = useState<number>();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index)
    setCurrentToken(isNativeToken ? currentChainAttrsItem[0].nativeToken : "UTBETS")
    setChainId(chainId);

    setContract({
      address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM
    })
  }, [chain, isNativeToken]);

  const fetchDataFromSubgraph = (delayTime?: number) => {
    if (chainId == undefined) return;
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const t = predictionMarketSelectedDate
        const dayTimestamps = getDateAndTimeIntervalsAccordingToUserTimeZone(t);
        console.log("timestamp: predictionMarketFilteredData", eventList);
        console.log("timestamp: predictionMarketFilteredData", dayTimestamps);

        const dailyEvents = await getDailyEventData(
          isNativeToken,
          categoryInPM,
          dayTimestamps.startTimestamp,
          dayTimestamps.endTimeStamp,
          EventStatusInPM.Open,
          chainId,
        );
        console.log("daily events: ", dailyEvents);
        if (dailyEvents?.isSuccess) {
          setEventList(dailyEvents?.returnedData);
          handleDataForPredictionMarkets(dailyEvents?.returnedData);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    console.log("daily events: ", "before");
    fetchDataFromSubgraph(100);
  }, [
    isNativeToken,
    categoryInPM,
    chainId,
    predictionMarketSelectedDate,
  ])

  useEffect(() => {
    console.log("daily events: ", "before");
    fetchDataFromSubgraph(3000);
  }, [shouldRender])

  useContractEvent({
    ...contract,
    eventName: 'NewEvent',
    listener(eventID: any) {
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
    eventName: 'PlacePrediction',
    listener(bettor: any, eventID: any, decision: any, amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useEffect(() => {
    handleDataForPredictionMarkets(eventList);
  }, [
    chain?.id,
    // categoryInPM, // when this is changed, should fetch data from subgraph again
    subCategoryInPM,
    sortByIndex,
  ])

  const handleDataForPredictionMarkets = (eventList: any) => {
    let predictionMarketFilteredData = eventList;

    if (categoryInPM > 0) {
      // already was using currently
      predictionMarketFilteredData = predictionMarketFilteredData
        .filter((item: any) => item.subcategory == subCategoryInPM);
    }


    let sortedData = [];

    if (predictionMarketFilteredData?.length > 0) {
      switch (sortByIndex) {
        case 0:
          sortedData = [...predictionMarketFilteredData].sort((a: any, b: any) => parseFloat(ethers.utils.formatEther(b.bettingVolume))
            - parseFloat(ethers.utils.formatEther(a.bettingVolume)))
          break;

        case 1:
          sortedData = [...predictionMarketFilteredData].sort((a: any, b: any) => parseFloat(ethers.utils.formatEther(a.bettingVolume))
            - parseFloat(ethers.utils.formatEther(b.bettingVolume)))
          break;

        case 2:
          sortedData = [...predictionMarketFilteredData].sort((a, b) => Number(a.startTime) - Number(b.startTime))
          break;

        case 3:
          sortedData = [...predictionMarketFilteredData].sort((a, b) => Number(b.startTime) - Number(a.startTime))
          break;

        case 4:
          // betting finishes 30 mins before starting time
          sortedData = predictionMarketFilteredData.filter((item: any) => Number(item.startTime) > new Date().getTime() / 1000 + secondsInHalfHour)
          break;
      }
    }

    setSortedData(sortedData);
  }

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
          <Grid
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
              sortedData.map((item, index) => (
                <Flex
                  key={index}
                  justifyContent={'center'}
                >
                  <PredictionCard
                    eventID={item.eventID}
                    description={item.description}
                    bettingLogo={
                      (sidebarItems as any)[item.category].isSubCategoryExist ?
                        (subCategoriesInPredictionMarkets as any)[item.category][item.subcategory].logo :
                        (sidebarItems as any)[item.category].icon
                    }
                    category={item.category}
                    subcategory={item.subcategory}
                    startTime={Number(item.startTime)}
                    bettingDeadline={Number(item.startTime)}
                    bettingVolume={parseFloat(ethers.utils.formatEther(item.bettingVolume))}
                    currentToken={currentToken}
                  />
                </Flex>
              ))
            }
          </Grid>
        )
      }
    </>

  )
}

export default PredictionsCardList
