import {
    Flex,
    Text,
    Image,
    Box,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef, } from 'react'
import { useNetwork, } from 'wagmi';
import { useChainContext } from '../../utils/Context';
import { chainAttrs, mumbaiChainId, polygonChainId } from '../../utils/config';
import AnnounceModal from '../modal/AnnounceModal';
import { checkIconInGreenBg } from '../../utils/assets';
import { useClaimReward } from '../../utils/interact/sc/ultibetsreward';

type TotalCashbackRevenueProps = {
    currentRewardTierLevel: number
    claimableRewardAmount: number
    claimedRewardAmount: number
}

const TotalCashbackRevenue = ({
    currentRewardTierLevel,
    claimableRewardAmount,
    claimedRewardAmount,
}: TotalCashbackRevenueProps) => {
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const {
        isOpen: isOpenClaimRewardSuccessAnnounceModal,
        onOpen: onOpenClaimRewardSuccessAnnounceModal,
        onClose: onCloseClaimRewardSuccessAnnounceModal,
    } = useDisclosure();

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
    }, [chain, isNativeToken]);

    const revenueLogo = '/images/svgs/referral/revenue-logo.svg';

    const totalCashbackRevenueData = {
        tierReached: currentRewardTierLevel,
        claimableReward: claimableRewardAmount,
        totallyClaimedAmount: claimedRewardAmount,
        isClaimed: claimableRewardAmount == 0,
    };

    const [width, setWidth] = useState(0);
    const desktopDisplay = ['none', width <= 600 ? 'none' : 'flex', 'flex'];
    const mobileDisplay = ['flex', width <= 600 ? 'flex' : 'none'];
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    const claimReward = useClaimReward()

    const handleClaimableReward = async () => {
        if (claimableRewardAmount == 0) return;
        if (claimReward.isLoading) return;
        try {
            claimReward.claimRewardFunction?.();
            onOpenClaimRewardSuccessAnnounceModal();
        } catch (err) {
            console.log('error in claim reward: ', err);
        }
    }

    const TotallyClaimedAmount = () => (
        <Box
            borderBottom={'1px solid #3D3D3D !important'}
            pr={['0px', '0px', '45px']}
            mb={'32px'}
            width={['251px', width <= 600 ? '251px' : '159px', '204px']}
        >
            <Flex
                borderColor='transparent'
                color={'white'}
                fontFamily={'Nunito'}
                textTransform={'capitalize'}
                fontWeight='700'
                fontSize={'14px'}
                lineHeight={'19px'}
                width={'159px'}
            >
                totally claimed amount
            </Flex>

            <Flex
                fontFamily={'Nunito'}
                textTransform={'capitalize'}
                fontWeight='700'
                fontSize={'20px'}
                lineHeight={'27px'}
                color={'#FF9100'}
                py={'16px'}

            >
                {totalCashbackRevenueData.totallyClaimedAmount} {'UTBETS'}
            </Flex>
        </Box>
    )

    return (
        <Flex
            direction={'column'}
            className='total-cashback-revenue-component'
        >
            <Flex
            >
                <Flex
                    alignItems={'center'}
                    mr='14px'
                >
                    <Image
                        src={revenueLogo}
                        width='26px'
                        height={'17.3px'}
                    />
                </Flex>


                <Text
                    fontFamily={'nunito'}
                    fontWeight='700'
                    fontSize={'22px'}
                    lineHeight='33px'
                    textTransform={'capitalize'}
                    color='#E18933'
                >
                    Total Cashback Revenue
                </Text>
            </Flex>

            <Flex
                width={['calc(100vw - 130px)', 'calc(100vw - 130px)', 'calc(100vw - 130px)', '100%']}
                mb={['200px']}
            >

                <Flex
                    mt={'18px'}
                    direction={['column', 'column', 'row']}
                >
                    <Flex>
                        <Flex>
                            <Box
                                borderBottom={'1px solid #3D3D3D !important'}
                                pr='45px'
                                mb={'32px'}
                            >
                                <Flex
                                    borderColor='transparent'
                                    color={'white'}
                                    fontFamily={'Nunito'}
                                    textTransform={'capitalize'}
                                    fontWeight='700'
                                    fontSize={'14px'}
                                    lineHeight={'19px'}
                                    width={'86px'}
                                >
                                    Tier Reached
                                </Flex>
                                <Flex
                                    fontFamily={'Nunito'}
                                    textTransform={'capitalize'}
                                    fontWeight='700'
                                    fontSize={'20px'}
                                    lineHeight={'27px'}
                                    color={'#739AF0'}
                                    py={'16px'}
                                >
                                    {totalCashbackRevenueData.tierReached}
                                </Flex>
                            </Box>

                            <Box
                                borderBottom={'1px solid #3D3D3D !important'}
                                pr={['0px', width <= 600 ? '0px' : '45px', '45px']}
                                mb={'32px'}
                                width={['120px', width <= 600 ? '120px' : '165px', '165px']}
                            >
                                <Flex
                                    borderColor='transparent'
                                    color={'white'}
                                    fontFamily={'Nunito'}
                                    textTransform={'capitalize'}
                                    fontWeight='700'
                                    fontSize={'14px'}
                                    lineHeight={'19px'}
                                    width={'120px'}
                                >
                                    claimable reward
                                </Flex>

                                <Flex
                                    fontFamily={'Nunito'}
                                    textTransform={'capitalize'}
                                    fontWeight='700'
                                    fontSize={'20px'}
                                    lineHeight={'27px'}
                                    color={'#FF9100'}
                                    py={'16px'}

                                >
                                    {totalCashbackRevenueData.claimableReward} {'UTBETS'}
                                </Flex>
                            </Box>
                        </Flex>

                        <Flex
                            display={desktopDisplay}
                        >
                            <TotallyClaimedAmount />
                        </Flex>
                    </Flex>

                    <Flex
                        display={mobileDisplay}
                    >
                        <TotallyClaimedAmount />
                    </Flex>


                    <Flex
                        justifyContent={['center', 'center', 'start']}
                    >
                        <Flex
                            borderBottom={['none', 'none', '1px solid #3D3D3D !important']}
                            mb={'32px'}
                            pr={['0px', '0px', '45px']}
                            width={['135px', '135px', '181px']}
                            direction={'column'}
                        >
                            <Flex
                                borderColor='transparent'
                                height={'19px'}
                            >
                            </Flex>
                            <Flex
                                borderColor='transparent'
                                width={'136px'}

                                height={'41px'}
                            >
                                <Flex
                                    color={'white'}
                                    fontFamily={'Nunito'}
                                    textTransform={'capitalize'}
                                    fontWeight='700'
                                    fontSize={'14px'}
                                    lineHeight={'19px'}
                                    px='22px'
                                    py={'11px'}
                                    border={totalCashbackRevenueData.isClaimed ? '1px solid #525252' : '1px solid #FC541C'}
                                    borderRadius='29px'
                                    width={'fit-content'}
                                    onClick={handleClaimableReward}
                                    cursor={'pointer'}
                                >
                                    {totalCashbackRevenueData.isClaimed ? 'Claimed' : 'Claim Reward'}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>



                </Flex>
            </Flex>
            <AnnounceModal
                isOpenAnnounceModal={isOpenClaimRewardSuccessAnnounceModal && claimReward.isSuccess}
                onCloseAnnounceModal={onCloseClaimRewardSuccessAnnounceModal}
                announceText={'You successfully claimed your reward.'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={
                    (isOpenClaimRewardSuccessAnnounceModal && claimReward.isLoading)
                }
                onCloseAnnounceModal={onCloseClaimRewardSuccessAnnounceModal}
                announceText={'Your transaction is currently processing on the blockchain'}
                announceGif={true}
                announceModalButtonText={'Close'}
            />
        </Flex >
    )
}

export default TotalCashbackRevenue;