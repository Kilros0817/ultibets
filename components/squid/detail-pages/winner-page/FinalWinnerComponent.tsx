import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { VotingResultInSBC } from '../../../../utils/config'
import { useChainContext } from '../../../../utils/Context'
import { checkIconInGreenBg } from '../../../../utils/assets'
import { useEventVote, useGetWinnerIDs, useWinnersClaimPrize } from '../../../../utils/interact/sc/squid-competition'
import AnnounceModal from '../../../modal/AnnounceModal'

export type FinalWinnerComponentProps = {
  eventID: number
  voteResult: VotingResultInSBC
  prizePool: number
  currentToken: string
  registerID: number
  isModalBody: boolean
  winnersNumber: number
}

const FinalWinnerComponent = ({
  eventID,
  voteResult,
  prizePool,
  currentToken,
  registerID,
  isModalBody,
  winnersNumber,
}: FinalWinnerComponentProps) => {
  const router = useRouter();
  const { chain, } = useNetwork();
  const { isNativeToken } = useChainContext();
  const [splitPoint, setSplitPoint] = useState<number>(0);
  const [soloPoint, setSoloPoint] = useState<number>(0);
  const [winnerIds, setWinnerIds] = useState<number[]>([]);
  const [finalDecisionResult, setFinalDecisionResult] = useState<string>('');
  const [finalPrizeLabel, setFinalPrizeLabel] = useState<string>('');
  const [finalLineLabel, setFinalLineLabel] = useState<string>('');
  const [finalLineValue, setFinalLineValue] = useState<string>('');
  const {
    isOpen: isOpenWinnersClaimPrizeSuccessModal,
    onOpen: onOpenWinnersClaimPrizeSuccessModal,
    onClose: onCloseWinnersClaimPrizeSuccessModal,
  } = useDisclosure();


  const eventVote = useEventVote(
    eventID
  );

  useEffect(() => {
    if (voteResult == VotingResultInSBC.Indeterminate) return;
    if (eventVote.isLoading) return;
    if (eventVote.status) {
      setSplitPoint((eventVote?.result as any)?.splitPoint);
      setSoloPoint((eventVote?.result as any)?.soloPoint);
    }
  }, [
    chain?.id,
    eventVote.isLoading,
    eventVote.result,
    isNativeToken,
    voteResult,
  ]);

  const getWinnerIDs = useGetWinnerIDs(
    eventID
  );

  useEffect(() => {
    if (getWinnerIDs.isLoading) return;
    if (getWinnerIDs.status) {
      setWinnerIds((getWinnerIDs as any).result);
      console.log("winner ids: ", getWinnerIDs.result);
    }
  }, [
    chain?.id,
    getWinnerIDs.isLoading,
    getWinnerIDs.result,
    isNativeToken,
    voteResult,
  ]);

  const winnersClaimPrize = useWinnersClaimPrize(
    eventID ?? 1,
  )

  const handlewinnersClaimPrize = () => {
    if (winnersClaimPrize.isLoading) return;
    try {
      winnersClaimPrize.winnersClaimPrizeFunction?.();
      onOpenWinnersClaimPrizeSuccessModal();
    } catch (err) {
      console.log('error in pick winner: ', err);
    }
  }


  useEffect(() => {
    switch (voteResult) {
      case VotingResultInSBC.Split:
        setFinalDecisionResult('Split Prize Pool Equally');
        setFinalPrizeLabel('Final Prize Pool');
        setFinalLineLabel('Prize Pool Per Winner');
        setFinalLineValue((prizePool / winnerIds?.length).toFixed(3) + " " + currentToken);
        break;

      case VotingResultInSBC.Solo:
        if (splitPoint == soloPoint) {
          // equal case
          setFinalDecisionResult('Random Pick Solo Winner');
          setFinalPrizeLabel('Final Winner Prize');
          setFinalLineLabel('Random Solo Winner');
          setFinalLineValue('#' + winnerIds[0]);
        } else {
          // solo
          setFinalDecisionResult('Random Pick Solo Winner');
          setFinalPrizeLabel('Final Winner Prize');
          setFinalLineLabel('Random Solo Winner');
          setFinalLineValue('#' + winnerIds[0]);
        }
        break;

      case VotingResultInSBC.Indeterminate:
        // the number of winners in specific rounds is only one
        setFinalPrizeLabel('Final Winner Prize');
        setFinalLineLabel('Unique Winner');
        setFinalLineValue('#' + winnerIds[0]);
        break;
    }
  }, [
    voteResult,
    winnerIds,
    prizePool,
    currentToken,
  ]);

  return (
    <Flex
      direction={'column'}
      mt={'80px'}
    >
      <Flex
        direction={'column'}
        gap={'10px'}
      >
        {
          (winnersNumber >= 2) && (
            <Text
              fontWeight={'700'}
              fontSize={['20px', '20px', '20px', '29px']}
              lineHeight={'33px'}
              color={'white'}
              textTransform={'capitalize'}
              fontFamily={'Nunito'}
            >
              Final Decision: {finalDecisionResult} {' '} (Votes {splitPoint}-{soloPoint})
            </Text>
          )
        }
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '29px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          Remaining Players: {winnerIds?.length}
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '29px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          {finalPrizeLabel}: {prizePool} {currentToken}
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={['20px', '20px', '20px', '29px']}
          lineHeight={'33px'}
          color={'white'}
          textTransform={'capitalize'}
          fontFamily={'Nunito'}
        >
          {finalLineLabel}: {finalLineValue}
        </Text>
      </Flex>

      {
        !isModalBody && (
          <Box>
            <Flex
              mt={'50px'}
              gap={'50px'}
              direction={['column', 'column', 'row']}
            >
              <Button
                height={'41px'}
                width={'fit-content'}
                background={'unset'}
                px='30px'
                py='15px'
                borderRadius={'34px'}
                border={'1px solid #FC541C'}
                _hover={{
                  background: '#FC541C',
                }}
                onClick={handlewinnersClaimPrize}
                isDisabled={!winnerIds.includes(registerID)}
              >
                Claim Winner Prize
              </Button>
              <Button
                px='30px'
                py='15px'
                mb='20px'
                height={'41px'}
                width={'fit-content'}
                background={'unset'}
                borderRadius={'34px'}
                border={'1px solid #FC541C'}
                _hover={{
                  background: '#FC541C',
                }}
                onClick={() => router.push('/my-profile/my-nfts')}
                isDisabled={!winnerIds.includes(registerID)}
              >
                Claim Winner NFT
              </Button>
            </Flex>
            <AnnounceModal
              isOpenAnnounceModal={isOpenWinnersClaimPrizeSuccessModal && winnersClaimPrize.isSuccess}
              onCloseAnnounceModal={onCloseWinnersClaimPrizeSuccessModal}
              announceText={`Winner has been successfully claimed prize`}
              announceLogo={checkIconInGreenBg}
              announceModalButtonText={'Claim Winner NFT'}
              announceModalButtonAction={() => router.push('/my-profile/my-nfts')}
            />
            <AnnounceModal
              isOpenAnnounceModal={
                (isOpenWinnersClaimPrizeSuccessModal && winnersClaimPrize.isLoading)
              }
              onCloseAnnounceModal={onCloseWinnersClaimPrizeSuccessModal}
              announceText={'Your transaction is currently processing on the blockchain'}
              announceGif={true}
              announceModalButtonText={'Close'}
            />
          </Box>
        )
      }
    </Flex >
  )
}

export default FinalWinnerComponent
