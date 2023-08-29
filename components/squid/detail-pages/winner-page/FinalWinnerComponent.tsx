import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { VotingResultInSBC } from '../../../../utils/config'
import { useChainContext } from '../../../../utils/Context'
import { checkIconInGreenBg } from '../../../../utils/assets'
import { eventVote, getWinnerIDs, winnersClaimPrize } from '../../../../utils/interact/sc/squid-competition'
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen: isOpenWinnersClaimPrizeSuccessModal,
    onOpen: onOpenWinnersClaimPrizeSuccessModal,
    onClose: onCloseWinnersClaimPrizeSuccessModal,
  } = useDisclosure();

  const { innerWidth: width } = window;

  useEffect(() => {
    const getVote = async () => {
      const res = await eventVote(
        eventID,
        chain?.id ?? 0,
        isNativeToken
      );
      //@ts-ignore
      setSplitPoint(res.splitPoint);
      //@ts-ignore
      setSoloPoint(res.soloPoint);
    }
    if (chain?.id) getVote()
  }, [
    chain?.id,
    isNativeToken,
    voteResult,
  ]);

  useEffect(() => {
    const initWinnerIDs = async () => {
      const res = await getWinnerIDs(
        eventID,
        chain?.id ?? 0,
        isNativeToken
      );
      setWinnerIds(res as any);
    }

    if (chain?.id) initWinnerIDs()
  }, [
    chain?.id,
    isNativeToken,
    voteResult,
  ]);



  const handlewinnersClaimPrize = async () => {
    setIsLoading(true)
    const res = await winnersClaimPrize(
      eventID ?? 1,
      chain?.id ?? 0,
      isNativeToken
    )
    if (res)
      onOpenWinnersClaimPrizeSuccessModal();

    setIsLoading(false)
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
                color={'white'}
                onClick={handlewinnersClaimPrize}
                isDisabled={!winnerIds.includes(registerID)}
              >
                Claim Winner Prize
              </Button>
            </Flex>
            {
              winnerIds.includes(registerID) && (
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
              )
            }
            <AnnounceModal
              isOpenAnnounceModal={isOpenWinnersClaimPrizeSuccessModal}
              onCloseAnnounceModal={onCloseWinnersClaimPrizeSuccessModal}
              announceText={`Winner has been successfully claimed prize`}
              announceLogo={checkIconInGreenBg}
              announceModalButtonText={'Claim Winner NFT'}
              announceModalButtonAction={() => router.push('/my-profile/my-nfts')}
            />
            <AnnounceModal
              isOpenAnnounceModal={
                isLoading
              }
              onCloseAnnounceModal={() => setIsLoading(false)}
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
