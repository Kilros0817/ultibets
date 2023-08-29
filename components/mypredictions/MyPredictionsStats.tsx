import { Box, Button, color, Flex, Image, useDisclosure, } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'react-moment';
import { EventResultInPM, EventStatusInPM, EventType } from '../../utils/config';
import {
  awayLogo,
  checkIconInGreenBg,
  congretBg,
  drawLogo,
  homeLogo,
  noLogo,
  yesLogo,
} from '../../utils/assets';
import { claimBetCancelled, widthdrawGain, } from '../../utils/interact/sc/prediction-markets';
import AnnounceModal from '../modal/AnnounceModal';
import { useNetwork } from 'wagmi';
import { useChainContext } from '../../utils/Context';

export type MyPredictionsStatsProps = {
  eventID: number,
  description: string,
  betType: EventType,
  betTime: number,
  betAmount: number,
  paidAmount: number,
  odds: number,
  gain: number,
  percentOfSidePool: number,
  status: EventStatusInPM,
  prediction: EventResultInPM,
  result: EventResultInPM,
  currentToken: string,
}

const MyPredictionsStats = ({
  eventID,
  description,
  betType,
  betTime,
  betAmount,
  paidAmount,
  odds,
  percentOfSidePool,
  status,
  gain,
  prediction,
  result,
  currentToken,
}: MyPredictionsStatsProps) => {
  const { chain, } = useNetwork();
  const { isNativeToken, } = useChainContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const winColor = '#19A2A5';
  const lostColor = '#FC541C';
  const pendingColor = '#E18933';
  const cancelledColor = '#8F8F8F';
  const [fontColor, setFontColor] = useState(pendingColor);
  const [image, setImage] = useState('');
  const [statusText, setStatusText] = useState('Pending');
  const [buttonText, setButtonText] = useState('Claim Gain');
  const [width, setWidth] = useState(0);
  const {
    isOpen: isOpenGainSuccessAnnounceModal,
    onOpen: onOpenGainSuccessAnnounceModal,
    onClose: onCloseGainSuccessAnnounceModal,
  } = useDisclosure();
  const {
    isOpen: isOpenReimbursePredictionSuccessAnnounceModal,
    onOpen: onOpenReimbursePredictionSuccessAnnounceModal,
    onClose: onCloseReimbursePredictionSuccessAnnounceModal,
  } = useDisclosure();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])


  useEffect(() => {
    if (status == EventStatusInPM.Open) {
      setFontColor(pendingColor);
      setStatusText('Pending');
    }
    if (status == EventStatusInPM.Cancel) {
      setFontColor(cancelledColor);
      setStatusText('Cancelled Event');
      setButtonText('Reimburse Prediction');
    }
    if (status == EventStatusInPM.End && prediction == result) {
      setFontColor(winColor);
      setStatusText('Won');

      if (paidAmount > 0) {
        setButtonText('Gain Claimed')
      }
    }
    if (status == EventStatusInPM.End && prediction != result) {
      setFontColor(lostColor);
      setStatusText('Lost');
    }
  }, [status, paidAmount])

  useEffect(() => {
    if (betType == EventType.Double) {
      if (prediction == 0) setImage(yesLogo);
      if (prediction == 1) setImage(noLogo);
    }
    if (betType == EventType.Triple) {
      if (prediction == EventResultInPM.Home) setImage(homeLogo);
      if (prediction == EventResultInPM.Away) setImage(awayLogo);
      if (prediction == EventResultInPM.Draw) setImage(drawLogo);
    }
  }, [status, prediction, result])

  const handleClaimOrReimburse = async () => {
    setIsLoading(true)
    if (prediction == result) {
      try {
        const res = await widthdrawGain(
          eventID,
          result,
          chain?.id ?? 0,
          isNativeToken
        )
        if (res)
          onOpenGainSuccessAnnounceModal();
      } catch (err) {
        console.log('error in claim gain: ', err);
      }
    } else if (status == EventStatusInPM.Cancel) {
      // reimburse 
      try {
        const res = await claimBetCancelled(
          eventID,
          prediction,
          chain?.id ?? 0,
          isNativeToken
        )
        if (res)
          onOpenReimbursePredictionSuccessAnnounceModal();
      } catch (err) {
        console.log('error in reimburse prediction: ', err);
      }
    }
    setIsLoading(false)
  }

  const PredictionChoice = () => (
    <Flex
      justifyContent={'center'}
      //   alignItems={'center'}
      direction={'column'}
    >
      <Flex
        fontFamily={'Nunito'}
        fontWeight={'700'}
        fontSize={'12px'}
        lineHeight={'16px'}
        color={'#FFFFFF'}
        textTransform={'capitalize'}
      >
        Prediction Choice
        {/* {betChoice} */}
      </Flex>
      <Flex
        justifyContent={'center'}
      >
        <Image
          src={image}
          alt={`bet: ${betType}- predict: ${prediction}`}
          width={['88px', '88px', '88px']}
          height={['88px', '88px', '88px']}
        />
      </Flex>
    </Flex>
  )

  return (
    <Flex
      direction={['column', 'column', 'column', 'column']}
      width={['calc(100% + 30px)', '100%', '100%', '100%']}
      // height={['100%', '100%', '100%', '100%']}
      border={[`1px solid ${fontColor}`]}
      borderRadius={['5px', '5px', '5px']}
      p={['10px', '20px', '30px', '20px']}
      maxW={['560px']}
      ml={['-30px', 'unset']}
      className='my-prediction-card'
    >
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        position={'relative'}
      >
        <Flex
          gap={'18px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          ml={'20px'}
        >
          <Box
            width={['12px', '12px', '12px']}
            height={['12px', '12px', '12px']}
            background={fontColor}
            borderRadius={['50%', '50%', '50%']}

          />
          <Flex
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'12px'}
            lineHeight={'16px'}
            color={fontColor}
            textTransform={'capitalize'}
          >
            {/* Pending */}
            {statusText}
          </Flex>
        </Flex>
        <Flex
          display={['flex']}
          position={'absolute'}
          top={0}
          right={0}
        >
          <PredictionChoice />
        </Flex>
      </Flex>

      <Flex
        gap={'5px'}
        justifyContent={'start'}
        alignItems={'start'}
        direction={'column'}
        position={'relative'}
      >
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'12px'}
          lineHeight={'16px'}
          color={fontColor}
          textTransform={'capitalize'}
          mt={['20px']}
        >
          {/* Wed 11 Nov - 12:10:00{' '} */}

          <Moment format="YYYY-MM-DD hh:mm:ss">
            {new Date(parseInt(betTime + '000'))}
          </Moment>
        </Flex>
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'20px'}
          lineHeight={'27px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          maxWidth={[
            'calc(100vw - 90px - 20px * 2 - 20px * 2 - 100px)',
            width < 620 ? 'calc(100vw - 90px - 20px * 2 - 20px * 2 - 100px)' :
              'calc(446px - 100px)',
            'unset',
          ]}
          wordBreak={'normal'}
        >
          {/* Will Atalanta win against sampdoria?{' '} */}
          {description}
        </Flex>
      </Flex>
      <Flex
        mt={['15px', '20px', '40px', '40px']}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'15px'}
          lineHeight={'20px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          direction={['column']}
        >
          <Flex>
            Odds :
          </Flex>
          <Flex
            as={'span'}
            color={fontColor}
          >
            &nbsp;
            {/* {'15 %'} */}
            {odds}%
          </Flex>
        </Flex>
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'15px'}
          lineHeight={'20px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          direction={['column']}
        >
          Prediction Amount :
          <Flex
            as={'span'}
            color={fontColor}
          >
            &nbsp;
            {/* {'10 FTM'} */}
            {betAmount} {currentToken}
          </Flex>
        </Flex>
        <Flex
          fontFamily={'Nunito'}
          fontWeight={'700'}
          fontSize={'15px'}
          lineHeight={'20px'}
          color={'#FFFFFF'}
          textTransform={'capitalize'}
          display={['none', width < 600 ? 'none' : 'flex', 'flex']}
          direction={['column']}
        >
          % of side pool:
          <Flex
            as={'span'}
            color={fontColor}
          >
            &nbsp;
            {/* {'10% '} */}
            {percentOfSidePool}%
          </Flex>
        </Flex>
      </Flex>

      <Flex
        fontFamily={'Nunito'}
        fontWeight={'700'}
        fontSize={'15px'}
        lineHeight={'20px'}
        color={'#FFFFFF'}
        textTransform={'capitalize'}
        display={['flex', width < 600 ? 'flex' : 'none', 'none']}
        mt={['10px', '10px', 'unset']}
      >
        % of side pool:
        <Flex
          as={'span'}
          color={fontColor}
        >
          &nbsp;
          {/* {'10% '} */}
          {percentOfSidePool}%
        </Flex>
      </Flex>

      <Flex
        justifyContent={['center', width < 670 ? 'center' : 'space-between']}
      >
        <Flex
          justifyContent={['center', width < 670 ? 'center' : 'space-between']}
          mt={'25px'}
          direction={['column', width < 670 ? 'column' : 'row']}
          width={'100%'}
          gap={['20px']}
        >
          <Flex
            justifyContent={['center', width < 670 ? 'center' : 'left']}
          >
            <Button
              border={'1px solid '}
              borderColor={fontColor}
              background={'unset'}
              _hover={{
                background: 'unset',
              }}
              fontFamily={'Nunito'}
              fontStyle={'normal'}
              fontWeight={700}
              fontSize={['16px', '16px', '16px', '18px']}
              lineHeight={'25px'}
              textTransform={'capitalize'}
              color={'#FFFFFF'}
              width={'fit-content'}
            >
              {`Gain: `}
              <Flex
                as={'span'}
                color={fontColor}
              >
                &nbsp;
                {/* {' 0 FTM (0%)'} */}
                {gain} {currentToken} ({(gain / betAmount * 100).toFixed(0)}%)
              </Flex>
            </Button>
          </Flex>

          <Flex
            justifyContent={['center', width < 670 ? 'center' : 'unset']}
          >
            <Button
              onClick={() => handleClaimOrReimburse()}
              height={'40px'}
              width={'fit-content'}
              background={'unset'}
              borderRadius={'34px'}
              border={'1px solid #FC541C'}
              _hover={{
                background: '#FC541C',
              }}
              fontSize={'20px'}
              color={'white'}
              justifyContent={'center'}
              alignItems={'center'}
              isDisabled={(prediction != result && // not won
                status != EventStatusInPM.Cancel) || // not cancel
                (paidAmount > 0) // already claimed
              }
            >
              {buttonText}
            </Button>
          </Flex>
          <AnnounceModal
            isOpenAnnounceModal={isOpenGainSuccessAnnounceModal}
            onCloseAnnounceModal={onCloseGainSuccessAnnounceModal}
            announceText={'Congratulations on your winning prediction UltiBettor!'}
            announceCongrets={true}
            announceLogo={congretBg}
            announceModalButtonText={'Close'}
          />
          <AnnounceModal
            isOpenAnnounceModal={isOpenReimbursePredictionSuccessAnnounceModal}
            onCloseAnnounceModal={onCloseReimbursePredictionSuccessAnnounceModal}
            announceText={'Your prediction has been successfully reimbursed'}
            announceLogo={checkIconInGreenBg}
            announceModalButtonText={'Close'}
          />
          <AnnounceModal
            isOpenAnnounceModal={isLoading}
            onCloseAnnounceModal={onCloseGainSuccessAnnounceModal}
            announceText={'Your transaction is currently processing on the blockchain'}
            announceGif={true}
            announceModalButtonText={'Close'}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MyPredictionsStats
