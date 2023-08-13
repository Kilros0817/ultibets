import { Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNetwork, } from 'wagmi';
import { useChainContext } from '../../../utils/Context'
import { chainAttrs, mumbaiChainId, polygonChainId } from '../../../utils/config'

export type SquidRoundStatsProps = {
  limit: number
  poolPrize: number
  current: number
  registerID: number
}

const SquidRoundStats = ({
  limit,
  poolPrize,
  current,
  registerID,
}: SquidRoundStatsProps) => {
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");

  useEffect(() => {
     const chainId = chain?.id != undefined ? chain.id :
            process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;
    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);

  return (
    <Flex
      justifyContent={'start'}
      gap={['10px', '10px', '10px', '100px']}
      direction={['column', 'column', 'column', 'row']}
      alignItems={'start'}
    >
      <Flex
        justifyContent={'center'}
        mt={'25px'}
        width={['300px', 'unset', 'unset', 'unset']}
        direction={['column', 'column', 'column', 'row']}
        alignItems={['start', 'start', 'center', 'center']}
      >
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'white'}
          width={['unset', 'unset', 'unset', 'unset']}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          Players Remaining:{' '}
          <Text
            display={['none', 'none', 'inline-block', 'inline-block']}
            as={'span'}
            color={'#FF9100'}
            fontFamily={'Nunito'}
          >
            {/* 500 / 500{' '} */}
            {current} / {limit}
          </Text>
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          width={['unset', 'unset', 'unset', 'unset']}
          textTransform={'capitalize'}
          display={['block', 'block', 'none', 'none']}
          color={'#FF9100'}
          fontFamily={'Nunito'}
        >
          {/* 500 / 500{' '} */}
          {current} / {limit}
        </Text>
      </Flex>
      <Flex
        width={['300px', 'unset', 'unset', 'unset']}
        direction={['column', 'column', 'column', 'row']}
        mt={'20px'}
        justifyContent={'center'}
        alignItems={['start', 'start', 'center', 'center']}
      >
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          Current prize pool:{' '}
          <Text
            display={['none', 'none', 'inline', 'inline']}
            as={'span'}
            color={'#FF9100'}
            fontFamily={'Nunito'}
          >
            {/* 7000 FTM{' '} */}
            {poolPrize} {currentToken}
          </Text>
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'#FF9100'}
          display={['block', 'block', 'none', 'none']}
          fontFamily={'Nunito'}
        >
          {/* 7000 FTM{' '} */}
          {poolPrize} {currentToken}
        </Text>
      </Flex>

      <Flex
        width={['300px', 'unset', 'unset', 'unset']}
        direction={['column', 'column', 'column', 'row']}
        mt={'20px'}
        justifyContent={'center'}
        alignItems={['start', 'start', 'center', 'center']}
      >
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          your player #:{' '}
          <Text
            display={['none', 'none', 'inline', 'inline']}
            as={'span'}
            color={'#FF9100'}
            fontFamily={'Nunito'}
          >
            {/* 456 */}
            {registerID ? registerID : 'Not Registered yet'}
          </Text>
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '27px']}
          lineHeight={'33px'}
          color={'#FF9100'}
          display={['block', 'block', 'none', 'none']}
          fontFamily={'Nunito'}
        >
          {/* 456 */}
          {registerID}
        </Text>
      </Flex>
    </Flex>
  )
}

export default SquidRoundStats
