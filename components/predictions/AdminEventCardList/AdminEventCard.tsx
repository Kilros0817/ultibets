import { Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useState, } from 'react';
import Moment from 'react-moment';
import Countdown from "react-countdown";
import '@fontsource/nunito'
import {
  secondsInHalfHour,
  subCategoriesInPredictionMarkets,
} from '../../../utils/config';
import CountDownRenderer from '../PredictionsCardList/CountDownRenderer'
import AnnounceModal from '../../modal/AnnounceModal'
import { cancelEvent, } from '../../../utils/interact/sc/prediction-markets'
import ReportResultModal from '../../modal/ReportResultModal'
import { checkIconInGreenBg, exclamationIconInRedBg } from '../../../utils/assets'
import AdminHandleEventButton from '../../Admin/AdminHandleEventButton';
import axios from 'axios';
import { useNetwork } from 'wagmi';
import { useChainContext } from '../../../utils/Context';

export type AdminEventCardProps = {
  eventID: number
  description: string
  category: number
  subcategory: number
  bettingLogo: string
  startTime: number
  bettingDeadline: number
  repeatLevel: number,
  setRepeatLevel: (repeatLevel: number) => void,
  setIsProcessing: (isProcessing: boolean) => void,
  setAllChainTxAnnounceResult: (allChainTxAnnounceResult: any) => void,
  onOpenAllChainTxAnnounceModal: () => void
}

