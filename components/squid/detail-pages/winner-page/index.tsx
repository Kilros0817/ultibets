import React, { useEffect } from 'react'
import '@fontsource/inter'
import '@fontsource/nunito'
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
    </>
  )
}

export default WinnerPageComponent
