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
import Account from '../../Account';
import AnnounceModal from '../AnnounceModal';
import { checkIconInGreenBg } from '../../../utils/assets';
import { useStake, } from '../../../utils/interact/sc/token-stake';
import { useApprove, } from '../../../utils/interact/sc/token-pair';
import { lpTokenAddresses, mumbaiChainId, newChainAttrs, polygonChainId } from '../../../utils/config';
const crossIconInRedBg = "/images/svgs/modal/cross-icon-in-red-bg.svg";

export type TokenStakeModalProps = {
  isOpenTokenStakeModal: boolean,
  onCloseTokenStakeModal(): void,
  poolName: string
  isNativeUtbetsLp: boolean
}

const TokenStakeModal = ({
  isOpenTokenStakeModal,
  onCloseTokenStakeModal,
  poolName,
  isNativeUtbetsLp,
}: TokenStakeModalProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { address, } = useAccount();
  const [amount, setAmount] = useState<number | null>();
  const [isStake, setIsStake] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(polygonChainId);
  const {
    isOpen: isOpenAnnounceModal,
    onOpen: onOpenAnnounceModal,
    onClose: onCloseAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenStakeSuccessAnnounceModal,
    onOpen: onOpenStakeSuccessAnnounceModal,
    onClose: onCloseStakeSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenApproveSuccessAnnounceModal,
    onOpen: onOpenApproveSuccessAnnounceModal,
    onClose: onCloseApproveSuccessAnnounceModal,
  } = useDisclosure();

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    setChainId(chainId);
  }, [chain])

  const { data: balanceTokenInWallet, isLoading: fetchingBalanceTokenInWallet, isError: isErrorInFetchingBalanceTokenInWallet } = useBalance({
    address: address,
    token: (lpTokenAddresses as any)[chainId][isNativeUtbetsLp ? 'nativeUtbetsLp' : 'usdcUtbetsLp'],
  })

  const approve = useApprove(
    amount ?? 0,
    isNativeUtbetsLp
  );

  const handleApprove = async () => {
    if ((amount ?? 0) == 0) return;
    if (approve.isLoading) return;

    try {
      approve.approveFunction?.();
      onOpenApproveSuccessAnnounceModal();
    } catch (err) {
      console.log('error in approve lp token: ', err);
    }
  }

  const stake = useStake(
    amount ?? 0,
    isNativeUtbetsLp
  );

  const handleStake = async () => {
    if ((amount ?? 0) == 0) return;
    if (stake.isLoading) return;

    if ((amount ?? 0) > parseFloat(balanceTokenInWallet?.formatted ?? '0')) {
      onOpenAnnounceModal();
      return;
    }

    try {
      stake.stakeFunction?.();
      onOpenStakeSuccessAnnounceModal();
    } catch (err) {
      console.log('error in staking lp token: ', err);
    }
  }

  const handleStakeAndApprove = () => {
    if (isStake) {
      handleStake();
    } else {
      handleApprove();
    }
  }


  return (
    <Flex
    >
      <Modal
        isOpen={isOpenTokenStakeModal}
        onClose={() => {
          onCloseTokenStakeModal();
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
            {isStake ? 'Stake' : 'Approve'} {poolName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            px='73px'
          >
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              gap='5px'
            >
              <Flex
                fontFamily={'Nunito'}
              >
                Amount
              </Flex>
              <Input
                fontFamily={'Nunito'}
                width={'250px'}
                variant="flushed"
                placeholder='0'
                value={amount == null ? "" : amount}
                type={'number'}
                onChange={(e) => setAmount(e?.target?.value ? parseFloat(e?.target?.value) : null)}
                mr='10px'
                textAlign={'right'}
              />
              <Flex
                fontFamily={'Nunito'}
              >
                LP
              </Flex>
            </Flex>

            <Flex
              justifyContent={'space-between'}
            >
              <Flex
                fontFamily={'Nunito'}
                fontSize={'10px'}
                justifyContent={'right'}
                mt={'10px'}
              >
                Balance: {(parseFloat(balanceTokenInWallet?.formatted ?? "0")).toFixed(1)} LP
              </Flex>

              <Flex
                fontFamily={'Nunito'}
                fontSize={'10px'}
                justifyContent={'right'}
                mt={'10px'}
                onClick={() => {
                  setAmount(
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



          </ModalBody>
          <ModalFooter
            justifyContent={'center'}
            px='73px'
            mb='53px'
            mt='25px'
            py='0'
          >
            {
              address && (
                <Button
                  onClick={handleStakeAndApprove}
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
                >
                  {isStake ? 'Stake' : 'Approve'}
                </Button>
              )
            }
            {
              !address && (
                <Account />
              )
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenApproveSuccessAnnounceModal && approve.isSuccess}
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'Successfully approved'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Go to Stake'}
        announceModalButtonAction={() => {
          setIsStake(true);
          onCloseApproveSuccessAnnounceModal();
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenStakeSuccessAnnounceModal && stake.isSuccess}
        onCloseAnnounceModal={onCloseStakeSuccessAnnounceModal}
        announceText={'You has been successfully staked'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseStakeSuccessAnnounceModal();
          onCloseTokenStakeModal();
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenAnnounceModal}
        onCloseAnnounceModal={onCloseAnnounceModal}
        announceText={'You don’t have enough lp token to stake'}
        announceLogo={crossIconInRedBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          setIsStake(false);
          onCloseAnnounceModal();
        }}
      />

      <AnnounceModal
        isOpenAnnounceModal={
          (isOpenApproveSuccessAnnounceModal && approve.isLoading) ||
          (isOpenStakeSuccessAnnounceModal && stake.isLoading)
        }
        onCloseAnnounceModal={onCloseApproveSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default TokenStakeModal