const AdminEventCard = ({
  eventID,
  description,
  bettingLogo,
  category,
  subcategory,
  startTime,
  bettingDeadline,
  repeatLevel,
  setRepeatLevel,
  setIsProcessing,
  setAllChainTxAnnounceResult,
  onOpenAllChainTxAnnounceModal,
}: AdminEventCardProps) => {
  const { chain, } = useNetwork();
  const { isNativeToken, } = useChainContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen: isOpenConfirmEventCancelAnnounceModal,
    onOpen: onOpenConfirmEventCancelAnnounceModal,
    onClose: onCloseConfirmEventCancelAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCancelEventSuccessAnnounceModal,
    onOpen: onOpenCancelEventSuccessAnnounceModal,
    onClose: onCloseCancelEventSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenReportResultAnnounceModal,
    onOpen: onOpenReportResultAnnounceModal,
    onClose: onCloseReportResultAnnounceModal,
  } = useDisclosure();

  const onClickConfirmCancelButton = () => {
    switch (repeatLevel) {
      case 0:
        handleCancelEventInRepeatLevel0()
        break;

      default:
        handleCancelEventInRepeatLevel_1_2(repeatLevel);
    }
  }

  const handleCancelEventInRepeatLevel_1_2 = async (repeatLevel: number) => {
    onCloseConfirmEventCancelAnnounceModal();

    setIsProcessing(true);
    try {
      const data = {
        eventID: eventID,
        repeatLevel: repeatLevel,
        chainId: chain?.id ?? 0,
      };

      console.log("data: ", data);

      const response = (await axios.post(
        '/api/cancelEventAllInPM',
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
      console.log('error in cancel daily event in repeat level 2 ', err);
    }
    setIsProcessing(false);
  }

  const handleCancelEventInRepeatLevel0 = async () => {
    onCloseConfirmEventCancelAnnounceModal();

    setIsLoading(true)
    try {
      const res = await cancelEvent(
        eventID,
        chain?.id ?? 0,
        isNativeToken
      );
      if (res)
        onOpenCancelEventSuccessAnnounceModal();
    } catch (err) {
      console.log('error in cancel event in repeat level 0 ', err);
    }
    setIsLoading(false)
  }

  return (
    <Flex
      position={'relative'}
      width={'255px'}
      height={['fit-content', '171px']}
      background={'#1F1F1F'}
      borderRadius={'5px'}
      boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.25)'}
      direction={'column'}
      justifyContent={'space-between'}
      _hover={{
        boxShadow: '0px 0px 10px rgba(255, 145, 0, 0.25)',
      }}
      cursor={'pointer'}
      p={['13px 14px 21px 14px']}
      className='admin-event-card'
      border={bettingDeadline - secondsInHalfHour < Date.now() / 1000 ? '1px solid #FF4D00' : '1px solid #91DC5A'}
    >
      <Flex
        justifyContent={'left'}
        alignItems={'center'}
        position={'relative'}
        zIndex={1}
      >
        <Flex
          direction={'column'}
          gap={'11px'}
          width={'100%'}
        >
          <Flex
            alignItems={'center'}
            gap={'7px'}
            className='logo-and-cateogry'
            maxWidth={'184px'}
          >
            <Image
              width={'20px'}
              height={'20px'}
              src={bettingLogo}
              alt={category.toString()}
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
            maxWidth={['165px', '170px']}
            height={['unset', '46px']}
          >
            {/* Atalanta - Sampdoria */}
            {description.length < 35 ? description : description.slice(0, 35) + " ..."}
          </Text>

          <Flex
            className={'deadline-and-button'}
            position={'relative'}
          >
            <Flex
              direction={'column'}
              gap={'3px'}
            >
              <Text
                fontFamily={'Nunito'}
                fontSize={'12px'}
                fontWeight={'700'}
                lineHeight={'16px'}
                letterSpacing={'0em'}
                textAlign={'left'}
              >
                Deadline:
              </Text>
              <Flex
                fontFamily={'Nunito'}
                fontSize={'17px'}
                fontWeight={'700'}
                lineHeight={'23px'}
                letterSpacing={'0em'}
                textAlign={'left'}
                textTransform={'capitalize'}
              >
                <Flex
                  className='countdown-timer-in-prediction-markets'
                >
                  <Countdown date={(bettingDeadline - secondsInHalfHour) * 1000} renderer={CountDownRenderer} />
                </Flex>
              </Flex>
            </Flex>

            <Flex
              position={'absolute'}
              right={'0'}
              top={'5px '}
            >
              {
                (bettingDeadline - secondsInHalfHour < Date.now() / 1000) && (
                  <AdminHandleEventButton
                    setRepeatLevel={setRepeatLevel}
                    onOpenModal={onOpenReportResultAnnounceModal}
                    buttonLabel={'Report Results'}
                  />
                )
              }
              {
                (bettingDeadline - secondsInHalfHour >= Date.now() / 1000) && (
                  <AdminHandleEventButton
                    setRepeatLevel={setRepeatLevel}
                    onOpenModal={onOpenConfirmEventCancelAnnounceModal}
                    buttonLabel={'Cancel'}
                  />
                )
              }
            </Flex>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          position={'absolute'}
          right={0}
          top={'5px'}
          zIndex={1}
          gap={'2px'}
        >
          <Flex
            fontFamily={'Nunito'}
            fontSize={'12px'}
            fontWeight={'700'}
            lineHeight={'16px'}
            letterSpacing={'0em'}
            justifyContent={'right'}
          >
            {/* 20:00 UTC */}
            <Moment format="HH:mm">
              {new Date(parseInt(startTime + '000'))}
            </Moment>
          </Flex>
          <Flex
            fontFamily={'Nunito'}
            fontSize={'12px'}
            fontWeight={'700'}
            lineHeight={'16px'}
            letterSpacing={'0em'}
            textAlign={'right'}
          >
            {/* 08.03.22 */}
            <Moment format="MM.DD.YY">
              {new Date(parseInt(startTime + '000'))}
            </Moment>
          </Flex>
        </Flex>
      </Flex>

      <Image
        position='absolute'
        src='/images/svgs/admin-page/admin-event-card-bottom-left-bg.svg'
        width='138px'
        height='126px'
        bottom='0px'
        left='0px'
      />
      <Image
        position='absolute'
        src='/images/svgs/admin-page/admin-event-card-top-right-bg.svg'
        width='109x'
        height='91px'
        top='0px'
        right='0px'
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenConfirmEventCancelAnnounceModal}
        onCloseAnnounceModal={onCloseConfirmEventCancelAnnounceModal}
        announceText={'Do you really wanna cancel this event?'}
        announceLogo={exclamationIconInRedBg}
        announceModalButtonText={'Confirm'}
        announceModalButtonAction={() => onClickConfirmCancelButton()}
      />
      <AnnounceModal
        isOpenAnnounceModal={isOpenCancelEventSuccessAnnounceModal}
        onCloseAnnounceModal={onCloseCancelEventSuccessAnnounceModal}
        announceText={'Event has been successfully cancelled'}
        announceLogo={checkIconInGreenBg}
        announceModalButtonText={'Close'}
      />
      <ReportResultModal
        isOpen={isOpenReportResultAnnounceModal}
        onClose={onCloseReportResultAnnounceModal}
        eventID={eventID}
        bettingLogo={bettingLogo}
        description={description}
        category={category}
        subcategory={subcategory}
        eventStartTime={startTime}
        repeatLevel={repeatLevel}
        setIsProcessing={setIsProcessing}
        setAllChainTxAnnounceResult={setAllChainTxAnnounceResult}
        onOpenAllChainTxAnnounceModal={onOpenAllChainTxAnnounceModal}
      />
      <AnnounceModal
        isOpenAnnounceModal={isLoading}
        onCloseAnnounceModal={onCloseCancelEventSuccessAnnounceModal}
        announceText={'Your transaction is currently processing on the blockchain'}
        announceGif={true}
        announceModalButtonText={'Close'}
      />

    </Flex >
  )
}

export default AdminEventCard;
