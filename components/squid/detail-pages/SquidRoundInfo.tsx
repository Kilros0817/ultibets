import { Flex, Text, } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNetwork, } from 'wagmi';
import Countdown from "react-countdown";
import { useChainContext } from '../../../utils/Context'
import {
  chainAttrs,
  mumbaiChainId,
  polygonChainId,
  secondsInHalfHour
} from '../../../utils/config';
import { getFormattedDateString, getFormattedTime, } from '../../../utils/formatters';
import CountDownRenderer from '../../predictions/PredictionsCardList/CountDownRenderer';

export type SquidRoundInfoProps = {
  volume: number
  startTime: Date
}

const SquidRoundInfo = ({
  volume,
  startTime,
}: SquidRoundInfoProps) => {
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");

  useEffect(() => {
    console.log("start time: ", startTime);

     const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
  }, [chain, isNativeToken,]);

  return (
    <Flex
      direction='column'
      width={['calc(100vw - 110px)', 'unset']}
    >
      <Flex
        overflow={'hidden'}
        direction='column'
        gap={'15px'}
      >
        <Flex
          gap={['20px', '20px', '20px', '30px']}
        >
          <Text
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'17px'}
            lineHeight={'23px'}
            color={'white'}
            textTransform={'capitalize'}
          >
            {/* Volume : 234 FTM */}
            Volume : {volume.toFixed(2)} {currentToken}
          </Text>

          <Flex
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'17px'}
            lineHeight={'23px'}
            color={'white'}
            textTransform={'capitalize'}
          >
            {/* Date & Time: 07/28 @ 20:00 UTC{' '} */}
            Date & Time: {
              getFormattedDateString(startTime!, "").slice(4, 6) + "/" +
              getFormattedDateString(startTime!, "").slice(6, 8)
            }
            <Flex
              ml={'10px'}
            >
              @ {
                getFormattedTime(startTime!).slice(0, 5)
              }
            </Flex>
          </Flex>
        </Flex>

        <Flex
          gap={['20px', '20px', '20px', '30px']}
        >
          <Flex
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'17px'}
            lineHeight={'23px'}
            color={'white'}
            textTransform={'capitalize'}
            className='countdown-in-detail-page'
          >
            {/* betting deadline: 30 min before{' '}
           */}
            <Flex
              mr={'10px'}
            >
              Betting Deadline {''}
            </Flex>
            {
              startTime > new Date(new Date().getTime() + secondsInHalfHour * 1000) ? (
                <Countdown date={(startTime.getTime() / 1000 - secondsInHalfHour) * 1000} renderer={CountDownRenderer} />
              ) : (
                <Flex
                  color={'red !important'}
                >
                  Expired
                </Flex>
              )
            }
          </Flex>

          <Text
            fontFamily={'Nunito'}
            fontWeight={'700'}
            fontSize={'17px'}
            lineHeight={'23px'}
            color={startTime > new Date(new Date().getTime() + secondsInHalfHour * 1000) ? '#AEFB2F' : 'red'}
            textTransform={'capitalize'}
          >
            {startTime > new Date(new Date().getTime() + secondsInHalfHour * 1000) ? 'open' : 'closed'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SquidRoundInfo
