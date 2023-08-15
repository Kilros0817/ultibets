import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useChainContext } from '../../utils/Context'
import { registerOnEvent, registerOnWarriorEvent } from '../../utils/interact/sc/squid-competition'
import { chainAttrs, chainRPCs, contractAddressesInSBC, EventCategory, mumbaiChainId, polygonChainId, utbetsTokenAddresses } from '../../utils/config'
import AnnounceModal from './AnnounceModal'
import { checkIconInGreenBg, exclamationIconInRedBg, UltiBetsTokenAbi } from '../../utils/assets'
import Account from '../Account'
import { approveUtbets, getAllowance } from '../../utils/interact/sc/utbets';
import { ethers } from 'ethers';

export type RegisterModalInSBCProps = {
    isOpen: boolean
    onClose: () => void
    eventID?: number
    registerAmount?: number
    category: number // 0: native, 1: utbets, 2: warrior
    signature: string
    roundBetAmount?: number
}

const RegisterModalInSBC = ({
    isOpen,
    onClose,
    eventID,
    registerAmount,
    category,
    signature,
}: RegisterModalInSBCProps) => {
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();

    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const { address, } = useAccount();
    const [chainId, setChainId] = useState<number>(polygonChainId);
    const [isApprovedUtbets, setIsApprovedUtbets] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const {
        isOpen: isOpenAnnounceModal,
        onOpen: onOpenAnnounceModal,
        onClose: onCloseAnnounceModal,
    } = useDisclosure();
    const {
        isOpen: isOpenApproveSuccessAnnounceModal,
        onOpen: onOpenApproveSuccessAnnounceModal,
        onClose: onCloseApproveSuccessAnnounceModal,
    } = useDisclosure();
    const {
        isOpen: isOpenRegisterEventSuccessAnnounceModal,
        onOpen: onOpenRegisterEventSuccessAnnounceModal,
        onClose: onCloseRegisterEventSuccessAnnounceModal,
    } = useDisclosure();

    const initApproval = async () => {
        const tokenAddress = (utbetsTokenAddresses as any)[chainId];
        const sbcUAddress = (contractAddressesInSBC as any)[chainId][1];
        const allowance = await getAllowance(tokenAddress, address, sbcUAddress);
        setIsApprovedUtbets(ethers.utils.formatEther(allowance as string) >= (registerAmount as any))
    }

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setChainId(chainId);

        if (!isNativeToken) {
            initApproval()
        }
    }, [chain, isNativeToken]);

    const handleApproveUtbets = async () => {
        if (isNativeToken) return;
        if ((registerAmount ?? 0) == 0) return;

        try {
            
            await approveUtbets(
                (utbetsTokenAddresses as any)[chainId],
                (contractAddressesInSBC as any)[chainId][1],
                (registerAmount ?? 0)?.toString()
                )
            await initApproval();
            onOpenApproveSuccessAnnounceModal();
        } catch (err) {
            console.log('error in approve utbets token: ', err);
        }
    }

    useEffect(() => {
        console.log("signature: ", signature);
    }, [signature])

    const { data: balanceOfNativeTokenInWallet, isLoading: fetchingBalanceOfNativeTokenInWallet, isError: isErrorInFetchingBalanceOfNativeTokenInWallet } = useBalance({
        address: address,
    })

    const handleRegister = async () => {
        console.log("category: ", category);
        if (isNativeToken) {
            console.log("register amount: ", (registerAmount ?? 0));
            console.log("balance of native token: ", parseFloat(balanceOfNativeTokenInWallet?.formatted ?? '0'))

            if ((registerAmount ?? 0) > parseFloat(balanceOfNativeTokenInWallet?.formatted ?? '0')) {
                onOpenAnnounceModal();
                return;
            }
        } else {
            const tokenAddress = (utbetsTokenAddresses as any)[chainId];
            const contract = new ethers.Contract(tokenAddress, UltiBetsTokenAbi, new ethers.providers.StaticJsonRpcProvider((chainRPCs as any)[chainId]));
            const balanceOfUtbets = await contract.balanceOf(address);
            const numberOfBalanceOfUtbetsToken = Number(ethers.utils.formatEther(balanceOfUtbets));
            console.log("balance of utbets token: ", Number(ethers.utils.formatEther(balanceOfUtbets)));

            if ((registerAmount ?? 0) > numberOfBalanceOfUtbetsToken) {
                onOpenAnnounceModal();
                return;
            }
        }

        if (!isNativeToken && !isApprovedUtbets) {
            return;
        }

        if (category == EventCategory.WarriorBet) {
            try {
                setIsLoading(true)
                await registerOnWarriorEvent(eventID ?? 1, signature)
                setIsLoading(false);
                onOpenRegisterEventSuccessAnnounceModal();
            } catch (err) {
                setIsLoading(false);
                console.log('error in register warrior bet: ', err);
            }
        } else {
            try {
                setIsLoading(true)

                await registerOnEvent(
                    eventID ?? 1,
                    registerAmount ?? 0)
                setIsLoading(false);
                onOpenRegisterEventSuccessAnnounceModal();
            } catch (err) {
                setIsLoading(false);
                console.log('error in register bet: ', err);
            }
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.10'
                    backdropFilter='blur(10px) hue-rotate(10deg)'
                />
                <ModalContent
                    maxW="550px"
                    border={'1px solid white'}
                >
                    <ModalHeader>Confirm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Flex>
                                <Flex justifyContent={'center'} alignItems={'start'}>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'27px'}
                                        lineHeight={'33px'}
                                        color={'white'}
                                        textTransform={'capitalize'}
                                    >
                                        Squid Bet rules
                                    </Text>
                                    <Box
                                        ml={'10px'}
                                        width={'39px'}
                                        height={'39px'}
                                        background={
                                            "url('/images/svgs/slider/squid-icon.svg')"
                                        }
                                    ></Box>
                                </Flex>
                            </Flex>
                            <Flex
                                justifyContent={'center'}
                                alignItems={'start'}
                                direction={'column'}
                                gap={'20px'}
                            >
                                <Flex mt={'30px'}>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        I. 500 Players will compete during 5 rounds over 5
                                        days (1 round per day).
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        II. Each Player can only bet once per round.
                                        <Text
                                            fontFamily={'Nunito'}
                                        >
                                            At the end of each bet, the losing side is
                                            eliminated.
                                        </Text>{' '}
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        III. Entry Fee* + every bets from every Players will
                                        be placed in the Prize Pool.
                                        <Text
                                            fontSize={'10px'}
                                            fontFamily={'Nunito'}
                                        >
                                            *10% of the Total Entry Fee will be collected as the
                                            Organisator Fee and sent the the UltiBets Treasury
                                        </Text>{' '}
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        IV. If, for any reasons, you can't or don't have
                                        enough funds to place a bet before the round deadline,
                                        you will be eliminated.
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        IV. If, for any reasons, you can't or don't have
                                        enough funds to place a bet before the round deadline,
                                        you will be eliminated.
                                    </Text>
                                </Flex>
                                <Flex>
                                    <Text
                                        fontFamily={'Nunito'}
                                        fontWeight={'700'}
                                        fontSize={'13px'}
                                        lineHeight={'18px'}
                                    >
                                        If there is still more than 1 Player standing, then a random
                                        player number** among the remaining Players will be picked,
                                        thereby designating the Winner of the Squid Bet Competition !
                                        <Text
                                            fontSize={'11px'}
                                            fontFamily={'Nunito'}
                                        >
                                            **The Squid Bet smart contract has Chainlink VRF
                                            (Verifiable Random Function) implemented to assure a
                                            fair result.
                                        </Text>{' '}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex
                                mt={'20px'}
                                justifyContent={'center'}
                                alignItems={'start'}
                                direction={'column'}
                            >
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    As a reward, for any round successfully passed, a Player
                                    will receive a unique Squid Bet NFT !
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    As the number of eliminated Players won't be the same
                                    for any rounds, this will create unique Squid Bet NFT
                                    Collections with their own scarcity based on the
                                    remaining Players after each round.
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    As you progress further down the end of the game, the rarity will
                                    increase as the bet difficulty will arise after each bet
                                    and fewer Players will remain after each round!
                                </Text>
                            </Flex>
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                mt={'20px'}
                                direction={['column', 'row', 'row']}
                                gap={'20px'}
                            >
                                {
                                    address && !isNativeToken && (
                                        <Button
                                            onClick={handleApproveUtbets}
                                            mb={'30px'}
                                            height={'36px'}
                                            width={'160px'}
                                            background={'unset'}
                                            borderRadius={'34px'}
                                            border={'1px solid #FC541C'}
                                            _hover={{
                                                background: '#FC541C',
                                            }}
                                            fontFamily={'Nunito'}
                                            isDisabled={isApprovedUtbets}
                                        >
                                            Approve
                                        </Button>
                                    )
                                }
                                {
                                    address && (
                                        <Button
                                            mb={'30px'}
                                            height={'36px'}
                                            width={'160px'}
                                            background={'unset'}
                                            borderRadius={'34px'}
                                            border={'1px solid #FC541C'}
                                            _hover={{
                                                background: '#FC541C',
                                            }}
                                            onClick={() => handleRegister()}
                                            fontFamily={'Nunito'}
                                            isDisabled={isNativeToken ? false : !isApprovedUtbets}
                                        >
                                            Read & Accept
                                        </Button>
                                    )
                                }
                                {
                                    !address && (
                                        <Account />
                                    )
                                }
                            </Flex>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <AnnounceModal
                isOpenAnnounceModal={isOpenAnnounceModal}
                onCloseAnnounceModal={onCloseAnnounceModal}
                announceText={'You don’t have enough funds to register'}
                announceLogo={exclamationIconInRedBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal}
                onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
                announceText={'UTBETS successfully approved'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
                announceModalButtonAction={() => {
                    onCloseApproveSuccessAnnounceModal();
                }}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenRegisterEventSuccessAnnounceModal}
                onCloseAnnounceModal={() => {
                    onCloseRegisterEventSuccessAnnounceModal();
                    onClose();
                }}
                announceText={'You successfully registered for this event.'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={
                    isLoading
                }
                onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
                announceText={'Your transaction is currently processing on the blockchain'}
                announceGif={true}
                announceModalButtonText={'Close'}
            />
        </>
    )
}

export default RegisterModalInSBC
