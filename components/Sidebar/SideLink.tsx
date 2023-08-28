import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContractEvent, useNetwork } from 'wagmi';
import {
  nativeTokenBetsAbiInSBC,
  nativeTokenDailyBetsAbiInPM,
  ultibetsTokenBetsAbiInSBC,
  ultibetsTokenDailyBetsAbiInPM,
} from '../../utils/assets';
import {
  contractAddressesInDailyBets,
  contractAddressesInSBC,
  delayTimeFromSubgraph,
  EventStatusInPM,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  secondsInHalfHour,
  sidebarItems,
  subCategoriesInPredictionMarkets
} from '../../utils/config'
import { useChainContext } from '../../utils/Context';
import { getDailyEventData } from '../../utils/interact/thegraph/getDailyEventData';
import { getSBCEvents } from '../../utils/interact/thegraph/getSBCEventData';
import { getDateAndTimeIntervalsAccordingToUserTimeZone } from '../../utils/interact/utility';
type SideLinkProps = {
  categoryOfThisItem: number
  name: string
  icon: string
  isSubCategoryExist: boolean
}

const SideLink = ({ categoryOfThisItem, name, icon, isSubCategoryExist, }: SideLinkProps) => {
  const router = useRouter()
  const { chain, } = useNetwork();
  const [isHoverSubMenuIndex1, setIsHoverSubMenuIndex1] = useState(true);
  const {
    categoryInPM,
    setCategoryInPM,
    setSubCategoryInPM,
    isNativeToken,
  } = useChainContext();
  const [liveBettings, setLiveBettings] = useState([]);
  const [currentHoveringSubMenuIndex, setCurrentHoveringSubMenuIndex] = useState(0);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [contract, setContract] = useState<any>();
  const [sbcContract, setSbcContract] = useState<any>();
  const [chainId, setChainId] = useState<number>();
  const [sbcLiveEventCount, setSBCLiveEventCount] = useState<number>(0);

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    setChainId(chainId);
    setContract({
      address: (contractAddressesInDailyBets as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenDailyBetsAbiInPM : ultibetsTokenDailyBetsAbiInPM
    })
    setSbcContract({
      address: (contractAddressesInSBC as any)[chainId][isNativeToken ? 0 : 1],
      abi: isNativeToken ? nativeTokenBetsAbiInSBC : ultibetsTokenBetsAbiInSBC
    })
  }, [chain, isNativeToken]);

  const handleMouseEnter = (subMenuIndex: number) => {
    setCurrentHoveringSubMenuIndex(subMenuIndex);
    if (subMenuIndex == 1) {
      setIsHoverSubMenuIndex1(true);
    }
  }

  const handleMouseLeave = (subMenuIndex: number) => {
    setCurrentHoveringSubMenuIndex(0);
    if (subMenuIndex == 1) {
      setIsHoverSubMenuIndex1(false);
    }
  }

  useEffect(() => {
    if (router.asPath == '/admin') {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }, [router])

  const fetchDataFromSubgraph = (delayTime?: number) => {
    if (chainId == undefined) return;

    setTimeout(() => {
      (async () => {
        const t = new Date();
        const dayTimestamps = getDateAndTimeIntervalsAccordingToUserTimeZone(t);

        const dailyEvents = await getDailyEventData(
          isNativeToken,
          categoryOfThisItem,
          dayTimestamps.startTimestamp,
          dayTimestamps.endTimeStamp,
          EventStatusInPM.Open,
          chainId,
        );

        if (dailyEvents?.isSuccess) {
          let returnedData = dailyEvents?.returnedData ?? [];
          let liveBettings = returnedData.filter((item: any) =>
            (item.startTime >= Date.now() / 1000 + secondsInHalfHour)
          );

          setLiveBettings(liveBettings);
        }
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }


  const fetchDataFromSubgraph5 = (delayTime?: number) => {
    if (chainId == undefined) return;

    setTimeout(() => {
      (async () => {
        const sbeEvents = await getSBCEvents(isNativeToken, chainId);
        if (sbeEvents?.isSuccess) {
          const sbcLiveEventCount = sbeEvents?.eventData.length;

          setSBCLiveEventCount(sbcLiveEventCount);
        }
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    if (categoryOfThisItem == Object.keys(sidebarItems).length) {
      fetchDataFromSubgraph5(100);
    } else {
      fetchDataFromSubgraph(100);
    }
  }, [
    isNativeToken,
    categoryOfThisItem,
    chainId,
  ])

  useEffect(() => {
    if (categoryOfThisItem == Object.keys(sidebarItems).length) {
      fetchDataFromSubgraph5(3000);
    } else {
      fetchDataFromSubgraph(3000);
    }
  }, [shouldRender])

  useContractEvent({
    ...contract,
    eventName: 'NewEvent',
    listener(eventID: any, category: any) {
      if (categoryOfThisItem == category) {
        setShouldRender(!shouldRender);
      }
    },
  });

  useContractEvent({
    ...contract,
    eventName: 'CancelEvent',
    listener(eventID: any, category: any) {
      if (categoryOfThisItem == category) {
        setShouldRender(!shouldRender);
      }
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
    ...sbcContract,
    eventName: 'EventCreated',
    listener(eventID: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'RoundFinished',
    listener(eventID: any, roundLevel: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...sbcContract,
    eventName: 'WinnerClaimedPrize',
    listener(eventID: any, state: any, claimedNumber: any) {
      setShouldRender(!shouldRender);
    },
  });

  return (
    <Flex
      ml={'7px'}
      borderRadius={'5px'}
      background={categoryOfThisItem == categoryInPM ? '#FF9100' : 'unset'}
      _hover={{
        background: '#FF9100',
      }}
      onClick={
        () => {
          setIsHoverSubMenuIndex1(true);
          setCurrentHoveringSubMenuIndex(1);
          if (categoryInPM < 12 && !isSubCategoryExist) {
            setCategoryInPM(categoryOfThisItem);
            setSubCategoryInPM(1);
            if (!isAdminPage) {
              router.push(categoryOfThisItem < 12 ? '/prediction-markets' : '/sbc');
            }
          } else if (categoryInPM == 12 && categoryOfThisItem < 12 && !isSubCategoryExist) {
            // is subcategory not exist
            setCategoryInPM(categoryOfThisItem);
            setSubCategoryInPM(1);
            if (!isAdminPage) {
              router.push('/prediction-markets');
            }
          }
        }
      }
      className='side-link'
      position={'relative'}
    >
      <Tooltip
        label={name}
        hasArrow
        bg={'#FF9100'}
        placement={'top'}
        borderRadius={'5px'}
        offset={[0, 10]}
      >
        {
          isSubCategoryExist ? (
            <Flex
              alignItems='center'
              className={`sidebar-category-menu-wrapper
               ${isHoverSubMenuIndex1 == true ? 'is-hovering' : ''}`}
            >
              <Menu
              >
                <MenuButton
                  as={Button}
                  px='0'
                  backgroundColor='transparent'
                  _hover={{
                    backgroundColor: 'transparent',
                  }}
                  _focus={{
                    backgroundColor: 'transparent',
                  }}
                  _active={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Flex
                    direction='row'
                    alignSelf='center'
                    alignItems='center'
                    justifyContent={'center'}
                  >
                    <Image
                      px={icon === '/images/svgs/sidebar/nfl.svg' ? '4px' : '1px'}
                      py={'1px'}
                      src={icon}
                      alt={name}
                      width={['30px', '30px', '42px', '42px']}
                      height={['30px', '30px', '42px', '42px']}
                    />
                  </Flex>
                </MenuButton>
                <MenuList
                  backgroundColor={'#1F1F1F'}
                  minWidth='min-content'
                  width='170px'
                  zIndex={'3'}
                >
                  {
                    // @ts-ignore
                    Object.entries(subCategoriesInPredictionMarkets[categoryOfThisItem])
                      //@ts-ignore
                      .sort(([key1, value1], [key2, value2]) => value1.subMenuIndex - value2.subMenuIndex)
                      .map(([key, value]) => (
                        <MenuItem
                          _hover={{
                            backgroundColor: '#E18833',
                          }}
                          _focus={{
                            backgroundColor: '#E18833',
                          }}
                          onClick={() => {
                            // is subcategory exist
                            setCategoryInPM(categoryOfThisItem)
                            setSubCategoryInPM(parseInt(key))
                            if (!isAdminPage) {
                              router.push(categoryOfThisItem < 12 ? '/prediction-markets' : '/sbc');
                            }
                          }}
                          key={key}
                          fontFamily='Nunito'
                          fontStyle='normal'
                          fontWeight='700'
                          fontSize='16px'
                          lineHeight='16px'
                          paddingLeft='15px'
                          width={'242px'}
                          height={'47px'}
                          borderBottom={'1px solid #3E3E3E'}
                          onMouseEnter={() => handleMouseEnter((value as any).subMenuIndex)}
                          onMouseLeave={() => handleMouseLeave((value as any).subMenuIndex)}
                        >
                          <Image
                            width={'16px'}
                            height={'16px'}
                            src={(value as any).logo}
                            mr='16px'
                          />
                          <Text
                            textTransform='capitalize'
                            fontSize={'14px'}
                            mr='16px'
                          >
                            {(value as any).name}
                          </Text>
                          {
                            (liveBettings?.filter((item) => (item as any).subcategory == (value as any).subMenuIndex).length > 0) && (
                              <Flex
                                textTransform='capitalize'
                                fontSize={'9px'}
                                lineHeight={'9px'}
                                background={currentHoveringSubMenuIndex == (value as any).subMenuIndex ? '#1F1F1F' : '#FF5500'}
                                borderRadius={'50%'}
                                width={'17px'}
                                height={'17px'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                fontFamily={'Inter'}
                              >
                                <Flex
                                  width={'6px'}
                                  height={'9px'}
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                >
                                  {
                                    liveBettings.filter((item) => (item as any).subcategory == (value as any).subMenuIndex).length
                                  }
                                </Flex>

                              </Flex>
                            )
                          }

                        </MenuItem>
                      ))
                  }
                </MenuList>
              </Menu>
            </Flex >
          ) : (
            <Image
              px={icon === '/images/svgs/sidebar/nfl.svg' ? '4px' : '1px'}
              py={'1px'}
              src={icon}
              alt={name}
              width={['30px', '30px', '42px', '42px']}
              height={['30px', '30px', '42px', '42px']}
            />
          )
        }

      </Tooltip >
      {
        categoryOfThisItem <= Object.keys(sidebarItems).length - 1 && liveBettings?.length != 0 && (
          <Flex
            borderRadius={'50%'}
            background={'#FF5500'}
            width={'24px'}
            height={'24px'}
            border={'3px solid #1F1F1F'}
            position={'absolute'}
            right={'-9px'}
            top={'-9px'}
            justifyContent={'center'}
            alignItems={'center'}
            fontFamily={'Inter'}
            fontSize={'12px'}
          >
            {liveBettings?.length}
          </Flex>
        )
      }
      {
        categoryOfThisItem == Object.keys(sidebarItems).length && sbcLiveEventCount != 0 && (
          <Flex
            borderRadius={'50%'}
            background={'#FF5500'}
            width={'24px'}
            height={'24px'}
            border={'3px solid #1F1F1F'}
            position={'absolute'}
            right={'-9px'}
            top={'-9px'}
            justifyContent={'center'}
            alignItems={'center'}
            fontFamily={'Inter'}
            fontSize={'12px'}
          >
            {sbcLiveEventCount}
          </Flex>
        )
      }
    </Flex >
  )
}

export default SideLink
