import {
    Box,
    Flex,
} from '@chakra-ui/react'
import {
    useEffect,
    useState,
} from 'react'
import { useAccount, useContractEvent, useNetwork, } from 'wagmi';
import PredictionsTab from '../../../components/mypredictions/PredictionsTab'
import Sidebar from '../../../components/Sidebar'
import { useChainContext } from '../../../utils/Context';
import { chainAttrs, delayTimeFromSubgraph, mumbaiChainId, polygonChainId, ultibetsRewardAddresses } from '../../../utils/config';
import Profile from '../../../components/Referral/Profile'
import TotalReferralsRevenue from '../../../components/Referral/TotalReferralsRevenue'
import TokenSelector from '../../../components/predictions/TokenSelector'
import { getProfileData } from '../../../utils/interact/thegraph/getProfileData';
import { ultibetsRewardAbi } from '../../../utils/assets';

const Referral = () => {
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();
    const { address, } = useAccount();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const [shouldRender, setShouldRender] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<any>();
    const [contract, setContract] = useState<any>();

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setContract({
            address: (ultibetsRewardAddresses as any)[chainId],
            abi: ultibetsRewardAbi
        })
    }, [chain, isNativeToken]);

    const fetchDataFromSubgraph = (delayTime?: number) => {
        setIsLoading(true);
        setTimeout(() => {
            (async () => {
                const profileData = await getProfileData(address?.toLowerCase() ?? '0x0');
                console.log("profileData: ", profileData);
                if (profileData?.isSuccess) {
                    let profileInfo = profileData?.returnedData;

                    console.log("profileInfo: ", profileInfo);
                    setProfile(profileInfo);
                }
                setIsLoading(false);
            })()
        }, delayTime ? delayTime : delayTimeFromSubgraph) // delay from the state change of the thegraph
    }

    useEffect(() => {
        fetchDataFromSubgraph(100);
    }, [
        address,
    ])

    useEffect(() => {
        fetchDataFromSubgraph(6000);
    }, [shouldRender])

    useContractEvent({
        ...contract,
        eventName: 'ClaimReferralReward',
        listener(logs) {
            //@ts-ignore
            if (address == logs[0].args.referrer) {
                setShouldRender(!shouldRender);
            }
        },
    });

    useContractEvent({
        ...contract,
        eventName: 'ClaimReferralBettingReward',
        listener(logs) {
            //@ts-ignore
            if (address == logs[0].args.referrer) {
                setShouldRender(!shouldRender);
            }
        },
    });

    return (
        <Flex
            className='referral-page-wrapper'
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
                className='my-referral-wrapper'
                zIndex={0}
            >

                <Box
                >
                    <PredictionsTab />
                </Box>

                <Flex
                    mt={['41px']}
                    justifyContent={['center', 'center', 'start']}
                >
                    <TokenSelector />
                </Flex>

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
                                direction={['column', 'column', 'column', 'row']}
                                mt='29px'
                                gap={['91px']}
                            >
                                <Flex>
                                    <Profile
                                        totalReferrals={profile?.totalReferrals}
                                        isFirstPredictionRewardDisable={
                                            profile?.isReferred == false ||
                                            profile?.isClaimedReferralBettingReward == true ||
                                            profile?.referralBettingReward == 0
                                        }
                                        referralBettingReward={profile?.referralBettingReward}
                                    />
                                </Flex>
                            </Flex>

                            <Flex
                                mt='57px'
                            >
                                <TotalReferralsRevenue
                                    totalReferrals={profile?.totalReferrals}
                                    validReferrals={profile?.validReferrals}
                                    claimableReward={profile?.claimableReward}
                                    totalClaimedAmount={profile?.totalClaimedAmount}
                                />
                            </Flex>
                        </>
                    )
                }

            </Box>
        </Flex >
    )
}

export default Referral
