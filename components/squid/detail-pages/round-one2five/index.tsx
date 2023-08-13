import {
  Flex,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import Welcome from '../Welcome'
import SquidRoundStats from '../SquidRoundStats'
import SquidGrid from '../SquidGrid'
import { chainAttrs, EventStateInSBC, mumbaiChainId, newChainAttrs, polygonChainId, RoundResultInSBC, RoundStateInSBC, VotingResultInSBC } from '../../../../utils/config'
import SquidRoundInfo from '../SquidRoundInfo'
import PredictionsVersusTeam from '../../../predictions/PredictionsDetailPageComponent/PredictionsVersusTeam'
import SquidBetsCoreComponent from '../SquidBetsCoreComponent'
import SquidBetsSummary from '../SquidBetsSummary'
import { useChainContext } from '../../../../utils/Context'
import { useNetwork } from 'wagmi'

export type RoundOne2FiveComponentProps = {
  eventID: number
  currentSelectedLevel: number
  currentLevel: number
  description?: string
  totalAmount?: number
  currentPlayers?: number
  totalPlayers: number
  roundBetAmount?: number
  state?: EventStateInSBC
  registerID: number
  yesPoolAmount: number
  noPoolAmount: number
  startTime: number
  roundResult: RoundResultInSBC,
  accessLevel: number
}

const RoundOne2FiveComponent = ({
  eventID,
  currentSelectedLevel,
  currentLevel,
  description,
  totalAmount,
  currentPlayers,
  totalPlayers,
  roundBetAmount,
  state,
  registerID,
  yesPoolAmount,
  noPoolAmount,
  startTime,
  roundResult,
  accessLevel,
}: RoundOne2FiveComponentProps) => {
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
    setCurrentToken(isNativeToken ? currentMainnetOrTestnetAttrs[currentChainAttrsItem[0].index].nativeToken : "UTBETS")
  }, [chain, isNativeToken]);

  useEffect(() => {
    document.title = 'Squid Competitions | UltiBets'
  }, [])

  return (

    <>
      <Flex
        mt='20px'
      >
        <Welcome
          title={`Welcome to Squid Bet #${eventID}`}
          round={`Round ${currentSelectedLevel}`}
        />
      </Flex>

      <SquidRoundStats
        limit={totalPlayers ?? 1}
        poolPrize={totalAmount ?? 0}
        current={currentPlayers ?? 0}
        registerID={registerID ?? 0}
      />

      <SquidGrid
        limit={totalPlayers ?? 1}
        current={currentPlayers ?? 0}
      />

      <Flex
        mt='70px'
      >
        <SquidRoundInfo
          volume={yesPoolAmount + noPoolAmount}
          startTime={new Date(startTime * 1000)}
        />
      </Flex>

      <Flex
        mt='20px'
      >
        <Flex
          direction={'column'}
        >
          <Flex
            mt={['40px', '40px', '40px', '20px']}
            width={['100%', '100%', '100%', '100%', 'max-content']}
          >
            <PredictionsVersusTeam
              logo={'/images/svgs/sidebar/squid.svg'}
              series={'series'}
              description={description}
            />

          </Flex>

          <SquidBetsCoreComponent
            yesPoolAmount={yesPoolAmount}
            noPoolAmount={noPoolAmount}
          />

          <Flex>
            <SquidBetsSummary
              eventID={eventID}
              currentToken={currentToken}
              currentLevel={currentLevel}
              totalPlayers={totalPlayers}
              currentPlayers={currentPlayers ?? 0}
              roundBetAmount={roundBetAmount ?? 0}
              yesPoolAmount={yesPoolAmount}
              noPoolAmount={noPoolAmount}
              registerID={registerID ?? 0}
              roundResult={roundResult ?? ''}
              currentSelectedLevel={currentSelectedLevel}
              accessLevel={accessLevel}
              startTime={new Date(startTime * 1000)}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default RoundOne2FiveComponent;
