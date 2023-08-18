import { Flex, Grid, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useContractEvent, useNetwork, useSigner } from 'wagmi';
import { useChainContext } from '../../../utils/Context';
import {
  bscChainId,
  bscTestnetChainId,
  contractAddressesInDailyBets,
  delayTimeFromSubgraph,
  EventStatusInPM,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  sidebarItems,
  subCategoriesInPredictionMarkets,
} from '../../../utils/config';
import AdminEventCard from './AdminEventCard';
import { getDateAndTimeIntervalsAccordingToUserTimeZone } from '../../../utils/interact/utility';
import { nativeTokenDailyBetsAbiInPM, ultibetsTokenDailyBetsAbiInPM } from '../../../utils/assets';
import { getDailyEventData } from '../../../utils/interact/thegraph/getDailyEventData';
import AllChainTxAnnounceModal from '../../modal/AllChainTxAnnounceModal';
import AnnounceModal from '../../modal/AnnounceModal';

type AdminEventCardListProps = {
}

const AdminEventCardList = ({
}: AdminEventCardListProps) => {
  const { chain, } = useNetwork();
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<any>();
  const [eventList, setEventList] = useState<any[]>([]);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [chainId, setChainId] = useState<number>(chain?.id != undefined ? chain.id :
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? bscChainId : bscTestnetChainId);
  const {
    isNativeToken,
    adminSelectedDate,
    categoryInPM,
    subCategoryInPM,
  } = useChainContext();
  const {
    isOpen: isOpenAllChainTxAnnounceModal,
    onOpen: onOpenAllChainTxAnnounceModal,
    onClose: onCloseAllChainTxAnnounceModal,
  } = useDisclosure();
  const [repeatLevel, setRepeatLevel] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [allChainTxAnnounceResult, setAllChainTxAnnounceResult] = useState<any>([]);

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
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
        const t = adminSelectedDate
        const dayTimestamps = getDateAndTimeIntervalsAccordingToUserTimeZone(t);

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
          handleDataForPredictionMarketsForAdminPage(dailyEvents?.returnedData);
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
  ])

  useEffect(() => {
    console.log("daily events: ", "before");
    fetchDataFromSubgraph();
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

  useEffect(() => {
    handleDataForPredictionMarketsForAdminPage(eventList);
  }, [
    chain?.id,
    // categoryInPM, // when this is changed, should fetch data from subgraph again
    subCategoryInPM,
    adminSelectedDate,
  ])

  const handleDataForPredictionMarketsForAdminPage = (eventList: any) => {
    let predictionMarketFilteredData = eventList;

    if (categoryInPM > 0) {
      // already was using currently
      predictionMarketFilteredData = predictionMarketFilteredData
        .filter((item: any) => item.subcategory == subCategoryInPM);
    }

    let sortedData = [...predictionMarketFilteredData].sort((a, b) => a.startTime - b.startTime)

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
              'repeat(1, 1fr)',
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
            gap={['30px', '30px', '40px']}
            p={['15px', '20px', '20px']}
          >
            {
              sortedData.map((item, index) => (
                <Flex
                  key={index}
                  justifyContent={'center'}
                >
                  <AdminEventCard
                    eventID={item.eventID}
                    description={item.description}
                    bettingLogo={
                      (sidebarItems as any)[item.category].isSubCategoryExist ?
                        (subCategoriesInPredictionMarkets as any)[item.category][item.subcategory].logo :
                        (sidebarItems as any)[item.category].icon
                    }
                    category={item.category}
                    subcategory={item.subcategory}
                    startTime={item.startTime}
                    bettingDeadline={item.startTime}
                    repeatLevel={repeatLevel}
                    setRepeatLevel={setRepeatLevel}
                    setIsProcessing={setIsProcessing}
                    setAllChainTxAnnounceResult={setAllChainTxAnnounceResult}
                    onOpenAllChainTxAnnounceModal={onOpenAllChainTxAnnounceModal}
                  />
                </Flex>
              ))
            }
          </Grid>
        )
      }
      <AllChainTxAnnounceModal
        isOpenAllChainTxAnnounceModal={isOpenAllChainTxAnnounceModal}
        onCloseAllChainTxAnnounceModal={onCloseAllChainTxAnnounceModal}
        allChainTxAnnounceResult={allChainTxAnnounceResult}
      />
      <AnnounceModal
        isOpenAnnounceModal={isProcessing}
        onCloseAnnounceModal={() => { }}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </>

  )
}

export default AdminEventCardList
