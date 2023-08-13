import {
  Flex,
  Image,
  Text,
  Button,
  Grid,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useAccount, useContractEvent, useNetwork, useSwitchNetwork, } from 'wagmi';
import UtBetsTokenRoutes from "../tokenRoutes";
import StakingCard from '../../../components/StakingCard';
import CircleTimer from '../../../components/CircleTimer';
import { chainAttrs, delayTimeFromSubgraph, lpStakingAddresses, mumbaiChainId, newChainAttrs, polygonChainId, stakingPools } from '../../../utils/config';
import { getLPTokenStakeData } from '../../../utils/interact/thegraph/getLPTokenStakeData';
import { ethers } from 'ethers';
import { nativeUtbetsLpStakingAbi, usdcUtbetsLpStakingAbi } from '../../../utils/assets';

const StakeUtbets = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const { switchNetwork, } = useSwitchNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentStakingPools, setCurrentStakingPools] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMainnetOrTestnetStakingPools, setCurrentMainnetOrTestnetStakingPools] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? stakingPools.mainnet : stakingPools.testnet);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [contract1, setContract1] = useState<any>();
  const [contract2, setContract2] = useState<any>();
  const [width, setWidth] = useState(0);
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
    setContract1({
      address: (lpStakingAddresses as any)[chainId]['nativeUtbetsLpStaking'],
      abi: nativeUtbetsLpStakingAbi,
    })
    setContract2({
      address: (lpStakingAddresses as any)[chainId]['usdcUtbetsLpStaking'],
      abi: usdcUtbetsLpStakingAbi,
    })
  }, [chain]);

  useEffect(() => {
    if (currentTab == 0) {
      console.log("currentMainnetOrTestnetStakingPools: ", Object.values(currentMainnetOrTestnetStakingPools));
      setCurrentStakingPools(Object.values(currentMainnetOrTestnetStakingPools));
    } else {
      let currentStakingPools: any[] = [];
      Object.values(currentMainnetOrTestnetStakingPools).map(item => {
        if (item.chainId == currentMainnetOrTestnetAttrs[chainAttrsIndex].chainId)
          currentStakingPools.push(item);
      });
      setCurrentStakingPools(currentStakingPools);
    }
  }, [currentTab, chainAttrsIndex, currentMainnetOrTestnetStakingPools]);

  const fetchDataFromSubgraph = (delayTime?: number) => {
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const stakeInfos = await getLPTokenStakeData(
          address?.toLowerCase() ?? '0x0',
        );
        console.log("stake info detail: ", stakeInfos);
        if (stakeInfos?.isSuccess) {
          const returnData = stakeInfos?.returnedData?.data;
          let updatedPools = currentMainnetOrTestnetStakingPools;

          Object.entries(returnData).map(([chainId, value]) => {
            const thesePools0 = (updatedPools as any)[`${chainId}a`];
            const thesePools1 = (updatedPools as any)[`${chainId}b`];

            updatedPools = {
              ...updatedPools,
              [`${chainId}a`]: {
                ...thesePools0,
                stakedAmount: parseFloat(ethers.utils.formatEther((value as any)?.nuStakeAmount ?? 0)),
                claimedAmount: parseFloat(ethers.utils.formatEther((value as any)?.nuClaimedAmount ?? 0)),
                claimAbleAmount: parseFloat(ethers.utils.formatEther((value as any)?.nuclaimAbleAmount ?? 0)),
              },
              [`${chainId}b`]: {
                ...thesePools1,
                stakedAmount: parseFloat(ethers.utils.formatEther((value as any)?.uuStakeAmount ?? 0)),
                claimedAmount: parseFloat(ethers.utils.formatEther((value as any)?.uuClaimedAmount ?? 0)),
                claimAbleAmount: parseFloat(ethers.utils.formatEther((value as any)?.uuclaimAbleAmount ?? 0)),
              },
            }
          })

          setCurrentMainnetOrTestnetStakingPools(updatedPools);
        }
        setIsLoading(false);
      })()
    }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
  }

  useEffect(() => {
    console.log("lp staking detail: ", "before");
    fetchDataFromSubgraph(200);
  }, [
    address,
  ])

  useEffect(() => {
    console.log("lp staking detail: ", "before");
    fetchDataFromSubgraph();
  }, [
    shouldRender,
  ])

  useContractEvent({
    ...contract1,
    eventName: 'Stake',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract1,
    eventName: 'UnStake',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract1,
    eventName: 'Claim',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract2,
    eventName: 'Stake',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract2,
    eventName: 'UnStake',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  useContractEvent({
    ...contract2,
    eventName: 'Claim',
    listener(_holder: any, _amount: any) {
      setShouldRender(!shouldRender);
    },
  });

  const refreshStakingPool = () => {
    setCurrentTab(0);
    setProgress(0);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress >= 60) {
        if (!isOpenModal) {
          setCurrentTab(0);
          fetchDataFromSubgraph(200);
        }
        setProgress(0);
      } else {
        setProgress(progress + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <>
      <Flex
        direction={'column'}
        px='10'
      >
        <UtBetsTokenRoutes />
        <Flex
          mt={'50px'}
          justifyContent={'center'}
          direction='column'
        >

          <Flex
            justifyContent='center'
          >
            <Box>

              {/* tabs */}
              <Flex
                justifyContent={'right'}
                p={['15px', '20px', '30px']}
                direction='column'
              >
                <Flex
                  justifyContent={'center'}
                  p={['15px', '20px', '30px']}
                  direction='row'
                  display={['flex', 'flex', 'flex', 'none']}
                  cursor='pointer'
                  alignItems='center'
                  borderRadius='50%'
                  onClick={() => {
                    refreshStakingPool();
                  }}
                >
                  <CircleTimer
                    value={progress}
                  />
                </Flex>

                <Flex
                  borderRadius='20px'
                  justifyContent='center'
                  position='relative'
                  zIndex='1'
                >
                  <Button
                    backgroundColor='transparent'
                    borderRadius='20px 0 0 20px'
                    px='55px'
                    py='11px'
                    height='42px'
                    border={currentTab == 0 ? '1px solid #FC541C' : '1px solid #696969'}
                    borderRight={currentTab == 0 ? '1px solid #FC541C' : '1px solid transparent'}
                    _hover={{
                      border: currentTab == 0 ? '1px solid #FC541C' : '',
                      backgroundColor: 'transparent'
                    }}
                    _focus={{
                      border: currentTab == 0 ? '1px solid #FC541C' : '',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => setCurrentTab(0)}

                  >
                    All Pools
                  </Button>
                  <Flex
                    backgroundColor='transparent'
                    borderRadius='0 20px  20px 0'
                    border={currentTab == 1 ? '1px solid #FC541C' : '1px solid #696969'}
                    borderLeft={currentTab == 1 ? '1px solid #FC541C' : '1px solid transparent'}
                    _hover={{
                      border: currentTab == 1 ? '1px solid #FC541C' : '',
                      backgroundColor: 'transparent'
                    }}
                    _focus={{
                      border: currentTab == 1 ? '1px solid #FC541C' : '',
                      backgroundColor: 'transparent'
                    }}
                    cursor='pointer'
                    className='chain-logo-menu-wrapper stake-lp-page'
                  >
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
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
                        px='40px'
                      >
                        <Flex
                          direction='row'
                          alignSelf='center'
                          alignItems='center'
                        >
                          <Image
                            width={'16px'}
                            height={'16px'}
                            src={currentMainnetOrTestnetAttrs[chainAttrsIndex].logo}
                            alt={currentMainnetOrTestnetAttrs[chainAttrsIndex].alt}
                            mr='3'
                          />
                          <Text
                            fontSize='16'
                          >
                            Pools
                          </Text>
                        </Flex>
                      </MenuButton>
                      <MenuList
                        backgroundColor={'#1F1F1F'}
                        minWidth='min-content'
                        width='170px'
                      >
                        {
                          currentMainnetOrTestnetAttrs.map((item, index) => (
                            <MenuItem
                              _hover={{
                                backgroundColor: '#E18833;',
                              }}
                              _focus={{
                                backgroundColor: '#E18833',
                              }}
                              onClick={() => {
                                setChainAttrsIndex(index);
                                switchNetwork?.(currentMainnetOrTestnetAttrs[index].chainId);
                                setCurrentTab(1);
                              }}
                              key={index}
                              fontFamily='Nunito'
                              fontStyle='normal'
                              fontWeight='700'
                              fontSize='16px'
                              lineHeight='16px'
                              paddingLeft='15px'
                            >
                              <Image
                                width={'25px'}
                                height={'25px'}
                                src={item.logo}
                                alt={item.alt}
                                mr='3'
                              />
                              <Text
                                textTransform='capitalize'
                              >
                                {item.name}
                              </Text>
                            </MenuItem>
                          ))
                        }
                      </MenuList>
                    </Menu>
                  </Flex>

                  <Flex
                    position='absolute'
                    alignSelf='center'
                    zIndex='-1'
                  >
                    <Flex
                      width='500px'
                    />
                    <Flex
                      onClick={() => {
                        refreshStakingPool();
                      }}
                      display={['none', 'none', 'none', 'flex']}
                      cursor='pointer'
                      alignItems='center'
                      borderRadius='50%'
                    >
                      <CircleTimer
                        value={progress}
                      />
                    </Flex>
                  </Flex>

                </Flex>
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

              {/* tab contents */}
              {
                !isLoading &&
                (<Grid
                  gridTemplateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(2, 1fr)',
                    width < 1630 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                  ]}
                  mt="20px"
                  gap={['30px', '30px', '40px']}
                  p={['15px', '20px', '30px']}
                  textAlign='center'
                  justifyContent='center'
                  alignItems='center'
                >
                  {
                    currentStakingPools && currentStakingPools.map((item, index) => (
                      <Flex
                        justifyContent={'center'}
                        key={index}
                      >
                        <StakingCard
                          chainId={item.chainId}
                          pairTokenLogo={item.pairTokenLogo}
                          poolName={item.poolName}
                          chainName={item.chainName}
                          stakedAmount={item.stakedAmount}
                          claimAbleAmount={item.claimAbleAmount}
                          claimedAmount={item.claimedAmount}
                          isNativeUtbetsLp={item.isNativeUtbetsLp}
                          setIsOpenModal={setIsOpenModal}
                        />
                      </Flex>
                    ))
                  }
                </Grid>)
              }
            </Box>
          </Flex>
        </Flex>

        <Image
          src='/images/pngs/bottom-orange-gradient.svg'
          alt='bottom-orange-gradient'
          position='absolute'
          bottom='0'
          left='40%'
          zIndex='1'
        />
      </Flex >
    </>
  )
}

export default StakeUtbets
