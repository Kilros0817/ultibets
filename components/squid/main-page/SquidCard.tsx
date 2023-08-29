import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '@fontsource/nunito'
import { EventStateInSBC, sbcRoundUrls, secondsIn12Hours, secondsInHalfHour, } from '../../../utils/config'
import Countdown from 'react-countdown'
import CountDownRenderer from '../../predictions/PredictionsCardList/CountDownRenderer'
import Moment from 'react-moment'
import { squidWhiteLogo } from '../../../utils/assets'
import { useChainContext } from '../../../utils/Context'
import { useNetwork } from 'wagmi'

export type SquidCardProps = {
  eventID: number
  description: string
  registerDeadline: number
  currentLevel: number
  totalAmount: number
  state: EventStateInSBC
  currentToken: string
  rounds: any[]
  voteStartTime: number
  votingResult: number
  shouldRender: boolean
}
const SquidCard = ({
  eventID,
  description,
  registerDeadline,
  currentLevel,
  totalAmount,
  state,
  currentToken,
  rounds,
  voteStartTime,
  votingResult,
  shouldRender,
}: SquidCardProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { isNativeToken, } = useChainContext();
  const [deadline, setDeadline] = useState<number>(registerDeadline);
  const [deadlineText, setDeadlineText] = useState<string>('Register Deadline');
  const [buttonText, setButtonText] = useState<string>('Register Now');
  const [clickUrl, setClickUrl] = useState<string>(`sbc/${eventID}/register`);

  useEffect(() => {
    switch (state) {
      case EventStateInSBC.Register:
        // register page
        setDeadline(registerDeadline + secondsInHalfHour); // this should be available 1s before deadline, not 30 mins
        setButtonText('Access Register Page');
        setDeadlineText('Register Deadline');
        setClickUrl(`sbc/${eventID}/` + sbcRoundUrls['register']);
        break;

      case EventStateInSBC.Round:
        setDeadline(rounds[currentLevel - 1].startTime);
        setButtonText(`Access Round ${currentLevel}`);
        setDeadlineText(`Round ${currentLevel} Deadline`);
        setClickUrl(`sbc/${eventID}/${(sbcRoundUrls as any)[currentLevel]}`);
        break;

      case EventStateInSBC.Vote:
      case EventStateInSBC.PickWinner:
        setDeadline(voteStartTime + secondsInHalfHour + secondsIn12Hours);
        setButtonText(`Access Final Vote`);
        setDeadlineText(`Final Vote Deadline`);
        setClickUrl(`sbc/${eventID}/${(sbcRoundUrls as any)['final-vote']}`);
        break;

      case EventStateInSBC.ClaimPrize:
        setDeadline(0);
        setButtonText(`Access Final Winner`);
        setDeadlineText(``);
        setClickUrl(`sbc/${eventID}/${(sbcRoundUrls as any)['winner-page']}`);
        break;
    }
  }, [
    eventID,
    chain?.id,
    isNativeToken,
    currentLevel,
    votingResult,
    shouldRender,
  ])

  return (
    <Flex
      position={'relative'}
      width={['265px', '333px']}
      height={'fit-content'}
      background={'#1F1F1F'}
      borderRadius={'5px'}
      boxShadow={'0px 0px 10px rgba(0, 0, 0, 0.25)'}
      direction={'column'}
      justifyContent={'space-between'}
      _hover={{
        boxShadow: '0px 0px 10px rgba(255, 145, 0, 0.25)',
      }}
      cursor={'pointer'}
      p={['13px 10px 19px 10px', '13px 14px 19px 14px']}
      className='prediction-card'
      zIndex={0}
    >
      <Flex
        justifyContent={'left'}
        alignItems={'center'}
        position={'relative'}
      >
        <Flex
          direction={'column'}
          width={'100%'}
        >
          <Flex
            alignItems={'center'}
            gap={'7px'}
            className='logo-and-sbc'
          >
            <Image
              width={'20px'}
              height={'20px'}
              src={squidWhiteLogo}
              alt={'squid-white-logo'}
            />
            <Text
              fontFamily={'Nunito'}
              fontSize={'18px'}
              fontWeight={'700'}
              lineHeight={'25px'}
              letterSpacing={'0em'}
              textAlign={'left'}
              maxWidth={['135px', 'unset']}
            >
              SBC
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
            mt={'8px'}
            color={'whie'}
            maxWidth={['125px', 'unset']}
          >
            {/* Squid Bet Competition Week 2 */}
            {description}
          </Text>

          {deadlineText != '' ? (
            <Flex
              direction={'column'}
              gap={'3px'}
              className={'deadline'}
              mt={'12px'}
            >
              <Text
                fontFamily={'Nunito'}
                fontSize={'12px'}
                fontWeight={'700'}
                lineHeight={'16px'}
                letterSpacing={'0em'}
                textAlign={'left'}
              >
                {deadlineText}:
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
                  <Countdown date={(deadline - secondsInHalfHour) * 1000} renderer={CountDownRenderer} />
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex
              direction={'column'}
              gap={'3px'}
              className={'deadline'}
              mt={'12px'}
              height={'15px'}
            />
          )
          }


          <Flex
            className={'predictions-volume-and-button'}
            position={['unset', 'relative']}
            mt={'8px'}
            direction={['column', 'row']}
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
                Pool Prize
              </Text>
              <Flex
                fontFamily={'Nunito'}
                fontSize={'17px'}
                fontWeight={'700'}
                lineHeight={'23px'}
                letterSpacing={'0em'}
                textAlign={'left'}
                textTransform={'capitalize'}
                color={'#FF9100'}
              >
                {totalAmount} {currentToken}
              </Flex>
            </Flex>

            <Flex
              position={['unset', 'absolute']}
              right={'0'}
              top={['5px']}
              mt={['15px', 'unset']}
              justifyContent={['right', 'unset']}
            >
              <Button
                p={'7px 24px '}
                background={'unset'}
                borderRadius={'34px'}
                fontSize={'15px'}
                color={'white'}
                fontFamily={'Nunito'}
                lineHeight={'20px'}
                border={'1px solid #FC541C'}
                textTransform={'capitalize'}
                _hover={{
                  background: '#FC541C',
                }}
                onClick={() => {
                  router.push(clickUrl)
                }}
              // isDisabled={deadline - secondsInHalfHour < Date.now() / 1000}
              >
                {buttonText}
              </Button>
            </Flex>
          </Flex>
          <Flex
            direction={'column'}
            position={'absolute'}
            right={0}
            top={'5px'}
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
                {new Date(parseInt(deadline + '000'))}
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
                {new Date(parseInt(deadline + '000'))}
              </Moment>
            </Flex>
          </Flex>
        </Flex>


      </Flex>

      <Image
        position='absolute'
        src='/images/pngs/left-bottom-corner-of-sbc-card.svg'
        width='138px'
        height='126px'
        bottom='0px'
        left='0px'
      />
      <Image
        position='absolute'
        src='/images/pngs/right-top-corner-of-sbc-card.svg'
        width='109x'
        height='91px'
        top='0px'
        right='0px'
      />
    </Flex >
  )
}

export default SquidCard
