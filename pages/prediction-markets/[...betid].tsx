import {
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '@fontsource/nunito'
import '@fontsource/inter'
import { useNetwork, useAccount, useContractEvent, } from 'wagmi';
import { ethers, } from 'ethers';
import PredictionsTab from '../../components/mypredictions/PredictionsTab'
import PredictionsInfo from '../../components/predictions/PredictionsInfo'
import Sidebar from '../../components/Sidebar'
import { useChainContext } from '../../utils/Context';
import {
  categoryToNumber,
  chainAttrs,
  contractAddressesInDailyBets,
  delayTimeFromSubgraph,
  EventType,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  sidebarItems,
  subCategoriesInPredictionMarkets,
} from '../../utils/config';
import TokenSelector from '../../components/predictions/TokenSelector'
import PredictionsSummary3 from '../../components/predictions/PredictionsDetailPageComponent/PredictionsSummary3'
import PredictionsSummary2 from '../../components/predictions/PredictionsDetailPageComponent/PredictionsSummary2'
import SquidRoundInfo from '../../components/squid/detail-pages/SquidRoundInfo'
import {
  nativeTokenDailyBetsAbiInPM,
  ultibetsTokenDailyBetsAbiInPM,
} from '../../utils/assets'
import { getDailyEventDetailData } from '../../utils/interact/thegraph/getDailyEventDetailData'
import { EventDetailDataType } from '../../utils/types'
import { getUserBetDataInPM } from '../../utils/interact/thegraph/getUserBetDataInPM'
import { getUserInviteStatus } from '../../utils/interact/thegraph/getUserInviteStatus'

type PredictionPageProps = {
}

const PredictionPage = ({
}: PredictionPageProps) => {
  const router = useRouter();
  const [image, setImage] = useState('');
  const {
    isNativeToken,
    categoryInPM,
    subCategoryInPM,
    currentPMEventID,
  } = useChainContext();
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [alternativeEventID, setAlternativeEventID] = useState(0);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<any>();
  const [eventDetailData, setEventDetailData] = useState<EventDetailDataType>();
  const [sideBetAmounts, setSideBetAmounts] = useState<string[]>(["0", "0", "0"]);
  const [sidePoolVolumes, setSidePoolVolumes] = useState<string[]>(["0", "0", "0"]);
  const [chainId, setChainId] = useState<number>();
  const [canBeInvited, setCanBeInvited] = useState(false);

  const checkPath = () => {
    const path = router.asPath;
    const slug = path.split('/');
    if (slug.length >= 4 && categoryInPM == 0 || categoryInPM == undefined) {
      router.push(`/${slug[1]}`)
      return false;
    }
    return slug;
  }

  useEffect(() => {
    const slug = checkPath();
    if (slug && slug.length >= 4) {
      //@ts-ignore
      if (slug[2] == sidebarItems[categoryInPM].keyword && parseInt(slug[3]) >= 1) {
        console.log(" alternative event id: ", parseInt(slug[3]))
        setAlternativeEventID(parseInt(slug[3]));
      }
    }
  }, [router]);

  useEffect(() => {
    const slug = checkPath();
    if (slug && slug.length >= 4) {
      let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
      if (currentChainAttrsItem.length == 0) {
        const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
        currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
      }
      setChainId(chainId);
      setContract({
        address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
        abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM
      })
    }
  }, [chain, isNativeToken]);

  const fetchDataFromSubgraph1 = (delayTime?: number) => {
    if (chainId == undefined) return;
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const dailyEvent = await getDailyEventDetailData(
          (currentPMEventID != 0 ? currentPMEventID : alternativeEventID).toString(),
          isNativeToken,
          chainId,
        );
        console.log("daily event detail: ", dailyEvent);
        if (dailyEvent?.isSuccess) {
          setEventDetailData((dailyEvent?.returnedData)[0]);
          console.log("===========:  ", (dailyEvent?.returnedData)[0])

          let sidePoolVolumes = ["0", "0", "0"];
          let sidePools = (dailyEvent?.returnedData)[0]?.sidePools;
          console.log("daily event detail: ", sidePools);

          for (let i = 0; i < sidePools?.length; i++) {
            let sideValue = sidePools[i].sideValue;
            sidePoolVolumes[sideValue] = sidePools[i].amount;
          }
          console.log("daily event detail: ", sidePoolVolumes);

          setSidePoolVolumes(sidePoolVolumes);

          if ((sidebarItems as any)[categoryInPM].isSubCategoryExist) {
            setImage((subCategoriesInPredictionMarkets as any)[categoryInPM][subCategoryInPM].logo);
          } else {
            setImage((sidebarItems as any)[categoryInPM].icon)
          }
        }
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  const fetchDataFromSubgraph2 = (delayTime?: number) => {
    if (chainId == undefined) return;
    setTimeout(() => {
      (async () => {
        const bettorPredictions = await getUserBetDataInPM(
          (address ?? '0x').toLowerCase(),
          isNativeToken,
          chainId,
        );

        if (bettorPredictions?.isSuccess) {
          let sideBetAmounts = ["0", "0", "0"];
          let predictions = bettorPredictions.returnedData.filter(
            (item: any) => item?.event?.eventID == (currentPMEventID != 0 ? currentPMEventID : alternativeEventID).toString());

          for (let i = 0; i < predictions.length; i++) {
            let prediction = predictions[i].prediction;
            sideBetAmounts[prediction] = predictions[i].amount;
          }
          setSideBetAmounts(sideBetAmounts);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  const fetchDataFromSubgraph3 = (delayTime?: number) => {
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const canBeInvited = await getUserInviteStatus(
          (address ?? '0x').toLowerCase(),
        );
        console.log("result ***************:   :  ", canBeInvited);
        setCanBeInvited(canBeInvited.returnedData);
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    const slug = checkPath();
    if (slug && slug.length >= 4) {
      console.log("daily event detail: ", "before");
      fetchDataFromSubgraph3(200);
    }
  }, [
    isNativeToken,
    address,
  ])

  useEffect(() => {
    const slug = checkPath();
    if (slug && slug.length >= 4) {
      console.log("daily event detail: ", "before");
      fetchDataFromSubgraph1(200);
      fetchDataFromSubgraph2(200);
    }
  }, [
    isNativeToken,
    categoryInPM,
    chainId,
    alternativeEventID,
    address,
  ])

  useEffect(() => {
    const slug = checkPath();
    if (slug && slug.length >= 4) {
      fetchDataFromSubgraph1();
      fetchDataFromSubgraph2();
    }
  }, [shouldRender])

  useContractEvent({
    ...contract,
    eventName: 'PlacePrediction',
    listener(bettor: any, eventID: any, decision: any, amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  return (
    <Flex
      width='100%'
      mt='20px'
    >
      <Flex
        width='90px'
        justifyContent='center'
      >
        <Sidebar />
      </Flex>

      <Flex
        width='calc(100% - 90px)'
        justifyContent='start'
        direction='column'
        mt='30px'
        px='20px'
        zIndex={0}
      >
        <Flex
          direction='column'
          justifyContent='center'
        >
          <PredictionsTab />
          <Flex
            className='token-selector-component-wrapper-in-prediction-markets'
            mt='39px'
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
              eventDetailData ? (
                <>
                  <Flex
                    mt='42px'
                  >
                    <SquidRoundInfo
                      volume={Number(ethers.utils.formatEther(eventDetailData.bettingVolume))}
                      startTime={new Date(Number(eventDetailData.startTime) * 1000)}
                    />
                  </Flex>

                  <PredictionsInfo
                    description={eventDetailData.description}
                    logo={image}
                    series={(subCategoriesInPredictionMarkets as any)[eventDetailData?.category?.toString()][eventDetailData?.subcategory?.toString()].name}
                    betType={eventDetailData.betType}
                    sidePoolVolumes={[sidePoolVolumes[0], sidePoolVolumes[1], sidePoolVolumes[2]]}
                  />

                  {
                    <>
                      {
                        eventDetailData.betType == EventType.Triple ? (
                          <PredictionsSummary3
                            sidePoolVolumes={[sidePoolVolumes[0], sidePoolVolumes[1], sidePoolVolumes[2]]}
                            sideBetAmounts={[sideBetAmounts[0], sideBetAmounts[1], sideBetAmounts[2]]}
                            eventID={currentPMEventID}
                            eventStartTime={Number(eventDetailData.startTime)}
                            canBeInvited={canBeInvited}
                          />
                        ) : (
                          <PredictionsSummary2
                            sidePoolVolumes={[sidePoolVolumes[0], sidePoolVolumes[1]]}
                            sideBetAmounts={[sideBetAmounts[0], sideBetAmounts[1]]}
                            eventID={currentPMEventID}
                            eventStartTime={Number(eventDetailData.startTime)}
                          />
                        )
                      }
                    </>
                  }
                </>
              ) : (
                <Flex
                  height={'calc(100vh - 350px)'}
                  alignItems={'center'}
                  fontSize={'80px'}
                  color={'red'}
                  px={'20px'}
                  justifyContent={'center'}
                  textAlign={'center'}
                >
                  {/* This event does not exist */}
                </Flex>)
            )
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PredictionPage
