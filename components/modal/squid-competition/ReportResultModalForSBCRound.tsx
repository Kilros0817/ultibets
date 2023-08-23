import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect, } from 'react';
import { NftSetStatus, } from '../../../utils/config';
import { useChainContext } from '../../../utils/Context';
import { checkIconInGreenBg } from '../../../utils/assets';
import { useGetWinnersNumber, useReportResultForSBCRound } from '../../../utils/interact/sc/squid-competition';
import AnnounceModal from '../AnnounceModal';
import AddNFTForSpecialCase from './AddNFTForSpecialCase';

type ReportResultModalForSBCRoundProps = {
  isOpen: boolean,
  onClose: () => void,
  eventID: number
  currentLevel: number
  totalPlayers: number
  playersInThisPhase: number
}

const ReportResultModalForSBCRound = ({
  isOpen,
  onClose,
  eventID,
  currentLevel,
  playersInThisPhase,
}: ReportResultModalForSBCRoundProps) => {
  const [result, setResult] = useState<string>('1');
  const { isNativetoken, } = useChainContext();
  const [numberOfWinnersOfThisRound, setNumberOfWinnersOfThisRound] = useState<number>();
  const [nftSetStatus, setNftSetStatus] = useState(NftSetStatus.Original);
  const {
    isOpen: isOpenReportResultSuccessAnnounceModal,
    onOpen: onOpenReportResultSuccessAnnounceModal,
    onClose: onCloseReportResultSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAddNFTForSpecialCase,
    onOpen: onOpenAddNFTForSpecialCase,
    onClose: onCloseAddNFTForSpecialCase,
  } = useDisclosure();

  const getWinnersNumber = useGetWinnersNumber(
    eventID,
    Number(result),
  )

  useEffect(() => {
    if (getWinnersNumber.isLoading) return;
    if (getWinnersNumber.status == true) {
      setNumberOfWinnersOfThisRound((getWinnersNumber as any)?.result);
      // setNumberOfWinnersOfThisRound(1);
    }
  }, [
    getWinnersNumber.isLoading,
    getWinnersNumber.result,
    isNativetoken,
    result,
  ])

  const reportResultForSBCRound = useReportResultForSBCRound(
    eventID,
    Number(result),
  )

  const handleReportResultForSBCRound = () => {
    console.log("number of winners: ", numberOfWinnersOfThisRound);

    if ((numberOfWinnersOfThisRound == 1) && (nftSetStatus < NftSetStatus.WinnerNFTSet)) {
      onOpenAddNFTForSpecialCase();
    } else {
      if (reportResultForSBCRound.isLoading) return;
      try {
        reportResultForSBCRound.reportResultFunction?.();
        onOpenReportResultSuccessAnnounceModal();
        onClose();
      } catch (err) {
        console.log('error in report result: ', err);
      }
    }
  }

  useEffect(() => {
    console.log("result: ", result);
  }, [result])

  return (
    <Flex
      className='sbc-report-result-modal-wrapper-in-sbc'
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
          className='sbc-report-result-modal-content'
          width={'auto'}
          border={'1px solid white'}
          mt={'250px'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'60px'}
            px={['20px', '60px']}
            className='sbc-report-result-modal-body'
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
              Set the Round {currentLevel} Result
            </Flex>

            <RadioGroup
              mt={'15px'}
              onChange={setResult}
              value={result}
            >
              <Stack direction='row'>
                <Radio value='1' fontFamily={'Nunito'}>Yes</Radio>
                <Radio value='2' fontFamily={'Nunito'}>No</Radio>
              </Stack>
            </RadioGroup>

            <Flex
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'40px'}
              onClick={() => handleReportResultForSBCRound()}
              fontFamily={'Nunito'}
              fontSize={'14px'}
              lineHeight={'19px'}
              cursor={'pointer'}
              width={'fit-content'}
            >
              Report Result
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenReportResultSuccessAnnounceModal && reportResultForSBCRound.isSuccess}
        onCloseAnnounceModal={onCloseReportResultSuccessAnnounceModal}
        announceText={'Result has been successfully reported'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AddNFTForSpecialCase
        isOpen={isOpenAddNFTForSpecialCase}
        onClose={onCloseAddNFTForSpecialCase}
        eventID={eventID}
        roundLevel={0}
        totalPlayers={playersInThisPhase}
        playersInThisPhase={playersInThisPhase}
        nftSetStatus={nftSetStatus}
        setNftSetStatus={setNftSetStatus}
      />
      <AnnounceModal
        isOpenAnnounceModal={
          (isOpenReportResultSuccessAnnounceModal && reportResultForSBCRound.isLoading)
        }
        onCloseAnnounceModal={onCloseReportResultSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default ReportResultModalForSBCRound
