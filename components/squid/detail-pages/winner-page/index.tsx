import {
  Flex,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
import Confetti from 'react-confetti'
import { VotingResultInSBC, } from '../../../../utils/config';
import FinalWinnerComponent from './FinalWinnerComponent';

type WinnerPageComponentProps = {
  eventID: number
  totalAmount: number
  currentToken: string
  voteResult: VotingResultInSBC
  registerID: number
  winnersNumber: number
}

const WinnerPageComponent = ({
  eventID,
  totalAmount,
  currentToken,
  voteResult,
  registerID,
  winnersNumber,
}: WinnerPageComponentProps) => {
  const { innerWidth: width, innerHeight: height } = window;
  useEffect(() => {
    document.title = 'Squid Competitions | UltiBets'
  }, [])

  return (
    <>
      <FinalWinnerComponent
        eventID={eventID}
        voteResult={voteResult}
        prizePool={totalAmount}
        currentToken={currentToken}
        registerID={registerID}
        isModalBody={false}
        winnersNumber={winnersNumber}
      />
      
      <Flex
      >
        <Confetti
          confettiSource={{ x: width + 100, y: 700, w: 10, h: 10 }}
          initialVelocityX={-25}
          initialVelocityY={15}
          gravity={0.1}
          numberOfPieces={1000}
          opacity={0.4}
        />
      </Flex>
    </>
  )
}

export default WinnerPageComponent
