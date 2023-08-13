import {
  Flex,
  Image,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useNetwork } from 'wagmi'
import { chainAttrs, mumbaiChainId, newChainAttrs, polygonChainId } from '../../../utils/config'
import { useChainContext } from '../../../utils/Context'
import StepBar from '../../StepBar'

type SquidBetsCoreComponentProps = {
  yesPoolAmount: number
  noPoolAmount: number
}

const SquidBetsCoreComponent = ({
  yesPoolAmount,
  noPoolAmount,
}: SquidBetsCoreComponentProps) => {
  const [choice, setChoice] = React.useState('')
  const { sbc, setSbc } = useChainContext();
  const { isNativeToken, } = useChainContext();
  const { chain, } = useNetwork();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");

  useEffect(() => {
        let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId;    let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentChainAttrsItem[0].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);
  useEffect(() => {
    setChoice(sbc.sideToPredict);
  }, [sbc]);

  const hanldeChoice = (choice: string) => {
    setChoice(choice);
    setSbc({
      ...sbc,
      sideToPredict: choice,
    });
  }

  const bettingPoolTypes = useMemo(() => {
    const poolInfo = [
      {
        title: "'Yes' Pool",
        value: yesPoolAmount,
        percent: parseFloat(((yesPoolAmount / (yesPoolAmount + noPoolAmount)) * 100).toFixed(1)),
        fakePercent: parseFloat(((yesPoolAmount / (yesPoolAmount + noPoolAmount)) * 100).toFixed(1)),
        color: '#E18933',
        background: '/images/svgs/bets/orange-bets-background.svg',
      },
      {
        title: "'No' Pool",
        value: noPoolAmount,
        percent: parseFloat(((noPoolAmount / (yesPoolAmount + noPoolAmount)) * 100).toFixed(1)),
        fakePercent: parseFloat(((noPoolAmount / (yesPoolAmount + noPoolAmount)) * 100).toFixed(1)),
        color: '#739AF0',
        background: '/images/svgs/bets/white-bets-background.svg',
      },
    ]

    let control = 0;
    let controlledIndex = [];
    if (poolInfo[0].fakePercent < 20 && poolInfo[0].fakePercent > 0) {
      control += 20 - poolInfo[0].fakePercent;
      poolInfo[0].fakePercent = 20;
      controlledIndex.push(0);
    }
    if (poolInfo[1].fakePercent < 20 && poolInfo[1].fakePercent > 0) {
      control += 20 - poolInfo[1].fakePercent;
      poolInfo[1].fakePercent = 20;
      controlledIndex.push(1);
    }

    if (control != 0) {
      const bigPools = poolInfo.filter((item: any) => item.fakePercent >= 40);
      bigPools[0].fakePercent -= control;
    }

    return poolInfo;
  }, [yesPoolAmount, noPoolAmount,])

  const StepBars = () => (
    <Flex
      mt={'30px'}
      justifyContent={'center'}
      alignItems={'baseline'}
      width={['calc(100vw - 130px)', 'calc(100vw - 130px)', '100%']}
    >
      {
        bettingPoolTypes.map((item, index) => (
          <StepBar
            key={index}
            category={item.title}
            value={item.value}
            percent={item.percent}
            fakePercent={item.fakePercent}
            color={item.color}
            background={item.background}
            isSquid={true}
            currentToken={currentToken}
          />
        ))
      }
    </Flex>
  );

  return (
    <Flex
      mb={'30px'}
      direction='column'
      width={['calc(100vw - 110px)', '100%']}
    >
      <Flex
        gap={['20px', '20px', '20px', '40px', '50px']}
        justifyContent={['start', 'start', 'start', 'start']}
        width='100%'
        height='100%'
        pr='5'
        mr='10'
        direction='row'
      >

        {/* images */}
        <Flex
        >
          <Flex
            onClick={() => {
              hanldeChoice('yes')
            }}
            cursor={'pointer'}
          >
            <Image
              src="/images/svgs/bets/yes.svg"
              alt="yes"
              width={choice == 'yes' ? '148px' : '120px'}
              height={choice == 'yes' ? '148px' : '120px'}
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
          </Flex>
          <Flex
            onClick={() => {
              hanldeChoice('no')
            }}
            cursor={'pointer'}
          >
            <Image
              src="/images/svgs/bets/no.svg"
              alt="no"
              width={choice == 'no' ? '140px' : '120px'}
              height={choice == 'no' ? '140px' : '120px'}
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
          </Flex>
        </Flex>

        <Flex
          display={['none', 'none', 'none', 'flex', 'flex']}
          mr='5'
          width={'600px'}
          className='bets-stepbars-wrapper'
        >
          <StepBars />
        </Flex>
      </Flex>

      <Flex
        display={['flex', 'flex', 'flex', 'none']}
        mr='5'
        className='bets-stepbars-wrapper'
      >
        <StepBars />
      </Flex>
    </Flex>
  )
}

export default SquidBetsCoreComponent
