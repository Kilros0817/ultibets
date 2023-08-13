import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, } from 'react';
// @ts-ignore
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { EventType, sidebarItems, subCategoriesInPredictionMarkets } from '../../utils/config';
import { checkIconInGreenBg } from '../../utils/assets';
import { useReportResult, } from '../../utils/interact/sc/prediction-markets';
import AnnounceModal from './AnnounceModal';
import axios from 'axios';
import { useNetwork } from 'wagmi';

type ReportResultModalProps = {
  isOpen: boolean,
  onClose: () => void,
  eventID: number,
  bettingLogo: string,
  description: string,
  category: number,
  subcategory: number,
  eventStartTime: number,
  repeatLevel: number,
  setIsProcessing: (isProcessing: boolean) => void,
  setAllChainTxAnnounceResult: (allChainTxAnnounceResult: any) => void,
  onOpenAllChainTxAnnounceModal: () => void
}

const ReportResultModal = ({
  isOpen,
  onClose,
  eventID,
  bettingLogo,
  description,
  category,
  subcategory,
  eventStartTime,
  repeatLevel,
  setIsProcessing,
  setAllChainTxAnnounceResult,
  onOpenAllChainTxAnnounceModal,
}: ReportResultModalProps) => {
  const { chain, } = useNetwork();
  const [result, setResult] = useState<number>(1);
  const {
    isOpen: isOpenReportResultSuccessAnnounceModal,
    onOpen: onOpenReportResultSuccessAnnounceModal,
    onClose: onCloseReportResultSuccessAnnounceModal,
  } = useDisclosure();

  const reportResult = useReportResult(
    eventID,
    // in sc, result starts from 0 but in frontend, result starts from 1
    result - 1,
  )

  const handleReportResultInRepeatLevel0 = () => {
    if (reportResult.isLoading) return;
    try {
      reportResult.reportResultFunction?.();
      onOpenReportResultSuccessAnnounceModal();
      onClose();
    } catch (err) {
      console.log('error in reporting result in  daily event in repeat level 0 ', err);
    }
  }

  const handleReportResultInRepeatLevel_1_2 = async (repeatLevel: number) => {
    try {
      setIsProcessing(true);
      const data = {
        eventID: eventID,
        // in sc, result starts from 0 but in frontend, result starts from 1
        result: result - 1,
        repeatLevel: repeatLevel,
        chainId: chain?.id ?? 0,
      };

      console.log("data: ", data);

      const response = (await axios.post(
        '/api/reportEventResultAllInPM',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })).data;

      console.log("**********   response: ", response);
      if (response.isSuccess) {
        setAllChainTxAnnounceResult(response.result);
        onOpenAllChainTxAnnounceModal();
      }
    } catch (err) {
      console.log('error in reporting result in  daily event in repeat level 2 ', err);
    }
    setIsProcessing(false);
  }

  const handleReportResult = () => {
    if (repeatLevel >= 1) {
      handleReportResultInRepeatLevel_1_2(repeatLevel);
    } else {
      handleReportResultInRepeatLevel0();
    }
  }

  return (
    <Flex
      className='report-result-modal-wrapper'
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
          className='report-result-modal-content'
          width={'auto'}
          border={'1px solid white'}
        >
          <ModalCloseButton />
          <ModalBody
            py={'60px'}
            px={['20px', '60px']}
            className='report-result-modal-body'
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
              Report results
            </Flex>

            <Flex
              alignItems={'center'}
              gap={'7px'}
              className='logo-and-cateogry'
              mt={'20px'}
            >
              <Image
                width={'20px'}
                height={'20px'}
                src={bettingLogo}
              />
              <Text
                fontFamily={'Nunito'}
                fontSize={'18px'}
                fontWeight={'700'}
                lineHeight={'25px'}
                letterSpacing={'0em'}
                textAlign={'left'}
              >
                {/* Series A */}
                {
                  //@ts-ignore
                  subCategoriesInPredictionMarkets[category][subcategory].name
                }
              </Text>
            </Flex>
            <Text
              fontFamily={'Nunito'}
              fontSize={'17px'}
              fontWeight={'700'}
              lineHeight={'23px'}
              letterSpacing={'0em'}
              textAlign={'left'}
              className='description'
              mt={'10px'}
            >
              {/* Atalanta - Sampdoria */}
              {description}
            </Text>

            <Flex
              fontFamily={'Nunito'}
              fontSize={'17px'}
              fontWeight={'700'}
              lineHeight={'23px'}
              letterSpacing={'0em'}
              mt={'15px'}
              className='event-start-time'
            >
              {`Start : `}
              {/* 20:00 UTC */}
              <Moment format="YYYY.MM.DD HH:mm">
                {new Date(parseInt(eventStartTime + '000'))}
              </Moment>
            </Flex>

            <Flex
              fontFamily={'Nunito'}
              fontSize={'17px'}
              fontWeight={'700'}
              lineHeight={'23px'}
              letterSpacing={'0em'}
              mt={'15px'}
              className='current-time'
            >
              {`Current : `}
              {/* 20:00 UTC */}
              <Moment format="YYYY.MM.DD HH:mm">
                {new Date()}
              </Moment>
            </Flex>

            <Flex
              className='result-select-wrapper-in-admin-page'
              mt={'21px'}
            >
              <Select
                placeholder='Select Result'
                border={'2px solid #739AF0 !important'}
                fontFamily={'Nunito'}
                fontWeight={700}
                fontSize={'18px'}
                lineHeight={'25px'}
                width={'224px'}
                height={'41px'}
                borderRadius={'5px'}
                // @ts-ignore
                onChange={(e) => setResult(e.target.value)}
                value={result}
              >
                {
                  // @ts-ignore
                  (sidebarItems[category].eventType == EventType.Triple) ? (
                    <>
                      <option value={1}>Home</option>
                      <option value={2}>Draw</option>
                      <option value={3}>Away</option>
                    </>
                  ) : (
                    <>
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                    </>
                  )
                }
              </Select>
            </Flex>

            <Flex
              border={'1px solid #FC541C'}
              borderRadius={'45px'}
              px={'28px'}
              py={'7px'}
              mt={'67px'}
              onClick={() => handleReportResult()}
              fontFamily={'Nunito'}
              fontSize={'14px'}
              lineHeight={'19px'}
              cursor={'pointer'}
              width={'fit-content'}
            >
              Report
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AnnounceModal
        isOpenAnnounceModal={isOpenReportResultSuccessAnnounceModal && reportResult.isSuccess}
        onCloseAnnounceModal={onCloseReportResultSuccessAnnounceModal}
        announceText={'Result has been successfully reported'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <AnnounceModal
        isOpenAnnounceModal={(isOpenReportResultSuccessAnnounceModal && reportResult.isLoading)}
        onCloseAnnounceModal={onCloseReportResultSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />
    </Flex >
  )
}

export default ReportResultModal
