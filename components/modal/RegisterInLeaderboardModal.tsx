import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect, } from 'react';
// @ts-ignore
import "react-datepicker/dist/react-datepicker.css";
import { checkIconInGreenBg, crossIconInRedBg } from '../../utils/assets';
import AnnounceModal from './AnnounceModal';
import { useIsUsedName, useRegisterOnLeaderboard } from '../../utils/interact/sc/ultiBetsLeaderBoard';
import { useNetwork } from 'wagmi';

type ReportResultModalProps = {
  isOpen: boolean,
  onClose: () => void
}

const RegisterInLeaderboardModal = ({
  isOpen,
  onClose,
}: ReportResultModalProps) => {
  const { chain, } = useNetwork();
  const [name, setName] = useState<string>('');
  const [isAlreadyUsed, setIsAlreadyUsed] = useState<boolean>(false);
  const {
    isOpen: isOpenSuccessAnnounceModal,
    onOpen: onOpenSuccessAnnounceModal,
    onClose: onCloseSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDuplicateNameAnnounceModal,
    onOpen: onOpenDuplicateNameAnnounceModal,
    onClose: onCloseDuplicateNameAnnounceModal,
  } = useDisclosure();

  const isUsedName = useIsUsedName(
    name,
  );

  useEffect(() => {
    if (isUsedName.isLoading) return;
    if (isUsedName.status) {
      console.log("getting isUsedName success : ", (isUsedName as any)?.result)
      setIsAlreadyUsed((isUsedName as any)?.result);
    }
  }, [
    chain?.id,
    isUsedName.isLoading,
    isUsedName.result,
  ]);

  const registerOnLeaderboard = useRegisterOnLeaderboard(
    name,
  )

  const handleRegisterOnLeaderboard = () => {
    if (isAlreadyUsed) {
      onOpenDuplicateNameAnnounceModal();
      return;
    }

    if (registerOnLeaderboard.isLoading) return;

    try {
      registerOnLeaderboard.registerOnLeaderboardFunction?.();
      onOpenSuccessAnnounceModal();
      onClose();
    } catch (err) {
      console.log('error in registering name in leaderboard: ', err);
    }
  }

  return (
    <Flex
      className='register-name-modal-wrapper'
      bg={'#1F1F1F'}
      borderRadius={'15px'}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        {' '}
        <ModalOverlay
          bg='blackAlpha.10'
          backdropFilter='blur(10px) hue-rotate(10deg)'
        />
        <ModalContent
          className='register-name-modal-content'
          width={'auto'}
          border={'1px solid white'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'40px'}
            px={['20px', '60px']}
            className='register-name-modal-body'
          >
            <Flex
              fontFamily={'Nunito'}
              fontWeight={'700'}
              fontSize={'22px'}
              lineHeight={'30px'}
              color={'white'}
              textTransform={'capitalize'}
              className='title'
            >
              Register Name
            </Flex>

            <Input
              value={name}
              mt={'30px'}
              variant="flushed"
              borderBottom={'2px solid #739AF0 !important'}
              onChange={(e) => setName(e.target.value)}
              fontFamily={'Nunito'}
              _focusVisible={{
                boxShadow: 'none',
              }}
            />

            <Flex
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'30px'}
              onClick={handleRegisterOnLeaderboard}
              fontFamily={'Nunito'}
              fontSize={'14px'}
              lineHeight={'19px'}
              cursor={'pointer'}
              width={'fit-content'}
            >
              Confirm
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenSuccessAnnounceModal && registerOnLeaderboard.isSuccess}
        onCloseAnnounceModal={onCloseSuccessAnnounceModal}
        announceText={'Your name has been successfully registered'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenSuccessAnnounceModal && registerOnLeaderboard.isLoading}
        onCloseAnnounceModal={onCloseSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenDuplicateNameAnnounceModal}
        onCloseAnnounceModal={onCloseDuplicateNameAnnounceModal}
        announceText={'Your name is already used. Please choose other name'}
        announceLogo={crossIconInRedBg}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default RegisterInLeaderboardModal
