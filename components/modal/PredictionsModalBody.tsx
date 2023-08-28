import { Box, Button, Flex, Input, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAccount, useNetwork, } from 'wagmi';
import { useChainContext } from '../../utils/Context';
import { chainAttrs, mumbaiChainId, newChainAttrs, perks, polygonChainId, rounds, utbetsAmountPerPerkLevel } from '../../utils/config';
import { getNumberOfClaimedPerks } from '../../utils/interact/sc/sbcNFT';
import { PerkInfo } from '../../utils/types';

type PredictionsModalBodyProps = {
  type: string,
  summary?: any, // for pm
  newBetAmount: number | null,
  setNewBetAmount: (newBetAmount: number | null) => void,
  yesPoolAmount?: number
  noPoolAmount?: number
  registerID?: number // for sbc
  currentPlayers?: number // for sbc
  isPerks: string
  setIsPerks: (isPerks: string) => void
  perkInfo: PerkInfo
  setPerkInfo: (perkInfo: PerkInfo) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PredictionsModalBody = ({
  type,
  summary,
  newBetAmount,
  setNewBetAmount,
  yesPoolAmount,
  noPoolAmount,
  registerID,
  currentPlayers,
  isPerks,
  setIsPerks,
  perkInfo,
  setPerkInfo,
}: PredictionsModalBodyProps) => {
  const {
    isNativeToken,
    prediction,
    sbc,
    currentPMEventID,
  } = useChainContext();
  const router = useRouter();
  const { chain, } = useNetwork();
  const { address } = useAccount();
  const [currentMainnetOrTestnetAttrs,] = useState(
    process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? chainAttrs.mainnet : chainAttrs.testnet);
  const [chainAttrsIndex, setChainAttrsIndex] = useState(1);
  const [currentToken, setCurrentToken] = useState(isNativeToken ? currentMainnetOrTestnetAttrs[chainAttrsIndex].nativeToken : "UTBETS");
  const [sideToPredict, setSideToPredict] = useState({
    prediction: prediction,
    sbc: sbc,
  })
  const [currentSports, setCurrentSports] = useState('soccer');
  const [currentSidePoolAmount, setCurrentSidePoolAmount] = useState(0);
  const [currentSidePoolSharePercent, setCurrentSidePoolSharePercent] = useState(0);
  const [newCurrentSidePoolSharePercent, setNewCurrentSidePoolSharePercent] = useState(0);
  const [newCurrentExpectedGain, setNewCurrentExpectedGain] = useState(0);
  const [totalBettingAmountOfEvent, setTotalBettingAmountOfEvent] = useState(0);
  const [perksCounts, setPerksCounts] = useState<number[]>([]);
  const [currentPerkLevel, setCurrentPerkLevel] = useState<number>();

  useEffect(() => {
    console.log("perk level: ", currentPerkLevel);
  }, [currentPerkLevel])

  useEffect(() => {
    let chainId = (chain?.id != undefined && Object.keys(newChainAttrs).includes(chain?.id?.toString())) ? chain.id :
      process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? polygonChainId : mumbaiChainId; let currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == chainId);
    if (currentChainAttrsItem.length == 0) {
      const temporaryChainId = process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == 'mainnet' ? 137 : 80001
      currentChainAttrsItem = currentMainnetOrTestnetAttrs.filter(item => item.chainId == temporaryChainId);
    }
    setChainAttrsIndex(currentChainAttrsItem[0].index);
    setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);

  useEffect(() => {
    const pathName = router.asPath;
    const slug = pathName.split('/');

    if (type == 'prediction') {
      if (slug[2]) {
        setCurrentSports(slug[2]);
      }
    }
  }, [router]);


  useEffect(() => {
    if (type != 'prediction' || isPerks == 'false') return;

    const initNumberOfClaimedPerks = async () => {
      const res = await getNumberOfClaimedPerks(address, chain?.id ?? 0);
      const temp: number[] = (res as any);

      let perksCounts = temp.slice(1).concat([temp[0]]);
      setPerksCounts(perksCounts);
    }

    if (address && chain?.id) initNumberOfClaimedPerks()
  }, [
    isPerks,
  ])

  useEffect(() => {
    if (type == 'prediction') {
      setSideToPredict({
        ...sideToPredict,
        prediction: {
          ...prediction,
          [currentSports]: prediction.sideToPredict[currentSports]
        }
      })

      const doubleOrTriple = summary.length - 1;
      const side = prediction.sideToPredict[currentSports];

      let sideIndex = 0;
      let totalBettingAmountOfEvent = 0;
      if (doubleOrTriple == 3) {
        if (side == "home") {
          sideIndex = 1;
        } else if (side == "draw") {
          sideIndex = 2;
        } else {
          sideIndex = 3;
        }
        totalBettingAmountOfEvent = summary[1].sidePool + summary[2].sidePool + summary[3].sidePool;
      } else if (doubleOrTriple == 2) {
        if (side == "yes") {
          sideIndex = 1;
        } else {
          sideIndex = 2;
        }
        totalBettingAmountOfEvent = summary[1].sidePool + summary[2].sidePool;
      }

      setTotalBettingAmountOfEvent(totalBettingAmountOfEvent);
      setCurrentSidePoolAmount(summary[sideIndex].sidePool);
      setNewCurrentSidePoolSharePercent(!isNaN(summary[sideIndex]?.currentSidepoolShare) ?
        summary[sideIndex]?.currentSidepoolShare : 0);
      setCurrentSidePoolSharePercent(
        !isNaN(summary[sideIndex]?.currentSidepoolShare) ?
          summary[sideIndex]?.currentSidepoolShare : 0
      );
      setNewCurrentExpectedGain(summary[sideIndex].finalGainIfWon);
    }

    if (type == 'sbc') {
      setSideToPredict({
        ...sideToPredict,
        sbc: sbc,
      })

      const side = sbc.sideToPredict;
      let sidePoolAmount = 0;
      if (side == "yes") {
        sidePoolAmount = yesPoolAmount ?? 0;
      } else {
        sidePoolAmount = noPoolAmount ?? 0;
      }

      setCurrentSidePoolAmount(sidePoolAmount);
    }
  }, [type, prediction, sbc, currentSports, currentPMEventID])

  const handleNewBetAmount = (newAmount: string) => {
    if (!newAmount) {
      setNewBetAmount(null)
      return;
    }

    let amount = Number(newAmount);
    setNewBetAmount(amount);

    const newSidePoolAmount = currentSidePoolAmount + amount;
    const newSideBetAmount = currentSidePoolSharePercent / 100 * currentSidePoolAmount + amount;
    let newSidePoolSharePercent = parseFloat((newSideBetAmount / newSidePoolAmount * 100).toFixed(1));
    newSidePoolSharePercent = isNaN(newSidePoolSharePercent) ? 0 : newSidePoolSharePercent
    setNewCurrentSidePoolSharePercent(newSidePoolSharePercent);

    const newExpectedGain = (totalBettingAmountOfEvent + amount) * newSidePoolSharePercent * 98 / 100 / 100;
    setNewCurrentExpectedGain(parseFloat(newExpectedGain.toFixed(3)));
  }

  return (
    <Flex
      gap={'40px'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'start'}
    >
      <Box
        fontFamily={'Nunito'}
        fontWeight={'700'}
        fontSize={'22px'}
        fontStyle='normal'
        lineHeight={'30px'}
        textTransform={'capitalize'}
      >
        <Box
        >
          <Text
          >
            Side to predict:
          </Text>
          <Text
            fontSize={'17px'}
            lineHeight={'23px'}
            color={'#739AF0'}
            mt='12px'
          >
            {
              type == 'prediction' ?
                sideToPredict.prediction.sideToPredict[currentSports]
                :
                sideToPredict.sbc.sideToPredict
            }
          </Text>
        </Box>

        <Box
          mt='48px'
        >
          <Text
          >
            Current Side Pool:{' '}
          </Text>
          <Text
            fontSize={'17px'}
            lineHeight={'23px'}
            color={'#739AF0'}
            mt='12px'
          >
            {
              type == 'prediction' ? `${currentSidePoolAmount} ${currentToken}` :
                `${currentSidePoolAmount} ${currentToken}`
            }
          </Text>
        </Box>

        {
          type == 'sbc' ? (
            <>
              <Box
                mt='48px'
              >
                <Text
                >
                  Current Player Id:{' '}
                </Text>
                <Text
                  fontSize={'17px'}
                  lineHeight={'23px'}
                  color={'#739AF0'}
                  mt='12px'
                >
                  #{registerID}
                </Text>
              </Box>
              <Box
                mt='48px'
              >
                <Text
                >
                  Remaining players in squid betting competition:{' '}
                </Text>
                <Text
                  fontSize={'17px'}
                  lineHeight={'23px'}
                  color={'#739AF0'}
                  mt='12px'
                >
                  {currentPlayers}
                </Text>
              </Box>
            </>
          ) : (
            <></>
          )
        }

        {
          type == 'prediction' && !isNativeToken && (
            <Flex
              direction={['column']}
              mt='48px'
            >
              <Text>
                Please select one of the following
              </Text>

              <RadioGroup
                mt={'10px'}
                onChange={setIsPerks}
                value={isPerks}
              >
                <Stack direction='row'>
                  <Radio value='false' fontFamily={'Nunito'}>By Utbets Token</Radio>
                  <Radio value='true' fontFamily={'Nunito'}>By Perks</Radio>
                </Stack>
              </RadioGroup>
            </Flex>

          )
        }

        {
          type == 'prediction' && isPerks == 'false' && (
            <Box
              mt='48px'
            >
              <Text
              >
                Enter Amount:
              </Text>
              <Flex
                alignItems={'center'}
                fontSize={'17px'}
                lineHeight={'23px'}
                color={'#739AF0'}
                mt='12px'
              >
                <Input
                  width={'90px'}
                  variant="flushed"
                  placeholder='0'
                  value={newBetAmount == null ? "" : newBetAmount}
                  type={'number'}
                  onChange={(e) => handleNewBetAmount(e?.target?.value ?? null)}
                  mr='10px'
                  textAlign={'right'}
                />
                <Text
                >
                  {currentToken} (Prediction Fee: 2%)
                </Text>
              </Flex>
            </Box>
          )
        }

        {
          type == 'prediction' && isPerks == 'true' && (
            <Flex
              className='perk-level-select-wrapper-in-prediction-markets'
              mt={'32px'}
            >
              <Select
                placeholder='Select Perk Level'
                border={'2px solid #739AF0 !important'}
                fontFamily={'Nunito'}
                fontWeight={700}
                fontSize={'18px'}
                lineHeight={'25px'}
                width={'252px'}
                height={'41px'}
                borderRadius={'5px'}
                onChange={(e) => {
                  setCurrentPerkLevel(Number(e.target.value));
                  handleNewBetAmount((
                    (
                      utbetsAmountPerPerkLevel[Number(e.target.value ?? '-1') + 1]
                      * (perksCounts[Number(e.target.value ?? '-1')] ? 1 : 0)
                    )
                      .toString()))
                  setPerkInfo({
                    perkLevel: (Number(e.target.value ?? '-1') + 1) >= 6 ? 0 : (Number(e.target.value ?? '-1') + 1),
                    count: perksCounts[Number(e.target.value ?? '-1')],
                  })
                }}
                value={currentPerkLevel}
              >
                {
                  perksCounts?.map((item, index) => (
                    <option
                      value={index}
                      //@ts-ignore
                      background={'#1F1F1F !important'}
                      cursor={'pointer'}
                    >
                      {perks[index]} - {item}
                    </option>
                  ))
                }
              </Select>
            </Flex>
          )
        }

        {
          type == 'prediction' ? (
            <>
              <Box
                mt='48px'
              >
                <Text
                >
                  Current Side Pool Share %:
                </Text>
                <Text
                  fontSize={'17px'}
                  lineHeight={'23px'}
                  color={'#739AF0'}
                  mt='12px'
                >
                  {newCurrentSidePoolSharePercent} %
                </Text>
              </Box>

              <Box
                mt='48px'
                mb='px'
              >
                <Text
                >
                  current expected gain:
                </Text>
                <Text
                  fontSize={'17px'}
                  lineHeight={'23px'}
                  color={'#739AF0'}
                  mt='12px'
                >
                  {newCurrentExpectedGain} {currentToken}
                </Text>
              </Box>
            </>
          ) : (
            <></>
          )
        }
      </Box>
    </Flex>
  )
}

export default PredictionsModalBody
