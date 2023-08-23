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
import { useAccount, useBalance, useNetwork, } from 'wagmi';
import { useChainContext } from '../../utils/Context'
import { useRegisterOnEvent, useRegisterOnWarriorEvent } from '../../utils/interact/sc/squid-competition'
import { chainAttrs, chainRPCs, contractAddressesInSBC, EventCategory, mumbaiChainId, polygonChainId, utbetsTokenAddresses } from '../../utils/config'
import AnnounceModal from './AnnounceModal'
import { checkIconInGreenBg, exclamationIconInRedBg, UltiBetsTokenAbi } from '../../utils/assets'
import Account from '../Account'
import { getAllowance, useApprove } from '../../utils/interact/sc/utbets';
import { BigNumberish, ethers } from 'ethers';

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
    const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
    const { address, } = useAccount();
    const [chainId, setChainId] = useState<number>(polygonChainId);
    const [isApprovedUtbets, setIsApprovedUtbets] = useState<boolean>(false);
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

    const getApproval = async () => {
        const allowance = await getAllowance((utbetsTokenAddresses as any)[Number(chain?.id)], address, (contractAddressesInSBC as any)[Number(chain?.id)][1]);
        const amount = Number(ethers.utils.formatEther(allowance as BigNumberish));
        if (amount >= (registerAmount ?? 0)) setIsApprovedUtbets(true)
        else setIsApprovedUtbets(false)
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
        setChainAttrsIndex(currentChainAttrsItem[0].index);

        const initApproval = async () => {
            await getApproval();
        }
        if (!isNativeToken && chain?.id) {
            initApproval();
        }
    }, [chain, isNativeToken, address]);

    const approveUtbets = useApprove(
        (utbetsTokenAddresses as any)[chainId],
        (contractAddressesInSBC as any)[chainId][1],
        (registerAmount ?? 0)?.toString(),
    );

    const handleApproveUtbets = async () => {
        if (isNativeToken) return;
        if ((registerAmount ?? 0) == 0) return;
        if (approveUtbets.isLoading) return;

        try {
            approveUtbets.approveFunction?.();
            onOpenApproveSuccessAnnounceModal();
        } catch (err) {
            console.log('error in approve utbets token: ', err);
        }
    }

    const registerOnEvent = useRegisterOnEvent(
        eventID ?? 1,
        registerAmount ?? 0,
    )

    const registerOnWarriorEvent = useRegisterOnWarriorEvent(
        eventID ?? 1,
        signature,
    )

    useEffect(() => {
        console.log("signature: ", signature);
    }, [signature])

    const { data: balanceOfNativeTokenInWallet, isLoading: fetchingBalanceOfNativeTokenInWallet, isError: isErrorInFetchingBalanceOfNativeTokenInWallet } = useBalance({
        address: address,
    })

    const { data: balanceOfUtbetsTokenInWallet, isLoading: fetchingBalanceOfUtbetsTokenInWallet, isError: isErrorInFetchingBalanceOfUtbetsTokenInWallet } = useBalance({
        address: address,
        // @ts-ignore
        token: utbetsTokenAddresses[chain?.id!]
    })

    const handleRegister = async () => {
        console.log("category: ", category);
        if (isNativeToken) {
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
            console.log("category: ", category == EventCategory.WarriorBet);
            if (registerOnWarriorEvent.isLoading) return;

            try {
                registerOnWarriorEvent.registerOnWarriorEventFunction?.();
                onOpenRegisterEventSuccessAnnounceModal();
            } catch (err) {
                console.log('error in register warrior bet: ', err);
            }
        } else {
            console.log("category: register on event");
            if (registerOnEvent.isLoading) return;

            try {
                registerOnEvent.registerOnEventFunction?.();
                onOpenRegisterEventSuccessAnnounceModal();
            } catch (err) {
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
                                        V. If there is still more than 1 Player standing, then a voting period will be added.
                                        <Text
                                            fontSize={'11px'}
                                            fontFamily={'Nunito'}
                                        >
                                            Each remaining player will be able to vote between 2 choices:
                                            <Text
                                                fontSize={'11px'}
                                                fontFamily={'Nunito'}
                                                marginLeft={'10px'}
                                            >
                                                * Split Prize Pool Equally (between all remaining Players)
                                            </Text>{' '}
                                            <Text
                                                fontSize={'11px'}
                                                fontFamily={'Nunito'}
                                                marginLeft={'10px'}
                                            >
                                                * Random Solo Winner (a random player number** among the remaining Players will be picked, thereby designating the Winner of the Squid Bet Competition !)
                                            </Text>{' '}
                                        </Text>{' '}
                                        <Text
                                            fontSize={'13px'}
                                            fontFamily={'Nunito'}
                                            mt={'10px'}
                                        >
                                            To make things even more exciting, in case of lack of consensus with the voting result being equal between both choices, then the Random Solo Winner decision will be selected automatically in order to let the fate decide on the blockchain <Text as={"span"} fontWeight={'900'}>between the final SBC Winner among the finalists.</Text>
                                        </Text>
                                        <Text
                                            fontSize={'13px'}
                                            fontFamily={'Nunito'}
                                            mt={'10px'}
                                        >
                                            The Squid Bet smart contract has Chainlink VRF (Verifiable Random Function) implemented to assure a fair result.
                                        </Text>
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
                                    As a reward, for any round successfully passed, every Player will receive a unique Squid Bet NFT !
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    As the number of eliminated Players won't be the same for any rounds, this will create unique Squid Bet NFT Collections with their own scarcity based on the remaining Players after each round.
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    As you progress further down the end of the game, the rarity will de facto increase as the bet difficulty will arise after each bet and fewer Players will remain after each round!
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'700'}
                                    fontSize={'13px'}
                                    lineHeight={'18px'}
                                    color={'#E18933'}
                                >
                                    Each round Squid Bet NFT has exciting perks included (UTBETS tokens, discount on merch' store, real-life events tickets, VIP events etc...), based on the last paragraph explanation, the more advanced the round, the more exciting the perks included will be!
                                </Text>
                                <Text
                                    fontFamily={'Nunito'}
                                    fontWeight={'1000'}
                                    fontSize={'16px'}
                                    lineHeight={'20px'}
                                    color={'#E18933'}
                                    mt={'20px'}
                                    mb={'20px'}
                                >
                                    Are you ready to enter the SBC UltiBettor?
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
                isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal && approveUtbets.isSuccess}
                onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
                announceText={'UTBETS successfully approved'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
                announceModalButtonAction={async () => {
                    await getApproval();
                    onCloseApproveSuccessAnnounceModal();
                }}
            />
            <AnnounceModal
                isOpenAnnounceModal={isOpenRegisterEventSuccessAnnounceModal && (registerOnEvent.isSuccess || registerOnWarriorEvent.isSuccess)}
                onCloseAnnounceModal={() => {
                    onCloseRegisterEventSuccessAnnounceModal();
                    onClose();
                    setIsApprovedUtbets(false);
                }}
                announceText={'You successfully registered for this event.'}
                announceLogo={checkIconInGreenBg}
                announceModalButtonText={'Close'}
            />
            <AnnounceModal
                isOpenAnnounceModal={
                    (isOpenApproveSuccessAnnounceModal && approveUtbets.isLoading) ||
                    (isOpenRegisterEventSuccessAnnounceModal && (registerOnEvent.isLoading || registerOnWarriorEvent.isLoading))
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
