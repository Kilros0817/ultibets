import { Button, Flex, Image, Progress, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '@fontsource/nunito'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import Countdown from "react-countdown";
import { useChainContext } from '../../../utils/Context';
import {
  secondsInHalfHour,
  sidebarItems,
  subCategoriesInPredictionMarkets,
} from '../../../utils/config';
import CountDownRenderer from './CountDownRenderer'
import { AiOutlineClockCircle, } from 'react-icons/ai';

export type PredictionCardProps = {
  eventID?: string
  description: string
  category: number
  subcategory: number
  bettingLogo: string
  startTime: number
  bettingDeadline: number
  bettingVolume: number
  currentToken?: string
}

const PredictionCard = ({
  eventID,
  description,
  bettingLogo,
  category,
  subcategory,
  startTime,
  bettingDeadline,
  bettingVolume,
  currentToken,
}: PredictionCardProps) => {
  const router = useRouter()
  const {
    categoryInPM,
    setCurrentPMEventID,
  } = useChainContext();
  const [isEventBeing, setIsEventBeing] = useState(false);
  const [score, setScore] = useState({
    first: 1,
    second: 2,
  })
  const [timeElasped, setTimeElapsed] = useState(80);

  return (
    <Flex
      position={'relative'}
      width={['265px', '333px']}
      height={['fit-content', '215px']}
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
    >
      <Flex
        justifyContent={'left'}
        alignItems={'center'}
        position={'relative'}
        zIndex={1}
      >
        <Flex
          direction={'column'}
          width={'100%'}
        >
          <Flex
            alignItems={'center'}
            gap={'7px'}
            className='logo-and-cateogry'
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
              maxWidth={['135px', 'unset']}
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
            mt={'8px'}
            color={isEventBeing ? '#FFB11C' : 'whie'}
            maxWidth={['125px', '250px']}
            height={['unset', '46px']}
          >
            {/* Atalanta - Sampdoria */}
            {description.length < 50 ? description : description.slice(0, 50) + " ..."}
          </Text>

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
              Predictions Deadline:
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
                {
                  !isEventBeing ? (
                    <Countdown date={(bettingDeadline - secondsInHalfHour) * 1000} renderer={CountDownRenderer} />
                  ) : (
                    <Flex
                      fontFamily={'Nunito'}
                      fontSize={'17px'}
                      fontWeight={'700'}
                      lineHeight={'23px'}
                      letterSpacing={'0em'}
                      textAlign={'right'}
                      color={'#8DE104'}
                    >
                      {/* 08.03.22 */}
                      <Moment format="MM.DD.YY">
                        {new Date(parseInt(startTime + '000'))}
                      </Moment>
                    </Flex>
                  )
                }
              </Flex>
            </Flex>
          </Flex>

          <Flex
            // justifyContent={'space-between'}
            className={'predictions-volume-and-button'}
            position={'relative'}
            mt={'8px'}
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
                Predictions Volume:
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
                {bettingVolume} {currentToken}
              </Flex>
            </Flex>

            <Flex
              position={'absolute'}
              right={'0'}
              top={'5px '}
            >
              <Button
                p={'7px 24px '}
                background={'unset'}
                borderRadius={'34px'}
                fontSize={'15px'}
                fontFamily={'Nunito'}
                lineHeight={'20px'}
                border={'1px solid #FC541C'}
                textTransform={'capitalize'}
                _hover={{
                  background: '#FC541C',
                }}
                //@ts-ignore
                onClick={() => {
                  setCurrentPMEventID(eventID);
                  //@ts-ignore
                  router.push(`${router.asPath}/${sidebarItems[categoryInPM].keyword}/${eventID}`)
                }}
                isDisabled={bettingDeadline - secondsInHalfHour < Date.now() / 1000}
              >
                Predict Now
              </Button>
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
            {
              !isEventBeing && (
                <>
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
                </>
              )
            }
            {
              isEventBeing && (
                <>
                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'12px'}
                    fontWeight={'700'}
                    lineHeight={'16px'}
                    letterSpacing={'0em'}
                    textAlign={'right'}
                    justifyContent={'right'}
                  >
                    {/* 08.03.22, HH:mm */}
                    <Moment format="MM.DD.YY, HH:mm">
                      {new Date(parseInt(startTime + '000'))}
                    </Moment>
                  </Flex>

                  <Flex
                    fontFamily={'Nunito'}
                    fontSize={'22px'}
                    fontWeight={'700'}
                    lineHeight={'30px'}
                    letterSpacing={'0em'}
                    justifyContent={'right'}
                    mt={'8px'}
                    color={'#FFB11C'}
                  >
                    {score.first} - {score.second}
                  </Flex>

                  <Flex
                    direction={'column'}
                    justifyContent={'right'}
                  >
                    <Flex
                      className='clock-icon'
                      justifyContent={'right'}
                      mt={'8px'}
                    >
                      <AiOutlineClockCircle />
                    </Flex>

                    <Flex
                      className='progress-wrapper'
                      mt={'6px'}
                      position={'relative'}
                    >
                      {/* <Progress value={timeElasped} colorScheme='green' size='sm' /> */}
                      <Progress value={timeElasped / 90 * 100} width={'100px'} />
                      <Flex
                        position={'absolute'}
                        left={'0px'}
                        top={'5px'}
                        fontFamily={'Nunito'}
                        fontSize={'10px'}
                        fontWeight={'500'}
                        lineHeight={'14px'}
                        // justifyContent={'right'}
                        mt={'8px'}
                      >
                        {timeElasped}{'\''}
                      </Flex>
                      <Flex
                        position={'absolute'}
                        right={'0px'}
                        top={'5px'}
                        fontFamily={'Nunito'}
                        fontSize={'10px'}
                        fontWeight={'500'}
                        lineHeight={'14px'}
                        // justifyContent={'right'}
                        mt={'8px'}
                      >
                        {
                          timeElasped <= 45 ? '1st Half' : '2nd Half'
                        }
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              )
            }
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

export default PredictionCard;
