import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState, } from 'react'
import { useAccount, useNetwork, useBalance, } from 'wagmi';
import { useRouter } from 'next/router';
import AnnounceModal from '../AnnounceModal';
import { checkIconInGreenBg, UltiBetsTokenAbi } from '../../../utils/assets';
import { chainRPCs, mumbaiChainId, newChainAttrs, polygonChainId, swapTokens, uniswapV2Router02routerAddresses, usdcAddresses, utbetsTokenAddresses } from '../../../utils/config';
import { useAddLiquidity, useAddLiquidityETH, useApprove, useGetAmountsOut } from '../../../utils/interact/sc/swap-router';
import { ethers } from 'ethers';

export type AddLiquidityModalProps = {
  isOpenAddLiquidityModal: boolean,
  onCloseAddLiquidityModal(): void,
  poolName: string
  isNativeUtbetsLp: boolean
}

const AddLiquidityModal = ({
  isOpenAddLiquidityModal,
  onCloseAddLiquidityModal,
  poolName,
  isNativeUtbetsLp,
}: AddLiquidityModalProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [amountOfToken2, setAmountOfToken2] = useState<number | null>();
  const [amountOfToken1, setAmountOfToken1] = useState<number | null>();
  const [secondTokenName, setSecondTokenName] = useState<string>('');
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const [isApprovedUtbets, setIsApprovedUtbets] = useState<boolean>(false);
  const [isApprovedUsdc, setIsApprovedUsdc] = useState<boolean>(false);
  const [tokens, setTokens] = useState<any>();
  const [focusToken, setFocusToken] = useState<number>(1);
  const [balanceOfUtbetsToken, setBalanceOfUtbetsToken] = useState<number>(0);
  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenApproveUsdcSuccessAnnounceModal,
    onOpen: onOpenApproveUsdcSuccessAnnounceModal,
    onClose: onCloseApproveUsdcSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAddLiquiditySuccessModal,
    onOpen: onOpenAddLiquiditySuccessModal,
    onClose: onCloseAddLiquiditySuccessModal,
  } = useDisclosure();

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    setChainId(chainId);

    let tokens = swapTokens.slice(0, 2);
    const nativeToken = swapTokens.find(item => item.chainId ==
      chain?.id ?? (process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ?
        polygonChainId : mumbaiChainId)
    )
    setTokens([...tokens, nativeToken]);

    (async () => {
      const tokenAddress = (utbetsTokenAddresses as any)[chainId];
      const contract = new ethers.Contract(tokenAddress, UltiBetsTokenAbi, new ethers.providers.StaticJsonRpcProvider((chainRPCs as any)[chainId]));
      const balanceOfUtbets = await contract.balanceOf(address);
      console.log("balance of utbets token: ", ethers.utils.formatEther(balanceOfUtbets));
      setBalanceOfUtbetsToken(Number(ethers.utils.formatEther(balanceOfUtbets)));
    })()
  }, [chain])

  useEffect(() => {
    setSecondTokenName(isNativeUtbetsLp ? (newChainAttrs as any)[chainId].nativeToken : 'USDC');
  }, [chainId, isNativeUtbetsLp,])

  const { data: balanceTokenInWallet, isLoading: fetchingBalanceTokenInWallet, isError: isErrorInFetchingBalanceTokenInWallet } = useBalance({
    address: address,
    token: (utbetsTokenAddresses as any)[chainId],
  })

  const { data: balanceOfUSDCInWallet, isLoading: fetchingbalanceOfUSDCInWallet, isError: isErrorInFetchingbalanceOfUSDCInWallet } = useBalance({
    address: address,
    token: (usdcAddresses as any)[chainId],
  })

  const { data: balanceInWallet, isLoading: fetchingBalanceInWallet, isError: isErrorInFetchingBalanceInWallet } = useBalance({
    address: address,
  })

  const getAmountsOut = useGetAmountsOut(
    focusToken == 1 ? (amountOfToken1 ?? 0) : (amountOfToken2 ?? 0),
    focusToken == 1 ? (swapTokens[0].address as any)[chainId]
      : (
        isNativeUtbetsLp ?
          ((tokens ? tokens[2] : swapTokens[1])?.address as any)[chainId]
          : ((tokens ? tokens[1] : swapTokens[1])?.address as any)[chainId]
      ),
    focusToken == 1 ? (isNativeUtbetsLp ?
      ((tokens ? tokens[2] : swapTokens[1])?.address as any)[chainId]
      : ((tokens ? tokens[1] : swapTokens[1])?.address as any)[chainId]
    )
      :
      (swapTokens[0].address as any)[chainId]
  );

  useEffect(() => {
    if (focusToken == 1) {
      if ((amountOfToken1 ?? 0) == 0) setAmountOfToken2(null);
    } else {
      if ((amountOfToken2 ?? 0) == 0) setAmountOfToken1(null);
    }

    if (amountOfToken1 == 0 || amountOfToken2 == 0 || amountOfToken1 == null || amountOfToken2 == null) {
      return;
    }

    if (getAmountsOut.isLoading) return;

    if (getAmountsOut.status) {
      console.log("[...getAmountsOut?.result]: ", getAmountsOut?.result)
      const expectedInput = parseFloat(Number(ethers.utils.formatEther((getAmountsOut?.result as any)[1] ?? 0)).toFixed(3));
      if (focusToken == 1) {
        setAmountOfToken2(expectedInput);
      } else {
        setAmountOfToken1(expectedInput);
      }
    }
  }, [
    chainId,
    address,
    tokens,
    focusToken,
    focusToken == 1 ? amountOfToken1 : amountOfToken2,
    getAmountsOut.isLoading,
    getAmountsOut.result,
  ])

  const handleAmountOfToken2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountOfToken2(e?.target?.value ? parseFloat(e?.target?.value) : null);
    setFocusToken(2);
  }

  const handleAmountOfToken1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountOfToken1(e?.target?.value ? parseFloat(e?.target?.value) : null);
    setFocusToken(1);
  }

  const approveUtbets = useApprove(
    (utbetsTokenAddresses as any)[chainId],
    (uniswapV2Router02routerAddresses as any)[chainId],
    (amountOfToken1 ?? 0)?.toString(),
  );

  const handleApproveUtbets = async () => {
    if ((amountOfToken1 ?? 0) == 0) return;
    if (approveUtbets.isLoading) return;

    try {
      approveUtbets.approveFunction?.();
      onOpenApproveSuccessAnnounceModal();
    } catch (err) {
      console.log('error in approve utbets token: ', err);
    }
  }

  const approveUsdc = useApprove(
    (usdcAddresses as any)[chainId],
    (uniswapV2Router02routerAddresses as any)[chainId],
    (amountOfToken2 ?? 0)?.toString(),
    true,
  );

  const handleApproveUsdc = async () => {
    if (isNativeUtbetsLp) return;
    if ((amountOfToken2 ?? 0) == 0) return;
    if (approveUsdc.isLoading) return;

    try {
      approveUsdc.approveFunction?.();
      onOpenApproveUsdcSuccessAnnounceModal();
    } catch (err) {
      console.log('error in approve usdc token: ', err);
    }
  }

  const addLiquidity = useAddLiquidity(
    (utbetsTokenAddresses as any)[chainId],
    (usdcAddresses as any)[chainId],
    (amountOfToken1 ?? 0).toString(),
    (amountOfToken2 ?? 0).toString(),
    true,
  );

  const handleAddLiquidity = async () => {
    if (isNativeUtbetsLp) return;
    if (!isApprovedUsdc || !isApprovedUtbets) return;
    if (addLiquidity.isLoading) return;

    try {
      addLiquidity.addLiquidityFunction?.();
      onOpenAddLiquiditySuccessModal();
    } catch (err) {
      console.log('error in add liquidity: ', err);
    }
  }

  const addLiquidityETH = useAddLiquidityETH(
    (utbetsTokenAddresses as any)[chainId],
    (amountOfToken1 ?? 0).toString(),
    (amountOfToken2 ?? 0).toString(),
  );

  const handleAddLiquidityETH = async () => {
    if (!isNativeUtbetsLp) return;
    if (!isApprovedUtbets) return;
    if (addLiquidityETH.isLoading) return;

    try {
      addLiquidityETH.addLiquidityETHFunction?.();
      onOpenAddLiquiditySuccessModal();
    } catch (err) {
      console.log('error in add liquidity eth: ', err);
    }
  }

  const handleAddLiquidityForAll = () => {
    if (isNativeUtbetsLp) {
      handleAddLiquidityETH();
    } else {
      handleAddLiquidity();
    }
  }


  return (
    <Flex
    >
      <Modal
        isOpen={isOpenAddLiquidityModal}
        onClose={() => {
          onCloseAddLiquidityModal();
          setAmountOfToken1(null);
          setAmountOfToken2(null);
        }}
      >
        <ModalOverlay
          bg='blackAlpha.10'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent
          border={'1px solid white'}
        >
          <ModalHeader
            fontFamily={'Nunito'}
            height={'49px'}
          >
            Add Liquidity {poolName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            px='73px'
          >
            <Flex
              className='token-a'
              direction={'column'}
            >
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                gap='5px'
              >
                <Flex
                  fontFamily={'Nunito'}
                  textTransform={'capitalize'}
                >
                  UTBETS
                </Flex>
                <Input
                  fontFamily={'Nunito'}
                  width={'250px'}
                  variant="flushed"
                  placeholder='0'
                  value={amountOfToken1 == null ? "" : amountOfToken1}
                  type={'number'}
                  onChange={(e) => setAmountOfToken1(e?.target?.value ? parseFloat(e?.target?.value) : null)}
                  mr='10px'
                  textAlign={'right'}
                />
              </Flex>

              <Flex
                justifyContent={'right'}
              >
                <Flex
                  gap={'10px'}
                >
                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'10px'}
                    justifyContent={'right'}
                    mt={'10px'}
                    width={'200px'}
                  >
                    Balance: {(parseFloat(balanceTokenInWallet?.formatted ?? "0")).toFixed(1)} Utbets
                  </Flex>

                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'10px'}
                    justifyContent={'right'}
                    mt={'10px'}
                    onClick={() => {
                      setAmountOfToken1(
                        parseFloat((parseFloat(balanceTokenInWallet?.formatted ?? "0")).toFixed(1))
                      );
                    }}
                    cursor={'pointer'}
                    px={'10px'}
                    border={'1px solid white'}
                    borderRadius={'5px'}
                  >
                    MAX
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className='token-b'
              direction={'column'}
            >
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                gap='5px'
              >
                <Flex
                  fontFamily={'Nunito'}
                  textTransform={'capitalize'}
                >
                  {secondTokenName}
                </Flex>
                <Input
                  fontFamily={'Nunito'}
                  width={'250px'}
                  variant="flushed"
                  placeholder='0'
                  value={amountOfToken2 == null ? "" : amountOfToken2}
                  type={'number'}
                  onChange={(e) => handleAmountOfToken2(e)}
                  mr='10px'
                  textAlign={'right'}
                />
              </Flex>

              <Flex
                justifyContent={'right'}
              >
                <Flex
                  gap={'10px'}
                >
                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'10px'}
                    justifyContent={'right'}
                    mt={'10px'}
                    width={'200px'}
                  >
                    Balance: {(parseFloat((isNativeUtbetsLp ? balanceInWallet : balanceOfUSDCInWallet)?.formatted ?? "0")).toFixed(1)} {secondTokenName}
                  </Flex>

                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'10px'}
                    justifyContent={'right'}
                    mt={'10px'}
                    onClick={() => {
                      setAmountOfToken2(
                        parseFloat(parseFloat((isNativeUtbetsLp ? balanceInWallet : balanceOfUSDCInWallet)?.formatted ?? "0").toFixed(1))
                      );
                    }}
                    cursor={'pointer'}
                    px={'10px'}
                    border={'1px solid white'}
                    borderRadius={'5px'}
                  >
                    MAX
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

          </ModalBody>
          <ModalFooter
            justifyContent={'center'}
            px='73px'
            mb='53px'
            mt='25px'
            py='0'
          >
            <Flex
              direction={'column'}
              gap={'20px'}
            >
              {
                address && (
                  <Button
                    onClick={handleApproveUtbets}
                    height={'46px'}
                    width={'255px'}
                    background={'unset'}
                    borderRadius={'34px'}
                    border={'1px solid #FC541C'}
                    _hover={{
                      background: '#FC541C',
                    }}
                    fontSize={'20px'}
                    py='0'
                    fontFamily={'Nunito'}
                    isDisabled={isApprovedUtbets}
                  >
                    Approve UTBETS
                  </Button>
                )
              }
              {
                !isNativeUtbetsLp && address && (
                  <Button
                    onClick={handleApproveUsdc}
                    height={'46px'}
                    width={'255px'}
                    background={'unset'}
                    borderRadius={'34px'}
                    border={'1px solid #FC541C'}
                    _hover={{
                      background: '#FC541C',
                    }}
                    fontSize={'20px'}
                    py='0'
                    fontFamily={'Nunito'}
                    isDisabled={isApprovedUsdc}
                  >
                    Approve {secondTokenName}
                  </Button>
                )
              }
              {
                address && (
                  <Button
                    onClick={handleAddLiquidityForAll}
                    height={'46px'}
                    width={'255px'}
                    background={'unset'}
                    borderRadius={'34px'}
                    border={'1px solid #FC541C'}
                    _hover={{
                      background: '#FC541C',
                    }}
                    fontSize={'20px'}
                    py='0'
                    fontFamily={'Nunito'}
                    isDisabled={
                      isNativeUtbetsLp ? !isApprovedUtbets :
                        (!isApprovedUsdc || !isApprovedUtbets)
                    }
                  >
                    Add Liquidity
                  </Button>
                )
              }
            </Flex>

          </ModalFooter>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal && approveUtbets.isSuccess}
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'UTBETS successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          setIsApprovedUtbets(true);
          onCloseApproveSuccessAnnounceModal();
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveUsdcSuccessAnnounceModal && approveUsdc.isSuccess && !isNativeUtbetsLp}
        onCloseAnnounceModal={onCloseApproveUsdcSuccessAnnounceModal}
        announceText={'USDC successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          setIsApprovedUsdc(true);
          onCloseApproveUsdcSuccessAnnounceModal();
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenAddLiquiditySuccessModal && (addLiquidity.isSuccess || addLiquidityETH.isSuccess)}
        onCloseAnnounceModal={onCloseAddLiquiditySuccessModal}
        announceText={'You has been successfully added liquidity'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseAddLiquiditySuccessModal();
          onCloseAddLiquidityModal();
          setIsApprovedUsdc(false);
          setIsApprovedUtbets(false);
          setAmountOfToken1(null);
          setAmountOfToken2(null);
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          (isOpenApproveSuccessAnnounceModal && approveUtbets.isLoading) ||
          (isOpenApproveSuccessAnnounceModal && approveUsdc.isLoading && !isNativeUtbetsLp) ||
          (isOpenAddLiquiditySuccessModal && (addLiquidity.isLoading || addLiquidityETH.isLoading))
        }
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default AddLiquidityModal
