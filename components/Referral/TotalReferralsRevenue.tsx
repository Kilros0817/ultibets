import {
    Flex,
    Text,
    Image,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    Box,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef, } from 'react'
import { useAccount, useNetwork } from 'wagmi';
import { useChainContext } from '../../utils/Context';
import { chainAttrs, chainRPCs, mumbaiChainId, polygonChainId, ultibetsRewardAddresses } from '../../utils/config';
import axios from 'axios';
import AnnounceModal from '../modal/AnnounceModal';
import { checkIconInGreenBg, ultibetsRewardAbi } from '../../utils/assets';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';
import { claimReferralReward } from '../../utils/interact/sc/ultibetsreward';

type TotalReferralsRevenueProps = {
    totalReferrals: number
    validReferrals: number
    claimableReward: number
    totalClaimedAmount: number
}

const TotalReferralsRevenue = ({
    totalReferrals,
    validReferrals,
    claimableReward,
    totalClaimedAmount,
}: TotalReferralsRevenueProps) => {
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();
    const { address, } = useAccount();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
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

    const scroll = useRef<any>()
    const [scrollX, setScrollX] = useState<number>(0) // For detecting start scroll postion
    const [scrollEnd, setScrollEnd] = useState<boolean>(false) // For detecting end of scrolling

    const slide = (shift: any) => {
        scroll.current.scrollLeft += shift
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
    }

    const scrollCheck = () => {
        setScrollX(scroll.current.scrollLeft)
        if (
            Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <= scroll.current.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
    }

    useEffect(() => {
        if (
            scroll.current &&
            scroll?.current?.scrollWidth === scroll?.current?.offsetWidth
        ) {
            setScrollEnd(true)
        } else {
            setScrollEnd(false)
        }
        return () => { }
    }, [scroll?.current?.scrollWidth, scroll?.current?.offsetWidth])

    const revenueLogo = '/images/svgs/referral/revenue-logo.svg';

    const getSignature = async () => {
        try {
            const data = {
                chainId: chain?.id ?? 0,
                rpc: (chainRPCs as any)[chain?.id ?? mumbaiChainId],
                eventID: parseEther(String(claimableReward)).toString(), // this is not just eventid, but use here
                bettor: address,
            };

            console.log("data: ", data);

            const result = await axios.post(
                '/api/createSignature',
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            if ((result as any).data.isSuccess) {
                console.log("sinature:  ", (result as any).data.signature)
                return (result as any).data.signature;
            }
        } catch (err) {
            console.log('error in creating signature: ', err);
            return '';
        }
    }

    const handleClaimableReward = async () => {
        const isMainnet = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? true : false;
        const referralChainId = isMainnet ? polygonChainId : mumbaiChainId;
        if (referralChainId != chain?.id ?? 0) {
            toast.error(`Please switch your chain to ${isMainnet ? 'Polygon' : 'Mumbai'}`);
            return;
        }

        try {
            const signature = await getSignature();

            if (signature != '') {
                const res = await claimReferralReward(claimableReward, signature, chain?.id ?? 0);
                if (res) {
                    setIsProcessing(true);
                    onOpenClaimRewardSuccessAnnounceModal();
                }
            }

        } catch (e) {
            console.log("claim reward error: ", e);
        }

        setIsProcessing(false);
    }

    return (
        <Flex
            direction={'column'}
            className='total-referrals-revenue-component'
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
                    Total Referrals Revenue
                </Text>
            </Flex>


            <Flex
                display={['flex', 'flex', 'flex', 'none']}
                position='relative'
            >
                {
                    scrollX !== 0 && (
                        <Box
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            id="prevBtn"
                            position={'absolute'}
                            left={'-28px'}
                            mt={'20px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(-50)}
                        >
                            <Image
                                width={'30px'}
                                height={'30px'}
                                borderRadius={'50%'}
                                src="/images/svgs/icon/left.svg"
                                alt="left-arrow"
                            />
                        </Box>
                    )
                }

                {
                    !scrollEnd && (
                        <Box
                            id="nextBtn"
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.2)',
                            }}
                            position={'absolute'}
                            right={['-20px', '-25px', '-25px', 'unset']}
                            mt={'20px'}
                            zIndex={100}
                            fontSize={'44px'}
                            color={'#FFB11C'}
                            onClick={() => slide(50)}
                        >
                            <Image
                                width={'30px'}
                                height={'30px'}
                                borderRadius={'50%'}
                                src="/images/svgs/icon/right.svg"
                                alt="right-arrow"
                            />
                        </Box>
                    )
                }
            </Flex>


            <Flex
                direction='column'
                ref={scroll}
                overflowX='scroll'
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                        background: 'transparent',
                        width: '0',
                        height: '0',
                    },
                    'scrollbarWidth': 'thin',
                    'scrollbarColor': 'transparent transparent',
                }}
                onScroll={scrollCheck}
                width={['calc(100vw - 130px)', 'calc(100vw - 130px)', 'calc(100vw - 130px)', '100%']}
                mb={['200px']}
            >
                <Flex
                    direction={['column', 'column', 'column', 'column', 'row']}
                    width='max-content'
                >
                    <Flex
                        mt={'18px'}
                        direction={'column'}
                    >
                        <Table
                            gap='2'
                            className='total-referrals-revenue-table'
                            overflowX={'scroll'}
                        >
                            <Thead
                                fontStyle='normal'
                                className='total-referrals-revenue-table-header'
                            >
                                <Tr
                                >
                                    <Th
                                        borderColor='transparent'
                                        color={'white'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'14px'}
                                        lineHeight={'19px'}
                                    >
                                        Total referrals
                                    </Th>

                                    <Th
                                        borderColor='transparent'
                                        color={'white'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'14px'}
                                        lineHeight={'19px'}
                                    >
                                        valid referrals
                                    </Th>

                                    <Th
                                        borderColor='transparent'
                                        color={'white'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'14px'}
                                        lineHeight={'19px'}
                                    >
                                        claimable reward
                                    </Th>

                                    <Th
                                        borderColor='transparent'
                                        color={'white'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'14px'}
                                        lineHeight={'19px'}
                                    >
                                        totally claimed amount
                                    </Th>

                                    <Th
                                        borderColor='transparent'
                                    >
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody
                                width={'100%'}
                            >
                                <Tr
                                >
                                    <Td
                                        borderBottom={'1px solid #3D3D3D !important'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'20px'}
                                        lineHeight={'27px'}
                                        color={'#739AF0'}
                                    >
                                        {totalReferrals}
                                    </Td>
                                    <Td
                                        borderBottom={'1px solid #3D3D3D !important'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'20px'}
                                        lineHeight={'27px'}
                                        color={'#19A2A5'}
                                    >
                                        {validReferrals}
                                    </Td>

                                    <Td
                                        borderBottom={'1px solid #3D3D3D !important'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'20px'}
                                        lineHeight={'27px'}
                                        color={'#FF9100'}
                                    >
                                        {claimableReward} {'UTBETS'}
                                    </Td>
                                    <Td
                                        borderBottom={'1px solid #3D3D3D !important'}
                                        fontFamily={'Nunito'}
                                        textTransform={'capitalize'}
                                        fontWeight='700'
                                        fontSize={'20px'}
                                        lineHeight={'27px'}
                                        color={'#FF9100'}
                                    >
                                        {totalClaimedAmount} {'UTBETS'}
                                    </Td>

                                    <Td
                                        borderColor='transparent'
                                        borderBottom={'1px solid #3D3D3D !important'}
                                    >
                                        <Button
                                            height={'40px'}
                                            background={'unset'}
                                            border={'1px solid #FC541C'}
                                            _hover={{
                                                background: '#FC541C',
                                            }}
                                            fontSize={'14px'}
                                            lineHeight={'19px'}
                                            textTransform={'capitalize'}
                                            borderRadius='29px'
                                            color={'white'}
                                            width={'fit-content'}
                                            isDisabled={claimableReward == 0}
                                            onClick={handleClaimableReward}
                                        >
                                            {'Claim Reward'}
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Flex>

                </Flex>
            </Flex>

            <AnnounceModal
                isOpenAnnounceModal={isOpenClaimRewardSuccessAnnounceModal && !isProcessing}
                onCloseAnnounceModal={onCloseClaimRewardSuccessAnnounceModal}
                announceText={'You successfully claimed your reward.'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={
                    isProcessing
                }
                onCloseAnnounceModal={onCloseClaimRewardSuccessAnnounceModal}
                announceText={'Your transaction is currently processing on the blockchain'}
                announceGif={true}
                announceModalButtonText={'Close'}
            />
        </Flex >
    )
}

export default TotalReferralsRevenue;