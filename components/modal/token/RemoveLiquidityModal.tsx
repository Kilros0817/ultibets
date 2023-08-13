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
import { checkIconInGreenBg } from '../../../utils/assets';
import {
  lpTokenAddresses,
  mumbaiChainId,
  newChainAttrs,
  polygonChainId,
  uniswapV2Router02routerAddresses,
  usdcAddresses,
  utbetsTokenAddresses,
} from '../../../utils/config';
import {
  useRemoveLiquidity,
  useRemoveLiquidityETH,
  useApprove
} from '../../../utils/interact/sc/swap-router';

export type RemoveLiquidityModalProps = {
  isOpenRemoveLiquidityModal: boolean,
  onCloseRemoveLiquidityModal(): void,
  poolName: string
  isNativeUtbetsLp: boolean
}

const RemoveLiquidityModal = ({
  isOpenRemoveLiquidityModal,
  onCloseRemoveLiquidityModal,
  poolName,
  isNativeUtbetsLp,
}: RemoveLiquidityModalProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [liquidity, setLiquidity] = useState<number | null>();
  const [secondTokenName, setSecondTokenName] = useState<string>('');
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();
  // 
  const {
    isOpen: isOpenRemoveLiquiditySuccessModal,
    onOpen: onOpenRemoveLiquiditySuccessModal,
    onClose: onCloseRemoveLiquiditySuccessModal,
  } = useDisclosure();

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    setChainId(chainId);
  }, [chain])

  useEffect(() => {
    setSecondTokenName(isNativeUtbetsLp ? (newChainAttrs as any)[chainId].nativeToken : 'USDC');
  }, [chainId, isNativeUtbetsLp,])

  const { data: balanceOfLPTokenInWallet, isLoading: fetchingBalanceOfLPTokenInWallet, isError: isErrorInFetchingBalanceOfLPTokenInWallet } = useBalance({
    address: address,
    token: (lpTokenAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLp' : 'usdcUtbetsLp'],
  })

  const approve = useApprove(
    (lpTokenAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLp' : 'usdcUtbetsLp'],
    (uniswapV2Router02routerAddresses as any)[chainId],
    (liquidity ?? 0).toString(),
  )

  const handleApprove = async () => {
    if (approve.isLoading) return;

    try {
      approve.approveFunction?.();
      onOpenApproveSuccessAnnounceModal();
    } catch (err) {
      console.log('error in approve lp token to router contract: ', err);
    }
  }

  const removeLiquidity = useRemoveLiquidity(
    (utbetsTokenAddresses as any)[chainId],
    (usdcAddresses as any)[chainId],
    (liquidity ?? 0).toString(),
  );

  const handleRemoveLiquidity = async () => {
    if (isNativeUtbetsLp) return;
    if (removeLiquidity.isLoading) return;

    try {
      removeLiquidity.removeLiquidityFunction?.();
      onOpenRemoveLiquiditySuccessModal();
    } catch (err) {
      console.log('error in remove liquidity: ', err);
    }
  }

  const removeLiquidityETH = useRemoveLiquidityETH(
    (utbetsTokenAddresses as any)[chainId],
    (liquidity ?? 0).toString(),
  );

  const handleRemoveLiquidityETH = async () => {
    if (!isNativeUtbetsLp) return;
    if (removeLiquidityETH.isLoading) return;

    try {
      removeLiquidityETH.removeLiquidityETHFunction?.();
      onOpenRemoveLiquiditySuccessModal();
    } catch (err) {
      console.log('error in remove liquidity eth: ', err);
    }
  }

  const handleRemoveLiquidityForAll = () => {
    if (!isApproved) {
      handleApprove();
    } else {
      if (isNativeUtbetsLp) {
        handleRemoveLiquidityETH();
      } else {
        handleRemoveLiquidity();
      }
    }
  }

  return (
    <Flex
    >
      <Modal
        isOpen={isOpenRemoveLiquidityModal}
        onClose={() => {
          onCloseRemoveLiquidityModal();
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
            Remove Liquidity {poolName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            px='73px'
          >
            <Flex
              className='lp-token'
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
                  LP Token
                </Flex>
                <Input
                  fontFamily={'Nunito'}
                  width={'200px'}
                  variant="flushed"
                  placeholder='0'
                  value={liquidity == null ? "" : liquidity}
                  type={'number'}
                  onChange={(e) => setLiquidity(e?.target?.value ? parseFloat(e?.target?.value) : null)}
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
                    Balance: {(parseFloat(balanceOfLPTokenInWallet?.formatted ?? "0")).toFixed(1)} LP
                  </Flex>

                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'10px'}
                    justifyContent={'right'}
                    mt={'10px'}
                    onClick={() => {
                      setLiquidity(
                        parseFloat((parseFloat(balanceOfLPTokenInWallet?.formatted ?? "0")).toFixed(1))
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
                    onClick={handleApprove}
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
                    isDisabled={isApproved}
                  >
                    Approve
                  </Button>
                )
              }
              {
                address && (
                  <Button
                    onClick={handleRemoveLiquidityForAll}
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
                    isDisabled={!isApproved}
                  >
                    Remove Liquidity
                  </Button>
                )
              }
            </Flex>

          </ModalFooter>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal && approve.isSuccess}
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'Successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          setIsApproved(true);
          onCloseApproveSuccessAnnounceModal();
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenRemoveLiquiditySuccessModal && (removeLiquidity.isSuccess || removeLiquidityETH.isSuccess)}
        onCloseAnnounceModal={onCloseRemoveLiquiditySuccessModal}
        announceText={'You has been successfully removed liquidity'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseRemoveLiquiditySuccessModal();
          onCloseRemoveLiquidityModal();
          setIsApproved(false);
          setLiquidity(null);
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          (isOpenRemoveLiquiditySuccessModal && (removeLiquidity.isLoading || removeLiquidityETH.isLoading)) ||
          (isOpenApproveSuccessAnnounceModal && approve.isLoading)
        }
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default RemoveLiquidityModal
