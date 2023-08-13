import {
  Box,
  Flex,
  Image,
  Switch,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react'
import UtBetsTokenRoutes from "../tokenRoutes";
import {
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  swapTokens,
  uniswapV2Router02routerAddresses,
  usdcAddresses,
  utbetsTokenAddresses,
} from '../../../utils/config';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import {
  useGetAmountsOut,
  useSwapExactETHForTokens,
  useSwapExactTokensForETH,
  useSwapExactTokensForTokens,
  useApprove,
} from '../../../utils/interact/sc/swap-router';
import { checkIconInGreenBg } from '../../../utils/assets';
import AnnounceModal from '../../../components/modal/AnnounceModal';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { checkIfWalletConnected } from '../../../utils/interact/utility';

const BuyUtbets = () => {
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [amount, setAmount] = useState<string | null>();
  const [balance, setBalance] = useState<number>(0);
  const [expectedOutput, setExpectedOutput] = useState<number>(0);
  const [paymentToken, setPaymentToken] = useState(0);
  const [receiveToken, setReceiveToken] = useState(1);
  const [isCandleStickVisible, setIsCandleStickVisible] = useState(false);
  const [tokens, setTokens] = useState<any>();
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const {
    isOpen: isOpenSwapSuccessAnnounceModal,
    onOpen: onOpenSwapSuccessAnnounceModal,
    onClose: onCloseSwapSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();

  useEffect(() => {
    let tokens = swapTokens.slice(0, 2);
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;

    const nativeToken = swapTokens.find(item => item.chainId == chainId)
    setTokens([...tokens, nativeToken]);
  }, [chain])

  // handle input
  const handlePaymentTokenChange = (index: number) => {
    setPaymentToken(index);
    setAmount(null);

    switch (index) {
      case 0:
        setReceiveToken(receiveToken == 0 ? 1 : receiveToken);
        break;
      default:
        setReceiveToken(0);
    }
  }
  const handleReceiveTokenChange = (index: number) => {
    setAmount(null);
    setReceiveToken(index);
  }

  // handle expected output
  const getAmountsOut = useGetAmountsOut(
    parseFloat(amount ?? '0'),
    tokens ? tokens[paymentToken]?.address[chainId] : (swapTokens[0] as any).address[chainId],
    tokens ? tokens[receiveToken]?.address[chainId] : (swapTokens[1] as any).address[chainId],
  );

  useEffect(() => {
    if (parseFloat(amount ?? ' 0') == 0) setExpectedOutput(0);
    if (amount == '0' || amount == null) {
      return;
    }
    if (getAmountsOut.isLoading) return;
    if (getAmountsOut.status) {
      console.log("[...getAmountsOut?.result]: ", getAmountsOut?.result)
      // @ts-ignore
      setExpectedOutput(Number(ethers.utils.formatEther(getAmountsOut?.result[1] ?? 0)));
    }
  }, [
    chainId,
    address,
    tokens,
    paymentToken,
    receiveToken,
    amount,
    getAmountsOut.isLoading,
    getAmountsOut.result,
  ])

  // fetch balance
  const {
    data: balanceOfNativeToken,
    isError: isErrorInBalanceOfNatieToken,
    isLoading: isLoadingInBalanceOfNatieToken,
  } = useBalance({
    address: address,
  })
  const {
    data: balanceOfCurrentToken,
    isError: isErrorInBalanceOfCurrentToken,
    isLoading: isLoadingInBalanceOfCurrentToken,
  } = useBalance({
    address: address,
    token: paymentToken == 1 ? (usdcAddresses as any)[chainId] : (utbetsTokenAddresses as any)[chainId],
  })
  useEffect(() => {
    if (paymentToken < 2) setBalance(parseFloat(balanceOfCurrentToken?.formatted ?? '0'));
    if (paymentToken == 2) setBalance(parseFloat(balanceOfNativeToken?.formatted ?? '0'));
  }, [
    paymentToken,
    address,
    chainId,
    balanceOfCurrentToken,
    balanceOfNativeToken,
  ])

  // swap token
  const swapExactETHForTokens = useSwapExactETHForTokens(
    parseFloat(amount ?? '0'),
  )
  const swapExactTokensForETH = useSwapExactTokensForETH(
    parseFloat(amount ?? '0'),
  )
  const swapExactTokensForTokens = useSwapExactTokensForTokens(
    parseFloat(amount ?? '0'),
    paymentToken,
  )
  const approve = useApprove(
    paymentToken == 0 ? (utbetsTokenAddresses as any)[chainId] : (usdcAddresses as any)[chainId],
    (uniswapV2Router02routerAddresses as any)[chainId],
    amount ?? '0',
  )
  const handleSwap = () => {
    if (!checkIfWalletConnected(address)) return;

    if (paymentToken != 0 && receiveToken != 0) {
      toast.warn('Please select utbets token to swap');
      return;
    }

    if (amount?.length == 0 || parseFloat(amount ?? '0') == 0) {
      toast.warn('Please type exact amount at first');
      return;
    }

    if (paymentToken == 2 && receiveToken == 0) {
      // native -> utbets
      if (swapExactETHForTokens.isLoading) return;
      try {
        swapExactETHForTokens.swapExactETHForTokensFunction?.();
        onOpenSwapSuccessAnnounceModal();
      } catch (err) {
        console.log('error in swap eth for tokens: ', err);
      }
    } else if (paymentToken == 0 && receiveToken == 2) {
      // check approve
      if (!isApproved) {
        if (approve.isLoading) return;
        approve.approveFunction?.();
        onOpenApproveSuccessAnnounceModal();
      } else {
        // utbets -> native token
        if (swapExactTokensForETH.isLoading) return;
        try {
          swapExactTokensForETH.swapExactTokensForETHFunction?.();
          onOpenSwapSuccessAnnounceModal();
        } catch (err) {
          console.log('error in swap exact tokens for eth: ', err);
        }
      }
    } else {
      // utbets -> usdc token
      // usdc -> utbets token

      if (!isApproved) {
        if (approve.isLoading) return;
        approve.approveFunction?.();
        onOpenApproveSuccessAnnounceModal();
      } else {
        if (swapExactTokensForTokens.isLoading) return;
        try {
          swapExactTokensForTokens.swapExactTokensForTokensFunction?.();
          onOpenSwapSuccessAnnounceModal();
        } catch (err) {
          console.log('error in swap exact tokens for tokens: ', err);
        }
      }
    }
  }

  return (
    <Flex
      direction='column'
    >
      <UtBetsTokenRoutes />

      {
        tokens && (<Flex
          justifyContent={'center'}
          direction={['column', 'column', 'column', 'row']}
        >
          <Flex
            width={['100%', '100%', '100%', '50%']}
            justifyContent={'center'}
            alignItems='center'
            display={isCandleStickVisible ? 'flex' : 'none'}
          >
            <Image
              width={'100%'}
              height={'100%'}
              src={"/images/pngs/trading-candlestick.png"}
              alt="trading-candlestick"
              py='20'
              px={['10', '20']}
            />
          </Flex>

          <Flex
            width={['100%', '100%', '100%', '50%']}
            justifyContent={'center'}
            direction={'column'}
            px='10'
            zIndex={'3'}
            mt={'60px'}
          >
            <Flex
              mt={['20px', '40px', '40px', '80px']}
              mb='40px'
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Flex
                  gap={'20px'}
                  mb='5'
                >
                  {' '}
                  <Switch
                    colorScheme="orange"
                    size="lg"
                    isChecked={isCandleStickVisible}
                    onChange={() => setIsCandleStickVisible(!isCandleStickVisible)}
                  />
                  <Text
                    fontFamily={'Nunito'}
                    fontWeight={'700'}
                    fontSize={'18px'}
                    lineHeight={'25px'}
                    color={'white'}
                    textTransform={'capitalize'}
                  >
                    show UTBETS Chart
                  </Text>
                </Flex>

                <Flex
                  width={['300px', '350px', '550px', '480px', '600px']}
                  borderRadius={'5px'}
                  direction='column'
                  border={'1px solid #FFFFFF'}
                  cursor={'pointer'}
                  position='relative'
                >
                  {/* payment token*/}

                  <Flex
                    direction={'column'}
                    cursor={'pointer'}
                    borderBottom='1px solid white'
                    px={['15px', '20px', '40px', '40px']}
                    pt='9'
                    pb='5'
                  >
                    <Flex
                      width='100%'
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      direction={'row'}
                      cursor={'pointer'}
                      fontSize='25'
                    >
                      <Input
                        width={'120px'}
                        variant="flushed"
                        placeholder='0.0'
                        value={amount == null ? "" : amount}
                        type={'number'}
                        onChange={(e) => setAmount(e?.target?.value == '' ? null : e?.target?.value)}
                        mr='10px'
                        textAlign={'left'}
                        border={'none'}
                        fontFamily={'Nunito'}
                        fontWeight={'700'}
                        lineHeight={'30px'}
                        fontSize={'22px'}
                        _focusVisible={{
                          border: 'none',
                        }}
                      />

                      <Menu>
                        <MenuButton
                          as={Button}
                          px='0'
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
                          fontSize='25'
                        >
                          <Flex
                            direction='row'
                            alignSelf='center'
                            alignItems='center'
                          >
                            <Image
                              width={'25px'}
                              height={'25px'}
                              src={tokens[paymentToken].logo}
                              alt={tokens[paymentToken].alt}
                              mr='3'
                            />
                            {
                              tokens[paymentToken].name
                            }
                          </Flex>
                        </MenuButton>
                        <MenuList
                          backgroundColor={'black'}
                        >
                          {
                            tokens && tokens.map((item: any, index: number) => (
                              <MenuItem
                                _hover={{
                                  backgroundColor: 'green',
                                }}
                                _focus={{
                                  backgroundColor: 'green',
                                }}
                                onClick={() => handlePaymentTokenChange(index)}
                                key={index}
                              >
                                <Image
                                  width={'25px'}
                                  height={'25px'}
                                  src={item?.logo}
                                  alt={item?.alt}
                                  mr='3'
                                />
                                {item.name}
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Flex
                      justifyContent={'space-between'}
                    >
                      <Flex
                        textAlign='left'
                        justifyContent={'left'}
                        fontSize={'12px'}
                      >
                        Balance: {balance.toFixed(2)} {tokens[paymentToken].name}
                      </Flex>
                      <Flex
                        position={'relative'}
                        textAlign='right'
                        justifyContent={'right'}
                      >
                        <Flex
                          zIndex={'4'}
                          position={'absolute'}
                          fontSize={'12px'}
                          right={'35px'}
                          border={'1px solid white'}
                          px={'10px'}
                          borderRadius={'5px'}
                          cursor={'pointer'}
                          onClick={() => {
                            console.log("balance: ", balance);
                            console.log("amount: ", amount);
                            setAmount(balance.toFixed(2));
                          }}
                        >
                          MAX
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                  {/* receive token*/}
                  <Flex
                    direction={'column'}
                    cursor={'pointer'}
                    pt='9'
                    pb='9'
                    px={['15px', '20px', '40px', '40px']}
                  >
                    <Flex
                      width='100%'
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      direction={'row'}
                      cursor={'pointer'}
                      fontSize='25'
                    >
                      <Text
                        fontFamily={'Nunito'}
                        fontWeight={'700'}
                        lineHeight={'30px'}
                        fontSize={'22px'}
                      >
                        {expectedOutput.toFixed(1)}
                      </Text>
                      <Menu>
                        <MenuButton
                          as={Button}
                          px='0'
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
                          fontSize='25'
                        >
                          <Flex
                            direction='row'
                            alignSelf='center'
                            alignItems='center'
                          >
                            <Image
                              width={'25px'}
                              height={'25px'}
                              src={tokens[receiveToken].logo}
                              alt={tokens[receiveToken].alt}
                              mr='3'
                            />
                            {
                              tokens[receiveToken].name
                            }
                          </Flex>
                        </MenuButton>
                        <MenuList
                          backgroundColor={'black'}
                        >
                          {
                            tokens.map((item: any, index: number) => (
                              <MenuItem
                                _hover={{
                                  backgroundColor: 'green',
                                }}
                                _focus={{
                                  backgroundColor: 'green',
                                }}
                                onClick={() => handleReceiveTokenChange(index)}
                                key={index}
                                display={(index != paymentToken && index + paymentToken <= 2) ? 'flex' : 'none'}
                              >
                                <Image
                                  width={'25px'}
                                  height={'25px'}
                                  src={item.logo}
                                  alt={item.alt}
                                  mr='3'
                                />
                                {item.name}
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>
                  <Flex
                    position='absolute'
                    width={'100%'}
                    justifyContent={'center'}
                    top={'78px'}
                  >
                    <Flex
                      borderRadius='50%'
                      width='75px'
                      height='75px'
                      backgroundColor={'#1F1F1F'}
                      border='1px solid white'
                      textAlign='center'
                      justify='center'
                      alignItems='center'
                      onClick={() => {
                        setPaymentToken(receiveToken);
                        setReceiveToken(paymentToken);
                        setAmount(null);
                      }}
                    >
                      <Image
                        width={'30px'}
                        height={'30px'}
                        src="/images/pngs/replace.svg"
                        alt='replace'
                      />
                    </Flex>
                  </Flex>

                </Flex>
              </Box>
            </Flex>
            <Flex
              mb='60px'
              justifyContent={'center'}
              gap={'50px'}
              direction={['column', 'row']}
            >
              {
                (paymentToken != 2 || receiveToken != 0) && (<Button
                  border='1px solid #FC541C'
                  px='41px'
                  py='10px'
                  borderRadius='34px'
                  background='transparent'
                  _hover={{
                    backgroundColor: '#FC541C',
                  }}
                  _active={{
                    backgroundColor: '#FC541C',
                  }}
                  onClick={() => handleSwap()}
                  isDisabled={isApproved}
                >
                  Approve
                </Button>)
              }

              <Button
                border='1px solid #FC541C'
                px='41px'
                py='10px'
                borderRadius='34px'
                background='transparent'
                _hover={{
                  backgroundColor: '#FC541C',
                }}
                _active={{
                  backgroundColor: '#FC541C',
                }}
                onClick={() => handleSwap()}
                isDisabled={
                  (paymentToken != 2 || receiveToken != 0) && !isApproved
                }
              >
                Swap
              </Button>
            </Flex>
          </Flex>
        </Flex>)
      }

      <Image
        src='/images/pngs/left-white-gradient-1.svg'
        alt='left-white-gradient'
        position='absolute'
        bottom='10%'
        left='0'
        zIndex='1'
      />
      <Image
        src='/images/pngs/right-white-gradient-1.svg'
        alt='right-white-gradient'
        position='absolute'
        top='10%'
        right='0'
        zIndex='1'
      />
      {
        tokens && (
          <>
            <AnnounceModal
              isOpenAnnounceModal={
                isOpenSwapSuccessAnnounceModal &&
                (
                  (swapExactETHForTokens.isSuccess && paymentToken == 2 && receiveToken == 0)
                  || (swapExactTokensForETH.isSuccess && paymentToken == 0 && receiveToken == 2)
                  || (swapExactTokensForTokens.isSuccess && paymentToken == 0 && receiveToken == 1)
                  || (swapExactTokensForTokens.isSuccess && paymentToken == 1 && receiveToken == 0)
                )
              }
              onCloseAnnounceModal={() => {
                if (paymentToken != 2) setIsApproved(false);
                setExpectedOutput(0);
                setAmount(null);
                onCloseSwapSuccessAnnounceModal();
              }}
              announceText={'Swap has successfully done'}
              announceLogo={checkIconInGreenBg}
              announceModalButtonText={'Close'}
            />
            <AnnounceModal
              isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal && approve.isSuccess}
              onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
              announceText={'Approve has successfully done'}
              announceLogo={checkIconInGreenBg}
              announceModalButtonText={'Swap'}
              announceModalButtonAction={
                () => {
                  setIsApproved(true);
                  onCloseApproveSuccessAnnounceModal();
                }
              }
            />

            <AnnounceModal
              isOpenAnnounceModal={
                (isOpenApproveSuccessAnnounceModal && approve.isLoading) ||
                (isOpenSwapSuccessAnnounceModal && (
                  swapExactETHForTokens.isLoading || swapExactTokensForETH.isLoading || swapExactTokensForTokens.isLoading
                ))
              }
              onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
              announceText={'Your transaction is currently processing on the blockchain'}
              announceGif={true}
              announceModalButtonText={'Close'}
            />
          </>
        )
      }
    </Flex>
  )
}

export default BuyUtbets
