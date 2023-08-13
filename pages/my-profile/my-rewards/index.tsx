import {
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useEffect, useState, } from 'react'
import { CgProfile, } from 'react-icons/cg'
import { useAccount, useContractEvent, useNetwork, } from 'wagmi';
import PredictionsTab from '../../../components/mypredictions/PredictionsTab'
import Sidebar from '../../../components/Sidebar'
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, delayTimeFromSubgraph, mumbaiChainId, polygonChainId, ultibetsRewardAddresses } from '../../../utils/config';
import TokenSelector from '../../../components/predictions/TokenSelector'
import TotalVolume from '../../../components/MyRewards/TotalVolume'
import TierDescription from '../../../components/MyRewards/TierDescription'
import TotalCashbackRevenue from '../../../components/MyRewards/TotalCashbackRevenue'
import TierLevelLine from '../../../components/MyRewards/TierLevelLine'
import { ultibetsRewardAbi } from '../../../utils/assets';
import { getRewardData } from '../../../utils/interact/thegraph/getRewardData';
import { ethers } from 'ethers';

const MyRewards = () => {
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const { address, } = useAccount();
    const [chainId, setChainId] = useState<number>();
    const [shouldRender, setShouldRender] = useState<boolean>(true);
    const [contract, setContract] = useState<any>();
    const [rewardData, setRewardData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setChainId(chainId);
        setContract({
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi
        })
    }, [chain, isNativeToken]);


    const fetchDataFromSubgraph = (delayTime?: number) => {
        if (chainId == undefined) return;
        setIsLoading(true);
        setTimeout(() => {
            (async () => {
                const rewardData = await getRewardData(address?.toLowerCase() ?? '0x0', chainId);
                console.log("rewardData: ", rewardData);
                if (rewardData?.isSuccess) {
                    setRewardData((rewardData?.returnedData)[0]);
                }
                setIsLoading(false);
            })()
        }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
    }

    useEffect(() => {
        console.log("rewardData ", "before");
        fetchDataFromSubgraph(100);
    }, [
        address,
        chainId,
    ])

    useEffect(() => {
        console.log("rewardData ", "before");
        fetchDataFromSubgraph();
    }, [shouldRender])

    useContractEvent({
        ...contract,
        eventName: 'ReleaseReward',
        listener(bettor: any, amount: any) {
            if (address == bettor) {
                setShouldRender(!shouldRender);
            }
        },
    });

    return (
        <Flex
            className='my-reward-page-wrapper'
            width={['100%']}
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
                width={['calc(100vw - 130px)']}
                className='my-my-reward-wrapper'
                zIndex={0}
            >
                <Box
                >
                    <PredictionsTab />
                </Box>

                {
                    !address && (
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            mt={'100px'}
                            fontSize={'30px'}
                        >
                            Please login your wallet at first!
                        </Flex>
                    )
                }

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
                    !isLoading && address && (
                        <>
                            <Flex
                                mt='56px'
                                className='wallet-address'
                            >
                                <Flex
                                    alignItems={'center'}
                                    mr='14px'
                                >
                                    <CgProfile
                                    />
                                </Flex>

                                <Text
                                    fontFamily={'nunito'}
                                    fontWeight='700'
                                    fontSize={'20px'}
                                    lineHeight='27px'
                                    textTransform={'capitalize'}
                                >
                                    {`${address?.slice(0, 8)}... Profile`}
                                </Text>
                            </Flex>

                            <Flex
                                mt={['39px']}
                            >
                                <TokenSelector />
                            </Flex>

                            <Flex
                                direction={['column', 'column', 'column', 'row']}
                                mt='49px'
                                gap={['65px']}
                            >
                                <Flex
                                    className='total-volume-wrapper'
                                    justify={['center', 'center', 'start']}
                                >
                                    <TotalVolume
                                        totalBettingAmount={parseFloat(ethers.utils.formatEther(rewardData?.totalBettingAmount ?? '0'))}
                                    />
                                </Flex>

                                <Flex
                                    className='tier-description-wrapper'
                                >
                                    <TierDescription />
                                </Flex>
                            </Flex>

                            <Box
                                width={'calc(100vw - 130px)'}
                                className={'tier-level-line-wrapper'}
                            >
                                <TierLevelLine
                                    currentRewardTierLevel={rewardData?.currentRewardTier ?? 0}
                                />
                            </Box>

                            <Flex
                                mt='57px'
                            >
                                <TotalCashbackRevenue
                                    currentRewardTierLevel={rewardData?.currentRewardTier ?? 0}
                                    claimableRewardAmount={parseFloat(ethers.utils.formatEther(rewardData?.claimableRewardAmount ?? '0'))}
                                    claimedRewardAmount={parseFloat(ethers.utils.formatEther(rewardData?.claimedRewardAmount ?? '0'))}
                                />
                            </Flex>
                        </>
                    )
                }


            </Box>
        </Flex >
    )
}

export default MyRewards
