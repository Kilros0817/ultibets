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
import React, { useState, } from 'react'
import { useAccount, } from 'wagmi';
import Account from '../../Account';
import AnnounceModal from '../AnnounceModal';
import { checkIconInGreenBg } from '../../../utils/assets';
import { useUnStake, } from '../../../utils/interact/sc/token-stake';

export type TokenUnstakeModalProps = {
  isOpenTokenUnstakeModal: boolean,
  onCloseTokenUnstakeModal(): void,
  poolName: string
  stakedAmount: number
  isNativeUtbetsLp: boolean
}

const TokenUnstakeModal = ({
  isOpenTokenUnstakeModal,
  onCloseTokenUnstakeModal,
  poolName,
  stakedAmount,
  isNativeUtbetsLp,
}: TokenUnstakeModalProps) => {
  const { address, } = useAccount();
  const [amount, setAmount] = useState<number | null>();
  const {
    isOpen: isOpenUnStakeSuccessAnnounceModal,
    onOpen: onOpenUnStakeSuccessAnnounceModal,
    onClose: onCloseUnStakeSuccessAnnounceModal,
  } = useDisclosure();

  const unStake = useUnStake(
    amount ?? 0,
    isNativeUtbetsLp
  );

  const handleUnstake = async () => {
    if ((amount ?? 0) == 0) return;
    if (unStake.isLoading) return;

    try {
      unStake.unStakeFunction?.();
      onOpenUnStakeSuccessAnnounceModal();
    } catch (err) {
      console.log('error in staking lp token: ', err);
    }
  }

  return (
    <Flex
    >
      <Modal
        isOpen={isOpenTokenUnstakeModal}
        onClose={() => {
          onCloseTokenUnstakeModal();
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
            height={'49px'}
            fontFamily={'Nunito'}
          >
            Unstake {poolName}
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
                Balance: {stakedAmount.toFixed(1)} LP
              </Flex>

              <Flex
                fontFamily={'Nunito'}
                fontSize={'10px'}
                justifyContent={'right'}
                mt={'10px'}
                onClick={() => {
                  setAmount(
                    parseFloat(stakedAmount.toFixed(1))
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
                  onClick={handleUnstake}
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
                  Unstake
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
        isOpenAnnounceModal={isOpenUnStakeSuccessAnnounceModal && unStake.isSuccess}
        onCloseAnnounceModal={onCloseUnStakeSuccessAnnounceModal}
        announceText={'You has been successfully unstaked'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
        announceModalButtonAction={() => {
          onCloseTokenUnstakeModal();
          onCloseUnStakeSuccessAnnounceModal();
          setAmount(null);
        }}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenUnStakeSuccessAnnounceModal && unStake.isLoading}
        onCloseAnnounceModal={onCloseUnStakeSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default TokenUnstakeModal
