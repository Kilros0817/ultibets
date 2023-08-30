import {
  Flex,
  Image,
} from '@chakra-ui/react'
import { formatEther } from 'viem'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useNetwork } from 'wagmi'
import { chainAttrs, mumbaiChainId, polygonChainId } from '../../../utils/config'
import { useChainContext } from '../../../utils/Context'
import StepBar from '../../StepBar'

type PredictionsCoreComponent2Props = {
  sidePoolVolumes: string[]
}

const PredictionsCoreComponent2 = ({
  sidePoolVolumes,
}: PredictionsCoreComponent2Props) => {
  const router = useRouter()
  const { prediction, setPrediction } = useChainContext();
  const [choice, setChoice] = React.useState('')
  const [currentSports, setCurrentSports] = useState('tennis');
  const [sidePools, setSidePools] = useState([1, 1]);
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
    setCurrentToken(isNativeToken ? currentChainAttrsItem[0].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);

  useEffect(() => {
    const pathName = router.asPath;
    const slug = pathName.split('/');
    if (slug[2]) {
      setCurrentSports(slug[2]);
      setChoice(slug[2] == 'tennis' ? 'home' : prediction.sideToPredict[currentSports]);
    }
  }, [router, prediction])

  useEffect(() => {
    const yesSidePool = formatEther(BigInt(sidePoolVolumes[0]));
    const noSidePool = formatEther(BigInt(sidePoolVolumes[1]));
    setSidePools([
      parseFloat(yesSidePool),
      parseFloat(noSidePool),
    ]);
  }, [sidePoolVolumes])

  const hanldeChoice = (choice: string) => {
    setChoice(choice);
    setPrediction({
      sideToPredict: {
        ...prediction.sideToPredict,
        [currentSports]: choice,
      },
    });
  }

  const bettingPoolTypes = useMemo(() => {
    const poolInfo = [
      {
        title: currentSports == 'tennis' ? "'Home' Pool" : "'Yes' Pool",
        value: sidePools[0],
        percent: parseFloat(((sidePools[0] / (sidePools[0] + sidePools[1])) * 100).toFixed(1)),
        fakePercent: parseFloat(((sidePools[0] / (sidePools[0] + sidePools[1])) * 100).toFixed(1)),
        color: '#E18933',
        background: '/images/svgs/bets/orange-bets-background.svg',
      },
      {
        title: currentSports == 'tennis' ? "'Away' Pool" : "'No' Pool",
        value: sidePools[1],
        percent: parseFloat(((sidePools[1] / (sidePools[0] + sidePools[1])) * 100).toFixed(1)),
        fakePercent: parseFloat(((sidePools[1] / (sidePools[0] + sidePools[1])) * 100).toFixed(1)),
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
      console.log("bg pools: ", bigPools)
      bigPools[0].fakePercent -= control;
    }

    return poolInfo;
  }, [sidePools])

  const BetsStatistics = () => (

    <Flex
      mt={'30px'}
      justifyContent={'center'}
      alignItems={'baseline'}
      width={['calc(100vw - 130px)', 'calc(100vw - 130px)', '100%']}
    >
      {
        bettingPoolTypes.map((item: any, index: number) => (
          <StepBar
            key={index}
            category={item.title}
            value={item.value}
            percent={item.percent}
            fakePercent={item.fakePercent}
            color={item.color}
            background={item.background}
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
              hanldeChoice(currentSports == 'tennis' ? 'home' : 'yes')
            }}
            cursor={'pointer'}
          >
            <Image
              src= { currentSports == 'tennis' ? "/images/pngs/bets/home.svg" : "/images/svgs/bets/yes.svg"}
              alt="yes"
              width={choice == 'home' || 'yes' ? '148px' : '120px'}
              height={choice == 'home' || 'yes' ? '148px' : '120px'}
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
          </Flex>
          <Flex
            onClick={() => {
              hanldeChoice(currentSports == 'tennis' ? 'away' : 'no')
            }}
            cursor={'pointer'}
          >
            <Image
              src= { currentSports == 'tennis' ? "/images/pngs/bets/away.svg" : "/images/svgs/bets/no.svg"}
              alt="no"
              width={choice == 'away' || 'no' ? '140px' : '120px'}
              height={choice == 'away' || 'no' ? '140px' : '120px'}
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
          </Flex>
        </Flex>

        <Flex
          display={['none', 'none', 'none', 'flex', 'flex']}
          // width={['none', 'none', 'none', '100%', '100%']}
          mr='5'
          width={'600px'}
          className='bets-statistics-wrapper'
        >
          <BetsStatistics />
        </Flex>
      </Flex>

      <Flex
        display={['flex', 'flex', 'flex', 'none']}
        mr='5'
        // width={['400px', '500px', '600px']}
        className='bets-statistics-wrapper'
      >
        <BetsStatistics />
      </Flex>
    </Flex>
  )
}

export default PredictionsCoreComponent2
