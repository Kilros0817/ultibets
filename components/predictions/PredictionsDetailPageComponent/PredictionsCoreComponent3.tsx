import {
  Flex,
  Image,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNetwork } from 'wagmi'
import { chainAttrs, mumbaiChainId, polygonChainId } from '../../../utils/config'
import { useChainContext } from '../../../utils/Context'
import StepBar from '../../StepBar'

type PredictionsCoreComponent3Props = {
  sidePoolVolumes: string[]
}

const PredictionsCoreComponent3 = ({
  sidePoolVolumes,
}: PredictionsCoreComponent3Props) => {
  const router = useRouter()
  const { prediction, setPrediction } = useChainContext();
  const [choice, setChoice] = React.useState('')
  const [currentSports, setCurrentSports] = useState('soccer');
  const [sidePools, setSidePools] = useState([1, 1, 1]);
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
      setChoice(prediction.sideToPredict[currentSports]);
      console.log("current sports: ", slug[2]);
      console.log("current choice: ", prediction.sideToPredict[currentSports])
    }
  }, [router, prediction])

  useEffect(() => {
    const homeSidePool = ethers.utils.formatEther(sidePoolVolumes[0]);
    const drawSidePool = ethers.utils.formatEther(sidePoolVolumes[1]);
    const awaySidePool = ethers.utils.formatEther(sidePoolVolumes[2]);
    setSidePools([
      parseFloat(homeSidePool),
      parseFloat(drawSidePool),
      parseFloat(awaySidePool),
    ]);
  }, [sidePoolVolumes]);

  const bettingPoolTypes = useMemo(() => {
    const poolInfo = [
      {
        title: "'Home' Pool",
        value: sidePools[0],
        // percent: 98,
        // fakePercent: 98,
        percent: parseFloat(((sidePools[0] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        fakePercent: parseFloat(((sidePools[0] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        color: '#F2602F',
        background: '/images/pngs/bets/home-button-background.svg',
      },
      {
        title: "'Draw' Pool",
        value: sidePools[1],
        // percent: 1,
        // fakePercent: 1,
        percent: parseFloat(((sidePools[1] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        fakePercent: parseFloat(((sidePools[1] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        color: '#739AF0',
        background: '/images/pngs/bets/draw-button-background.svg',
      },
      {
        title: "'Away' Pool",
        value: sidePools[2],
        // percent: 1,
        // fakePercent: 1,
        percent: parseFloat(((sidePools[2] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        fakePercent: parseFloat(((sidePools[2] / (sidePools[0] + sidePools[1] + sidePools[2])) * 100).toFixed(1)),
        color: '#E19F33',
        background: '/images/pngs/bets/away-button-background.svg',
      },
    ];

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
    if (poolInfo[2].fakePercent < 20 && poolInfo[2].fakePercent > 0) {
      control += 20 - poolInfo[2].fakePercent;
      poolInfo[2].fakePercent = 20;
      controlledIndex.push(2);
    }

    if (control != 0) {
      const bigPools = poolInfo.filter((item: any) => item.fakePercent >= 40);
      console.log("bg pools: ", bigPools)
      bigPools[0].fakePercent -= control;
    }

    return poolInfo;
  }, [sidePools])

  const hanldeChoice = (choice: string) => {
    setChoice(choice);
    console.log("prediction: ", prediction.sideToPredict);
    setPrediction({
      sideToPredict: {
        ...prediction.sideToPredict,
        [currentSports]: choice,
      },
    });
  }

  const PredictionsStatistics = () => (
    <Flex
      mt={'30px'}
      justifyContent={'center'}
      alignItems={'baseline'}
      width={'100%'}
      maxWidth={['600px']}
      className='step-bar-wrapper'
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
      width='100%'
      mb={'30px'}
      direction='column'
    >
      <Flex
        gap={'10px'}
        justifyContent={['start', 'start', 'start', 'start']}
        width='100%'
        height='148px'
        pr='5'
        mr='10'
      >

        {/* images */}
        <Flex
        >
          <Flex
            onClick={() => {
              hanldeChoice('home')
            }}
            cursor={'pointer'}
          >
            <Image
              src="/images/pngs/bets/home.svg"
              alt="home"
              _hover={{
                transform: 'scale(1.1)',
              }}
              width={choice == "home" ? '140px' : '120px'}
              height={choice == "home" ? '140px' : '120px'}
            />
          </Flex>
          <Flex
            onClick={() => {
              hanldeChoice('draw')
            }}
            cursor={'pointer'}
          >
            <Image
              src="/images/pngs/bets/draw.svg"
              alt="draw"
              _hover={{
                transform: 'scale(1.1)',
              }}
              width={choice == "draw" ? '140px' : '120px'}
              height={choice == "draw" ? '140px' : '120px'}
            />
          </Flex>
          <Flex
            onClick={() => {
              hanldeChoice('away')
            }}
            cursor={'pointer'}
          >
            <Image
              src="/images/pngs/bets/away.svg"
              alt="away"
              _hover={{
                transform: 'scale(1.1)',
              }}
              width={choice == "away" ? '140px' : '120px'}
              height={choice == "away" ? '140px' : '120px'}
            />
          </Flex>
        </Flex>

        <Flex
          display={['none', 'none', 'none', 'flex']}
          width='50%'
          mr='5'
        >
          <PredictionsStatistics />
        </Flex>
      </Flex>

      <Flex
        display={['flex', 'flex', 'flex', 'none']}
        mr='5'
      >
        <PredictionsStatistics />
      </Flex>
    </Flex>
  )
}

export default PredictionsCoreComponent3
