import {
    Box,
    Button,
    Flex,
    Text,
    useDisclosure,
    Image,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import { useAccount, useNetwork, } from 'wagmi';
import { chainAttrs, chainRPCs, EventCategory, mumbaiChainId, polygonChainId, VotingResultInSBC } from '../../../../utils/config'
import { useChainContext } from '../../../../utils/Context'
import RegisterModalInSBC from '../../../modal/RegisterModalInSBC'
import axios from 'axios'
import { toast } from 'react-toastify'

export type TotalCurrentPrizePoolProps = {
    eventID: number
    registerAmount?: number
    roundBetAmount?: number
    orgFeePercent?: number
    totalAmount?: number
    registerID: number
    category: number // 0: native, 1: utbets, 2: warrior
    maxPlayers: number
    totalPlayers: number
    registerDeadline: number
}

const TotalCurrentPrizePool = ({
    eventID,
    registerAmount,
    roundBetAmount,
    orgFeePercent,
    totalAmount,
    registerID,
    category,
    maxPlayers,
    totalPlayers,
    registerDeadline,
}: TotalCurrentPrizePoolProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isNativeToken, } = useChainContext();
    const { chain, } = useNetwork();
    const { address, } = useAccount();
    const [currentMainnetOrTestnetAttrs,] = useState(
        process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
    const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
    const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
    const [signature, setSignature] = useState<string>('');

    useEffect(() => {
        const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
        let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
        if (currentChainAttrsItem.length == 0) {
            const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
            currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
        }
        setChainAttrsIndex(currentChainAttrsItem[0].index);
        setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
    }, [chain, isNativeToken]);

    const getSignature = async () => {
        try {
            const data = {
                chainId: chain?.id ?? 0,
                rpc: (chainRPCs as any)[chain?.id ?? mumbaiChainId],
                eventID: eventID,
                bettor: address,
            };

            console.log("data: ", data);

            if (data.chainId == 0) {
                toast.error('Please log in your wallet at first');
                return;
            }

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
                setSignature((result as any).data.signature)
            }
        } catch (err) {
            console.log('error in creating signature: ', err);
        }
    }

    const handleRegister = async () => {
        if (registerID == 0) {
            if (category == EventCategory.WarriorBet) {
                await getSignature();
            }
            onOpen()
        }
    }

    return (
        <Box
            mt={['20px', '20px', '20px', '60px']}
            mb={['40px', '40px', '40px', '60px']}
            width={['calc(100vw - 150px)', 'calc(100vw - 150px)', '600px']}
            border={[
                '1px solid #FFFFFF',
            ]}
            borderRadius={'7px'}
            p='20px'
        >
            <Flex
                justifyContent={'center'}
                alignItems={'start'}
                direction={'column'}
                pl={['0px', '0px', '20px', '30px']}
                pt={'30px'}
            >
                <Text
                    fontWeight={'700'}
                    fontSize={'27px'}
                    lineHeight={'33px'}
                    color={'white'}
                    textTransform={'capitalize'}
                    fontFamily={'Nunito'}
                >
                    Total Current Prize Pool:
                    &nbsp;
                    {
                        totalAmount?.toFixed(2)
                    }
                    &nbsp;
                    {currentToken}
                </Text>
            </Flex>
            <Flex
                justifyContent={'center'}
                alignItems={'start'}
                direction={'column'}
                pl={['0px', '0px', '20px', '30px']}
                pt={'20px'}
            >
                <Text
                    display={['none', 'none', 'none', 'block']}
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'20px'}
                    lineHeight={'27px'}
                    color={'#E18933'}
                    textTransform={'capitalize'}
                >
                    Entry Fee: {registerAmount} {currentToken}** &nbsp; &nbsp; &nbsp; Betting Amount / Round:
                    &nbsp;
                    {roundBetAmount} {currentToken}
                </Text>
                <Text
                    display={['flex', 'flex', 'flex', 'none']}
                    fontWeight={'700'}
                    fontSize={'20px'}
                    lineHeight={'27px'}
                    color={'#E18933'}
                    textTransform={'capitalize'}
                    fontFamily={'Nunito'}
                >
                    Entry Fee: {registerAmount} {currentToken}**
                </Text>
                <Text
                    display={['flex', 'flex', 'flex', 'none']}
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'20px'}
                    lineHeight={'27px'}
                    color={'#E18933'}
                    textTransform={'capitalize'}
                >
                    Betting Amount / Round: {roundBetAmount} {currentToken}
                </Text>
            </Flex>
            <Flex
                justifyContent={'center'}
                alignItems={'start'}
                direction={'column'}
                pl={['0px', '0px', '20px', '30px']}
                pt={'20px'}
            >
                <Text
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    width={['auto', 'auto', 'auto', '540px']}
                    fontSize={'13px'}
                    lineHeight={'18px'}
                    color={'white'}
                    textTransform={'capitalize'}
                    px={['10px', '0px', '0px', '0px']}
                >
                    **({orgFeePercent}% of the total Entry Fee amount will be collected as the
                    Organisator Fee and sent to the BlockBet Treasury. No other fee
                    will be collected afterwards).{' '}
                </Text>
            </Flex>
            <Flex
                pl={['0px', '0px', '20px', '30px']}
                mt={'40px'}
                gap={'30px'}
                direction={['column', 'row']}
                justifyContent={['start']}
            >
                <Flex
                    justifyContent={['center']}
                >
                    <Button
                        height={'36px'}
                        width={'152px'}
                        background={'unset'}
                        borderRadius={'34px'}
                        border={'1px solid #FC541C'}
                        _hover={{
                            background: '#FC541C',
                        }}
                        onClick={handleRegister}
                        fontFamily={'Nunito'}
                        // should add constraint if current user is not in the 500 winners list, it should be disabled
                        isDisabled={registerID > 0 || (maxPlayers > 0 && maxPlayers == totalPlayers) || registerDeadline < (new Date().getTime() / 1000)}
                    >
                        Register Now
                        <Image
                            src='/images/pngs/orange-circle-background.svg'
                            position={'absolute'}
                            left='-80px'
                            width={'200px'}
                            height='200px'
                        />
                    </Button>
                </Flex>
                <Flex
                    justifyContent={['center']}
                >
                    <Button
                        height={'36px'}
                        width={'92px'}
                        background={'unset'}
                        borderRadius={'34px'}
                        border={'1px solid #FC541C'}
                        _hover={{
                            background: '#FC541C',
                        }}
                        fontFamily={'Nunito'}
                    >
                        View
                    </Button>
                </Flex>
            </Flex>
            <RegisterModalInSBC
                isOpen={isOpen}
                onClose={onClose}
                eventID={eventID}
                registerAmount={registerAmount}
                category={category}
                signature={signature}
                roundBetAmount={roundBetAmount}
            />
        </Box >
    )
}

export default TotalCurrentPrizePool
